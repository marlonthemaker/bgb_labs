import { describe, expect, it, vi } from "vitest";

import type { SemanticContract, TaskGraph, ToolRegistry } from "../contracts.js";
import { createExecutionLedger, executeTaskGraph } from "../executor.js";

const contract: SemanticContract = {
	id: "shoreline.compound",
	version: "1",
	allowedTools: ["lookup", "service"],
	prohibitedEffects: [],
	requiredConstraintIds: ["room", "service-request"],
};
const graph: TaskGraph = {
	id: "run-1",
	contractId: contract.id,
	preservedConstraintIds: ["room", "service-request"],
	nodes: [
		{
			id: "lookup",
			toolName: "lookup",
			input: { reservationId: "R104" },
			dependsOn: [],
			constraintIds: ["room"],
			idempotencyKey: "run-1-lookup",
		},
		{
			id: "service",
			toolName: "service",
			input: { room: 204 },
			dependsOn: ["lookup"],
			constraintIds: ["service-request"],
			idempotencyKey: "run-1-service",
		},
		{
			id: "follow-up",
			toolName: "service",
			input: {},
			dependsOn: ["service"],
			constraintIds: [],
			idempotencyKey: "run-1-follow-up",
		},
	],
};

describe("HSD2-C-003 and HSD2-C-004: deterministic execution", () => {
	it("executes a successful plan in graph order and preserves tool inputs", async () => {
		const calls: string[] = [];
		const tools: ToolRegistry = {
			lookup: {
				name: "lookup",
				effect: "hotel.lookup",
				execute: async ({ input }) => {
					calls.push(`lookup:${input.reservationId}`);
					return { ok: true, output: { room: 204 } };
				},
			},
			service: {
				name: "service",
				effect: "hotel.service",
				execute: async ({ nodeId }) => {
					calls.push(nodeId);
					return { ok: true };
				},
			},
		};

		const result = await executeTaskGraph({
			contract,
			graph,
			tools,
			runId: "run-1",
		});

		expect(result.status).toBe("succeeded");
		expect(calls).toEqual(["lookup:R104", "service", "follow-up"]);
		expect(result.events.map((event) => event.sequence)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
	});

	it("blocks direct dependents, skips downstream work, and replays an idempotent retry", async () => {
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

		expect(first.nodeResults.map((node) => node.status)).toEqual(["failed", "blocked", "skipped"]);
		expect(lookup).toHaveBeenCalledTimes(1);
		expect(service).not.toHaveBeenCalled();
		expect(retry.events.map((event) => event.type)).toContain("node.replayed");
	});

	it("fails closed before calling tools when validation fails", async () => {
		const lookup = vi.fn(async () => ({ ok: true as const }));
		const result = await executeTaskGraph({
			contract,
			graph: { ...graph, contractId: "wrong-contract" },
			tools: {
				lookup: { name: "lookup", effect: "hotel.lookup", execute: lookup },
			},
			runId: "run-1",
		});
		expect(result.events.map((event) => event.type)).toEqual(["run.rejected"]);
		expect(lookup).not.toHaveBeenCalled();
	});

	it("converts a thrown tool error into recorded deterministic failure", async () => {
		const result = await executeTaskGraph({
			contract: { ...contract, requiredConstraintIds: ["room"] },
			graph: { ...graph, nodes: [graph.nodes[0]] },
			tools: {
				lookup: {
					name: "lookup",
					effect: "hotel.lookup",
					execute: async () => {
						throw new Error("unavailable");
					},
				},
			},
			runId: "run-1",
		});
		expect(result.nodeResults).toEqual([
			expect.objectContaining({
				status: "failed",
				errorCode: "TOOL_EXECUTION_ERROR",
			}),
		]);
	});

	it("rejects a tool registry that becomes incomplete instead of throwing", async () => {
		const mutableTools: Record<string, ToolRegistry[string]> = {
			lookup: { name: "lookup", effect: "hotel.lookup", execute: async () => ({ ok: true }) },
		};
		const result = await executeTaskGraph({
			contract: { ...contract, requiredConstraintIds: ["room"] },
			graph: { ...graph, nodes: [graph.nodes[0]] },
			tools: mutableTools,
			runId: "run-1",
		});
		delete mutableTools.lookup;
		const replay = await executeTaskGraph({
			contract: { ...contract, requiredConstraintIds: ["room"] },
			graph: { ...graph, nodes: [graph.nodes[0]] },
			tools: mutableTools,
			runId: "run-2",
		});
		expect(result.status).toBe("succeeded");
		expect(replay.events).toEqual([expect.objectContaining({ type: "run.rejected" })]);
	});
});
