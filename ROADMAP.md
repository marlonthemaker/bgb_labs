# HSD Product Roadmap

HSD is a staged proof that Native Agent can make a constrained operational
request inspectable from decomposition through verified outcome. The reusable
SDK stays domain-neutral; Hotel Shoreline is a synthetic, fictional
demonstration. This roadmap sequences work so each stage earns the complexity
of the next one.

The [issue backlog](issues/README.md) is the authoritative execution record.
Every issue holds its acceptance IDs, test strategy, error behavior, scope
limits, and completion record.

## Delivery sequence

| Stage | Issues | Product outcome | Quality gate |
| --- | --- | --- | --- |
| Foundation | HSD-001–002 | Strict workspace and fail-closed deterministic task runtime. | SDK contracts, errors, execution evidence, and test gates pass. |
| Deterministic proof | HSD-003 | One synthetic English hotel request runs end to end without a model. | Fresh state, typed tools, truthful evidence, browser proof. |
| Controlled planning | HSD-004 | Provider-neutral planning produces a graph that the SDK validates. | Malformed, timed-out, and unsafe provider output fails closed. |
| Native adoption proof | HSD-005 | Matched native-language requests expose task/decomposition differences. | Frozen conditions, review state, no research overclaim. |
| Evidence experience | HSD-006 | Accessible run experience exports reproducible evidence. | Failure states, privacy-safe export, responsive E2E coverage. |
| Delivery hardening | HSD-007 | Optional Cloud Run path provides safe asynchronous execution. | Authenticated worker, idempotent retries, cost/security review. |
| Submission release | HSD-008 | Reproducible hackathon submission and recorded limitations. | Full verification and disclosure review. |

## Dependency flow

```text
HSD-001 -> HSD-002 -> HSD-003 -> HSD-004 -> HSD-005 -> HSD-006 -> HSD-008
                                      \-> HSD-007 --------------------/
```

HSD-007 is optional unless the selected hackathon deployment requires it. It
must not delay the deterministic proof or comparison work.

## Exit principles

- Do not introduce a model before the deterministic no-model slice is proven.
- Do not make multilingual claims before contracts, fixture conditions, and
  review status are frozen and visible.
- Do not add persistence or cloud queues before the local evidence flow is
  reliable and its failure behavior is understood.
- Do not mark an issue complete until its specification, tests, QA evidence,
  package docs, backlog status, and next-issue readiness agree.
