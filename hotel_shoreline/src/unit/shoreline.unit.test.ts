import { describe, expect, it } from "vitest";

import { createShorelineTools, shorelineFixture } from "../lib/shoreline";

describe("HSD-003 deterministic Hotel Shoreline tools", () => {
	it("HSD3-F-001: creates isolated synthetic state for every tool factory", async () => {
		const first = createShorelineTools();
		const second = createShorelineTools();
		const maintenance = requireTool(first, "request_maintenance");

		await maintenance.execute({
			runId: "first-run",
			nodeId: "maintenance",
			idempotencyKey: "first-maintenance",
			input: { stayId: shorelineFixture.stayId, roomNumber: shorelineFixture.roomNumber },
		});

		expect(first.getState().operations).toEqual([{ operation: "maintenance", roomNumber: "204" }]);
		expect(second.getState().operations).toEqual([]);
	});

	it("HSD3-F-002: rejects invalid tool input without mutating fixture state", async () => {
		const shorelineTools = createShorelineTools();
		const housekeeping = requireTool(shorelineTools, "request_housekeeping");

		const result = await housekeeping.execute({
			runId: "invalid-run",
			nodeId: "housekeeping",
			idempotencyKey: "invalid-housekeeping",
			input: {
				stayId: shorelineFixture.stayId,
				roomNumber: shorelineFixture.roomNumber,
				extraTowelCount: 1,
			},
		});

		expect(result).toEqual({ ok: false, errorCode: "INVALID_TOWEL_QUANTITY" });
		expect(shorelineTools.getState().operations).toEqual([]);
	});

	it("HSD3-T-001: replays one adapter result without repeating an operation", async () => {
		const shorelineTools = createShorelineTools();
		const maintenance = requireTool(shorelineTools, "request_maintenance");
		const request = {
			runId: "replay-run",
			nodeId: "maintenance",
			idempotencyKey: "replay-maintenance",
			input: { stayId: shorelineFixture.stayId, roomNumber: shorelineFixture.roomNumber },
		};

		const first = await maintenance.execute(request);
		const replay = await maintenance.execute(request);

		expect(replay).toEqual(first);
		expect(shorelineTools.getState().operations).toHaveLength(1);
	});
});

function requireTool(
	shorelineTools: ReturnType<typeof createShorelineTools>,
	name: "request_housekeeping" | "request_maintenance",
) {
	const tool = shorelineTools.tools[name];
	if (!tool) throw new Error(`Missing expected tool ${name}.`);
	return tool;
}
