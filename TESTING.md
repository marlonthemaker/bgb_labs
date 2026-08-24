# HSD Testing Convention

Tests are executable specifications. Every behavior-changing issue adds an
acceptance identifier to its specification and cites that identifier in the
test name. Tests state the condition, action, and observable outcome; comments
only explain a non-obvious domain or safety decision.

## Issue test planning

Before implementation, the active issue must identify its unit, integration,
and browser/API coverage as applicable. The issue must also identify boundary
inputs, invalid state, dependency failure, timeout/cancellation (when present),
and externally observable error behavior. A test does not need to duplicate a
lower layer, but every acceptance ID needs direct evidence at the lowest layer
that can prove it.

## Test layers

| Layer | Purpose | Location | Command |
| --- | --- | --- | --- |
| Unit | Isolated schema and validation rules | `native_agent_sdk/src/unit/` | `pnpm test:unit` |
| Integration | SDK orchestration through deterministic fake tool ports | `native_agent_sdk/src/integration/` | `pnpm test:integration` |
| End-to-end | User-visible app behavior in a real browser | `hotel_shoreline/e2e/` | `pnpm test:e2e` |

`pnpm test:all` runs every layer and the SDK coverage gate. New core code must
meet at least 90% lines, statements, and functions, and 80% branches. A
coverage number never substitutes for an acceptance-oriented test.

## HSD traceability

| Acceptance ID | Requirement | Test |
| --- | --- | --- |
| HSD1-UI-001 | The demo visibly identifies itself as fictional, independent, and non-research. | `hotel_shoreline/e2e/foundation.spec.ts` |
| HSD2-C-001 | Non-object or non-JSON-safe contracts, graphs, nodes, and tool inputs are rejected with stable structured issues. | `contracts.unit.test.ts` |
| HSD2-C-002 | A graph preserves contract boundaries: identity, dependencies, tools, effects, constraints, acyclicity, and a callable tool registry. | `validation.unit.test.ts` |
| HSD2-C-003 | Validated plans execute in deterministic order and produce run evidence. | `executor.integration.test.ts` |
| HSD2-C-004 | Failed, blocked, skipped, rejected, unavailable-tool, thrown-tool, and replayed execution paths are explicit, ordered, and safe. | `executor.integration.test.ts` |

## Writing rule

One test may cover related assertions within one acceptance criterion, but it
must not combine unrelated failure modes. Each new production branch requires
either an acceptance test or a documented reason it is unreachable.

When HSD-003 begins, add its acceptance IDs to this table in the same change as
its tests. The issue specification is not evidence by itself; the test must
name the acceptance ID and assert the observable behavior.

## Closure checklist

When an issue is complete, record the exact tests and commands run in its
Completion Record, update this traceability table, and document residual risk.
Then update the affected package roadmap, root roadmap, and issue index before
preparing the next issue.
