import { readFile } from "node:fs/promises";
import type { PoolClient } from "pg";
import { Pool } from "pg";

import { hashCanonical } from "../native-adoption/conditions";
import {
	type ComparisonEvidenceArm,
	type ComparisonEvidenceRecord,
	parseComparisonEvidenceRecord,
} from "./records";
import { EvidenceLedgerError, type EvidenceLedgerRepository } from "./repository";

export class PostgresEvidenceLedgerRepository implements EvidenceLedgerRepository {
	constructor(
		private readonly pool: Pool,
		private readonly ownsPool = false,
	) {}

	static fromConnectionString(connectionString: string) {
		return new PostgresEvidenceLedgerRepository(
			new Pool({
				connectionString,
				max: 3,
				connectionTimeoutMillis: 5_000,
				idleTimeoutMillis: 10_000,
				allowExitOnIdle: true,
			}),
			true,
		);
	}

	async append(record: ComparisonEvidenceRecord) {
		const client = await this.connect();
		try {
			await client.query("BEGIN");
			const existing = await client.query<{ content_hash: string }>(
				"SELECT content_hash FROM evidence_comparison WHERE comparison_id = $1",
				[record.comparisonId],
			);
			const existingHash = existing.rows[0]?.content_hash;
			if (existingHash !== undefined) {
				if (existingHash === record.contentHash) {
					await client.query("ROLLBACK");
					return { outcome: "replayed" as const };
				}
				throw new EvidenceLedgerError(
					"LEDGER_CONFLICT",
					`Comparison ${record.comparisonId} already has different immutable evidence.`,
				);
			}
			const parsed = parseComparisonEvidenceRecord(record);
			if (!parsed) {
				throw new EvidenceLedgerError("INVALID_EVIDENCE_RECORD", "Evidence record is invalid.");
			}
			const inserted = await insertComparison(client, parsed);
			if (!inserted) {
				const concurrent = await client.query<{ content_hash: string }>(
					"SELECT content_hash FROM evidence_comparison WHERE comparison_id = $1",
					[record.comparisonId],
				);
				if (concurrent.rows[0]?.content_hash === record.contentHash) {
					await client.query("ROLLBACK");
					return { outcome: "replayed" as const };
				}
				throw new EvidenceLedgerError(
					"LEDGER_CONFLICT",
					`Comparison ${record.comparisonId} already has different immutable evidence.`,
				);
			}
			for (const arm of parsed.arms) await insertArm(client, parsed, arm);
			await client.query("COMMIT");
			return { outcome: "inserted" as const };
		} catch (error) {
			await client.query("ROLLBACK").catch(() => undefined);
			if (error instanceof EvidenceLedgerError) throw error;
			throw new EvidenceLedgerError("LEDGER_UNAVAILABLE", "Evidence ledger write failed.", {
				cause: error,
			});
		} finally {
			client.release();
		}
	}

	async get(comparisonId: string) {
		try {
			const result = await this.pool.query<{ record: unknown }>(
				"SELECT record FROM evidence_comparison WHERE comparison_id = $1",
				[comparisonId],
			);
			return parseStoredRecord(result.rows[0]?.record);
		} catch (error) {
			throw unavailable("Evidence ledger read failed.", error);
		}
	}

	async list(input: { readonly limit: number }) {
		if (!Number.isSafeInteger(input.limit) || input.limit < 1 || input.limit > 100) {
			throw new EvidenceLedgerError("INVALID_LEDGER_QUERY", "List limit must be from 1 to 100.");
		}
		try {
			const result = await this.pool.query<{ record: unknown }>(
				"SELECT record FROM evidence_comparison ORDER BY recorded_at DESC, comparison_id ASC LIMIT $1",
				[input.limit],
			);
			return result.rows.map(({ record }) => {
				const parsed = parseStoredRecord(record);
				if (!parsed) {
					throw new EvidenceLedgerError(
						"LEDGER_UNAVAILABLE",
						"Stored evidence failed integrity validation.",
					);
				}
				return parsed;
			});
		} catch (error) {
			if (error instanceof EvidenceLedgerError) throw error;
			throw unavailable("Evidence ledger list failed.", error);
		}
	}

	async close() {
		if (this.ownsPool) await this.pool.end();
	}

	private async connect() {
		try {
			return await this.pool.connect();
		} catch (error) {
			throw unavailable("Evidence ledger connection failed.", error);
		}
	}
}

export async function applyEvidenceLedgerMigration(pool: Pool, migrationPath: string) {
	const sql = await readFile(migrationPath, "utf8");
	await pool.query(sql);
}

async function insertComparison(client: PoolClient, record: ComparisonEvidenceRecord) {
	const result = await client.query(
		`INSERT INTO evidence_comparison
		 (comparison_id, schema_version, recorded_at, case_id, locale, aggregate_eligible, content_hash, record)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb)
		 ON CONFLICT (comparison_id) DO NOTHING
		 RETURNING comparison_id`,
		[
			record.comparisonId,
			record.schemaVersion,
			record.recordedAt,
			record.case.id,
			record.case.locale,
			record.pairEligibility.eligible,
			record.contentHash,
			JSON.stringify(record),
		],
	);
	return result.rowCount === 1;
}

async function insertArm(
	client: PoolClient,
	record: ComparisonEvidenceRecord,
	arm: ComparisonEvidenceArm,
) {
	await ensureIntervention(client, arm);
	await client.query(
		`INSERT INTO evidence_run
		 (run_id, comparison_id, treatment_arm, status, error_code, provider, model,
		  configuration_hash, condition_hash, source_hash, contract_version, fixture_version,
		  tool_contract_version, intervention_id, intervention_version)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
		[
			arm.runId,
			record.comparisonId,
			arm.arm,
			arm.status,
			arm.errorCode ?? null,
			arm.condition.planner.provider,
			arm.condition.planner.model,
			arm.condition.sharedConfigurationHash,
			arm.condition.conditionHash,
			arm.sourceHash,
			arm.condition.contractVersion,
			arm.condition.fixtureVersion,
			arm.condition.toolContractVersion,
			arm.intervention.id,
			arm.intervention.version,
		],
	);
	for (const [index, event] of arm.lifecycle.entries()) {
		await client.query(
			"INSERT INTO evidence_run_event (run_id, sequence, event_type) VALUES ($1, $2, $3)",
			[arm.runId, index + 1, event],
		);
	}
	const artifacts = [
		["request", { case: record.case, contract: record.contract }],
		...(arm.candidateGraph === undefined ? [] : [["candidate_graph", arm.candidateGraph]]),
		["validation", arm.validation],
		["operations", arm.operations],
		["terminal_outcome", arm.terminalOutcome],
	] as const;
	for (const [artifactType, payload] of artifacts) {
		await client.query(
			`INSERT INTO evidence_run_artifact
			 (run_id, artifact_type, schema_version, content_hash, payload)
			 VALUES ($1, $2, $3, $4, $5::jsonb)`,
			[
				arm.runId,
				artifactType,
				record.schemaVersion,
				hashCanonical(payload),
				JSON.stringify(payload),
			],
		);
	}
	await client.query(
		`INSERT INTO evidence_evaluation
		 (run_id, revision, source_hash, aggregate_eligible, exclusion_reasons, measures, first_loss_stage)
		 VALUES ($1, 1, $2, $3, $4::jsonb, $5::jsonb, $6)`,
		[
			arm.runId,
			arm.evaluation.sourceHash,
			record.pairEligibility.eligible,
			JSON.stringify(record.pairEligibility.reasons),
			JSON.stringify(arm.evaluation.measures),
			arm.evaluation.firstLossStage,
		],
	);
}

async function ensureIntervention(client: PoolClient, arm: ComparisonEvidenceArm) {
	const contentHash = hashCanonical(arm.intervention);
	const result = await client.query<{ content_hash: string }>(
		`INSERT INTO evidence_intervention (intervention_id, version, content_hash, specification)
		 VALUES ($1, $2, $3, $4::jsonb)
		 ON CONFLICT (intervention_id, version) DO NOTHING
		 RETURNING content_hash`,
		[arm.intervention.id, arm.intervention.version, contentHash, JSON.stringify(arm.intervention)],
	);
	if (result.rowCount === 1) return;
	const existing = await client.query<{ content_hash: string }>(
		"SELECT content_hash FROM evidence_intervention WHERE intervention_id = $1 AND version = $2",
		[arm.intervention.id, arm.intervention.version],
	);
	if (existing.rows[0]?.content_hash !== contentHash) {
		throw new EvidenceLedgerError(
			"LEDGER_CONFLICT",
			`Intervention ${arm.intervention.id}@${arm.intervention.version} has conflicting evidence.`,
		);
	}
}

function parseStoredRecord(value: unknown) {
	return parseComparisonEvidenceRecord(value);
}

function unavailable(message: string, cause: unknown) {
	return new EvidenceLedgerError("LEDGER_UNAVAILABLE", message, { cause });
}
