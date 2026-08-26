import type { TaskmasterRun } from "./taskmaster";

export interface RunView {
	readonly status: "planning_failed" | "rejected" | "succeeded" | "partial_failure" | "failed";
	readonly plannerFramework: "genkit" | "deterministic";
	readonly plannerModel: string;
	readonly lifecycle: readonly LifecycleEvent[];
	readonly operationCount: number;
	readonly errorCode?: PlannerErrorCode;
	readonly candidateGraph?: {
		readonly nodes: readonly { readonly id: string; readonly toolName: string }[];
		readonly preservedConstraintIds: readonly string[];
	};
	readonly nodeResults: readonly { readonly nodeId: string; readonly status: NodeStatus }[];
	readonly budget: {
		readonly timeoutMs: number;
		readonly maxTurns: number;
		readonly maxOutputTokens: number;
		readonly maxNodes: number;
	};
	readonly usage?: { readonly turns: number; readonly outputTokens?: number };
}

type LifecycleEvent =
	| "event.received"
	| "planning.started"
	| "planning.finished"
	| "planning.failed"
	| "validation.started"
	| "validation.finished"
	| "validation.failed"
	| "execution.finished";

type PlannerErrorCode =
	| "PLANNER_BUDGET_EXCEEDED"
	| "PLANNER_INVALID_OUTPUT"
	| "PLANNER_QUOTA_EXHAUSTED"
	| "PLANNER_TIMEOUT"
	| "PLANNER_UNAVAILABLE";

type NodeStatus = "blocked" | "failed" | "skipped" | "succeeded";

export function parseRunView(value: unknown): RunView | undefined {
	if (!isRecord(value)) return undefined;
	const { budget, usage } = value;
	if (!isBudget(budget) || (usage !== undefined && !isUsage(usage))) return undefined;
	if (!isStatus(value.status) || !isPlannerFramework(value.plannerFramework)) return undefined;
	if (
		typeof value.plannerModel !== "string" ||
		!isLifecycle(value.lifecycle) ||
		!isNonNegativeInteger(value.operationCount)
	) {
		return undefined;
	}
	const candidateGraph = parseCandidateGraph(value.candidateGraph);
	if (value.candidateGraph !== undefined && !candidateGraph) return undefined;
	const nodeResults = parseNodeResults(value.nodeResults);
	if (!nodeResults) return undefined;
	if (value.errorCode !== undefined && !isPlannerErrorCode(value.errorCode)) return undefined;
	if (
		!isCoherentRun({
			status: value.status,
			lifecycle: value.lifecycle,
			operationCount: value.operationCount,
			candidateGraph,
			nodeResults,
		})
	) {
		return undefined;
	}
	return {
		status: value.status,
		plannerFramework: value.plannerFramework,
		plannerModel: value.plannerModel,
		lifecycle: value.lifecycle,
		operationCount: value.operationCount,
		...(value.errorCode === undefined ? {} : { errorCode: value.errorCode }),
		...(candidateGraph ? { candidateGraph } : {}),
		nodeResults,
		budget,
		...(usage === undefined ? {} : { usage }),
	};
}

export function projectRunView(run: TaskmasterRun): RunView {
	return {
		status: run.status,
		plannerFramework: run.planner.framework,
		plannerModel: run.planner.model,
		lifecycle: run.lifecycle,
		operationCount: run.operationCount,
		...(run.errorCode === undefined ? {} : { errorCode: run.errorCode }),
		...(run.candidateGraph === undefined
			? {}
			: {
					candidateGraph: {
						nodes: run.candidateGraph.nodes.map(({ id, toolName }) => ({ id, toolName })),
						preservedConstraintIds: run.candidateGraph.preservedConstraintIds,
					},
				}),
		nodeResults: run.run?.nodeResults.map(({ nodeId, status }) => ({ nodeId, status })) ?? [],
		budget: run.planning.budget,
		...(run.planning.usage === undefined ? {} : { usage: run.planning.usage }),
	};
}

function parseCandidateGraph(value: unknown): RunView["candidateGraph"] | undefined {
	if (value === undefined) return undefined;
	if (!isRecord(value) || !Array.isArray(value.nodes)) return undefined;
	if (!isStringArray(value.preservedConstraintIds)) return undefined;
	const nodes = value.nodes.flatMap((node) => {
		if (!isRecord(node) || typeof node.id !== "string" || typeof node.toolName !== "string") {
			return [];
		}
		return [{ id: node.id, toolName: node.toolName }];
	});
	return nodes.length === value.nodes.length
		? { nodes, preservedConstraintIds: value.preservedConstraintIds }
		: undefined;
}

function parseNodeResults(value: unknown): RunView["nodeResults"] | undefined {
	if (!Array.isArray(value)) return undefined;
	const nodeResults = value.flatMap((result) => {
		if (!isRecord(result) || typeof result.nodeId !== "string" || !isNodeStatus(result.status)) {
			return [];
		}
		return [{ nodeId: result.nodeId, status: result.status }];
	});
	return nodeResults.length === value.length ? nodeResults : undefined;
}

function isBudget(value: unknown): value is RunView["budget"] {
	return (
		isRecord(value) &&
		isNonNegativeInteger(value.timeoutMs) &&
		isNonNegativeInteger(value.maxTurns) &&
		isNonNegativeInteger(value.maxOutputTokens) &&
		isNonNegativeInteger(value.maxNodes)
	);
}

function isUsage(value: unknown): value is NonNullable<RunView["usage"]> {
	return (
		isRecord(value) &&
		isNonNegativeInteger(value.turns) &&
		(value.outputTokens === undefined || isNonNegativeInteger(value.outputTokens))
	);
}

function isStatus(value: unknown): value is RunView["status"] {
	return (
		value === "planning_failed" ||
		value === "rejected" ||
		value === "succeeded" ||
		value === "partial_failure" ||
		value === "failed"
	);
}

function isPlannerFramework(value: unknown): value is RunView["plannerFramework"] {
	return value === "deterministic" || value === "genkit";
}

function isCoherentRun(
	input: Pick<RunView, "lifecycle" | "nodeResults" | "operationCount" | "status"> & {
		readonly candidateGraph: RunView["candidateGraph"] | undefined;
	},
): boolean {
	if (input.status === "planning_failed") {
		return (
			input.operationCount === 0 &&
			input.candidateGraph === undefined &&
			input.nodeResults.length === 0 &&
			input.lifecycle.at(-1) === "planning.failed"
		);
	}
	if (input.status === "rejected") {
		return (
			input.operationCount === 0 &&
			input.candidateGraph !== undefined &&
			input.lifecycle.at(-1) === "validation.failed"
		);
	}
	if (input.status === "succeeded") {
		return (
			input.operationCount > 0 &&
			input.candidateGraph !== undefined &&
			input.nodeResults.length > 0 &&
			input.nodeResults.every((result) => result.status === "succeeded") &&
			input.lifecycle.at(-1) === "execution.finished"
		);
	}
	return input.candidateGraph !== undefined && input.lifecycle.at(-1) === "execution.finished";
}

function isLifecycle(value: unknown): value is LifecycleEvent[] {
	return Array.isArray(value) && value.every(isLifecycleEvent);
}

function isLifecycleEvent(value: unknown): value is LifecycleEvent {
	return (
		value === "event.received" ||
		value === "planning.started" ||
		value === "planning.finished" ||
		value === "planning.failed" ||
		value === "validation.started" ||
		value === "validation.finished" ||
		value === "validation.failed" ||
		value === "execution.finished"
	);
}

function isPlannerErrorCode(value: unknown): value is PlannerErrorCode {
	return (
		value === "PLANNER_BUDGET_EXCEEDED" ||
		value === "PLANNER_INVALID_OUTPUT" ||
		value === "PLANNER_QUOTA_EXHAUSTED" ||
		value === "PLANNER_TIMEOUT" ||
		value === "PLANNER_UNAVAILABLE"
	);
}

function isNodeStatus(value: unknown): value is NodeStatus {
	return value === "blocked" || value === "failed" || value === "skipped" || value === "succeeded";
}

function isStringArray(value: unknown): value is string[] {
	return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isNonNegativeInteger(value: unknown): value is number {
	return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
