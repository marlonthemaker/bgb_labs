import { describe, expect, it } from "vitest";

import type { SemanticContract, TaskGraph, ToolRegistry } from "../contracts.js";
import { validateTaskGraph } from "../validation.js";

const contract: SemanticContract = {
	id: "shoreline.service-request",
	version: "1",
	allowedTools: ["request_service"],
	prohibitedEffects: ["guest.charge"],
	requiredConstraintIds: ["guest-request"],
};

const tools: ToolRegistry = {
	request_service: {
		name: "request_service",
		effect: "hotel.service.request",
		execute: async () => ({ ok: true }),
	},
	charge_guest: {
		name: "charge_guest",
		effect: "guest.charge",
		execute: async () => ({ ok: true }),
	},
};

function validGraph(): TaskGraph {
	return {
		id: "run-1",
		contractId: contract.id,
		preservedConstraintIds: ["guest-request"],
		nodes: [
			{
				id: "service",
				toolName: "request_service",
				input: {},
				dependsOn: [],
				constraintIds: ["guest-request"],
				idempotencyKey: "run-1-service",
			},
		],
	};
}

describe("HSD2-C-002: task graph validation", () => {
	it("accepts a graph that stays inside the semantic contract", () => {
		expect(validateTaskGraph({ contract, graph: validGraph(), tools })).toEqual({
			ok: true,
			issues: [],
		});
	});

	it.each([
		[
			"unknown dependency",
			{
				...validGraph(),
				nodes: [{ ...validGraph().nodes[0], dependsOn: ["missing"] }],
			},
			"UNKNOWN_DEPENDENCY",
		],
		[
			"disallowed prohibited effect",
			{
				...validGraph(),
				nodes: [{ ...validGraph().nodes[0], toolName: "charge_guest" }],
			},
			"TOOL_NOT_ALLOWED",
		],
		[
			"missing constraint",
			{ ...validGraph(), preservedConstraintIds: [] },
			"MISSING_REQUIRED_CONSTRAINT",
		],
		[
			"cycle",
			{
				...validGraph(),
				nodes: [{ ...validGraph().nodes[0], dependsOn: ["service"] }],
			},
			"CYCLE_DETECTED",
		],
	] as const)("rejects %s", (_label, graph, code) => {
		const result = validateTaskGraph({ contract, graph, tools });
		expect(result).toMatchObject({ ok: false });
		if (!result.ok) expect(result.issues.map((issue) => issue.code)).toContain(code);
	});

	it("rejects malformed inputs, identity mismatch, duplicate keys, and unknown tools", () => {
		const malformed = validateTaskGraph({ contract: null, graph: null, tools });
		expect(malformed).toMatchObject({ ok: false });

		const duplicate = validGraph();
		const result = validateTaskGraph({
			contract,
			tools,
			graph: {
				...duplicate,
				contractId: "other-contract",
				nodes: [...duplicate.nodes, { ...duplicate.nodes[0], toolName: "missing_tool" }],
			},
		});
		if (!result.ok) {
			expect(result.issues.map((issue) => issue.code)).toEqual(
				expect.arrayContaining([
					"DUPLICATE_IDEMPOTENCY_KEY",
					"DUPLICATE_NODE_ID",
					"INVALID_GRAPH",
					"UNKNOWN_TOOL",
				]),
			);
		}
	});

	it("rejects a graph that declares but does not assign a required constraint", () => {
		const result = validateTaskGraph({
			contract,
			tools,
			graph: {
				...validGraph(),
				nodes: [{ ...validGraph().nodes[0], constraintIds: [] }],
			},
		});
		expect(result).toMatchObject({ ok: false });
		if (!result.ok) {
			expect(result.issues).toContainEqual(
				expect.objectContaining({
					code: "MISSING_REQUIRED_CONSTRAINT",
					path: "nodes",
				}),
			);
		}
	});

	it("rejects a malformed runtime tool registry without throwing", () => {
		const result = validateTaskGraph({
			contract,
			graph: validGraph(),
			tools: null as unknown as ToolRegistry,
		});
		expect(result).toMatchObject({ ok: false, issues: [{ path: "tools" }] });
	});
});

describe("SEC1-C-002: tool registry identity", () => {
	it("rejects a registry key whose declared tool name does not match", () => {
		const result = validateTaskGraph({
			contract,
			graph: validGraph(),
			tools: {
				request_service: {
					name: "different_service",
					effect: "hotel.service.request",
					execute: async () => ({ ok: true }),
				},
			},
		});

		expect(result).toMatchObject({ ok: false });
		if (!result.ok) {
			expect(result.issues).toContainEqual({
				code: "TOOL_IDENTITY_MISMATCH",
				path: "nodes.service.toolName",
				message: "Registry key request_service must match declared tool name different_service.",
			});
		}
	});
});
