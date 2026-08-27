import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, resolve } from "node:path";

const root = process.cwd();
const trackedFiles = execFileSync(
	"git",
	["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
	{
		cwd: root,
		encoding: "utf8",
	},
)
	.split("\0")
	.filter((file) => file && existsSync(resolve(root, file)));
const failures = [];
const fail = (message) => failures.push(message);
const read = (file) => readFileSync(resolve(root, file), "utf8");

const duplicateNamePattern = /(?:^|\/)[^/]*(?: copy| \d+|\.bak|\.backup|~)(?:\.[^/]*)?$/i;
for (const file of trackedFiles) {
	if (duplicateNamePattern.test(file)) fail(`duplicate-style tracked path: ${file}`);
}

for (const generatedHint of ["hotel_shoreline/AGENTS.md", "hotel_shoreline/CLAUDE.md"]) {
	if (trackedFiles.includes(generatedHint))
		fail(`generated agent hint is tracked: ${generatedHint}`);
}

const markdownFiles = trackedFiles.filter((file) => extname(file).toLowerCase() === ".md");
const markdownHashes = new Map();
let relativeLinkCount = 0;
for (const file of markdownFiles) {
	const content = read(file);
	const hash = createHash("sha256").update(content).digest("hex");
	const matchingFile = markdownHashes.get(hash);
	if (matchingFile) fail(`exact Markdown duplicate: ${matchingFile} and ${file}`);
	else markdownHashes.set(hash, file);

	for (const match of content.matchAll(/\[[^\]]*\]\((<?[^)]+>?)\)/g)) {
		const rawTarget = match[1].replace(/^</, "").replace(/>$/, "");
		if (/^(?:https?:|mailto:|#)/.test(rawTarget)) continue;
		const pathTarget = rawTarget.split("#", 1)[0];
		if (!pathTarget) continue;
		relativeLinkCount += 1;
		let decodedTarget;
		try {
			decodedTarget = decodeURIComponent(pathTarget);
		} catch {
			fail(`invalid encoded Markdown link in ${file}: ${rawTarget}`);
			continue;
		}
		if (!existsSync(resolve(root, dirname(file), decodedTarget))) {
			fail(`broken relative Markdown link in ${file}: ${rawTarget}`);
		}
	}
}

const issueFiles = trackedFiles.filter((file) => /^issues\/(?:HSD|REP|SEC)-\d+.*\.md$/.test(file));
const issueIndex = read("issues/README.md");
const indexedStatuses = new Map();
for (const match of issueIndex.matchAll(/^\| \[[^\]]+\]\(([^)]+)\) \| ([^|]+?) \|/gm)) {
	indexedStatuses.set(`issues/${match[1]}`, match[2].trim());
}

const allAcceptanceIds = new Set();
const completedAcceptanceIds = new Set();
for (const file of issueFiles) {
	const content = read(file);
	const status = content.match(/^\*\*Status:\*\* (.+)$/m)?.[1].trim();
	if (!status) {
		fail(`issue has no status metadata: ${file}`);
		continue;
	}
	if (indexedStatuses.get(file) !== status) {
		fail(
			`issue index status mismatch for ${file}: issue=${status}, index=${indexedStatuses.get(file) ?? "missing"}`,
		);
	}
	const acceptanceSection =
		content.split("## Acceptance criteria", 2)[1]?.split("\n## ", 1)[0] ?? "";
	const ids = [...acceptanceSection.matchAll(/\b(?:HSD\d+|REP\d+|SEC\d+)-[A-Z]+-\d{3}\b/g)].map(
		(match) => match[0],
	);
	for (const id of ids) {
		allAcceptanceIds.add(id);
		if (status === "Complete") completedAcceptanceIds.add(id);
	}
}

const testingConvention = read("TESTING.md");
for (const id of completedAcceptanceIds) {
	if (!testingConvention.includes(id))
		fail(`completed acceptance ID missing from TESTING.md: ${id}`);
}

const testFiles = trackedFiles.filter((file) => /(?:\.test\.[cm]?ts|\.spec\.tsx?)$/.test(file));
for (const file of testFiles) {
	for (const match of read(file).matchAll(/\b(?:HSD\d+|REP\d+|SEC\d+)-[A-Z]+-\d{3}\b/g)) {
		if (!allAcceptanceIds.has(match[0])) {
			fail(`test ${file} references unknown acceptance ID: ${match[0]}`);
		}
	}
}

for (const file of trackedFiles.filter((path) => /\.(?:ts|tsx)$/.test(path))) {
	const content = read(file);
	if (/from\s+["'][^"']*(?:research|docs)\//.test(content)) {
		fail(`runtime source imports documentation/research: ${file}`);
	}
}

if (failures.length > 0) {
	console.error(`Repository verification failed (${failures.length}):`);
	for (const failure of failures) console.error(`- ${failure}`);
	process.exitCode = 1;
} else {
	console.log(
		`Repository verification passed: ${trackedFiles.length} tracked files, ${markdownFiles.length} Markdown files, ${relativeLinkCount} relative links, ${issueFiles.length} issues, ${completedAcceptanceIds.size} completed acceptance IDs.`,
	);
}
