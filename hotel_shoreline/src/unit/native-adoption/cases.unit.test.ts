import { describe, expect, it } from "vitest";

import {
	getLanguageVariant,
	getNativeAdoptionCase,
	nativeAdoptionCases,
	nativeAdoptionFamilies,
	nativeAdoptionLocales,
	validateCaseRegistry,
} from "../../lib/native-adoption/cases";
import { createNativeAdoptionScenario } from "../../lib/native-adoption/scenario";

describe("HSD-005 case and native-review registry", () => {
	it("HSD5-D-001/HSD5-D-002: defines three families and nine review-ready linked variants", () => {
		expect(validateCaseRegistry(nativeAdoptionCases)).toEqual([]);
		expect(nativeAdoptionCases.map(({ family }) => family)).toEqual(nativeAdoptionFamilies);
		expect(nativeAdoptionCases.flatMap(({ variants }) => variants)).toHaveLength(9);
		for (const caseDefinition of nativeAdoptionCases) {
			expect(caseDefinition.variants.map(({ locale }) => locale)).toEqual(nativeAdoptionLocales);
			for (const variant of caseDefinition.variants) {
				expect(variant.contractVersion).toBe(caseDefinition.contract.version);
				expect(variant.fixtureVersion).toBe(caseDefinition.fixture.version);
				expect(variant.toolContractVersion).toBe(caseDefinition.toolContractVersion);
				expect(variant.review.status).toBe("pending_review");
				expect(variant.review.representationLimitations.length).toBeGreaterThan(0);
				expect(variant.turns.every(({ text }) => text.trim().length > 0)).toBe(true);
			}
		}
	});

	it("HSD5-D-001: retains an ordered transcript for the corrective case without testing wording", () => {
		const corrective = getNativeAdoptionCase("corrective-change");
		for (const variant of corrective.variants) {
			expect(variant.turns).toHaveLength(2);
			expect(variant.turns.map(({ sequence }) => sequence)).toEqual([1, 2]);
		}
	});

	it("HSD5-D-002: rejects duplicate identities, missing locale, broken references, and invalid review", () => {
		const source = nativeAdoptionCases[0];
		if (!source) throw new Error("The registry must contain a source case.");
		const firstVariant = source.variants[0];
		if (!firstVariant) throw new Error("The source case must contain a variant.");
		const invalid = [
			{
				...source,
				variants: [
					{ ...firstVariant, contractVersion: "wrong", review: { status: "approved" } },
					{ ...firstVariant },
				],
			},
			{ ...source },
		];

		expect(validateCaseRegistry(invalid).map(({ code }) => code)).toEqual(
			expect.arrayContaining([
				"DUPLICATE_CASE_FAMILY",
				"DUPLICATE_CASE_ID",
				"DUPLICATE_LOCALE",
				"DUPLICATE_VARIANT_ID",
				"INVALID_REFERENCE",
				"INVALID_REVIEW",
				"MISSING_CASE_FAMILY",
				"MISSING_LOCALE",
			]),
		);
	});

	it("HSD5-D-002: fails closed for unknown cases and unsupported locales", () => {
		expect(() => getNativeAdoptionCase("missing")).toThrowError("Unknown case missing.");
		const caseDefinition = getNativeAdoptionCase("compound-recovery");
		expect(() => getLanguageVariant(caseDefinition, "fr-FR")).toThrowError(
			"Unsupported locale fr-FR.",
		);
	});

	it("HSD5-D-001: creates fresh typed scenario state and replay-safe operations", async () => {
		const caseDefinition = getNativeAdoptionCase("compound-recovery");
		const first = createNativeAdoptionScenario(caseDefinition);
		const second = createNativeAdoptionScenario(caseDefinition);
		const tool = first.tools.request_maintenance;
		if (!tool) throw new Error("Maintenance tool must exist.");
		const invocation = {
			runId: "run-1",
			nodeId: "maintenance",
			idempotencyKey: "maintenance-key",
			input: {
				stayId: caseDefinition.fixture.stayId,
				roomNumber: caseDefinition.fixture.roomNumber,
			},
		};

		expect(await tool.execute(invocation)).toMatchObject({ ok: true });
		expect(await tool.execute(invocation)).toMatchObject({ ok: true });
		expect(first.getOperations()).toHaveLength(1);
		expect(second.getOperations()).toEqual([]);
	});

	it("HSD5-D-002: validates adapter arguments before recording operational effects", async () => {
		const caseDefinition = getNativeAdoptionCase("compound-recovery");
		const scenario = createNativeAdoptionScenario(caseDefinition);
		const housekeeping = scenario.tools.request_housekeeping;
		const relocation = scenario.tools.relocate_guest;
		if (!housekeeping || !relocation) throw new Error("Scenario tools must exist.");
		const invalidQuantity = await housekeeping.execute({
			runId: "run",
			nodeId: "housekeeping",
			idempotencyKey: "invalid-quantity",
			input: {
				stayId: caseDefinition.fixture.stayId,
				roomNumber: caseDefinition.fixture.roomNumber,
				extraTowelCount: 99,
			},
		});
		const invalidRoom = await relocation.execute({
			runId: "run",
			nodeId: "relocation",
			idempotencyKey: "invalid-room",
			input: { stayId: caseDefinition.fixture.stayId, roomNumber: "999" },
		});
		expect(invalidQuantity).toEqual({ ok: false, errorCode: "INVALID_TOWEL_QUANTITY" });
		expect(invalidRoom).toEqual({ ok: false, errorCode: "INVALID_STAY_OR_ROOM" });
		expect(scenario.getOperations()).toEqual([]);
	});
});
