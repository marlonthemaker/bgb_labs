import type { MatchedComparisonRun } from "./orchestrator";

export interface ComparisonTelemetry {
	readonly severity: "INFO" | "WARNING";
	readonly message: "Native-adoption comparison completed";
	readonly event: "native_adoption.comparison.completed";
	readonly requestId: string;
	readonly comparisonId: string;
	readonly caseId: string;
	readonly locale: string;
	readonly plannerProvider: string;
	readonly plannerModel: string;
	readonly baselineStatus: string;
	readonly interventionStatus: string;
	readonly baselineErrorCode?: MatchedComparisonRun["baseline"]["errorCode"];
	readonly interventionErrorCode?: MatchedComparisonRun["intervention"]["errorCode"];
	readonly baselineOperationCount: number;
	readonly interventionOperationCount: number;
	readonly aggregateEligible: boolean;
	readonly exclusionReasons: readonly string[];
	readonly durationMs: number;
}

export function createComparisonTelemetry(input: {
	readonly requestId: string;
	readonly durationMs: number;
	readonly run: MatchedComparisonRun;
}): ComparisonTelemetry {
	return {
		severity:
			input.run.baseline.status === "succeeded" && input.run.intervention.status === "succeeded"
				? "INFO"
				: "WARNING",
		message: "Native-adoption comparison completed",
		event: "native_adoption.comparison.completed",
		requestId: input.requestId,
		comparisonId: input.run.id,
		caseId: input.run.caseId,
		locale: input.run.locale,
		plannerProvider: input.run.baseline.condition.planner.provider,
		plannerModel: input.run.baseline.condition.planner.model,
		baselineStatus: input.run.baseline.status,
		interventionStatus: input.run.intervention.status,
		...(input.run.baseline.errorCode === undefined
			? {}
			: { baselineErrorCode: input.run.baseline.errorCode }),
		...(input.run.intervention.errorCode === undefined
			? {}
			: { interventionErrorCode: input.run.intervention.errorCode }),
		baselineOperationCount: input.run.baseline.operations.length,
		interventionOperationCount: input.run.intervention.operations.length,
		aggregateEligible: input.run.pairEligibility.eligible,
		exclusionReasons: input.run.pairEligibility.reasons,
		durationMs: Number.isFinite(input.durationMs) ? Math.max(0, Math.round(input.durationMs)) : 0,
	};
}

export function writeComparisonTelemetry(event: ComparisonTelemetry): void {
	const line = JSON.stringify(event);
	if (event.severity === "WARNING") console.warn(line);
	else console.info(line);
}
