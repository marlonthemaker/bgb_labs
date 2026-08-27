import { describe, expect, it } from "vitest";

import { deriveLifecycleStages, parsePublicEvidenceExport } from "../lib/evidence-experience";
import {
	evidenceExportFilename,
	projectPublicEvidenceExport,
	serializePublicEvidenceExport,
} from "../lib/evidence-ledger/export";
import { createComparisonEvidenceRecord } from "../lib/evidence-ledger/records";
import {
	DeterministicComparisonPlanner,
	executeMatchedComparison,
} from "../lib/native-adoption/orchestrator";

describe("HSD-006 public evidence experience", () => {
	it("HSD6-U-002: projects provenance, matched facts, measures, and claim limits from the immutable record", async () => {
		const record = await comparisonRecord();
		const evidence = projectPublicEvidenceExport(record);

		expect(evidence.comparison).toMatchObject({
			comparisonId: record.comparisonId,
			evidence: {
				schemaVersion: record.schemaVersion,
				recordedAt: record.recordedAt,
				sourceContentHash: record.contentHash,
				caseVersion: record.case.version,
				variantId: record.case.variantId,
				variantVersion: record.case.variantVersion,
				fixtureVersion: record.case.fixtureVersion,
				toolContractVersion: record.case.toolContractVersion,
			},
			claimBoundary: {
				environment: "fictional_synthetic_demo",
				findingStatus: "illustrative_observation",
				reviewerQualified: false,
			},
		});
		expect(evidence.comparison.arms[0]?.configuration.sharedConfigurationHash).toBe(
			evidence.comparison.arms[1]?.configuration.sharedConfigurationHash,
		);
		expect(
			evidence.comparison.arms[1]?.measures.every(({ definition }) => definition.length > 0),
		).toBe(true);
		expect(evidence.comparison.claimBoundary.statement).toContain("not a research finding");
	});

	it("HSD6-U-003: serializes the same saved record deterministically without privileged fields", async () => {
		const evidence = projectPublicEvidenceExport(await comparisonRecord());
		const first = serializePublicEvidenceExport(evidence);
		const second = serializePublicEvidenceExport(evidence);

		expect(first).toBe(second);
		expect(first.endsWith("\n")).toBe(true);
		expect(parsePublicEvidenceExport(JSON.parse(first))).toEqual(evidence);
		for (const forbidden of [
			"DATABASE_URL",
			"connectionString",
			"secretKeyRef",
			"systemPrompt",
			"promptText",
			"exception.stack",
			"cloudsql",
		]) {
			expect(first).not.toContain(forbidden);
		}
		expect(evidenceExportFilename(evidence.comparison.comparisonId)).toBe(
			`hotel-shoreline-evidence-${evidence.comparison.comparisonId}.json`,
		);
		expect(() => evidenceExportFilename("../unsafe.json")).toThrowError(
			expect.objectContaining({ code: "INVALID_LEDGER_QUERY" }),
		);
	});

	it("HSD6-U-001: marks failed, completed, partial, and unreached lifecycle stages from recorded facts", async () => {
		const evidence = projectPublicEvidenceExport(await comparisonRecord());
		const rejected = evidence.comparison.arms[0];
		const succeeded = evidence.comparison.arms[1];
		expect(rejected).toBeDefined();
		expect(succeeded).toBeDefined();
		if (!rejected || !succeeded) return;

		expect(deriveLifecycleStages(rejected).map(({ state }) => state)).toEqual([
			"completed",
			"completed",
			"failed",
			"not_reached",
		]);
		expect(deriveLifecycleStages(succeeded).map(({ state }) => state)).toEqual([
			"completed",
			"completed",
			"completed",
			"completed",
		]);
		expect(deriveLifecycleStages({ ...succeeded, status: "partial_failure" }).at(-1)?.state).toBe(
			"partial",
		);
	});

	it("HSD6-U-003: rejects malformed export envelopes and public comparison payloads", async () => {
		const evidence = projectPublicEvidenceExport(await comparisonRecord());
		expect(parsePublicEvidenceExport({ ...evidence, schemaVersion: "future" })).toBeUndefined();
		expect(
			parsePublicEvidenceExport({
				...evidence,
				comparison: { ...evidence.comparison, evidence: { sourceContentHash: "bad" } },
			}),
		).toBeUndefined();
	});
});

async function comparisonRecord() {
	const run = await executeMatchedComparison({
		caseId: "compound-recovery",
		locale: "en",
		planner: new DeterministicComparisonPlanner(),
	});
	return createComparisonEvidenceRecord(run, { recordedAt: "2026-08-27T12:00:00.000Z" });
}
