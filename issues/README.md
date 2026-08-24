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
| [HSD-003](HSD-003-deterministic-hotel-shoreline-vertical-slice.md) | Ready for analysis | HSD-002 | Synthetic fixture, typed tools, and one English vertical slice. |
| [HSD-004](HSD-004-controlled-planning-boundary.md) | Planned | HSD-003 | Provider-neutral structured planning boundary. |
| [HSD-005](HSD-005-native-adoption-comparison.md) | Planned | HSD-004 | Matched native-language task/decomposition comparison. |
| [HSD-006](HSD-006-evidence-experience.md) | Planned | HSD-005 | Inspectable, exportable, presentation-ready evidence experience. |
| [HSD-007](HSD-007-cloud-delivery-hardening.md) | Planned / optional | HSD-003 | Safe Cloud Run and asynchronous execution path. |
| [HSD-008](HSD-008-submission-release.md) | Planned | HSD-006, HSD-007 if used | Reproducible submission package. |

## Active next step

HSD-003 is the only issue ready to analyze. Inspect it and report the exact
implementation plan, risk, test strategy, and QA commands before editing.
