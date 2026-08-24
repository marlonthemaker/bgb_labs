import { describe, expect, it } from "vitest";

import {
	createShorelineTools,
	executeShorelineDemo,
	shorelineContract,
	shorelineFixture,
	shorelineGraph,
} from "../lib/shoreline";

describe("HSD-003 deterministic Hotel Shoreline vertical slice", () => {
	it("HSD3-F-003: validates the frozen contract and graph before execution", async () => {
		const shorelineTools = createShorelineTools();
		const run = await executeShorelineDemo();

		expect(run.run.validation).toEqual({ ok: true, issues: [] });
		expect(shorelineContract.allowedTools).toEqual(["request_maintenance", "request_housekeeping"]);
		expect(shorelineGraph.preservedConstraintIds).toEqual(shorelineContract.requiredConstraintIds);
		expect(shorelineTools.getState().operations).toEqual([]);
	});

	it("HSD3-T-002: executes each requested operation in graph order with exact inputs", async () => {
		const run = await executeShorelineDemo();

		expect(run.run.status).toBe("succeeded");
		expect(run.run.nodeResults).toEqual([
			{
				nodeId: "request-maintenance",
				status: "succeeded",
				output: { status: "maintenance-requested", roomNumber: "204" },
			},
			{
				nodeId: "request-housekeeping",
				status: "succeeded",
				output: {
					status: "housekeeping-requested",
					roomNumber: "204",
					extraTowelCount: 2,
				},
			},
		]);
		expect(run.finalState.operations).toEqual([
			{ operation: "maintenance", roomNumber: shorelineFixture.roomNumber },
			{ operation: "housekeeping", roomNumber: shorelineFixture.roomNumber },
		]);
		expect(run.run.events.map((event) => event.type)).toEqual([
			"run.accepted",
			"node.started",
			"node.finished",
			"node.started",
			"node.finished",
			"run.finished",
		]);
	});
});
