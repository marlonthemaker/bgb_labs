# HSD Issue Backlog

An issue is the reviewable unit of delivery: one bounded outcome, one branch,
and normally one pull request. The [product roadmap](../ROADMAP.md) defines the
sequence; each issue file owns its status, executable specification, and durable
Completion Record. This index is a derived view validated by
`pnpm verify:repo`.

## Workflow

```text
specify -> test plan -> approve analysis -> implement -> QA -> update docs/spec
  -> record completion -> prepare the next dependent issue
```

Use [TEMPLATE.md](TEMPLATE.md) for every new issue. Do not call a planned test
evidence: it becomes evidence only after it has passed and is recorded in the
issue and [`TESTING.md`](../TESTING.md).

## Backlog

| Issue | Status | Depends on | Outcome |
| --- | --- | --- | --- |
| [HSD-001](HSD-001-workspace-foundation.md) | Complete | — | Workspace, package boundary, app shell, and disclosure. |
| [HSD-002](HSD-002-assured-task-runtime.md) | Complete | HSD-001 | Validated, deterministic, evidence-producing task runtime. |
| [HSD-003](HSD-003-deterministic-hotel-shoreline-vertical-slice.md) | Complete | HSD-002 | Synthetic fixture, typed tools, and one English vertical slice. |
| [HSD-004](HSD-004-controlled-planning-boundary.md) | Complete | HSD-003 | Gemini/Genkit Taskmaster event-to-outcome workflow on Cloud Run. |
| [HSD-005](HSD-005-native-adoption-comparison.md) | Complete | HSD-004 | Pre-registered, matched baseline/intervention study across versioned authored-language variants. |
| [HSD-007](HSD-007-evidence-ledger.md) | In review | HSD-005, SEC-001 | Privacy-safe PostgreSQL evidence ledger; background execution remains deferred. |
| [HSD-006](HSD-006-evidence-experience.md) | Planned | HSD-005, HSD-007 | Inspectable comparison, lifecycle, and export experience. |
| [HSD-008](HSD-008-submission-release.md) | Planned | HSD-006, HSD-007 | Reproducible submission package. |

## Active next step

HSD-007 is in review with local memory/PostgreSQL/API evidence complete. Its
pinned CI PostgreSQL gate and deployed Cloud SQL proof remain before closure;
no later issue or background-delivery work is active.

## Repository maintenance

| Issue | Status | Outcome |
| --- | --- | --- |
| [REP-001](REP-001-repository-research-consolidation.md) | Complete | Consolidated active documentation/research authority and removed superseded artifacts without changing runtime behavior. |
| [REP-002](REP-002-active-tree-hygiene.md) | Complete | Removed residual duplicates, machine-checks repository authority, and makes the default test gate explicitly provider-free. |

## Security maintenance

| Issue | Status | Outcome |
| --- | --- | --- |
| [SEC-001](SEC-001-release-security-baseline.md) | Complete | Harden SDK/HTTP trust boundaries and establish the release dependency/repository security baseline. |
