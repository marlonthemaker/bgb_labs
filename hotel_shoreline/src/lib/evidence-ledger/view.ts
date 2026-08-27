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
