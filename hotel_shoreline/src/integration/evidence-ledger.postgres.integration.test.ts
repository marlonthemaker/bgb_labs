import path from "node:path";
import { Pool } from "pg";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

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
const runtimeRole = "hsd_runtime_contract";
const runtimePassword = "hsd-runtime-contract-only";
if (process.env.HSD_REQUIRE_POSTGRES_TEST === "1" && databaseUrl === undefined) {
	throw new Error("HSD_TEST_DATABASE_URL is required for the PostgreSQL contract gate.");
}

describe.skipIf(databaseUrl === undefined)(
	"HSD7-R-001/HSD7-R-004: PostgreSQL repository contract",
	() => {
		const pool = new Pool({ connectionString: databaseUrl, max: 2 });
		let runtimePool: Pool;

		beforeAll(async () => {
			if (databaseUrl === undefined) {
				throw new Error("HSD_TEST_DATABASE_URL is required for the PostgreSQL contract gate.");
			}
			await applyEvidenceLedgerMigration(
				pool,
				path.join(import.meta.dirname, "../../migrations/001_evidence_ledger.sql"),
			);
			const database = await pool.query<{ database_name: string }>(
				"SELECT current_database() AS database_name",
			);
			const databaseIdentifier = quoteIdentifier(database.rows[0]?.database_name ?? "");
			await pool.query(`
				DO $$
				BEGIN
					IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = '${runtimeRole}') THEN
						CREATE ROLE ${runtimeRole} LOGIN NOINHERIT PASSWORD '${runtimePassword}';
					END IF;
				END
				$$;
				ALTER ROLE ${runtimeRole} LOGIN NOINHERIT PASSWORD '${runtimePassword}';
				REVOKE ALL ON DATABASE ${databaseIdentifier} FROM PUBLIC;
				GRANT CONNECT ON DATABASE ${databaseIdentifier} TO ${runtimeRole};
				REVOKE ALL ON SCHEMA public FROM PUBLIC;
				GRANT USAGE ON SCHEMA public TO ${runtimeRole};
				GRANT SELECT, INSERT ON ALL TABLES IN SCHEMA public TO ${runtimeRole};
			`);
			const runtimeUrl = new URL(databaseUrl);
			runtimeUrl.username = runtimeRole;
			runtimeUrl.password = runtimePassword;
			runtimePool = new Pool({ connectionString: runtimeUrl.toString(), max: 2 });
		});

		afterAll(async () => {
			await runtimePool.end();
			const database = await pool.query<{ database_name: string }>(
				"SELECT current_database() AS database_name",
			);
			const databaseIdentifier = quoteIdentifier(database.rows[0]?.database_name ?? "");
			await pool.query(`
				REVOKE ALL ON ALL TABLES IN SCHEMA public FROM ${runtimeRole};
				REVOKE ALL ON SCHEMA public FROM ${runtimeRole};
				REVOKE ALL ON DATABASE ${databaseIdentifier} FROM ${runtimeRole};
				DROP ROLE ${runtimeRole};
			`);
			await pool.end();
		});

		it("enforces the shared contract through a SELECT/INSERT-only PostgreSQL role", async () => {
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
			const privileges = await runtimePool.query<{
				can_create: boolean;
				can_delete: boolean;
				can_insert: boolean;
				can_select: boolean;
				can_truncate: boolean;
				can_update: boolean;
			}>(`
				SELECT
					has_table_privilege(current_user, 'evidence_comparison', 'SELECT') AS can_select,
					has_table_privilege(current_user, 'evidence_comparison', 'INSERT') AS can_insert,
					has_table_privilege(current_user, 'evidence_comparison', 'UPDATE') AS can_update,
					has_table_privilege(current_user, 'evidence_comparison', 'DELETE') AS can_delete,
					has_table_privilege(current_user, 'evidence_comparison', 'TRUNCATE') AS can_truncate,
					has_schema_privilege(current_user, 'public', 'CREATE') AS can_create
			`);
			expect(privileges.rows[0]).toEqual({
				can_create: false,
				can_delete: false,
				can_insert: true,
				can_select: true,
				can_truncate: false,
				can_update: false,
			});
			await verifyEvidenceLedgerContract({
				createRepository: async () => new PostgresEvidenceLedgerRepository(runtimePool),
				records: [older, newer],
			});
		});
	},
);

function quoteIdentifier(value: string): string {
	if (value.length === 0) throw new Error("PostgreSQL test database name is unavailable.");
	return `"${value.replaceAll('"', '""')}"`;
}
