import {
	createExecutionLedger,
	executeTaskGraph,
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
	plan(event: GuestRequestReceived): Promise<unknown>;
}

export interface TaskmasterRun {
	readonly eventId: string;
	readonly fixtureVersion: string;
	readonly planner: TaskPlanner["metadata"];
	readonly lifecycle: readonly string[];
	readonly status: "planning_failed" | "rejected" | "succeeded" | "partial_failure" | "failed";
	readonly run?: RunResult;
	readonly errorCode?: "PLANNER_INVALID_OUTPUT" | "PLANNER_TIMEOUT" | "PLANNER_UNAVAILABLE";
	readonly operationCount: number;
}

export class DeterministicTaskPlanner implements TaskPlanner {
	readonly metadata = { framework: "deterministic" as const, model: "frozen-hsd-003-graph" };

	async plan(_event: GuestRequestReceived): Promise<unknown> {
		return shorelineGraph;
	}
}

export async function executeGuestRequest(input: {
	readonly planner: TaskPlanner;
	readonly timeoutMs?: number;
	readonly event?: GuestRequestReceived;
}): Promise<TaskmasterRun> {
	const event = input.event ?? shorelineGuestRequest;
	const lifecycle = ["event.received", "planning.started"];
	let graph: TaskGraph | unknown;
	try {
		graph = await withinTimeout(input.planner.plan(event), input.timeoutMs ?? 2_000);
	} catch (error) {
		lifecycle.push("planning.failed");
		return {
			eventId: event.eventId,
			fixtureVersion: shorelineFixture.version,
			planner: input.planner.metadata,
			lifecycle,
			status: "planning_failed",
			errorCode: error instanceof PlannerTimeoutError ? "PLANNER_TIMEOUT" : "PLANNER_UNAVAILABLE",
			operationCount: 0,
		};
	}
	if (!graph || typeof graph !== "object") {
		lifecycle.push("planning.failed");
		return {
			eventId: event.eventId,
			fixtureVersion: shorelineFixture.version,
			planner: input.planner.metadata,
			lifecycle,
			status: "planning_failed",
			errorCode: "PLANNER_INVALID_OUTPUT",
			operationCount: 0,
		};
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
		lifecycle,
		status: run.validation.ok ? run.status : "rejected",
		run,
		operationCount: shorelineTools.getState().operations.length,
	};
}

class PlannerTimeoutError extends Error {}

async function withinTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
	let timeout: ReturnType<typeof setTimeout> | undefined;
	try {
		return await Promise.race([
			promise,
			new Promise<T>((_resolve, reject) => {
				timeout = setTimeout(() => reject(new PlannerTimeoutError()), timeoutMs);
			}),
		]);
	} finally {
		if (timeout) clearTimeout(timeout);
	}
}
