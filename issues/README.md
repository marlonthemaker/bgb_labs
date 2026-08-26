# HSD Issue Backlog

An issue is the reviewable unit of delivery: one bounded outcome, one branch,
and normally one pull request. The [product roadmap](../ROADMAP.md) defines the
sequence; individual issue files define the executable specification and their
Completion Record is the durable close-out evidence.

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
| [HSD-004](HSD-004-controlled-planning-boundary.md) | In progress — external gates open | HSD-003 | Gemini/Genkit Taskmaster event-to-outcome workflow on Cloud Run. |
| [HSD-005](HSD-005-native-adoption-comparison.md) | Planned | HSD-004 | Pre-registered, matched baseline/intervention study across reviewed native-language variants. |
| [HSD-007](HSD-007-evidence-ledger.md) | Planned — required for comparison history | HSD-005 | Privacy-safe durable run ledger and optional asynchronous execution. |
| [HSD-006](HSD-006-evidence-experience.md) | Planned | HSD-005, HSD-007 | Inspectable comparison, lifecycle, and export experience. |
| [HSD-008](HSD-008-submission-release.md) | Planned | HSD-006, HSD-007 | Reproducible submission package. |

## Active next step

HSD-003 passed CI and merged through PR #1. HSD-004's deterministic gate,
server-sanitized evidence, structured telemetry, fail-closed boundaries, and
credentialed Gemini smoke now pass; PR #2 targets `main` and its current CI is
green. Capture the authorized Cloud Run revision, IAM, URL, and deployed smoke
proof, then merge PR #2 and close HSD-004. Do not start HSD-005 until that final
external gate and Completion Record are satisfied.
