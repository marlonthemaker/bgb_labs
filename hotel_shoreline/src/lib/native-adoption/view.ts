import type { JsonObject } from "@bomgoodbueno/native-agent-sdk";

import type { NativeAdoptionLocale } from "./cases";
import type { DescriptiveMeasure, FirstLossStage } from "./evaluation";

export interface ComparisonView {
	readonly comparisonId: string;
	readonly case: {
		readonly id: string;
		readonly title: string;
		readonly version: string;
		readonly locale: NativeAdoptionLocale;
		readonly turns: readonly { readonly sequence: number; readonly text: string }[];
		readonly reviewStatus: "pending_review" | "human_reviewed";
		readonly representationLimitations: readonly string[];
	};
	readonly contract: {
		readonly id: string;
		readonly version: string;
		readonly allowedTools: readonly string[];
		readonly requiredConstraintIds: readonly string[];
		readonly prohibitedEffects: readonly string[];
	};
	readonly pairEligibility: {
		readonly eligible: boolean;
		readonly reasons: readonly string[];
	};
	readonly evidence: {
		readonly schemaVersion: string;
		readonly recordedAt: string;
		readonly sourceContentHash: string;
		readonly caseVersion: string;
		readonly variantId: string;
		readonly variantVersion: string;
		readonly fixtureVersion: string;
		readonly toolContractVersion: string;
	};
	readonly claimBoundary: {
		readonly environment: "fictional_synthetic_demo";
		readonly findingStatus: "illustrative_observation";
		readonly reviewerQualified: boolean;
		readonly statement: string;
	};
	readonly arms: readonly ArmView[];
}

export interface ArmView {
	readonly arm: "baseline" | "contract_guided";
	readonly status: "planning_failed" | "rejected" | "succeeded" | "partial_failure" | "failed";
	readonly errorCode?: string;
	readonly intervention: { readonly id: string; readonly version: string };
	readonly configuration: {
		readonly provider: "deterministic" | "google-genai";
		readonly model: string;
		readonly plannerVersion: string;
		readonly promptVersion: string;
		readonly temperature: number;
		readonly budget: {
			readonly timeoutMs: number;
			readonly maxTurns: number;
			readonly maxOutputTokens: number;
			readonly maxNodes: number;
		};
		readonly sharedConfigurationHash: string;
		readonly conditionHash: string;
	};
	readonly lifecycle: readonly string[];
	readonly candidateNodes: readonly {
		readonly id: string;
		readonly toolName: string;
		readonly input: JsonObject;
		readonly constraintIds: readonly string[];
	}[];
	readonly operations: readonly {
		readonly toolName: string;
		readonly effect: string;
		readonly input: JsonObject;
	}[];
	readonly validationIssues: readonly { readonly code: string; readonly path: string }[];
	readonly measures: readonly DescriptiveMeasure[];
	readonly firstLossStage: FirstLossStage;
}

export function parseComparisonView(value: unknown): ComparisonView | undefined {
	if (!isRecord(value) || typeof value.comparisonId !== "string") return undefined;
	if (
		!isCaseView(value.case) ||
		!isContractView(value.contract) ||
		!isEligibility(value.pairEligibility) ||
		!isEvidenceMetadata(value.evidence) ||
		!isClaimBoundary(value.claimBoundary)
	)
		return undefined;
	if (!Array.isArray(value.arms) || value.arms.length !== 2 || !value.arms.every(isArmView))
		return undefined;
	const arms = value.arms as unknown as readonly ArmView[];
	if (arms[0]?.arm !== "baseline" || arms[1]?.arm !== "contract_guided") return undefined;
	return value as unknown as ComparisonView;
}

function isEvidenceMetadata(value: unknown): boolean {
	return (
		isRecord(value) &&
		[
			"schemaVersion",
			"recordedAt",
			"sourceContentHash",
			"caseVersion",
			"variantId",
			"variantVersion",
			"fixtureVersion",
			"toolContractVersion",
		].every((key) => typeof value[key] === "string") &&
		!Number.isNaN(Date.parse(value.recordedAt as string)) &&
		/^[a-f0-9]{64}$/.test(value.sourceContentHash as string)
	);
}

function isClaimBoundary(value: unknown): boolean {
	return (
		isRecord(value) &&
		value.environment === "fictional_synthetic_demo" &&
		value.findingStatus === "illustrative_observation" &&
		typeof value.reviewerQualified === "boolean" &&
		typeof value.statement === "string" &&
		value.statement.length > 0
	);
}

function isCaseView(value: unknown): boolean {
	return (
		isRecord(value) &&
		["id", "title", "version"].every((key) => typeof value[key] === "string") &&
		(value.locale === "en" || value.locale === "es-ES" || value.locale === "pt-PT") &&
		(value.reviewStatus === "pending_review" || value.reviewStatus === "human_reviewed") &&
		isStringArray(value.representationLimitations) &&
		Array.isArray(value.turns) &&
		value.turns.length > 0 &&
		value.turns.every(
			(turn) =>
				isRecord(turn) &&
				Number.isSafeInteger(turn.sequence) &&
				typeof turn.text === "string" &&
				turn.text.length > 0,
		)
	);
}

function isContractView(value: unknown): boolean {
	return (
		isRecord(value) &&
		typeof value.id === "string" &&
		typeof value.version === "string" &&
		isStringArray(value.allowedTools) &&
		isStringArray(value.requiredConstraintIds) &&
		isStringArray(value.prohibitedEffects)
	);
}

function isEligibility(value: unknown): boolean {
	return isRecord(value) && typeof value.eligible === "boolean" && isStringArray(value.reasons);
}

function isArmView(value: unknown): boolean {
	if (!isRecord(value) || (value.arm !== "baseline" && value.arm !== "contract_guided"))
		return false;
	if (!isStatus(value.status) || !isRecord(value.intervention) || !isRecord(value.configuration))
		return false;
	if (
		typeof value.intervention.id !== "string" ||
		typeof value.intervention.version !== "string" ||
		!isConfiguration(value.configuration) ||
		!isStringArray(value.lifecycle) ||
		!Array.isArray(value.candidateNodes) ||
		!value.candidateNodes.every(isCandidateNode) ||
		!Array.isArray(value.operations) ||
		!value.operations.every(isOperation) ||
		!Array.isArray(value.validationIssues) ||
		!value.validationIssues.every(isValidationIssue) ||
		!Array.isArray(value.measures) ||
		!value.measures.every(isMeasure) ||
		!isFirstLossStage(value.firstLossStage)
	)
		return false;
	return value.errorCode === undefined || typeof value.errorCode === "string";
}

function isConfiguration(value: Record<string, unknown>): boolean {
	const budget = value.budget;
	return (
		(value.provider === "deterministic" || value.provider === "google-genai") &&
		["model", "plannerVersion", "promptVersion", "sharedConfigurationHash", "conditionHash"].every(
			(key) => typeof value[key] === "string",
		) &&
		typeof value.temperature === "number" &&
		isRecord(budget) &&
		["timeoutMs", "maxTurns", "maxOutputTokens", "maxNodes"].every((key) =>
			isNonNegativeInteger(budget[key]),
		)
	);
}

function isCandidateNode(value: unknown): boolean {
	return (
		isRecord(value) &&
		typeof value.id === "string" &&
		typeof value.toolName === "string" &&
		isJsonObject(value.input) &&
		isStringArray(value.constraintIds)
	);
}

function isOperation(value: unknown): boolean {
	return (
		isRecord(value) &&
		typeof value.toolName === "string" &&
		typeof value.effect === "string" &&
		isJsonObject(value.input)
	);
}

function isValidationIssue(value: unknown): boolean {
	return isRecord(value) && typeof value.code === "string" && typeof value.path === "string";
}

function isMeasure(value: unknown): boolean {
	return (
		isRecord(value) &&
		typeof value.id === "string" &&
		typeof value.label === "string" &&
		typeof value.definition === "string" &&
		isNonNegativeInteger(value.numerator) &&
		isNonNegativeInteger(value.denominator) &&
		(value.value === undefined ||
			(typeof value.value === "number" && Number.isFinite(value.value))) &&
		(value.direction === "higher_is_better" || value.direction === "lower_is_better")
	);
}

function isStatus(value: unknown): boolean {
	return (
		value === "planning_failed" ||
		value === "rejected" ||
		value === "succeeded" ||
		value === "partial_failure" ||
		value === "failed"
	);
}

function isFirstLossStage(value: unknown): boolean {
	return (
		value === "input" ||
		value === "understand" ||
		value === "decompose" ||
		value === "retrieve_reason" ||
		value === "act" ||
		value === "respond" ||
		value === "none"
	);
}

function isJsonObject(value: unknown): value is JsonObject {
	if (!isRecord(value)) return false;
	return Object.values(value).every(isJsonValue);
}

function isJsonValue(value: unknown): boolean {
	if (value === null || typeof value === "string" || typeof value === "boolean") return true;
	if (typeof value === "number") return Number.isFinite(value);
	if (Array.isArray(value)) return value.every(isJsonValue);
	return isJsonObject(value);
}

function isStringArray(value: unknown): value is string[] {
	return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isNonNegativeInteger(value: unknown): boolean {
	return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
