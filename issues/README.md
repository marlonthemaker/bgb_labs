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
| [HSD-004](HSD-004-controlled-planning-boundary.md) | Complete | HSD-003 | Gemini/Genkit Taskmaster event-to-outcome workflow on Cloud Run. |
| [HSD-005](HSD-005-native-adoption-comparison.md) | Ready for delivery — local/provider gates recorded | HSD-004 | Pre-registered, matched baseline/intervention study across versioned authored-language variants. |
| [HSD-007](HSD-007-evidence-ledger.md) | Planned — required for comparison history | HSD-005 | Privacy-safe durable run ledger and optional asynchronous execution. |
| [HSD-006](HSD-006-evidence-experience.md) | Planned | HSD-005, HSD-007 | Inspectable comparison, lifecycle, and export experience. |
| [HSD-008](HSD-008-submission-release.md) | Planned | HSD-006, HSD-007 | Reproducible submission package. |

## Active next step

HSD-004's local gates, credentialed Gemini smoke, Cloud Build, bounded Cloud Run
revision, least-privilege identity, deployed success and zero-operation failure
proof, sanitized logs, responsive UI, and PR #2 CI passed; PR #2 merged as
`36d02f6`. HSD-005 is active on
`feat/hsd-005-native-adoption-comparison`; its local implementation, full
repository gate, focused real-provider success, and nine-block attempt-retention
gate are recorded. Commit, run PR CI, merge, then prepare HSD-007 analysis.
