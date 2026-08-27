import { type ComparisonEvidenceRecord, parseComparisonEvidenceRecord } from "./records";
import { EvidenceLedgerError, type EvidenceLedgerRepository } from "./repository";

export class InMemoryEvidenceLedgerRepository implements EvidenceLedgerRepository {
	readonly #records = new Map<string, ComparisonEvidenceRecord>();

	async append(record: ComparisonEvidenceRecord) {
		const existing = this.#records.get(record.comparisonId);
		if (existing) {
			if (existing.contentHash === record.contentHash) return { outcome: "replayed" as const };
			throw new EvidenceLedgerError(
				"LEDGER_CONFLICT",
				`Comparison ${record.comparisonId} already has different immutable evidence.`,
			);
		}
		const parsed = parseComparisonEvidenceRecord(record);
		if (!parsed) {
			throw new EvidenceLedgerError("INVALID_EVIDENCE_RECORD", "Evidence record is invalid.");
		}
		this.#records.set(parsed.comparisonId, parsed);
		return { outcome: "inserted" as const };
	}

	async get(comparisonId: string) {
		const record = this.#records.get(comparisonId);
		return record === undefined
			? undefined
			: parseComparisonEvidenceRecord(structuredClone(record));
	}

	async list(input: { readonly limit: number }) {
		if (!Number.isSafeInteger(input.limit) || input.limit < 1 || input.limit > 100) {
			throw new EvidenceLedgerError("INVALID_LEDGER_QUERY", "List limit must be from 1 to 100.");
		}
		return [...this.#records.values()]
			.sort(
				(left, right) =>
					Date.parse(right.recordedAt) - Date.parse(left.recordedAt) ||
					left.comparisonId.localeCompare(right.comparisonId),
			)
			.slice(0, input.limit)
			.map(
				(record) =>
					parseComparisonEvidenceRecord(structuredClone(record)) as ComparisonEvidenceRecord,
			);
	}

	async close() {}
}
