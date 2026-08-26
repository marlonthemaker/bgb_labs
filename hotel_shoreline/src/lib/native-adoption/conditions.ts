import { createHash } from "node:crypto";

import type { PlanningBudget } from "../taskmaster";
import {
	getLanguageVariant,
	getNativeAdoptionCase,
	type LanguageVariant,
	type NativeAdoptionLocale,
	type VariantReview,
} from "./cases";
import { getIntervention, type TreatmentArm } from "./interventions";

export interface PlannerConfiguration {
	readonly provider: "deterministic" | "google-genai";
	readonly model: string;
	readonly plannerVersion: string;
	readonly promptVersion: string;
	readonly temperature: number;
	readonly budget: PlanningBudget;
}

export type ComparisonExclusionReason =
	| "CONDITION_MISMATCH"
	| "PENDING_HUMAN_REVIEW"
	| "UNSUPPORTED_LOCALE";

export interface ComparisonCondition {
	readonly id: string;
	readonly caseId: string;
	readonly caseVersion: string;
	readonly locale: NativeAdoptionLocale;
	readonly variantId: string;
	readonly variantVersion: string;
	readonly reviewStatus: VariantReview["status"];
	readonly contractId: string;
	readonly contractVersion: string;
	readonly fixtureVersion: string;
	readonly toolContractVersion: string;
	readonly arm: TreatmentArm;
	readonly interventionId: string;
	readonly interventionVersion: string;
	readonly planner: PlannerConfiguration;
	readonly sharedConfigurationHash: string;
	readonly conditionHash: string;
	readonly aggregateEligibility: "eligible" | "excluded";
	readonly exclusionReasons: readonly ComparisonExclusionReason[];
}

export interface MatchedConditions {
	readonly baseline: ComparisonCondition;
	readonly intervention: ComparisonCondition;
}

export function buildMatchedConditions(input: {
	readonly caseId: string;
	readonly locale: string;
	readonly planner: PlannerConfiguration;
}): MatchedConditions {
	const caseDefinition = getNativeAdoptionCase(input.caseId);
	let variant: LanguageVariant;
	try {
		variant = getLanguageVariant(caseDefinition, input.locale);
	} catch {
		throw new ComparisonConditionError("UNSUPPORTED_LOCALE", `Unsupported locale ${input.locale}.`);
	}
	const shared = {
		caseId: caseDefinition.id,
		caseVersion: caseDefinition.version,
		locale: variant.locale,
		variantId: variant.id,
		variantVersion: variant.version,
		contractId: caseDefinition.contract.id,
		contractVersion: caseDefinition.contract.version,
		fixtureVersion: caseDefinition.fixture.version,
		toolContractVersion: caseDefinition.toolContractVersion,
		planner: input.planner,
	};
	const sharedConfigurationHash = hashCanonical(shared);
	const exclusionReasons: ComparisonExclusionReason[] =
		variant.review.status === "human_reviewed" ? [] : ["PENDING_HUMAN_REVIEW"];
	const condition = (arm: TreatmentArm): ComparisonCondition => {
		const intervention = getIntervention(arm);
		const identity = {
			...shared,
			arm,
			interventionId: intervention.id,
			interventionVersion: intervention.version,
		};
		return {
			id: `${caseDefinition.id}-${variant.locale}-${arm}`,
			...shared,
			reviewStatus: variant.review.status,
			arm,
			interventionId: intervention.id,
			interventionVersion: intervention.version,
			sharedConfigurationHash,
			conditionHash: hashCanonical(identity),
			aggregateEligibility: exclusionReasons.length === 0 ? "eligible" : "excluded",
			exclusionReasons,
		};
	};
	return { baseline: condition("baseline"), intervention: condition("contract_guided") };
}

export function evaluatePairEligibility(conditions: MatchedConditions): {
	readonly eligible: boolean;
	readonly reasons: readonly ComparisonExclusionReason[];
} {
	const reasons = new Set<ComparisonExclusionReason>([
		...conditions.baseline.exclusionReasons,
		...conditions.intervention.exclusionReasons,
	]);
	if (
		conditions.baseline.arm !== "baseline" ||
		conditions.intervention.arm !== "contract_guided" ||
		conditions.baseline.sharedConfigurationHash !== conditions.intervention.sharedConfigurationHash
	) {
		reasons.add("CONDITION_MISMATCH");
	}
	return { eligible: reasons.size === 0, reasons: [...reasons].sort() };
}

export function hashCanonical(value: unknown): string {
	return createHash("sha256").update(canonicalJson(value)).digest("hex");
}

export class ComparisonConditionError extends Error {
	constructor(
		readonly code: "UNSUPPORTED_LOCALE",
		message: string,
	) {
		super(message);
		this.name = "ComparisonConditionError";
	}
}

function canonicalJson(value: unknown): string {
	if (value === null || typeof value === "boolean" || typeof value === "string")
		return JSON.stringify(value);
	if (typeof value === "number" && Number.isFinite(value)) return JSON.stringify(value);
	if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
	if (typeof value === "object" && value !== null) {
		return `{${Object.entries(value)
			.filter(([, child]) => child !== undefined)
			.sort(([left], [right]) => left.localeCompare(right))
			.map(([key, child]) => `${JSON.stringify(key)}:${canonicalJson(child)}`)
			.join(",")}}`;
	}
	throw new TypeError("Canonical configuration must be JSON-safe.");
}
