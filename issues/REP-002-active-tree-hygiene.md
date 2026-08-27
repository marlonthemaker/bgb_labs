# REP-002 — Tighten Active Repository Surface

**Status:** In review
**Repository:** workspace
**Depends on:** REP-001
**Branch:** `chore/rep-002-canonical-integrity-gate`

## Outcome

Leave one compact, future-facing authority chain with no Finder-style duplicate
files, duplicate empty directories, tracked generated-agent hints, or superseded
historical decisions competing with current guidance. Preserve implementation,
research, and delivery evidence that remains necessary to reproduce behavior or
interpret current claims.

This issue changes repository documentation, local hygiene, and the safety of
the default test command only. It does not change product runtime behavior,
begin HSD-007, authorize field research, rewrite Git history, or delete
completed issue evidence.

## Scope

In scope:

- remove exact or stale `* 2*` duplicates and empty duplicate directories;
- remove ignored local editor residue while retaining secrets and dependency
  caches needed by the user;
- retain accepted decisions with explicit supersession and add one current
  active-tree authority record;
- stop tracking framework-generated `hotel_shoreline/AGENTS.md` and
  `CLAUDE.md`, keep the necessary Next.js rule in root guidance, and ignore the
  generated files;
- remove mutable status and merge-history duplication from orientation and
  package roadmaps while retaining current capability and lifecycle links;
- remove inactive product terminology from the active glossary;
- force the ordinary E2E/full gate to remain deterministic even when a caller's
  shell exports the opt-in Gemini flag; and
- machine-check issue status, acceptance traceability, relative links,
  duplicate Markdown, generated hints, and dependency direction; and
- verify links, stale paths, duplicate names/content, secrets, and the unchanged
  runtime gate.

Out of scope:

- runtime source, dependencies, Cloud resources, Git history rewriting, active
  secrets, `node_modules`, or current generated build/test outputs;
- deletion of completed HSD/REP issue records, current research canon, the
  Iberia protocol/catalog, or operational runbooks with distinct ownership.

## Acceptance criteria

| ID | Observable criterion | Test layer | Evidence location |
| --- | --- | --- | --- |
| REP2-A-001 | The non-generated tree contains no duplicate-style `* 2*`, copy, backup, or empty duplicate paths. | Repository QA | Final filesystem audit. |
| REP2-A-002 | Active guidance resolves through current decisions and canon; accepted D001/D002 remain inspectable with explicit supersession metadata. | Documentation QA | D001–D004, decision index, stale-reference and link audits. |
| REP2-A-003 | Framework-generated package agent hint files are ignored and root guidance directly owns the required Next.js documentation rule. | Documentation QA | `.gitignore`, `AGENTS.md`, tracked-file audit. |
| REP2-A-004 | Root/package orientation describes current capabilities and lifecycle without duplicating mutable issue status or historical merge logs. | Documentation QA | README/roadmap review and status-owner audit. |
| REP2-A-005 | Runtime behavior remains unchanged and the complete verification gate passes. | Full gate | Completion Record. |
| REP2-A-006 | The ordinary E2E command explicitly disables real-provider smoke tests even when the caller exports the Gemini opt-in flag; provider suites remain available only through their named commands. | Test orchestration | Adversarial environment E2E run. |
| REP2-A-007 | One repository command fails when issue/index status, completed acceptance traceability, relative links, duplicate Markdown, generated hints, or runtime dependency direction drifts. | Repository QA | `scripts/verify-repository.mjs` and `pnpm verify:repo`. |

## Test and QA strategy

- Audit tracked/untracked/ignored names, empty directories, exact content
  hashes, zero-byte files, relative Markdown links, and inbound references.
- Search active guidance for removed paths, inactive terms, stale implementation
  language, and competing mutable status.
- Inspect `git diff --check`, deletion targets, and secret-like additions.
- Run `pnpm check`, `pnpm typecheck`, `pnpm test:all`, and `pnpm build`.
- Run ordinary E2E with the real-Gemini flag exported and verify that provider
  cases remain skipped and no provider request occurs.
- If an existing development server blocks E2E, use a validated alternate port
  without stopping the user's process.

## Failure behavior and recovery

- Do not delete a file until its active owner or Git recovery point is known.
- Preserve completed issue records and current runbooks when they contain unique
  acceptance, QA, deployment, or rollback evidence.
- Git history is the recovery mechanism for deleted tracked history; record the
  recovery commit in D004.
- Remove only explicit, verified local duplicate/residue paths. Do not use a
  broad recursive target or delete credentials, dependencies, or user data.

## Completion Record

**Completed date:** 2026-08-27

**Implementation summary:** Removed three untracked Finder-copy documents, 23
ignored duplicate coverage files, one duplicate test-result file, four
empty/editor-residue directories, and two generated package agent hints.
Retained D001/D002 as explicitly superseded ADRs, added D004 as the current
retention decision, and added an automated repository authority verifier;
trimmed duplicated delivery history, stale terminology, and superseded status
from root, package, canon, and study orientation; and forced ordinary E2E to
disable real-provider smoke tests explicitly.

**Acceptance evidence:**

- REP2-A-001: scoped active-tree audit returned no duplicate-style or empty
  paths; active Markdown had no exact-content duplicate.
- REP2-A-002: all 51 active Markdown files passed relative-link validation;
  stale-path/retired-term audit returned no unapproved active reference;
  D001/D002 identify D003/D004 as their successors.
- REP2-A-003: only root `AGENTS.md` remains in the tracked active tree after
  generated package hints are removed; `.gitignore` prevents their build/dev
  regeneration from becoming active guidance.
- REP2-A-004: individual issue metadata owns mutable status and
  `issues/README.md` is its machine-checked derived index.
- REP2-A-005: the complete deterministic local verification gate passed; no
  product runtime source changed.
- REP2-A-006: with `HSD_REAL_GEMINI_SMOKE=1` and
  `HSD_PLANNER_MODE=gemini` exported, ordinary `pnpm test:e2e` still selected
  `HSD_REAL_GEMINI_SMOKE=0`, passed 10 deterministic tests, skipped all 3
  provider tests, and made no provider request.
- REP2-A-007: `pnpm verify:repo` passed with 124 tracked/non-ignored files, 51
  Markdown files, 101 relative links, 11 issues, and 32 completed acceptance
  IDs.

**QA commands and results:**

- `pnpm check`: passed; 61 files checked plus the repository authority verifier.
- `pnpm typecheck`: passed for both workspace packages.
- `pnpm test:all`: passed in explicit deterministic mode. Unit: 54/54
  (SDK 13, Hotel Shoreline 41). Integration: 25/25 (SDK 5, Hotel Shoreline
  20). Coverage suites: SDK 18/18 and Hotel Shoreline 61/61. E2E: 10 passed,
  3 opt-in provider tests skipped.
- Coverage: SDK 94.47% statements, 87.69% branches, 96.77% functions, 94.40%
  lines; Hotel Shoreline 91.16% statements, 86.36% branches, 100% functions,
  93.36% lines. Both exceed the configured 90/80/90/90 thresholds.
- `pnpm build`: passed; SDK compiled and Next.js produced `/`, `/_not-found`,
  `/api/native-adoption`, and `/api/taskmaster`.
- Repository audits: 51 Markdown files checked with zero broken relative links;
  zero scoped duplicate-style paths, empty directories, exact Markdown
  duplicates, unapproved stale references, or secret-like added lines.
- `git diff --check`: passed.

An initial unqualified `pnpm test:all` inherited exported Gemini flags from the
caller environment, reached provider tests, and was stopped after 8 passes,
4 failures, and 1 interrupted test. No retry was made. That incident produced
REP2-A-006; the final adversarial and complete gates above passed with provider
execution disabled by the ordinary command itself.

**Known limitations / follow-up:** Git history, dependency caches, canonical
coverage/build outputs, completed issue evidence, current canon/studies, and
operational runbooks remain intentionally. Generated Next.js agent hints may
reappear locally after dev/build but are ignored and must not be treated as
repository authority. No CI, remote, deployment, or public-agent study was run.

**Docs updated:** Root README/roadmap/agent/testing guidance; shared docs and
decision index; SDK and Hotel Shoreline roadmaps/orientation; research canon
governance/glossary/orientation; Iberia integration guide; issue index; D004.

**Next issue readiness:** SEC-001 is the next audit-remediation issue. HSD-007
remains ready for analysis but follows the release-security baseline.

## Branch, commits, and review

**Branch used:** `chore/rep-002-canonical-integrity-gate`
**Commits:** Pending final delivery.
**Review / PR:** Pending PR checks and merge.
