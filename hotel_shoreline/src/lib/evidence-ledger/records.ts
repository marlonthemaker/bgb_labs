import {
	isJsonValue,
	isRecord,
	type TaskGraph,
	type ValidationResult,
} from "@bomgoodbueno/native-agent-sdk";

import {
	getLanguageVariant,
	getNativeAdoptionCase,
	type VariantReview,
} from "../native-adoption/cases";
import { type ComparisonCondition, hashCanonical } from "../native-adoption/conditions";
import type { EvaluationResult } from "../native-adoption/evaluation";
import {
	getIntervention,
	type InterventionSpecification,
	type TreatmentArm,
} from "../native-adoption/interventions";
import type { ComparisonArmRun, MatchedComparisonRun } from "../native-adoption/orchestrator";
import type { NativeAdoptionOperation } from "../native-adoption/scenario";

export const comparisonEvidenceSchemaVersion = "hotel-shoreline-comparison-evidence-v1";

export interface ComparisonEvidenceArm {
	readonly runId: string;
	readonly arm: TreatmentArm;
	readonly status: ComparisonArmRun["status"];
	readonly errorCode?: string;
	readonly condition: ComparisonCondition;
	readonly intervention: InterventionSpecification;
	readonly sourceHash: string;
	readonly lifecycle: ComparisonArmRun["lifecycle"];
	readonly candidateGraph?: TaskGraph;
	readonly validation: ValidationResult | { readonly status: "not_reached" };
	readonly operations: readonly NativeAdoptionOperation[];
	readonly terminalOutcome: {
		readonly status: ComparisonArmRun["status"];
		readonly errorCode?: string;
		readonly operationCount: number;
	};
	readonly evaluation: EvaluationResult;
}

export interface ComparisonEvidenceRecord {
	readonly schemaVersion: typeof comparisonEvidenceSchemaVersion;
	readonly comparisonId: string;
	readonly recordedAt: string;
	readonly case: {
		readonly id: string;
		readonly version: string;
		readonly title: string;
		readonly locale: string;
		readonly variantId: string;
		readonly variantVersion: string;
		readonly turns: readonly {
			readonly sequence: number;
			readonly speaker: "guest";
			readonly text: string;
		}[];
		readonly review: VariantReview;
		readonly fixtureVersion: string;
		readonly toolContractVersion: string;
	};
	readonly contract: {
		readonly id: string;
		readonly version: string;
		readonly allowedTools: readonly string[];
		readonly prohibitedEffects: readonly string[];
		readonly requiredConstraintIds: readonly string[];
	};
	readonly pairEligibility: MatchedComparisonRun["pairEligibility"];
	readonly arms: readonly [ComparisonEvidenceArm, ComparisonEvidenceArm];
	readonly contentHash: string;
}

export function createComparisonEvidenceRecord(
	run: MatchedComparisonRun,
	options: { readonly recordedAt?: string } = {},
): ComparisonEvidenceRecord {
	const caseDefinition = getNativeAdoptionCase(run.caseId);
	const variant = getLanguageVariant(caseDefinition, run.locale);
	const recordedAt = options.recordedAt ?? new Date().toISOString();
	if (!isCanonicalTimestamp(recordedAt))
		throw new TypeError("recordedAt must be a canonical timestamp.");
	const arm = (current: ComparisonArmRun): ComparisonEvidenceArm => ({
		runId: current.id,
		arm: current.condition.arm,
		status: current.status,
		...(current.errorCode === undefined ? {} : { errorCode: current.errorCode }),
		condition: structuredClone(current.condition),
		intervention: structuredClone(getIntervention(current.condition.arm)),
		sourceHash: current.sourceHash,
		lifecycle: [...current.lifecycle],
		...(current.candidateGraph === undefined
			? {}
			: { candidateGraph: structuredClone(current.candidateGraph) }),
		validation: current.run?.validation ?? { status: "not_reached" },
		operations: structuredClone(current.operations),
		terminalOutcome: {
			status: current.status,
			...(current.errorCode === undefined ? {} : { errorCode: current.errorCode }),
			operationCount: current.operations.length,
		},
		evaluation: structuredClone(current.evaluation),
	});
	const payload = {
		schemaVersion: comparisonEvidenceSchemaVersion,
		comparisonId: run.id,
		recordedAt,
		case: {
			id: caseDefinition.id,
			version: caseDefinition.version,
			title: caseDefinition.title,
			locale: variant.locale,
			variantId: variant.id,
			variantVersion: variant.version,
			turns: structuredClone(variant.turns),
			review: structuredClone(variant.review),
			fixtureVersion: caseDefinition.fixture.version,
			toolContractVersion: caseDefinition.toolContractVersion,
		},
		contract: structuredClone(caseDefinition.contract),
		pairEligibility: structuredClone(run.pairEligibility),
		arms: [arm(run.baseline), arm(run.intervention)] as const,
	} as const;
	return deepFreeze({ ...payload, contentHash: hashCanonical(payload) });
}

export function parseComparisonEvidenceRecord(
	value: unknown,
): ComparisonEvidenceRecord | undefined {
	if (!isRecord(value) || !isJsonValue(value)) return undefined;
	const allowedKeys = [
		"schemaVersion",
		"comparisonId",
		"recordedAt",
		"case",
		"contract",
		"pairEligibility",
		"arms",
		"contentHash",
	];
	if (!Object.keys(value).every((key) => allowedKeys.includes(key))) return undefined;
	if (
		value.schemaVersion !== comparisonEvidenceSchemaVersion ||
		typeof value.comparisonId !== "string" ||
		value.comparisonId.length === 0 ||
		typeof value.recordedAt !== "string" ||
		!isCanonicalTimestamp(value.recordedAt) ||
		typeof value.contentHash !== "string" ||
		!/^[a-f0-9]{64}$/.test(value.contentHash) ||
		!isRecord(value.case) ||
		!isRecord(value.contract) ||
		!isRecord(value.pairEligibility) ||
		!Array.isArray(value.arms) ||
		value.arms.length !== 2 ||
		!value.arms.every(isEvidenceArm)
	) {
		return undefined;
	}
	const { contentHash, ...payload } = value;
	if (hashCanonical(payload) !== contentHash) return undefined;
	return deepFreeze(structuredClone(value) as unknown as ComparisonEvidenceRecord);
}

function isEvidenceArm(value: unknown): boolean {
	return (
		isRecord(value) &&
		typeof value.runId === "string" &&
		(value.arm === "baseline" || value.arm === "contract_guided") &&
		typeof value.status === "string" &&
		isRecord(value.condition) &&
		isRecord(value.intervention) &&
		typeof value.sourceHash === "string" &&
		Array.isArray(value.lifecycle) &&
		Array.isArray(value.operations) &&
		isRecord(value.terminalOutcome) &&
		isRecord(value.evaluation)
	);
}

function isCanonicalTimestamp(value: string): boolean {
	const parsed = new Date(value);
	return !Number.isNaN(parsed.valueOf()) && parsed.toISOString() === value;
}

function deepFreeze<T>(value: T): T {
	if (typeof value !== "object" || value === null || Object.isFrozen(value)) return value;
	Object.freeze(value);
	for (const child of Object.values(value)) deepFreeze(child);
	return value;
}
