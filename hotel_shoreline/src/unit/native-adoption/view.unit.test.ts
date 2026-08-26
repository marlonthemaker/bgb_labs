import { describe, expect, it } from "vitest";

import { GeminiPlannerError } from "../../lib/gemini-error";
import {
	type ComparisonPlanner,
	DeterministicComparisonPlanner,
	executeMatchedComparison,
} from "../../lib/native-adoption/orchestrator";
import { parseComparisonView, projectComparisonView } from "../../lib/native-adoption/view";

describe("HSD-005 public comparison evidence", () => {
	it("HSD5-UI-001: projects inspectable evidence without exposing SDK run internals", async () => {
		const internal = await executeMatchedComparison({
			caseId: "conditional-safety",
			locale: "es-ES",
			planner: new DeterministicComparisonPlanner(),
			idFactory: () => "public-projection",
		});
		const view = projectComparisonView(internal);
		expect(parseComparisonView(view)).toEqual(view);
		expect(view.arms).toHaveLength(2);
		expect(view.arms[0]?.validationIssues).toContainEqual({
			code: "PROHIBITED_EFFECT",
			path: "nodes.premature-relocation.toolName",
		});
		expect(view.arms[1]?.measures).toHaveLength(7);
		expect(JSON.stringify(view)).not.toContain('"run":');
		expect(JSON.stringify(view)).not.toContain('"nodeResults":');
	});

	it("HSD5-UI-001: rejects malformed, incoherent, or reordered arm payloads", async () => {
		const internal = await executeMatchedComparison({
			caseId: "compound-recovery",
			locale: "en",
			planner: new DeterministicComparisonPlanner(),
			idFactory: () => "parser",
		});
		const view = projectComparisonView(internal);
		expect(parseComparisonView({ ...view, arms: [...view.arms].reverse() })).toBeUndefined();
		expect(parseComparisonView({ ...view, case: { ...view.case, turns: [] } })).toBeUndefined();
		expect(parseComparisonView({ ...view, arms: [{ status: "succeeded" }] })).toBeUndefined();
	});

	it("HSD5-UI-001/HSD5-E-003: projects sanitized arm failure codes", async () => {
		const deterministic = new DeterministicComparisonPlanner();
		const planner: ComparisonPlanner = {
			configuration: deterministic.configuration,
			plan: async () => {
				throw new GeminiPlannerError("PLANNER_QUOTA_EXHAUSTED");
			},
		};
		const view = projectComparisonView(
			await executeMatchedComparison({
				caseId: "compound-recovery",
				locale: "en",
				planner,
				idFactory: () => "quota-view",
			}),
		);
		expect(view.arms.map(({ errorCode }) => errorCode)).toEqual([
			"PLANNER_QUOTA_EXHAUSTED",
			"PLANNER_QUOTA_EXHAUSTED",
		]);
		expect(JSON.stringify(view)).not.toContain("provider detail");
	});
});
