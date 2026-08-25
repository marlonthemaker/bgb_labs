import { describe, expect, it } from "vitest";

import { parseRunView } from "../lib/taskmaster-view";

const successfulApiRun = {
	status: "succeeded",
	planner: { framework: "deterministic", model: "frozen-hsd-003-graph" },
	planning: {
		budget: { timeoutMs: 2_000, maxTurns: 1, maxOutputTokens: 1_024, maxNodes: 4 },
		usage: { turns: 1 },
	},
	lifecycle: [
		"event.received",
		"planning.started",
		"planning.finished",
		"validation.started",
		"validation.finished",
		"execution.finished",
	],
	operationCount: 2,
	candidateGraph: {
		preservedConstraintIds: ["room-204", "two-extra-towels", "no-charge"],
		nodes: [
			{
				id: "request-maintenance",
				toolName: "request_maintenance",
				input: { roomNumber: "204" },
			},
		],
	},
	run: {
		nodeResults: [{ nodeId: "request-maintenance", status: "succeeded", output: "private" }],
	},
	serverOnlyDetail: "must-not-cross-the-view-boundary",
};

describe("HSD-004 public run evidence parser", () => {
	it("HSD4-UI-001: projects only the candidate, lifecycle, budget, and outcome fields the UI uses", () => {
		const view = parseRunView(successfulApiRun);

		expect(view).toEqual({
			status: "succeeded",
			plannerFramework: "deterministic",
			plannerModel: "frozen-hsd-003-graph",
			lifecycle: [
				"event.received",
				"planning.started",
				"planning.finished",
				"validation.started",
				"validation.finished",
				"execution.finished",
			],
			operationCount: 2,
			candidateGraph: {
				preservedConstraintIds: ["room-204", "two-extra-towels", "no-charge"],
				nodes: [{ id: "request-maintenance", toolName: "request_maintenance" }],
			},
			nodeResults: [{ nodeId: "request-maintenance", status: "succeeded" }],
			budget: { timeoutMs: 2_000, maxTurns: 1, maxOutputTokens: 1_024, maxNodes: 4 },
			usage: { turns: 1 },
		});
		expect(view).not.toHaveProperty("serverOnlyDetail");
		expect(view?.candidateGraph?.nodes[0]).not.toHaveProperty("input");
		expect(view?.nodeResults[0]).not.toHaveProperty("output");
	});

	it("HSD4-UI-001: accepts a typed planning failure with no candidate or execution result", () => {
		const view = parseRunView({
			...successfulApiRun,
			status: "planning_failed",
			errorCode: "PLANNER_TIMEOUT",
			operationCount: 0,
			candidateGraph: undefined,
			run: undefined,
			planning: { budget: successfulApiRun.planning.budget },
			lifecycle: ["event.received", "planning.started", "planning.failed"],
		});

		expect(view).toMatchObject({
			status: "planning_failed",
			errorCode: "PLANNER_TIMEOUT",
			operationCount: 0,
			nodeResults: [],
		});
		expect(view).not.toHaveProperty("candidateGraph");
		expect(view).not.toHaveProperty("usage");
	});

	it.each([
		{ label: "non-object response", value: null },
		{ label: "unknown terminal status", value: { ...successfulApiRun, status: "complete" } },
		{
			label: "invalid candidate node",
			value: {
				...successfulApiRun,
				candidateGraph: {
					...successfulApiRun.candidateGraph,
					nodes: [{ id: "missing-tool-name" }],
				},
			},
		},
		{
			label: "negative operation count",
			value: { ...successfulApiRun, operationCount: -1 },
		},
		{
			label: "incoherent successful outcome",
			value: { ...successfulApiRun, operationCount: 0 },
		},
		{
			label: "unknown lifecycle event",
			value: { ...successfulApiRun, lifecycle: ["model.private-reasoning"] },
		},
	])("HSD4-UI-001: rejects a $label rather than rendering untrusted evidence", ({ value }) => {
		expect(parseRunView(value)).toBeUndefined();
	});
});
