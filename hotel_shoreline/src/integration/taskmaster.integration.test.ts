import { describe, expect, it } from "vitest";

import { shorelineGraph } from "../lib/shoreline";
import { DeterministicTaskPlanner, executeGuestRequest, type TaskPlanner } from "../lib/taskmaster";

describe("HSD-004 Taskmaster event orchestration", () => {
	it("HSD4-P-002: routes one guest-request event through planning, validation, and execution", async () => {
		const result = await executeGuestRequest({ planner: new DeterministicTaskPlanner() });

		expect(result.status).toBe("succeeded");
		expect(result.operationCount).toBe(2);
		expect(result.lifecycle).toEqual([
			"event.received",
			"planning.started",
			"planning.finished",
			"validation.started",
			"validation.finished",
			"execution.finished",
		]);
	});

	it("HSD4-P-003: rejects unsafe planner output before a tool can run", async () => {
		const firstNode = shorelineGraph.nodes[0];
		if (!firstNode) throw new Error("The frozen task graph must contain a maintenance node.");
		const unsafePlanner: TaskPlanner = {
			metadata: { framework: "deterministic", model: "unsafe-test" },
			plan: async () => ({
				...shorelineGraph,
				nodes: [{ ...firstNode, toolName: "charge_guest" }],
			}),
		};
		const result = await executeGuestRequest({ planner: unsafePlanner });

		expect(result.status).toBe("rejected");
		expect(result.operationCount).toBe(0);
		expect(result.run?.validation.ok).toBe(false);
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
	});
});
