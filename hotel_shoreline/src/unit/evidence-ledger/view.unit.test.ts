import { describe, expect, it } from "vitest";

import { createComparisonEvidenceRecord } from "../../lib/evidence-ledger/records";
import {
	parseEvidenceHistoryResponse,
	projectEvidenceHistoryItem,
} from "../../lib/evidence-ledger/view";
import {
	DeterministicComparisonPlanner,
	executeMatchedComparison,
} from "../../lib/native-adoption/orchestrator";

describe("HSD7-R-003: sanitized evidence history projection", () => {
	it("keeps comparison dimensions and arm outcomes while excluding raw artifacts", async () => {
		const run = await executeMatchedComparison({
			caseId: "corrective-change",
			locale: "pt-PT",
			planner: new DeterministicComparisonPlanner(),
			idFactory: () => "00000000-0000-4000-8000-000000000030",
		});
		const record = createComparisonEvidenceRecord(run, {
			recordedAt: "2026-08-27T12:00:00.000Z",
		});
		const view = projectEvidenceHistoryItem(record);

		expect(view).toMatchObject({
			comparisonId: record.comparisonId,
			caseId: "corrective-change",
			locale: "pt-PT",
			reviewStatus: "pending_review",
			aggregateEligible: false,
			arms: [
				{ arm: "baseline", status: "rejected", operationCount: 0 },
				{ arm: "contract_guided", status: "succeeded", operationCount: 1 },
			],
		});
		const serialized = JSON.stringify(view);
		for (const forbidden of [
			"candidateGraph",
			"validation",
			"turns",
			"operations",
			"contentHash",
			"connectionString",
		]) {
			expect(serialized).not.toContain(forbidden);
		}
	});

	it("HSD6-H-001: accepts only bounded public history item shapes", async () => {
		const run = await executeMatchedComparison({
			caseId: "compound-recovery",
			locale: "en",
			planner: new DeterministicComparisonPlanner(),
		});
		const item = projectEvidenceHistoryItem(
			createComparisonEvidenceRecord(run, { recordedAt: "2026-08-27T12:00:00.000Z" }),
		);

		expect(parseEvidenceHistoryResponse({ records: [item] })).toEqual({ records: [item] });
		expect(
			parseEvidenceHistoryResponse({ records: [{ ...item, arms: [{ operationCount: -1 }] }] }),
		).toBeUndefined();
		expect(parseEvidenceHistoryResponse({ records: "not-an-array" })).toBeUndefined();
	});
});
