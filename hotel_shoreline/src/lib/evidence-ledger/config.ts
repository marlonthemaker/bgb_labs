export type EvidenceLedgerConfig =
	| { readonly mode: "memory" }
	| { readonly mode: "postgres"; readonly connectionString: string };

export class EvidenceLedgerConfigurationError extends Error {
	readonly code = "LEDGER_CONFIGURATION_INVALID";

	constructor(message: string) {
		super(message);
		this.name = "EvidenceLedgerConfigurationError";
	}
}

export function resolveEvidenceLedgerConfig(
	environment: Readonly<Record<string, string | undefined>>,
): EvidenceLedgerConfig {
	const mode = environment.HSD_LEDGER_MODE?.trim() || "memory";
	if (mode === "memory") return { mode };
	if (mode !== "postgres") {
		throw new EvidenceLedgerConfigurationError("HSD_LEDGER_MODE must be memory or postgres.");
	}
	const connectionString = environment.DATABASE_URL?.trim();
	if (!connectionString || !isPostgresUrl(connectionString)) {
		throw new EvidenceLedgerConfigurationError(
			"Postgres ledger mode requires a valid server-only PostgreSQL connection URL.",
		);
	}
	return { mode, connectionString };
}

function isPostgresUrl(value: string): boolean {
	try {
		const url = new URL(value);
		return (url.protocol === "postgres:" || url.protocol === "postgresql:") && url.hash === "";
	} catch {
		return false;
	}
}
