import { describe, it } from "vitest";

import { InMemoryEvidenceLedgerRepository } from "../lib/evidence-ledger/in-memory";
import { createComparisonEvidenceRecord } from "../lib/evidence-ledger/records";
import {
	DeterministicComparisonPlanner,
	executeMatchedComparison,
} from "../lib/native-adoption/orchestrator";
import { verifyEvidenceLedgerContract } from "./evidence-ledger.contract";

describe("HSD7-R-001: in-memory evidence-ledger repository contract", () => {
	it("is append-only, replay-safe, conflict-safe, ordered, and copy-isolated", async () => {
		const planner = new DeterministicComparisonPlanner();
		const older = createComparisonEvidenceRecord(
			await executeMatchedComparison({
				caseId: "compound-recovery",
				locale: "en",
				planner,
				idFactory: () => "00000000-0000-4000-8000-000000000010",
			}),
			{ recordedAt: "2026-08-27T12:00:00.000Z" },
		);
		const newer = createComparisonEvidenceRecord(
			await executeMatchedComparison({
				caseId: "conditional-safety",
				locale: "es-ES",
				planner,
				idFactory: () => "00000000-0000-4000-8000-000000000011",
			}),
			{ recordedAt: "2026-08-27T12:01:00.000Z" },
		);

		await verifyEvidenceLedgerContract({
			createRepository: async () => new InMemoryEvidenceLedgerRepository(),
			records: [older, newer],
		});
	});
});
