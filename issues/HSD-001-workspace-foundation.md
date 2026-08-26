# HSD-001 — Workspace Foundation

**Status:** Complete
**Repository:** both
**Depends on:** —
**Branch:** `chore/hsd-001-workspace-foundation`

## Outcome

Create a strict TypeScript workspace with a domain-neutral SDK package and a
fictional Hotel Shoreline application boundary.

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD1-F-001 | Workspace installs, formats, type-checks, tests, and builds through root commands. | QA |
| HSD1-F-002 | SDK has no hotel, provider, cloud, or application dependency. | Review / build |
| HSD1-UI-001 | The app visibly states fictional, non-affiliation, and non-research boundaries. | E2E |

## Test and error strategy

Build/type failures stop the gate. The browser test proves the visible
disclosure. Tooling configuration rejects unsafe type bypasses through strict
TypeScript and Biome checks.

## Completion Record

**Implementation summary:** pnpm workspace, strict shared TypeScript config,
Biome, SDK skeleton, Next.js shell, and Playwright disclosure proof.
**Acceptance evidence:** `hotel_shoreline/e2e/foundation.spec.ts`; root quality
scripts and CI workflow.
**Known limitations:** No operational fixture or model workflow exists.
**Next issue readiness:** HSD-002 and HSD-003 subsequently completed; HSD-004
is in progress on a branch rebased onto `main`.

### QA amendment — 2026-08-24

The first GitHub runs failed before installation because `actions/setup-node`
requested pnpm caching before pnpm existed on `PATH`. The workflow now installs
the repository-pinned pnpm version with `pnpm/action-setup` before configuring
the setup-node cache. The corrected `verify` workflow passed on PR #1 before it
merged on 2026-08-24.
