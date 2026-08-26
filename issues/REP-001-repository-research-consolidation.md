# REP-001 — Consolidate Repository and Research Authority

**Status:** Complete
**Repository:** workspace
**Depends on:** HSD-005
**Branch:** `docs/repo-research-consolidation`

## Outcome

Provide one discoverable repository structure and authority chain for HSD,
Native Agent, Hotel Shoreline, and native-adoption research. Preserve durable
canon and Git provenance while removing duplicate, generated, and superseded
active artifacts. This issue changes documentation and repository organization;
it does not change runtime behavior or authorize the Iberia field study.

## Scope

In scope:

- [x] Close HSD-005 delivery records after PR #3.
- [x] Move durable canon and decisions out of `initial_spike/`.
- [x] Add research and shared-documentation indexes.
- [x] Record the migration and authority decision.
- [x] Remove superseded MR-0, duplicate archive, and generated provenance files.
- [x] Reconcile active links, status, roadmaps, ignore rules, and agent guidance.
- [x] Verify the consolidated tree and complete delivery records.

Out of scope:

- HSD-007 persistence implementation;
- public-agent execution, operator contact, or research publication;
- rewriting HSD runtime code;
- removing historical objects from Git history; and
- choosing a package license or public release policy.

## Acceptance criteria

| ID | Observable criterion | Test layer | Evidence location |
| --- | --- | --- | --- |
| REP1-A-001 | Active documentation resolves to one authority chain and has no operational link to the removed `initial_spike/` tree. | Documentation QA | Link/reference audit and root/research indexes. |
| REP1-A-002 | Durable canon, accepted decisions, and migration disposition remain inspectable. | Documentation QA | `research/canon/`, `docs/decisions/D001..D003`. |
| REP1-A-003 | Superseded MR-0 and duplicate/generated archives are absent from the active tree but recoverable through Git. | Repository QA | Git diff and D003 migration register. |
| REP1-A-004 | HSD-005 is truthful and complete; HSD-007 alone is ready for analysis; the Iberia study is pre-pilot and unauthorized for execution. | Documentation QA | Issue index, roadmaps, README, study README. |
| REP1-A-005 | Runtime verification remains unchanged and passes after consolidation. | Full gate | Commands in Completion Record. |

## Test and QA strategy

- Run stale-reference and relative-link audits over tracked Markdown.
- Verify expected active directories and absence of `initial_spike/`.
- Run Biome, TypeScript, unit/integration/E2E/coverage, and production build.
- Inspect the Git diff, rename detection, secret patterns, and whitespace.
- Confirm container/cloud ignore files exclude research rather than a deleted
  directory.

## Current acceptance status

| Acceptance ID | State | Evidence |
| --- | --- | --- |
| REP1-A-001 | Locally verified | All relative Markdown links resolve; active indexes point to the new authority chain. |
| REP1-A-002 | Locally verified | Ten canon files, D001–D003, and the migration register are present. |
| REP1-A-003 | Locally verified | `initial_spike/` is absent; removed files remain in Git history before this change. |
| REP1-A-004 | Locally verified | HSD-005 is complete, HSD-007 is ready for analysis, and Iberia remains pre-pilot. |
| REP1-A-005 | Locally verified | Full deterministic gate and production build pass unchanged. |

## Design and security constraints

- Git history is the recovery mechanism; do not rewrite history.
- Raw or private research evidence remains ignored or access-controlled.
- Research files never enter the runtime dependency or Cloud build context.
- Historical decisions remain append-only; D003 supersedes their operational
  paths without altering their recorded rationale.

## Verification

```sh
pnpm check
pnpm typecheck
pnpm test:all
pnpm build
git diff --check
```

## Completion Record

**Completed date:** 2026-08-26.

**Implementation summary:** Migrated durable canon and accepted decisions,
added current research/shared-doc indexes, reconciled HSD and Iberia status,
grouped cross-project documentation by ownership, removed the audited obsolete
spike, and updated cloud/container ignore boundaries. Runtime code did not
change.

**Acceptance evidence:** 171 former `initial_spike` files were audited; ten
canon files and two accepted decisions moved into active owners, while
superseded/duplicate artifacts were removed from the worktree. D003 records
disposition and Git is the recovery path. All tracked relative Markdown links
resolve and the removed path has no operational link.

**QA commands and results:**

- `pnpm check` — passed, 60 files.
- `pnpm typecheck` — passed for both packages.
- `pnpm test:all` — passed: 54 unit tests, 25 integration tests, and 10
  deterministic browser tests; 3 credentialed provider tests skipped by design.
- SDK coverage — statements 94.47%, branches 87.69%, functions 96.77%, lines
  94.40%.
- Hotel Shoreline coverage — statements 91.16%, branches 86.36%, functions
  100%, lines 93.36%.
- `pnpm build` — passed for the SDK and Hotel Shoreline; `/`,
  `/api/taskmaster`, and `/api/native-adoption` built.
- Relative Markdown link audit — passed.
- `git diff --check`, staged-diff, and secret-pattern scans — passed with no
  findings.

**Known limitations / follow-up:** Git history is intentionally larger than the
active tree; no history rewrite was attempted. D001 and D002 retain historical
paths/status and are superseded operationally by D003. The Iberia package is a
proposal, not authorization or field evidence. Provider tests were not rerun
because this issue does not change runtime behavior and they consume external
quota.

**Docs updated:** Root and package READMEs/roadmaps, testing/agent guidance,
architecture/product/operations documents, HSD issue records, research canon,
Iberia study, decision index, and REP-001.

**Next issue readiness:** HSD-007 is ready for analysis. `AILITW-001` remains
deferred until HSD-008.

## Branch, commits, and review

**Branch used:** `docs/repo-research-consolidation`

**Commits:**

- `983d050 docs(research): consolidate native-adoption authority [REP-001]`
- `ec927b4 docs(workspace): reconcile repository status and guidance [REP-001]`
- `ec6d2ea docs(workspace): record consolidation verification [REP-001]`

**Review / PR:** [PR #4](https://github.com/marlonthemaker/bgb_labs/pull/4)
passed the `verify` check in 1m45s and merged as `734eebf`.
