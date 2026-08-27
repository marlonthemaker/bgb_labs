import path from "node:path";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, it } from "vitest";

import {
	applyEvidenceLedgerMigration,
	PostgresEvidenceLedgerRepository,
} from "../lib/evidence-ledger/postgres";
import { createComparisonEvidenceRecord } from "../lib/evidence-ledger/records";
import {
	DeterministicComparisonPlanner,
	executeMatchedComparison,
} from "../lib/native-adoption/orchestrator";
import { verifyEvidenceLedgerContract } from "./evidence-ledger.contract";

const databaseUrl = process.env.HSD_TEST_DATABASE_URL;
if (process.env.HSD_REQUIRE_POSTGRES_TEST === "1" && databaseUrl === undefined) {
	throw new Error("HSD_TEST_DATABASE_URL is required for the PostgreSQL contract gate.");
}

describe.skipIf(databaseUrl === undefined)(
	"HSD7-R-001/HSD7-R-004: PostgreSQL repository contract",
	() => {
		const pool = new Pool({ connectionString: databaseUrl, max: 2 });

		beforeAll(async () => {
			await applyEvidenceLedgerMigration(
				pool,
				path.join(import.meta.dirname, "../../migrations/001_evidence_ledger.sql"),
			);
		});

		afterAll(async () => {
			await pool.end();
		});

		it("enforces the shared contract with real PostgreSQL constraints", async () => {
			const planner = new DeterministicComparisonPlanner();
			const older = createComparisonEvidenceRecord(
				await executeMatchedComparison({
					caseId: "compound-recovery",
					locale: "en",
					planner,
					idFactory: () => "00000000-0000-4000-8000-000000000020",
				}),
				{ recordedAt: "2026-08-27T12:00:00.000Z" },
			);
			const newer = createComparisonEvidenceRecord(
				await executeMatchedComparison({
					caseId: "conditional-safety",
					locale: "es-ES",
					planner,
					idFactory: () => "00000000-0000-4000-8000-000000000021",
				}),
				{ recordedAt: "2026-08-27T12:01:00.000Z" },
			);

			await pool.query(
				"TRUNCATE evidence_review_annotation, evidence_evaluation, evidence_run_artifact, evidence_run_event, evidence_run, evidence_intervention, evidence_comparison",
			);
			await verifyEvidenceLedgerContract({
				createRepository: async () => new PostgresEvidenceLedgerRepository(pool),
				records: [older, newer],
			});
		});
	},
);
