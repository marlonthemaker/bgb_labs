import { describe, expect, it } from "vitest";

import {
	getIntervention,
	interventionSpecifications,
	validateInterventionRegistry,
} from "../../lib/native-adoption/interventions";

describe("HSD-005 intervention registry", () => {
	it("HSD5-I-001: freezes complete baseline and contract-guidance specifications", () => {
		expect(validateInterventionRegistry(interventionSpecifications)).toEqual([]);
		expect(interventionSpecifications.map(({ arm }) => arm)).toEqual([
			"baseline",
			"contract_guided",
		]);
		for (const specification of interventionSpecifications) {
			expect(Object.isFrozen(specification)).toBe(true);
			expect(specification).toMatchObject({
				targetFailureStage: "decompose",
				parameters: { retries: 0, silentRepair: false },
			});
			expect(specification.activationCondition).not.toBe("");
			expect(specification.regressionCheck).not.toBe("");
			expect(specification.rollbackCondition).not.toBe("");
		}
	});

	it("HSD5-I-001: rejects duplicate arms, duplicate ids, missing arms, and incomplete mechanisms", () => {
		const source = getIntervention("baseline");
		const duplicate = [{ ...source }, { ...source }];
		expect(validateInterventionRegistry(duplicate).map(({ code }) => code)).toEqual(
			expect.arrayContaining(["DUPLICATE_ARM", "DUPLICATE_INTERVENTION_ID"]),
		);
		expect(
			validateInterventionRegistry([{ ...source, proposedMechanism: "" }]).map(({ code }) => code),
		).toContain("INVALID_INTERVENTION");
	});
});
