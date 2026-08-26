import { describe, expect, it } from "vitest";

import {
	buildMatchedConditions,
	evaluatePairEligibility,
	hashCanonical,
	type PlannerConfiguration,
} from "../../lib/native-adoption/conditions";
import { taskmasterPlanningBudget } from "../../lib/taskmaster";

const planner: PlannerConfiguration = {
	provider: "deterministic",
	model: "frozen-comparison-fixtures",
	plannerVersion: "comparison-planner-v1",
	promptVersion: "native-adoption-prompt-v1",
	temperature: 0,
	budget: taskmasterPlanningBudget,
};

describe("HSD-005 matched run conditions", () => {
	it("HSD5-E-001/HSD5-E-003: changes only the declared treatment and excludes pending review", () => {
		const conditions = buildMatchedConditions({
			caseId: "compound-recovery",
			locale: "es-ES",
			planner,
		});

		expect(conditions.baseline.sharedConfigurationHash).toBe(
			conditions.intervention.sharedConfigurationHash,
		);
		expect(conditions.baseline.conditionHash).not.toBe(conditions.intervention.conditionHash);
		expect(conditions.baseline.arm).toBe("baseline");
		expect(conditions.intervention.arm).toBe("contract_guided");
		expect(evaluatePairEligibility(conditions)).toEqual({
			eligible: false,
			reasons: ["PENDING_HUMAN_REVIEW"],
		});
	});

	it("HSD5-E-001: canonical hashes ignore object key order but retain meaningful settings", () => {
		expect(hashCanonical({ model: "x", budget: { turns: 1, tokens: 10 } })).toBe(
			hashCanonical({ budget: { tokens: 10, turns: 1 }, model: "x" }),
		);
		expect(hashCanonical({ model: "x", temperature: 0 })).not.toBe(
			hashCanonical({ model: "x", temperature: 1 }),
		);
	});

	it("HSD5-E-003: detects changed shared conditions and unsupported locales", () => {
		const conditions = buildMatchedConditions({
			caseId: "compound-recovery",
			locale: "en",
			planner,
		});
		const changed = {
			...conditions,
			intervention: { ...conditions.intervention, sharedConfigurationHash: "changed" },
		};
		expect(evaluatePairEligibility(changed).reasons).toContain("CONDITION_MISMATCH");
		expect(() =>
			buildMatchedConditions({ caseId: "compound-recovery", locale: "fr-FR", planner }),
		).toThrowError("Unsupported locale fr-FR.");
	});
});
