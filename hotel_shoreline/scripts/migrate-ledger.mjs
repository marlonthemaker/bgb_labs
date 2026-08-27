import { readFile } from "node:fs/promises";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL?.trim();
if (!connectionString) throw new Error("DATABASE_URL is required for ledger migration.");
const url = new URL(connectionString);
if (url.protocol !== "postgres:" && url.protocol !== "postgresql:") {
	throw new Error("DATABASE_URL must use PostgreSQL.");
}

const pool = new Pool({
	connectionString,
	max: 1,
	connectionTimeoutMillis: 5_000,
	allowExitOnIdle: true,
});
try {
	const migration = await readFile(
		new URL("../migrations/001_evidence_ledger.sql", import.meta.url),
		"utf8",
	);
	await pool.query(migration);
	console.log("Applied Hotel Shoreline evidence-ledger migration 001.");
} finally {
	await pool.end();
}
