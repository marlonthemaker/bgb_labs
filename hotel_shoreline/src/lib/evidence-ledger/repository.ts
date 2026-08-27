import type { ComparisonEvidenceRecord } from "./records";

export interface EvidenceLedgerRepository {
	append(record: ComparisonEvidenceRecord): Promise<{ readonly outcome: "inserted" | "replayed" }>;
	get(comparisonId: string): Promise<ComparisonEvidenceRecord | undefined>;
	list(input: { readonly limit: number }): Promise<readonly ComparisonEvidenceRecord[]>;
	close(): Promise<void>;
}

export type EvidenceLedgerErrorCode =
	| "INVALID_EVIDENCE_RECORD"
	| "INVALID_LEDGER_QUERY"
	| "LEDGER_CONFLICT"
	| "LEDGER_UNAVAILABLE";

export class EvidenceLedgerError extends Error {
	constructor(
		readonly code: EvidenceLedgerErrorCode,
		message: string,
		options?: ErrorOptions,
	) {
		super(message, options);
		this.name = "EvidenceLedgerError";
	}
}
