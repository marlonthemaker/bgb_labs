import { describe, expect, it } from "vitest";

import { projectPublicEvidenceExport } from "../../lib/evidence-ledger/export";
import { createComparisonEvidenceRecord } from "../../lib/evidence-ledger/records";
import { GeminiPlannerError } from "../../lib/gemini-error";
import {
	type ComparisonPlanner,
	DeterministicComparisonPlanner,
	executeMatchedComparison,
} from "../../lib/native-adoption/orchestrator";
import { parseComparisonView } from "../../lib/native-adoption/view";

describe("HSD-005 public comparison evidence", () => {
	it("HSD5-UI-001: projects inspectable evidence without exposing SDK run internals", async () => {
		const internal = await executeMatchedComparison({
			caseId: "conditional-safety",
			locale: "es-ES",
			planner: new DeterministicComparisonPlanner(),
			idFactory: () => "public-projection",
		});
		const view = projectView(internal);
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
		const view = projectView(internal);
		expect(parseComparisonView({ ...view, arms: [...view.arms].reverse() })).toBeUndefined();
		expect(parseComparisonView({ ...view, case: { ...view.case, turns: [] } })).toBeUndefined();
		expect(parseComparisonView({ ...view, arms: [{ status: "succeeded" }] })).toBeUndefined();
		expect(
			parseComparisonView({
				...view,
				arms: view.arms.map((arm, index) =>
					index === 0
						? {
								...arm,
								candidateNodes: arm.candidateNodes.map((node, nodeIndex) =>
									nodeIndex === 0 ? { ...node, input: { invalid: Number.NaN } } : node,
								),
							}
						: arm,
				),
			}),
		).toBeUndefined();
	});

	it("HSD5-UI-001/HSD5-E-003: projects sanitized arm failure codes", async () => {
		const deterministic = new DeterministicComparisonPlanner();
		const planner: ComparisonPlanner = {
			configuration: deterministic.configuration,
			plan: async () => {
				throw new GeminiPlannerError("PLANNER_QUOTA_EXHAUSTED");
			},
		};
		const view = projectView(
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

function projectView(run: Awaited<ReturnType<typeof executeMatchedComparison>>) {
	return projectPublicEvidenceExport(
		createComparisonEvidenceRecord(run, { recordedAt: "2026-08-27T12:00:00.000Z" }),
	).comparison;
}
