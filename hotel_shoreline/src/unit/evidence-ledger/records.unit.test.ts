import { describe, expect, it } from "vitest";
import {
	createComparisonEvidenceRecord,
	parseComparisonEvidenceRecord,
} from "../../lib/evidence-ledger/records";
import {
	DeterministicComparisonPlanner,
	executeMatchedComparison,
} from "../../lib/native-adoption/orchestrator";

describe("HSD7-R-002: versioned comparison evidence", () => {
	it("preserves the complete synthetic provenance for both matched arms", async () => {
		const run = await executeMatchedComparison({
			caseId: "compound-recovery",
			locale: "pt-PT",
			planner: new DeterministicComparisonPlanner(),
			idFactory: () => "00000000-0000-4000-8000-000000000007",
		});
		const record = createComparisonEvidenceRecord(run, {
			recordedAt: "2026-08-27T12:00:00.000Z",
		});

		expect(record).toMatchObject({
			schemaVersion: "hotel-shoreline-comparison-evidence-v1",
			comparisonId: run.id,
			recordedAt: "2026-08-27T12:00:00.000Z",
			case: {
				id: "compound-recovery",
				locale: "pt-PT",
				review: { status: "pending_review" },
				fixtureVersion: "shoreline-compound-fixture-v1",
				toolContractVersion: "shoreline-tools-v1",
			},
			contract: { id: "shoreline-contract-001", version: "1.0.0" },
			pairEligibility: { eligible: false, reasons: ["PENDING_HUMAN_REVIEW"] },
		});
		expect(record.arms.map((arm) => arm.arm)).toEqual(["baseline", "contract_guided"]);
		expect(record.arms[0]).toMatchObject({ status: "rejected", operations: [] });
		expect(record.arms[1]).toMatchObject({
			status: "succeeded",
			condition: {
				planner: { provider: "deterministic", model: "frozen-hsd-005-candidates" },
				interventionId: "shoreline-semantic-contract-guidance",
			},
		});
		expect(record.arms[1]?.lifecycle).toContain("execution.finished");
		expect(record.arms[1]?.evaluation.measures).toHaveLength(7);
		expect(record.contentHash).toMatch(/^[a-f0-9]{64}$/);
		expect(parseComparisonEvidenceRecord(record)).toEqual(record);
	});

	it("retains typed planning failure evidence without raw provider errors", async () => {
		const planner = new DeterministicComparisonPlanner();
		const run = await executeMatchedComparison({
			caseId: "compound-recovery",
			locale: "en",
			planner: {
				...planner,
				plan: async () => Promise.reject(new Error("secret provider detail")),
			},
			idFactory: () => "00000000-0000-4000-8000-000000000008",
		});
		const record = createComparisonEvidenceRecord(run, {
			recordedAt: "2026-08-27T12:00:01.000Z",
		});

		expect(record.arms.every((arm) => arm.errorCode === "PLANNER_UNAVAILABLE")).toBe(true);
		expect(JSON.stringify(record)).not.toContain("secret provider detail");
		expect(record.arms.every((arm) => arm.operations.length === 0)).toBe(true);
	});

	it("rejects a tampered hash, invalid timestamp, or secret-shaped property", async () => {
		const run = await executeMatchedComparison({
			caseId: "compound-recovery",
			locale: "en",
			planner: new DeterministicComparisonPlanner(),
			idFactory: () => "00000000-0000-4000-8000-000000000009",
		});
		const record = createComparisonEvidenceRecord(run, {
			recordedAt: "2026-08-27T12:00:02.000Z",
		});

		expect(
			parseComparisonEvidenceRecord({ ...record, contentHash: "0".repeat(64) }),
		).toBeUndefined();
		expect(parseComparisonEvidenceRecord({ ...record, recordedAt: "not-a-date" })).toBeUndefined();
		expect(
			parseComparisonEvidenceRecord({ ...record, geminiApiKey: "must-not-persist" }),
		).toBeUndefined();
	});
});
