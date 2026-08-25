import { describe, expect, it } from "vitest";

import { shorelineGraph } from "../lib/shoreline";
import {
	DeterministicTaskPlanner,
	executeGuestRequest,
	type PlanningOutput,
	type PlanningUsage,
	type TaskPlanner,
	taskmasterPlanningBudget,
} from "../lib/taskmaster";

const planner = (graph: unknown, usage: PlanningUsage = { turns: 1 }): TaskPlanner => ({
	metadata: { framework: "deterministic", model: "integration-test" },
	plan: async () => ({ graph, usage }),
});

describe("HSD-004 Taskmaster event orchestration", () => {
	it("HSD4-P-002: routes one guest-request event through planning, validation, and execution", async () => {
		const result = await executeGuestRequest({ planner: new DeterministicTaskPlanner() });

		expect(result.status).toBe("succeeded");
		expect(result.operationCount).toBe(2);
		expect(result.candidateGraph).toEqual(shorelineGraph);
		expect(result.planning).toEqual({
			budget: taskmasterPlanningBudget,
			usage: { turns: 1 },
		});
		expect(result.lifecycle).toEqual([
			"event.received",
			"planning.started",
			"planning.finished",
			"validation.started",
			"validation.finished",
			"execution.finished",
		]);
	});

	it("HSD4-P-003/HSD4-P-004: rejects an unsafe candidate through the SDK before a tool can run", async () => {
		const firstNode = shorelineGraph.nodes[0];
		if (!firstNode) throw new Error("The frozen task graph must contain a maintenance node.");
		const unsafeGraph = {
			...shorelineGraph,
			nodes: [{ ...firstNode, toolName: "charge_guest" }],
		};
		const unsafePlanner = planner(unsafeGraph);
		const result = await executeGuestRequest({ planner: unsafePlanner });

		expect(result.status).toBe("rejected");
		expect(result.operationCount).toBe(0);
		expect(result.candidateGraph).toEqual(unsafeGraph);
		expect(result.run?.validation.ok).toBe(false);
		expect(result.lifecycle).toContain("validation.failed");
	});

	it("HSD4-P-003: represents unavailable planning without tool execution", async () => {
		const unavailablePlanner: TaskPlanner = {
			metadata: { framework: "deterministic", model: "unavailable-test" },
			plan: async () => Promise.reject(new Error("network unavailable")),
		};
		const result = await executeGuestRequest({ planner: unavailablePlanner });

		expect(result).toMatchObject({
			status: "planning_failed",
			errorCode: "PLANNER_UNAVAILABLE",
			operationCount: 0,
		});
		expect(result.lifecycle).toEqual(["event.received", "planning.started", "planning.failed"]);
		expect(result).not.toHaveProperty("candidateGraph");
	});

	it("HSD4-P-003: classifies malformed structured graph output and invokes no tool", async () => {
		const result = await executeGuestRequest({
			planner: planner({ id: "missing-required-fields" }),
		});

		expect(result).toMatchObject({
			status: "planning_failed",
			errorCode: "PLANNER_INVALID_OUTPUT",
			operationCount: 0,
		});
		expect(result.lifecycle).toEqual(["event.received", "planning.started", "planning.failed"]);
		expect(result).not.toHaveProperty("candidateGraph");
	});

	it("HSD4-P-003: classifies a malformed planner envelope and invokes no tool", async () => {
		const malformedPlanner: TaskPlanner = {
			metadata: { framework: "deterministic", model: "malformed-envelope-test" },
			plan: async () => null as unknown as PlanningOutput,
		};
		const result = await executeGuestRequest({ planner: malformedPlanner });

		expect(result).toMatchObject({
			status: "planning_failed",
			errorCode: "PLANNER_INVALID_OUTPUT",
			operationCount: 0,
		});
		expect(result.planning).not.toHaveProperty("usage");
	});

	it("HSD4-P-003: converts planner timeout to a typed zero-operation failure", async () => {
		let planningSignal: AbortSignal | undefined;
		const timedOutPlanner: TaskPlanner = {
			metadata: { framework: "deterministic", model: "timeout-test" },
			plan: async (_event, context) => {
				planningSignal = context.signal;
				return new Promise<PlanningOutput>((_resolve, reject) => {
					context.signal.addEventListener(
						"abort",
						() => reject(new Error("provider request aborted")),
						{ once: true },
					);
				});
			},
		};
		const result = await executeGuestRequest({
			planner: timedOutPlanner,
			budget: { ...taskmasterPlanningBudget, timeoutMs: 5 },
		});

		expect(result).toMatchObject({
			status: "planning_failed",
			errorCode: "PLANNER_TIMEOUT",
			operationCount: 0,
		});
		expect(result.lifecycle.at(-1)).toBe("planning.failed");
		expect(planningSignal?.aborted).toBe(true);
	});

	it.each([
		{ label: "turn", usage: { turns: 2 }, graph: shorelineGraph },
		{
			label: "output-token",
			usage: { turns: 1, outputTokens: taskmasterPlanningBudget.maxOutputTokens + 1 },
			graph: shorelineGraph,
		},
		{
			label: "node-count",
			usage: { turns: 1 },
			graph: {
				...shorelineGraph,
				nodes: Array.from({ length: taskmasterPlanningBudget.maxNodes + 1 }, (_, index) => {
					const source = shorelineGraph.nodes[index % shorelineGraph.nodes.length];
					if (!source) throw new Error("The frozen graph must contain task nodes.");
					return {
						...source,
						id: `budget-node-${index}`,
						idempotencyKey: `budget-node-${index}`,
					};
				}),
			},
		},
	])(
		"HSD4-P-003: rejects a $label budget breach before tool execution",
		async ({ graph, usage }) => {
			const result = await executeGuestRequest({ planner: planner(graph, usage) });

			expect(result).toMatchObject({
				status: "planning_failed",
				errorCode: "PLANNER_BUDGET_EXCEEDED",
				operationCount: 0,
			});
			expect(result.lifecycle.at(-1)).toBe("planning.failed");
			expect(result).not.toHaveProperty("candidateGraph");
		},
	);

	it("HSD4-P-003: rejects malformed usage evidence before tool execution", async () => {
		const malformedUsagePlanner: TaskPlanner = {
			metadata: { framework: "deterministic", model: "malformed-usage-test" },
			plan: async () => ({
				graph: shorelineGraph,
				usage: { turns: Number.NaN },
			}),
		};
		const result = await executeGuestRequest({ planner: malformedUsagePlanner });

		expect(result).toMatchObject({
			status: "planning_failed",
			errorCode: "PLANNER_INVALID_OUTPUT",
			operationCount: 0,
		});
	});
});
