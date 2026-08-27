import { resolveEvidenceLedgerConfig } from "./config";
import { InMemoryEvidenceLedgerRepository } from "./in-memory";
import { EvidenceLedgerError, type EvidenceLedgerRepository } from "./repository";

let repositoryPromise: Promise<EvidenceLedgerRepository> | undefined;

export function getEvidenceLedgerRepository(): Promise<EvidenceLedgerRepository> {
	repositoryPromise ??= createRepository();
	return repositoryPromise;
}

async function createRepository(): Promise<EvidenceLedgerRepository> {
	try {
		const config = resolveEvidenceLedgerConfig(process.env);
		if (config.mode === "memory") return new InMemoryEvidenceLedgerRepository();
		const { PostgresEvidenceLedgerRepository } = await import("./postgres");
		return PostgresEvidenceLedgerRepository.fromConnectionString(config.connectionString);
	} catch (error) {
		throw new EvidenceLedgerError("LEDGER_UNAVAILABLE", "Evidence ledger setup failed.", {
			cause: error,
		});
	}
}
