import { describe, expect, it, vi } from "vitest";
import {
	createExecutionLedger,
	executeTaskGraph,
	parseTaskGraph,
	validateTaskGraph,
	type SemanticContract,
	type TaskGraph,
	type ToolRegistry,
} from "./index.js";

const contract: SemanticContract = {
	id: "shoreline.service",
	version: "1",
	allowedTools: ["lookup", "service"],
	prohibitedEffects: ["guest.charge"],
	requiredConstraintIds: ["room"],
};
const graph: TaskGraph = {
	id: "run-1",
	contractId: "shoreline.service",
	preservedConstraintIds: ["room"],
	nodes: [
		{
			id: "lookup",
			toolName: "lookup",
			input: {},
			dependsOn: [],
			constraintIds: ["room"],
			idempotencyKey: "run-1-lookup",
		},
		{
			id: "service",
			toolName: "service",
			input: {},
			dependsOn: ["lookup"],
			constraintIds: [],
			idempotencyKey: "run-1-service",
		},
	],
};

describe("Native Agent core", () => {
	it("rejects malformed graph input", () => {
		const result = parseTaskGraph({});
		expect(Array.isArray(result)).toBe(true);
		if (Array.isArray(result)) {
			expect(result[0]).toMatchObject({ code: "INVALID_GRAPH" });
		}
	});
	it("rejects cyclic unsafe incomplete graphs", () => {
		const tools: ToolRegistry = {
			charge: {
				name: "charge",
				effect: "guest.charge",
				execute: async () => ({ ok: true }),
			},
		};
		const result = validateTaskGraph({
			contract,
			tools,
			graph: {
				...graph,
				preservedConstraintIds: [],
				nodes: [
					{ ...graph.nodes[0], toolName: "charge", dependsOn: ["lookup"] },
					{ ...graph.nodes[1], dependsOn: ["lookup"] },
				],
			},
		});
		expect(result.ok).toBe(false);
		if (!result.ok)
			expect(result.issues.map((issue) => issue.code)).toEqual(
				expect.arrayContaining([
					"CYCLE_DETECTED",
					"MISSING_REQUIRED_CONSTRAINT",
					"PROHIBITED_EFFECT",
					"TOOL_NOT_ALLOWED",
				]),
			);
	});
	it("blocks dependent work after failure and replays from the run ledger", async () => {
		const lookup = vi.fn(async () => ({
			ok: false as const,
			errorCode: "NOT_FOUND",
		}));
		const service = vi.fn(async () => ({ ok: true as const }));
		const tools: ToolRegistry = {
			lookup: { name: "lookup", effect: "hotel.lookup", execute: lookup },
			service: { name: "service", effect: "hotel.service", execute: service },
		};
		const ledger = createExecutionLedger();
		const first = await executeTaskGraph({
			contract,
			graph,
			tools,
			runId: "run-1",
			ledger,
		});
		const retry = await executeTaskGraph({
			contract,
			graph,
			tools,
			runId: "run-1",
			ledger,
		});
		expect(first.nodeResults.map((node) => node.status)).toEqual([
			"failed",
			"blocked",
		]);
		expect(first.events.map((event) => event.type)).toEqual([
			"run.accepted",
			"node.started",
			"node.finished",
			"node.blocked",
			"run.finished",
		]);
		expect(lookup).toHaveBeenCalledTimes(1);
		expect(service).not.toHaveBeenCalled();
		expect(retry.events.some((event) => event.type === "node.replayed")).toBe(
			true,
		);
	});
});
