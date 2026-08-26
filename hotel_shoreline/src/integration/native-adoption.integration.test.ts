import { describe, expect, it } from "vitest";

import { GeminiPlannerError } from "../lib/gemini-error";
import { nativeAdoptionCases, nativeAdoptionLocales } from "../lib/native-adoption/cases";
import {
	type ComparisonPlanner,
	type ComparisonPlanningRequest,
	DeterministicComparisonPlanner,
	executeMatchedComparison,
} from "../lib/native-adoption/orchestrator";

describe("HSD-005 controlled native-adoption comparison", () => {
	it("HSD5-E-001/HSD5-E-003: runs all nine draft blocks as fresh matched pairs and excludes them from reviewed aggregates", async () => {
		for (const caseDefinition of nativeAdoptionCases) {
			for (const locale of nativeAdoptionLocales) {
				const comparison = await executeMatchedComparison({
					caseId: caseDefinition.id,
					locale,
					planner: new DeterministicComparisonPlanner(),
					idFactory: () => `${caseDefinition.id}-${locale}`,
				});
				expect(comparison.baseline.condition.sharedConfigurationHash).toBe(
					comparison.intervention.condition.sharedConfigurationHash,
				);
				expect(comparison.baseline.condition.conditionHash).not.toBe(
					comparison.intervention.condition.conditionHash,
				);
				expect(comparison.baseline.status).toBe("rejected");
				expect(comparison.baseline.operations).toEqual([]);
				expect(comparison.intervention.status).toBe("succeeded");
				expect(comparison.intervention.operations).toHaveLength(
					caseDefinition.expectedOutcome.tasks.length,
				);
				expect(comparison.pairEligibility).toEqual({
					eligible: false,
					reasons: ["PENDING_HUMAN_REVIEW"],
				});
			}
		}
	});

	it("HSD5-E-001: changes only the declared contract-guidance input between arms", async () => {
		const requests: ComparisonPlanningRequest[] = [];
		const delegate = new DeterministicComparisonPlanner();
		const planner: ComparisonPlanner = {
			configuration: delegate.configuration,
			plan: async (request, _context) => {
				requests.push(request);
				return delegate.plan(request);
			},
		};
		await executeMatchedComparison({
			caseId: "corrective-change",
			locale: "pt-PT",
			planner,
			idFactory: () => "comparison",
		});
		expect(requests).toHaveLength(2);
		const [baseline, intervention] = requests;
		expect(baseline).not.toHaveProperty("contractGuidance");
		expect(intervention).toHaveProperty("contractGuidance");
		expect(baseline?.contractKey).toBe(intervention?.contractKey);
		expect({ ...baseline, arm: undefined }).toMatchObject({
			caseId: intervention?.caseId,
			locale: intervention?.locale,
			turns: intervention?.turns,
			operationalContext: intervention?.operationalContext,
			contractKey: intervention?.contractKey,
		});
	});

	it("HSD5-E-003: retains provider failures for both arms with no operations", async () => {
		const deterministic = new DeterministicComparisonPlanner();
		const unavailable: ComparisonPlanner = {
			configuration: deterministic.configuration,
			plan: async () => {
				throw new Error("provider detail must not escape");
			},
		};
		const comparison = await executeMatchedComparison({
			caseId: "compound-recovery",
			locale: "en",
			planner: unavailable,
			idFactory: () => "provider-failure",
		});
		for (const arm of [comparison.baseline, comparison.intervention]) {
			expect(arm).toMatchObject({
				status: "planning_failed",
				errorCode: "PLANNER_UNAVAILABLE",
				operations: [],
				lifecycle: ["event.received", "planning.started", "planning.failed"],
			});
			expect(JSON.stringify(arm)).not.toContain("provider detail");
		}
	});

	it("HSD5-E-003: retains typed quota exhaustion for both arms with no operations", async () => {
		const deterministic = new DeterministicComparisonPlanner();
		const exhausted: ComparisonPlanner = {
			configuration: deterministic.configuration,
			plan: async () => {
				throw new GeminiPlannerError("PLANNER_QUOTA_EXHAUSTED");
			},
		};
		const comparison = await executeMatchedComparison({
			caseId: "compound-recovery",
			locale: "en",
			planner: exhausted,
			idFactory: () => "quota",
		});
		for (const arm of [comparison.baseline, comparison.intervention]) {
			expect(arm).toMatchObject({
				status: "planning_failed",
				errorCode: "PLANNER_QUOTA_EXHAUSTED",
				operations: [],
			});
		}
	});

	it("HSD5-E-003: fails closed for malformed planner evidence and unsupported locales", async () => {
		const deterministic = new DeterministicComparisonPlanner();
		const malformed: ComparisonPlanner = {
			configuration: deterministic.configuration,
			plan: async () => ({ graph: null, usage: { turns: 1 } }),
		};
		const comparison = await executeMatchedComparison({
			caseId: "compound-recovery",
			locale: "en",
			planner: malformed,
			idFactory: () => "malformed",
		});
		expect(comparison.baseline.errorCode).toBe("PLANNER_INVALID_OUTPUT");
		expect(comparison.intervention.errorCode).toBe("PLANNER_INVALID_OUTPUT");
		await expect(
			executeMatchedComparison({
				caseId: "compound-recovery",
				locale: "fr-FR",
				planner: deterministic,
			}),
		).rejects.toMatchObject({ code: "UNSUPPORTED_LOCALE" });
	});

	it("HSD5-E-003: distinguishes planning-budget and timeout failures", async () => {
		const deterministic = new DeterministicComparisonPlanner();
		const overBudget: ComparisonPlanner = {
			configuration: deterministic.configuration,
			plan: async (request) => ({
				...(await deterministic.plan(request)),
				usage: { turns: 2 },
			}),
		};
		const budgetFailure = await executeMatchedComparison({
			caseId: "compound-recovery",
			locale: "en",
			planner: overBudget,
			idFactory: () => "budget",
		});
		expect(budgetFailure.baseline.errorCode).toBe("PLANNER_BUDGET_EXCEEDED");
		expect(budgetFailure.intervention.errorCode).toBe("PLANNER_BUDGET_EXCEEDED");

		const timedOut: ComparisonPlanner = {
			configuration: {
				...deterministic.configuration,
				budget: { ...deterministic.configuration.budget, timeoutMs: 1 },
			},
			plan: (_request, context) =>
				new Promise((_resolve, reject) => {
					context.signal.addEventListener("abort", () => reject(new Error("aborted")), {
						once: true,
					});
				}),
		};
		const timeoutFailure = await executeMatchedComparison({
			caseId: "compound-recovery",
			locale: "en",
			planner: timedOut,
			idFactory: () => "timeout",
		});
		expect(timeoutFailure.baseline.errorCode).toBe("PLANNER_TIMEOUT");
		expect(timeoutFailure.intervention.errorCode).toBe("PLANNER_TIMEOUT");
	});
});
