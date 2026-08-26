import type { TaskmasterRun } from "./taskmaster";

interface TelemetryContext {
	readonly requestId: string;
	readonly durationMs: number;
	readonly cloudTrace?: string;
}

export interface TaskmasterRunTelemetry {
	readonly severity: "INFO" | "WARNING";
	readonly message: "Taskmaster run completed";
	readonly event: "taskmaster.run.completed";
	readonly requestId: string;
	readonly durationMs: number;
	readonly eventId: string;
	readonly fixtureVersion: string;
	readonly plannerFramework: TaskmasterRun["planner"]["framework"];
	readonly plannerModel: string;
	readonly status: TaskmasterRun["status"];
	readonly errorCode?: TaskmasterRun["errorCode"];
	readonly operationCount: number;
	readonly candidateNodeCount: number;
	readonly planningTurns?: number;
	readonly outputTokens?: number;
	readonly terminalLifecycleEvent: string;
	readonly validationOutcome: "accepted" | "not_reached" | "rejected";
	readonly "logging.googleapis.com/trace"?: string;
}

export interface TaskmasterCrashTelemetry {
	readonly severity: "ERROR";
	readonly message: "Taskmaster route crashed";
	readonly event: "taskmaster.run.crashed";
	readonly requestId: string;
	readonly durationMs: number;
	readonly errorType: string;
	readonly "logging.googleapis.com/trace"?: string;
}

export function createTaskmasterRunTelemetry(
	context: TelemetryContext,
	run: TaskmasterRun,
): TaskmasterRunTelemetry {
	const validationOutcome = run.run
		? run.run.validation.ok
			? "accepted"
			: "rejected"
		: "not_reached";
	return {
		severity: run.status === "succeeded" ? "INFO" : "WARNING",
		message: "Taskmaster run completed",
		event: "taskmaster.run.completed",
		requestId: context.requestId,
		durationMs: normalizeDuration(context.durationMs),
		eventId: run.eventId,
		fixtureVersion: run.fixtureVersion,
		plannerFramework: run.planner.framework,
		plannerModel: run.planner.model,
		status: run.status,
		...(run.errorCode === undefined ? {} : { errorCode: run.errorCode }),
		operationCount: run.operationCount,
		candidateNodeCount: run.candidateGraph?.nodes.length ?? 0,
		...(run.planning.usage === undefined ? {} : { planningTurns: run.planning.usage.turns }),
		...(run.planning.usage?.outputTokens === undefined
			? {}
			: { outputTokens: run.planning.usage.outputTokens }),
		terminalLifecycleEvent: run.lifecycle.at(-1) ?? "none",
		validationOutcome,
		...(context.cloudTrace === undefined
			? {}
			: { "logging.googleapis.com/trace": context.cloudTrace }),
	};
}

export function createTaskmasterCrashTelemetry(
	context: TelemetryContext,
	error: unknown,
): TaskmasterCrashTelemetry {
	return {
		severity: "ERROR",
		message: "Taskmaster route crashed",
		event: "taskmaster.run.crashed",
		requestId: context.requestId,
		durationMs: normalizeDuration(context.durationMs),
		errorType: error instanceof Error ? error.name : "NonErrorThrownValue",
		...(context.cloudTrace === undefined
			? {}
			: { "logging.googleapis.com/trace": context.cloudTrace }),
	};
}

export function resolveCloudTrace(
	header: string | null,
	projectId: string | undefined,
): string | undefined {
	if (!header || !projectId || !isGoogleCloudProjectId(projectId)) return undefined;
	const traceId = header.split("/", 1)[0];
	return traceId && /^[a-f\d]{32}$/i.test(traceId)
		? `projects/${projectId}/traces/${traceId}`
		: undefined;
}

export function writeTaskmasterTelemetry(
	event: TaskmasterRunTelemetry | TaskmasterCrashTelemetry,
): void {
	const line = JSON.stringify(event);
	if (event.severity === "ERROR") console.error(line);
	else if (event.severity === "WARNING") console.warn(line);
	else console.info(line);
}

function normalizeDuration(value: number): number {
	return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
}

function isGoogleCloudProjectId(value: string): boolean {
	return /^[a-z][a-z\d-]{4,28}[a-z\d]$/.test(value);
}
