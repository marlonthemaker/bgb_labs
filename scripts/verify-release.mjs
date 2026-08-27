import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const failures = [];
const fail = (message) => failures.push(message);
const read = (file) => readFileSync(resolve(root, file), "utf8");

const releaseFiles = [
	"README.md",
	"LICENSE",
	"SECURITY.md",
	"docs/submission/README.md",
	"docs/architecture/BOUNDARIES.md",
	"docs/operations/DEPENDENCY_RISK.md",
	"docs/operations/GOOGLE_CLOUD_SETUP.md",
	"hotel_shoreline/CLOUD_RUN.md",
	"hotel_shoreline/CLOUD_SQL.md",
	"issues/HACKATHON-CONSTRAINTS.md",
	"issues/HSD-008-submission-release.md",
];

for (const file of releaseFiles) {
	if (!existsSync(resolve(root, file))) fail(`required release file is missing: ${file}`);
}

const trackedFiles = execFileSync(
	"git",
	["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
	{ cwd: root, encoding: "utf8" },
)
	.split("\0")
	.filter(Boolean);

const forbiddenPathPatterns = [
	/(?:^|\/)(?:node_modules|\.next|coverage|playwright-report|test-results)(?:\/|$)/,
	/(?:^|\/)\.env(?:$|\.(?!example$))/,
	/(?:^|\/)(?:service-account|gcloud-credentials)[^/]*\.json$/i,
	/\.(?:pem|p12|key)$/i,
];

for (const file of trackedFiles) {
	if (file === "hotel_shoreline/.env.example") continue;
	if (forbiddenPathPatterns.some((pattern) => pattern.test(file))) {
		fail(`forbidden release path: ${file}`);
	}
}

const secretPatterns = [
	{ label: "Google API key", pattern: /AIza[0-9A-Za-z_-]{30,}/ },
	{ label: "private key", pattern: /-----BEGIN (?:[A-Z ]+)?PRIVATE KEY-----/ },
	{ label: "GitHub token", pattern: /(?:gh[pousr]_|github_pat_)[A-Za-z0-9_]{30,}/ },
	{ label: "service-account private key", pattern: /"private_key"\s*:/ },
];

for (const file of trackedFiles) {
	const path = resolve(root, file);
	if (!existsSync(path)) continue;
	const buffer = readFileSync(path);
	if (buffer.includes(0)) continue;
	const content = buffer.toString("utf8");
	for (const { label, pattern } of secretPatterns) {
		if (pattern.test(content)) fail(`${label} pattern found in ${file}`);
	}
}

if (failures.length === 0) {
	const rootReadme = read("README.md");
	const submission = read("docs/submission/README.md");
	const constraints = read("issues/HACKATHON-CONSTRAINTS.md");
	const hotelPackage = JSON.parse(read("hotel_shoreline/package.json"));

	requireFragments("README.md", rootReadme, [
		"https://hotel-shoreline-7larmcl4aa-ew.a.run.app",
		"https://github.com/marlonthemaker/bgb_labs",
		"```mermaid",
		"Gemini 3.5 Flash",
		"Genkit",
		"Cloud Run",
		"Cloud SQL",
		"pnpm install --frozen-lockfile",
		"pnpm verify:release",
		"not affiliated with, endorsed by, or operated by Google",
	]);

	requireFragments("docs/submission/README.md", submission, [
		"Taskmaster",
		"August 31, 2026 at 5:00 PM PT",
		"https://hotel-shoreline-7larmcl4aa-ew.a.run.app",
		"https://github.com/marlonthemaker/bgb_labs",
		"Gemini 3.5 Flash",
		"Genkit",
		"Cloud Run",
		"Cloud SQL",
		"3:55",
		"Unedited live proof-of-action",
		"Owner action — public video URL",
		"Pre-existing work disclosure",
		"Third-party inventory",
		"pending_review",
		"not affiliated with, endorsed by, or operated by Google",
		"not a research finding",
	]);

	requireFragments("issues/HACKATHON-CONSTRAINTS.md", constraints, [
		"**Last verified:** 2026-08-27",
		"Innovation and operational utility — 40%",
		"Architectural discipline and stack — 30%",
		"Demo and production readiness — 30%",
	]);

	for (const dependency of Object.keys(hotelPackage.dependencies ?? {})) {
		if (dependency.startsWith("@bomgoodbueno/")) continue;
		if (!submission.includes(`\`${dependency}\``)) {
			fail(`direct production dependency missing from submission inventory: ${dependency}`);
		}
	}

	if (/\b(?:TODO|TBD|CHANGEME|INSERT URL|ADD URL)\b/i.test(submission)) {
		fail("submission package contains an ambiguous unresolved placeholder");
	}
}

if (failures.length > 0) {
	console.error(`Release verification failed (${failures.length}):`);
	for (const failure of failures) console.error(`- ${failure}`);
	process.exitCode = 1;
} else {
	console.log(
		`Release verification passed: ${releaseFiles.length} required artifacts, ${trackedFiles.length} release-visible paths, high-confidence secret scan, README/submission invariants, and direct production dependency inventory.`,
	);
}

function requireFragments(file, content, fragments) {
	const normalizedContent = content.replace(/\s+/g, " ");
	for (const fragment of fragments) {
		if (!normalizedContent.includes(fragment.replace(/\s+/g, " "))) {
			fail(`${file} is missing required release text: ${fragment}`);
		}
	}
}
