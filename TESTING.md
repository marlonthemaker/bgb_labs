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
| Unit | Isolated schema, validation, fixture, and tool-adapter rules | `native_agent_sdk/src/unit/`, `hotel_shoreline/src/unit/` | `pnpm test:unit` |
| Integration | SDK orchestration and application-owned deterministic tool ports | `native_agent_sdk/src/integration/`, `hotel_shoreline/src/integration/` | `pnpm test:integration` |
| End-to-end | User-visible app behavior in a real browser | `hotel_shoreline/e2e/` | `pnpm test:e2e` |

`pnpm test:all` runs every layer plus separate SDK and Hotel Shoreline core
coverage gates. Each core gate must meet at least 90% lines, statements, and
functions, and 80% branches. Provider adapters and presentation components use
integration/build or browser evidence where instrumentation would substitute a
mock for the behavior under test. A coverage number never substitutes for an
acceptance-oriented test.

GitHub Actions runs the same formatter/type/test/build gate on pull requests
and pushes to `main`. A local pass and a CI pass are distinct evidence; record
both when closing an issue. The repository-pinned pnpm version must be installed
before setup-node enables pnpm caching.

## HSD traceability

| Acceptance ID | Requirement | Test |
| --- | --- | --- |
| HSD1-UI-001 | The demo visibly identifies itself as fictional, independent, and non-research. | `hotel_shoreline/e2e/foundation.spec.ts` |
| HSD2-C-001 | Non-object or non-JSON-safe contracts, graphs, nodes, and tool inputs are rejected with stable structured issues. | `contracts.unit.test.ts` |
| HSD2-C-002 | A graph preserves contract boundaries: identity, dependencies, tools, effects, constraints, acyclicity, and a callable tool registry. | `validation.unit.test.ts` |
| HSD2-C-003 | Validated plans execute in deterministic order and produce run evidence. | `executor.integration.test.ts` |
| HSD2-C-004 | Failed, blocked, skipped, rejected, unavailable-tool, thrown-tool, and replayed execution paths are explicit, ordered, and safe. | `executor.integration.test.ts` |
| HSD3-F-001, HSD3-T-001 | Synthetic fixture state is fresh per run; invalid input is non-mutating; adapter replay is idempotent. | `hotel_shoreline/src/unit/shoreline.unit.test.ts` |
| HSD3-F-002 | Maintenance and housekeeping adapters accept only the frozen stay, room, and towel quantity. | `hotel_shoreline/src/unit/shoreline.unit.test.ts` |
| HSD3-F-003, HSD3-T-002 | The frozen contract and graph validate, execute in order, preserve exact inputs, and produce final state/evidence. | `hotel_shoreline/src/integration/shoreline.integration.test.ts` |
| HSD3-F-004, HSD3-UI-001 | A user-triggered fixed run renders graph, ordered evidence, statuses, outcome, and disclosure. | `hotel_shoreline/e2e/foundation.spec.ts` |
| HSD4-P-001 | Implemented, not externally verified: the Genkit adapter is server-only, fixes Gemini 3.5 metadata, and applies the declared output-token configuration. The credentialed real-provider smoke is opt-in and skipped in CI. | `hotel_shoreline/e2e/gemini.smoke.spec.ts`; production build; procedure in `hotel_shoreline/CLOUD_RUN.md` |
| HSD4-P-002, HSD4-P-004 | Locally verified: a deterministic fixed event is planned, validated, and executed without per-step user direction; an unsafe tool proposal is rejected before execution. | `hotel_shoreline/src/integration/taskmaster.integration.test.ts` |
| HSD4-P-003 | Locally verified: malformed output/envelopes, malformed usage, unsafe candidates, timeout, unavailable planning, and turn/output-token/node budget breaches produce typed terminal results with zero scenario operations. | `hotel_shoreline/src/integration/taskmaster.integration.test.ts` |
| HSD4-UI-001 | Locally verified: the public projection whitelists candidate/lifecycle/outcome evidence; the browser renders the actual candidate, success lifecycle, typed planning failure, malformed-response fallback, zero-operation truth, and disclosures. | `hotel_shoreline/src/unit/taskmaster-view.unit.test.ts`; `hotel_shoreline/e2e/foundation.spec.ts` |
| HSD5-D-001, HSD5-D-002 | Planned: reviewed case/locale variants retain contract, expected-outcome, reviewer, and provenance links. | `hotel_shoreline/src/unit/native-adoption.unit.test.ts` |
| HSD5-I-001 | Planned: an intervention is versioned, immutable after use, and declares target failure, mechanism, activation, regression, and rollback conditions. | `hotel_shoreline/src/unit/intervention.unit.test.ts` |
| HSD5-E-001, HSD5-E-003 | Planned: paired baseline/intervention conditions are comparable; invalid or non-comparable runs are preserved and excluded by default. | `hotel_shoreline/src/integration/native-adoption.integration.test.ts` |
| HSD5-E-002 | Planned: deterministic measures are calculated from versioned evidence, not model self-assessment. | `hotel_shoreline/src/unit/measures.unit.test.ts` |
| HSD5-UI-001 | Planned: browser users can inspect conditions, evidence, diagnosis, measures, and limitations. | `hotel_shoreline/e2e/native-adoption.spec.ts` |
| HSD7-R-001, HSD7-R-002, HSD7-R-003 | Planned: append-only sanitized PostgreSQL run ledger, provenance, and server-only repository boundary. | `hotel_shoreline/src/integration/run-ledger.integration.test.ts` |
| HSD7-D-001, HSD7-D-002 | Planned if background delivery is enabled: authenticated duplicate-safe worker and terminal failure state. | `hotel_shoreline/src/integration/worker.integration.test.ts` |

## Writing rule

One test may cover related assertions within one acceptance criterion, but it
must not combine unrelated failure modes. Each new production branch requires
either an acceptance test or a documented reason it is unreachable.

The issue specification is not evidence by itself; the test must name the
acceptance ID and assert the observable behavior.

## Closure checklist

When an issue is complete, record the exact tests and commands run in its
Completion Record, update this traceability table, and document residual risk.
Then update the affected package roadmap, root roadmap, and issue index before
preparing the next issue.
