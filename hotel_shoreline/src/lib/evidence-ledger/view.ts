import type { ComparisonEvidenceRecord } from "./records";

export interface EvidenceHistoryItem {
	readonly comparisonId: string;
	readonly recordedAt: string;
	readonly caseId: string;
	readonly caseTitle: string;
	readonly locale: string;
	readonly reviewStatus: "pending_review" | "human_reviewed";
	readonly aggregateEligible: boolean;
	readonly exclusionReasons: readonly string[];
	readonly arms: readonly {
		readonly arm: "baseline" | "contract_guided";
		readonly status: string;
		readonly errorCode?: string;
		readonly provider: string;
		readonly model: string;
		readonly interventionId: string;
		readonly interventionVersion: string;
		readonly operationCount: number;
	}[];
}

export interface EvidenceHistoryResponse {
	readonly records: readonly EvidenceHistoryItem[];
}

export function projectEvidenceHistoryItem(record: ComparisonEvidenceRecord): EvidenceHistoryItem {
	return {
		comparisonId: record.comparisonId,
		recordedAt: record.recordedAt,
		caseId: record.case.id,
		caseTitle: record.case.title,
		locale: record.case.locale,
		reviewStatus: record.case.review.status,
		aggregateEligible: record.pairEligibility.eligible,
		exclusionReasons: [...record.pairEligibility.reasons],
		arms: record.arms.map((arm) => ({
			arm: arm.arm,
			status: arm.status,
			...(arm.errorCode === undefined ? {} : { errorCode: arm.errorCode }),
			provider: arm.condition.planner.provider,
			model: arm.condition.planner.model,
			interventionId: arm.intervention.id,
			interventionVersion: arm.intervention.version,
			operationCount: arm.operations.length,
		})),
	};
}

export function parseEvidenceHistoryResponse(value: unknown): EvidenceHistoryResponse | undefined {
	if (!isRecord(value) || !Array.isArray(value.records) || !value.records.every(isHistoryItem)) {
		return undefined;
	}
	return { records: value.records as unknown as readonly EvidenceHistoryItem[] };
}

function isHistoryItem(value: unknown): boolean {
	return (
		isRecord(value) &&
		typeof value.comparisonId === "string" &&
		typeof value.recordedAt === "string" &&
		!Number.isNaN(Date.parse(value.recordedAt)) &&
		typeof value.caseId === "string" &&
		typeof value.caseTitle === "string" &&
		typeof value.locale === "string" &&
		(value.reviewStatus === "pending_review" || value.reviewStatus === "human_reviewed") &&
		typeof value.aggregateEligible === "boolean" &&
		isStringArray(value.exclusionReasons) &&
		Array.isArray(value.arms) &&
		value.arms.length === 2 &&
		value.arms.every(isHistoryArm)
	);
}

function isHistoryArm(value: unknown): boolean {
	return (
		isRecord(value) &&
		(value.arm === "baseline" || value.arm === "contract_guided") &&
		typeof value.status === "string" &&
		(value.errorCode === undefined || typeof value.errorCode === "string") &&
		typeof value.provider === "string" &&
		typeof value.model === "string" &&
		typeof value.interventionId === "string" &&
		typeof value.interventionVersion === "string" &&
		Number.isSafeInteger(value.operationCount) &&
		(value.operationCount as number) >= 0
	);
}

function isStringArray(value: unknown): value is readonly string[] {
	return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
