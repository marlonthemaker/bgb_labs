import { describe, expect, it } from "vitest";

import { resolveEvidenceLedgerConfig } from "../../lib/evidence-ledger/config";

describe("HSD7-R-003: server-only evidence-ledger configuration", () => {
	it("defaults to an in-memory repository without a credential", () => {
		expect(resolveEvidenceLedgerConfig({})).toEqual({ mode: "memory" });
	});

	it("requires a PostgreSQL URL only when postgres mode is explicit", () => {
		expect(() => resolveEvidenceLedgerConfig({ HSD_LEDGER_MODE: "postgres" })).toThrowError(
			expect.objectContaining({ code: "LEDGER_CONFIGURATION_INVALID" }),
		);
		expect(
			resolveEvidenceLedgerConfig({
				HSD_LEDGER_MODE: "postgres",
				DATABASE_URL: "postgresql://ledger:secret@localhost:5432/shoreline",
			}),
		).toEqual({
			mode: "postgres",
			connectionString: "postgresql://ledger:secret@localhost:5432/shoreline",
		});
	});

	it("rejects unknown modes and non-PostgreSQL connection strings without echoing them", () => {
		for (const environment of [
			{ HSD_LEDGER_MODE: "firestore" },
			{ HSD_LEDGER_MODE: "postgres", DATABASE_URL: "https://user:secret@example.com" },
		]) {
			try {
				resolveEvidenceLedgerConfig(environment);
				throw new Error("Expected configuration failure.");
			} catch (error) {
				expect(error).toMatchObject({ code: "LEDGER_CONFIGURATION_INVALID" });
				expect(String(error)).not.toContain("secret");
			}
		}
	});
});
