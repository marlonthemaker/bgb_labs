import {
	createExecutionLedger,
	executeTaskGraph,
	isRecord,
	parseTaskGraph,
	type RunResult,
	type TaskGraph,
} from "@bomgoodbueno/native-agent-sdk";

import {
	createShorelineTools,
	shorelineContract,
	shorelineFixture,
	shorelineGraph,
} from "./shoreline";

export interface GuestRequestReceived {
	readonly eventId: "shoreline-guest-request-204-v1";
	readonly request: string;
}

export const shorelineGuestRequest: GuestRequestReceived = {
	eventId: "shoreline-guest-request-204-v1",
	request: "The hot water in room 204 is not working. Please send two extra towels as well.",
};

export interface TaskPlanner {
	readonly metadata: { readonly framework: "genkit" | "deterministic"; readonly model: string };
	plan(event: GuestRequestReceived, context: PlanningContext): Promise<PlanningOutput>;
}

export interface PlanningContext {
	readonly signal: AbortSignal;
}

export interface PlanningUsage {
	readonly turns: number;
	readonly outputTokens?: number;
}

export interface PlanningOutput {
	readonly graph: unknown;
	readonly usage: PlanningUsage;
}

export interface PlanningBudget {
	readonly timeoutMs: number;
	readonly maxTurns: number;
	readonly maxOutputTokens: number;
	readonly maxNodes: number;
}

export const taskmasterPlanningBudget: PlanningBudget = Object.freeze({
	timeoutMs: 2_000,
	maxTurns: 1,
	maxOutputTokens: 1_024,
	maxNodes: 4,
});

// Network-backed providers need a larger wall-clock allowance than the
// credential-free deterministic planner. The safety limits on turns, tokens,
// and nodes remain identical across both modes.
export const geminiTaskmasterPlanningBudget: PlanningBudget = Object.freeze({
	...taskmasterPlanningBudget,
	timeoutMs: 30_000,
});

export type TaskmasterLifecycleEvent =
	| "event.received"
	| "planning.started"
	| "planning.finished"
	| "planning.failed"
	| "validation.started"
	| "validation.finished"
	| "validation.failed"
	| "execution.finished";

export type TaskmasterErrorCode =
	| "PLANNER_BUDGET_EXCEEDED"
	| "PLANNER_INVALID_OUTPUT"
	| "PLANNER_TIMEOUT"
	| "PLANNER_UNAVAILABLE";

export type TaskmasterPlannerMode = "deterministic" | "gemini";

export interface TaskmasterRun {
	readonly eventId: string;
	readonly fixtureVersion: string;
	readonly planner: TaskPlanner["metadata"];
	readonly planning: {
		readonly budget: PlanningBudget;
		readonly usage?: PlanningUsage;
	};
	readonly lifecycle: readonly TaskmasterLifecycleEvent[];
	readonly status: "planning_failed" | "rejected" | "succeeded" | "partial_failure" | "failed";
	readonly candidateGraph?: TaskGraph;
	readonly run?: RunResult;
	readonly errorCode?: TaskmasterErrorCode;
	readonly operationCount: number;
}

export class DeterministicTaskPlanner implements TaskPlanner {
	readonly metadata = { framework: "deterministic" as const, model: "frozen-hsd-003-graph" };

	async plan(_event: GuestRequestReceived, _context: PlanningContext): Promise<PlanningOutput> {
		return { graph: shorelineGraph, usage: { turns: 1 } };
	}
}

export function resolveTaskmasterPlannerMode(value: string | undefined): TaskmasterPlannerMode {
	if (value === undefined || value === "deterministic") return "deterministic";
	if (value === "gemini") return "gemini";
	const error = new Error("HSD_PLANNER_MODE must be either deterministic or gemini.");
	error.name = "TaskmasterConfigurationError";
	throw error;
}

export async function executeGuestRequest(input: {
	readonly planner: TaskPlanner;
	readonly budget?: PlanningBudget;
	readonly event?: GuestRequestReceived;
}): Promise<TaskmasterRun> {
	const event = input.event ?? shorelineGuestRequest;
	const budget = input.budget ?? taskmasterPlanningBudget;
	const lifecycle: TaskmasterLifecycleEvent[] = ["event.received", "planning.started"];
	let output: PlanningOutput;
	const planningAbortController = new AbortController();
	try {
		output = await withinTimeout(
			input.planner.plan(event, { signal: planningAbortController.signal }),
			budget.timeoutMs,
			() => planningAbortController.abort(),
		);
	} catch (error) {
		lifecycle.push("planning.failed");
		return planningFailure({
			event,
			planner: input.planner,
			budget,
			lifecycle,
			errorCode: error instanceof PlannerTimeoutError ? "PLANNER_TIMEOUT" : "PLANNER_UNAVAILABLE",
		});
	}
	if (!isPlanningOutput(output)) {
		lifecycle.push("planning.failed");
		return planningFailure({
			event,
			planner: input.planner,
			budget,
			lifecycle,
			errorCode: "PLANNER_INVALID_OUTPUT",
		});
	}
	const graph = parseTaskGraph(output.graph);
	if (Array.isArray(graph)) {
		lifecycle.push("planning.failed");
		return planningFailure({
			event,
			planner: input.planner,
			budget,
			usage: output.usage,
			lifecycle,
			errorCode: "PLANNER_INVALID_OUTPUT",
		});
	}
	if (planningBudgetExceeded({ budget, graph, usage: output.usage })) {
		lifecycle.push("planning.failed");
		return planningFailure({
			event,
			planner: input.planner,
			budget,
			usage: output.usage,
			lifecycle,
			errorCode: "PLANNER_BUDGET_EXCEEDED",
		});
	}
	const shorelineTools = createShorelineTools();
	lifecycle.push("planning.finished", "validation.started");
	const run = await executeTaskGraph({
		contract: shorelineContract,
		graph,
		tools: shorelineTools.tools,
		runId: `taskmaster-${event.eventId}`,
		ledger: createExecutionLedger(),
	});
	lifecycle.push(run.validation.ok ? "validation.finished" : "validation.failed");
	if (run.validation.ok) lifecycle.push("execution.finished");
	return {
		eventId: event.eventId,
		fixtureVersion: shorelineFixture.version,
		planner: input.planner.metadata,
		planning: { budget, usage: output.usage },
		lifecycle,
		status: run.validation.ok ? run.status : "rejected",
		candidateGraph: graph,
		run,
		operationCount: shorelineTools.getState().operations.length,
	};
}

function planningFailure(input: {
	readonly event: GuestRequestReceived;
	readonly planner: TaskPlanner;
	readonly budget: PlanningBudget;
	readonly usage?: PlanningUsage;
	readonly lifecycle: readonly TaskmasterLifecycleEvent[];
	readonly errorCode: TaskmasterErrorCode;
}): TaskmasterRun {
	return {
		eventId: input.event.eventId,
		fixtureVersion: shorelineFixture.version,
		planner: input.planner.metadata,
		planning: input.usage ? { budget: input.budget, usage: input.usage } : { budget: input.budget },
		lifecycle: input.lifecycle,
		status: "planning_failed",
		errorCode: input.errorCode,
		operationCount: 0,
	};
}

function isPlanningOutput(value: unknown): value is PlanningOutput {
	if (!isRecord(value) || !isRecord(value.usage)) return false;
	const { outputTokens, turns } = value.usage;
	return (
		"graph" in value &&
		typeof turns === "number" &&
		Number.isSafeInteger(turns) &&
		turns > 0 &&
		(outputTokens === undefined ||
			(typeof outputTokens === "number" && Number.isSafeInteger(outputTokens) && outputTokens >= 0))
	);
}

function planningBudgetExceeded(input: {
	readonly budget: PlanningBudget;
	readonly graph: TaskGraph;
	readonly usage: PlanningUsage;
}): boolean {
	return (
		input.usage.turns > input.budget.maxTurns ||
		(input.usage.outputTokens !== undefined &&
			input.usage.outputTokens > input.budget.maxOutputTokens) ||
		input.graph.nodes.length > input.budget.maxNodes
	);
}

class PlannerTimeoutError extends Error {}

async function withinTimeout<T>(
	promise: Promise<T>,
	timeoutMs: number,
	onTimeout: () => void,
): Promise<T> {
	let timeout: ReturnType<typeof setTimeout> | undefined;
	try {
		return await Promise.race([
			promise,
			new Promise<T>((_resolve, reject) => {
				timeout = setTimeout(() => {
					reject(new PlannerTimeoutError());
					onTimeout();
				}, timeoutMs);
			}),
		]);
	} finally {
		if (timeout) clearTimeout(timeout);
	}
}
