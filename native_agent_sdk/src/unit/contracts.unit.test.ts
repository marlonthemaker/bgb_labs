import { describe, expect, it } from "vitest";

import {
	isJsonValue,
	jsonValueLimits,
	parseSemanticContract,
	parseTaskGraph,
	type ToolExecutionResult,
} from "../contracts.js";

describe("HSD2-C-001: runtime contract parsing", () => {
	it("rejects non-object contract and graph input with stable root issues", () => {
		expect(parseSemanticContract("contract")).toMatchObject([
			{ code: "INVALID_CONTRACT", path: "$" },
		]);
		expect(parseTaskGraph(null)).toMatchObject([{ code: "INVALID_GRAPH", path: "$" }]);
	});

	it("accepts the minimum complete semantic contract", () => {
		const result = parseSemanticContract({
			id: "shoreline.service-request",
			version: "1",
			allowedTools: ["request_service"],
			prohibitedEffects: [],
			requiredConstraintIds: ["guest-request"],
		});

		expect(Array.isArray(result)).toBe(false);
	});

	it("rejects each malformed graph field with an INVALID_GRAPH issue", () => {
		const result = parseTaskGraph({
			id: "run-1",
			contractId: "shoreline.service-request",
			preservedConstraintIds: [],
			nodes: [
				{
					id: "service",
					toolName: "request_service",
					idempotencyKey: "run-1-service",
					dependsOn: [],
					constraintIds: [],
					input: "not-an-object",
				},
			],
		});

		expect(Array.isArray(result)).toBe(true);
		if (Array.isArray(result)) {
			expect(result).toContainEqual(
				expect.objectContaining({
					code: "INVALID_GRAPH",
					path: "nodes.0.input",
				}),
			);
		}
	});

	it("rejects a non-object task node", () => {
		const result = parseTaskGraph({
			id: "run-1",
			contractId: "shoreline.service-request",
			preservedConstraintIds: [],
			nodes: ["not-a-node"],
		});
		expect(result).toMatchObject([{ code: "INVALID_GRAPH", path: "nodes.0" }]);
	});

	it("rejects task input containing a non-JSON value", () => {
		const result = parseTaskGraph({
			id: "run-1",
			contractId: "shoreline.service-request",
			preservedConstraintIds: [],
			nodes: [
				{
					id: "service",
					toolName: "request_service",
					idempotencyKey: "run-1-service",
					dependsOn: [],
					constraintIds: [],
					input: { callback: () => undefined },
				},
			],
		});
		expect(result).toContainEqual(
			expect.objectContaining({ code: "INVALID_GRAPH", path: "nodes.0.input" }),
		);
	});
});

describe("SEC1-C-001: bounded JSON contract parsing", () => {
	it.each([Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
		"rejects the non-finite number %s",
		(value) => {
			expect(isJsonValue(value)).toBe(false);
			expect(parseTaskGraph(graphWithInput({ value }))).toContainEqual(
				expect.objectContaining({ code: "INVALID_GRAPH" }),
			);
		},
	);

	it("rejects cyclic input with a stable issue instead of recursing indefinitely", () => {
		const cyclic: Record<string, unknown> = {};
		cyclic.self = cyclic;

		expect(() => parseTaskGraph(graphWithInput(cyclic))).not.toThrow();
		expect(parseTaskGraph(graphWithInput(cyclic))).toContainEqual(
			expect.objectContaining({ code: "INVALID_GRAPH", path: "nodes.0.input" }),
		);
	});

	it("rejects input beyond the declared nesting boundary", () => {
		let input: Record<string, unknown> = {};
		for (let depth = 0; depth <= jsonValueLimits.maxDepth; depth += 1) {
			input = { next: input };
		}

		expect(parseTaskGraph(graphWithInput(input))).toContainEqual(
			expect.objectContaining({ code: "INVALID_GRAPH", path: "nodes.0.input" }),
		);
	});

	it("rejects input beyond the declared aggregate value boundary", () => {
		const input = {
			values: Array.from({ length: jsonValueLimits.maxValues + 1 }, () => null),
		};

		expect(parseTaskGraph(graphWithInput(input))).toContainEqual(
			expect.objectContaining({ code: "INVALID_GRAPH", path: "nodes.0.input" }),
		);
	});

	it("rejects aggregate strings beyond the declared boundary", () => {
		const input = { value: "x".repeat(jsonValueLimits.maxTotalStringLength + 1) };

		expect(parseTaskGraph(graphWithInput(input))).toContainEqual(
			expect.objectContaining({ code: "INVALID_GRAPH", path: "nodes.0.input" }),
		);
	});

	it("rejects a revoked proxy with a stable issue instead of leaking a trap error", () => {
		const revocable = Proxy.revocable({}, {});
		revocable.revoke();

		expect(() => parseTaskGraph(graphWithInput(revocable.proxy))).not.toThrow();
		expect(parseTaskGraph(graphWithInput(revocable.proxy))).toContainEqual(
			expect.objectContaining({ code: "INVALID_GRAPH", path: "nodes.0.input" }),
		);
	});
});

describe("SEC1-C-003: discriminated tool execution results", () => {
	it("represents success output and failure codes as mutually exclusive states", () => {
		const success: ToolExecutionResult = { ok: true, output: { accepted: true } };
		const failure: ToolExecutionResult = { ok: false, errorCode: "REJECTED" };

		expect(success.ok).toBe(true);
		expect(failure.ok).toBe(false);

		// @ts-expect-error A successful tool result cannot carry a failure code.
		const contradictorySuccess: ToolExecutionResult = { ok: true, errorCode: "REJECTED" };
		// @ts-expect-error A failed tool result cannot expose an output as completed evidence.
		const contradictoryFailure: ToolExecutionResult = { ok: false, output: { accepted: true } };
		expect([contradictorySuccess, contradictoryFailure]).toHaveLength(2);
	});
});

function graphWithInput(input: unknown) {
	return {
		id: "run-1",
		contractId: "shoreline.service-request",
		preservedConstraintIds: [],
		nodes: [
			{
				id: "service",
				toolName: "request_service",
				idempotencyKey: "run-1-service",
				dependsOn: [],
				constraintIds: [],
				input,
			},
		],
	};
}
