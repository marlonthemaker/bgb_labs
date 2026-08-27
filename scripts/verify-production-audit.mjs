import { spawnSync } from "node:child_process";

const acceptedAdvisories = new Map([
	["GHSA-w5hq-g745-h8pq", "2026-09-30"],
	["GHSA-q7rr-3cgh-j5r3", "2026-09-30"],
	["GHSA-45rx-2jwx-cxfr", "2026-09-30"],
	["GHSA-8988-4f7v-96qf", "2026-09-30"],
]);

const result = spawnSync("pnpm", ["audit", "--prod", "--json"], {
	encoding: "utf8",
	maxBuffer: 10 * 1_024 * 1_024,
});
if (result.error) throw result.error;

let report;
try {
	report = JSON.parse(result.stdout);
} catch {
	throw new Error(`pnpm audit did not return valid JSON: ${result.stderr.trim()}`);
}

const advisories = Object.values(report.advisories ?? {});
const today = new Date().toISOString().slice(0, 10);
const unexpected = [];
for (const advisory of advisories) {
	const identifier = advisory.url?.match(/GHSA-[\w-]+/)?.[0];
	const expiry = identifier === undefined ? undefined : acceptedAdvisories.get(identifier);
	if (identifier === undefined || expiry === undefined) {
		unexpected.push(`${advisory.severity ?? "unknown"} ${advisory.url ?? advisory.title}`);
		continue;
	}
	if (today > expiry) unexpected.push(`${identifier} mitigation expired ${expiry}`);
}

if (unexpected.length > 0) {
	throw new Error(`Production dependency audit needs review:\n- ${unexpected.join("\n- ")}`);
}

const counts = report.metadata?.vulnerabilities ?? {};
console.log(
	`Production audit disposition verified: ${advisories.length} advisory records ` +
		`(${counts.high ?? 0} high, ${counts.moderate ?? 0} moderate instances); ` +
		"all current families are time-bounded in docs/operations/DEPENDENCY_RISK.md.",
);
