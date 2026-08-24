import { describe, expect, it } from "vitest";

import { parseSemanticContract, parseTaskGraph } from "../contracts.js";

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
