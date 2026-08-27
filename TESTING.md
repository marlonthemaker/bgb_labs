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

HSD-007 adds a real PostgreSQL contract gate. Ordinary local runs skip that one
adapter suite when `HSD_TEST_DATABASE_URL` is absent; CI supplies a pinned
PostgreSQL 17 service, and `pnpm test:postgres` fails immediately unless the
server-only test URL is present. SQL mocks do not satisfy HSD7-R-004.

GitHub Actions runs the same formatter/type/test/build gate on pull requests
and pushes to `main`, plus the time-bounded production dependency audit. A local
pass and a CI pass are distinct evidence; record
both when closing an issue. The repository-pinned pnpm version must be installed
before setup-node enables pnpm caching.

Next.js 16 generates `next-env.d.ts`; it is ignored and not tracked per the
installed framework documentation. Hotel Shoreline's `pretypecheck` runs
`next typegen`, so clean clones receive the declarations before `tsc` without
creating recurring dev/build Git drift.

The ordinary `pnpm test:e2e` command always starts a fresh server in explicit
deterministic mode. `pnpm test:e2e:gemini` and its `:comparison` and `:matrix`
variants always start a fresh server in explicit Gemini mode and remain opt-in.
Browser evidence is therefore
independent of a developer's `.env.local` planner selection or an already
running development server.

Manual `pnpm meow` also forces deterministic mode. Provider testing must be an
explicit `pnpm meow:gemini` or `test:e2e:gemini*` action. Quota exhaustion is a
typed zero-operation result, not an automatic retry condition.

If port 3000 is occupied by a manual server, choose an unused test-only port
without stopping it, for example `HSD_E2E_PORT=3102 pnpm test:all`. The
Playwright configuration accepts only integer ports from 1024 through 65535 and
still refuses server reuse.

## HSD traceability

| Acceptance ID | Requirement | Test |
| --- | --- | --- |
| HSD1-F-001 | Root install, format, type, test, and build commands provide the workspace QA boundary. | Full verification gate and HSD-001 Completion Record. |
| HSD1-F-002 | The SDK dependency graph remains free of hotel, provider, cloud, and application dependencies. | Build/typecheck plus `pnpm verify:repo` dependency-direction audit. |
| HSD1-UI-001 | The demo visibly identifies itself as fictional, independent, and non-research. | `hotel_shoreline/e2e/foundation.spec.ts` |
| HSD2-C-001 | Non-object or non-JSON-safe contracts, graphs, nodes, and tool inputs are rejected with stable structured issues. | `contracts.unit.test.ts` |
| HSD2-C-002 | A graph preserves contract boundaries: identity, dependencies, tools, effects, constraints, acyclicity, and a callable tool registry. | `validation.unit.test.ts` |
| HSD2-C-003 | Validated plans execute in deterministic order and produce run evidence. | `executor.integration.test.ts` |
| HSD2-C-004 | Failed, blocked, skipped, rejected, unavailable-tool, thrown-tool, and replayed execution paths are explicit, ordered, and safe. | `executor.integration.test.ts` |
| HSD3-F-001, HSD3-T-001 | Synthetic fixture state is fresh per run; invalid input is non-mutating; adapter replay is idempotent. | `hotel_shoreline/src/unit/shoreline.unit.test.ts` |
| HSD3-F-002 | Maintenance and housekeeping adapters accept only the frozen stay, room, and towel quantity. | `hotel_shoreline/src/unit/shoreline.unit.test.ts` |
| HSD3-F-003, HSD3-T-002 | The frozen contract and graph validate, execute in order, preserve exact inputs, and produce final state/evidence. | `hotel_shoreline/src/integration/shoreline.integration.test.ts` |
| HSD3-F-004, HSD3-UI-001 | A user-triggered fixed run renders graph, ordered evidence, statuses, outcome, and disclosure. | `hotel_shoreline/e2e/foundation.spec.ts` |
| HSD4-P-001 | Externally verified: the server-only Genkit adapter uses Gemini 3.5 Flash with minimal thinking and declared limits; the opt-in local smoke and deployed Cloud Run flow passed. | `hotel_shoreline/e2e/gemini.smoke.spec.ts`; production build; deployed evidence in `issues/HSD-004-controlled-planning-boundary.md` |
| HSD4-P-002, HSD4-P-004 | Externally verified: deterministic and deployed Gemini events are planned, SDK-validated, and executed without per-step direction; an unsafe proposal is rejected before execution. | `hotel_shoreline/src/integration/taskmaster.integration.test.ts`; deployed evidence in `issues/HSD-004-controlled-planning-boundary.md` |
| HSD4-P-003 | Externally verified: malformed, unsafe, unavailable, quota-exhausted, timeout, and budget failures fail closed locally; the deployed no-secret proof returned `PLANNER_UNAVAILABLE` with zero operations and a sanitized warning envelope. | `hotel_shoreline/src/unit/gemini-error.unit.test.ts`; `hotel_shoreline/src/integration/taskmaster.integration.test.ts`; `hotel_shoreline/src/unit/taskmaster-telemetry.unit.test.ts`; `hotel_shoreline/src/unit/genkit-logging.unit.test.ts`; deployed evidence in `issues/HSD-004-controlled-planning-boundary.md` |
| HSD4-C-001 | Cloud Run deployment uses bounded resources, scoped identities, sanitized telemetry, and recorded immutable deployment evidence. | `hotel_shoreline/src/unit/taskmaster-telemetry.unit.test.ts`; `hotel_shoreline/src/unit/genkit-logging.unit.test.ts`; deployment evidence in `issues/HSD-004-controlled-planning-boundary.md`. |
| HSD4-UI-001 | Externally verified: allowlisted candidate/lifecycle/outcome evidence, failures, malformed fallback, disclosures, and deployed desktop/390px layouts passed. | `hotel_shoreline/src/unit/taskmaster-view.unit.test.ts`; `hotel_shoreline/e2e/foundation.spec.ts`; deployed evidence in `issues/HSD-004-controlled-planning-boundary.md` |
| HSD5-D-001, HSD5-D-002 | Locally and CI verified: three case families and nine version-linked authored variants retain review state, provenance, and limitations; prose may evolve without weakening structural tests. | `hotel_shoreline/src/unit/native-adoption/cases.unit.test.ts`; `hotel_shoreline/e2e/native-adoption.spec.ts` |
| HSD5-I-001 | Locally and CI verified: control and intervention conditions are versioned, immutable, and declare target failure, mechanism, activation, regression, and rollback conditions. | `hotel_shoreline/src/unit/native-adoption/interventions.unit.test.ts` |
| HSD5-E-001, HSD5-E-003 | Locally and CI verified: paired conditions differ only by declared guidance; invalid, timed-out, quota-exhausted, failed, pending-review, or non-comparable attempts are retained with exclusions and zero unsafe operations. | `hotel_shoreline/src/unit/gemini-error.unit.test.ts`; `hotel_shoreline/src/unit/native-adoption/conditions.unit.test.ts`; `hotel_shoreline/src/integration/native-adoption.integration.test.ts`; `hotel_shoreline/e2e/native-adoption.spec.ts`; `hotel_shoreline/e2e/gemini-native-adoption.smoke.spec.ts` |
| HSD5-E-002 | Locally and CI verified: seven named deterministic measures retain numerators/denominators and derive from hash-linked versioned evidence, not model self-assessment. | `hotel_shoreline/src/unit/native-adoption/evaluation.unit.test.ts`; `hotel_shoreline/src/unit/native-adoption/view.unit.test.ts` |
| HSD5-UI-001 | Locally and CI verified: browser users inspect source turns, review state, contract, conditions, graphs, lifecycle, validation, operations, diagnosis, measures, and limitations. | `hotel_shoreline/e2e/native-adoption.spec.ts` |
| HSD7-R-001 | Locally verified; CI pending: in-memory and PostgreSQL adapters obey one append-only/idempotent/conflict/order contract, including concurrent replay. | `hotel_shoreline/src/integration/evidence-ledger.contract.ts`; in-memory and PostgreSQL suites. |
| HSD7-R-002 | Locally verified; CI pending: versioned immutable comparison evidence preserves required provenance and hashes without secrets. | `hotel_shoreline/src/unit/evidence-ledger/records.unit.test.ts` |
| HSD7-R-003 | Locally verified; CI pending: server-only repository configuration and sanitized history APIs expose typed failures only. | `hotel_shoreline/src/unit/evidence-ledger/config.unit.test.ts`; `hotel_shoreline/src/unit/evidence-ledger/view.unit.test.ts`; `hotel_shoreline/e2e/evidence-ledger.spec.ts` |
| HSD7-R-004 | Locally verified against PostgreSQL 17.8; CI pending: forward-only migrations and repository contract use real PostgreSQL. | `hotel_shoreline/src/integration/evidence-ledger.postgres.integration.test.ts` |
| HSD7-O-001 | Implemented; deployment verification pending: Cloud SQL operations, identity, retention/export, recovery, cost, and rollback boundary. | `hotel_shoreline/CLOUD_SQL.md`; `hotel_shoreline/migrations/README.md` |
| HSD7-Q-001 | In progress: full local/CI ledger QA and deployed persistence proof. | HSD-007 Completion Record. |
| SEC1-C-001 | Locally and CI verified: reject non-finite, cyclic, excessively deep, oversized, or uninspectable values at SDK parse boundaries without uncaught recursion. | `native_agent_sdk/src/unit/contracts.unit.test.ts` |
| SEC1-C-002 | Locally and CI verified: reject registry key/tool identity mismatch before execution while coherent registries remain executable. | `native_agent_sdk/src/unit/validation.unit.test.ts`; `native_agent_sdk/src/integration/executor.integration.test.ts` |
| SEC1-C-003 | Locally and CI verified: success and failure tool results are mutually exclusive at the type and execution boundaries. | `native_agent_sdk/src/unit/contracts.unit.test.ts`; SDK typecheck; `native_agent_sdk/src/integration/executor.integration.test.ts` |
| SEC1-W-001 | Locally and CI verified: browser responses carry the declared security headers and oversized/malformed API input fails with sanitized typed errors before provider execution. | `hotel_shoreline/src/unit/http-input.unit.test.ts`; `hotel_shoreline/e2e/security.spec.ts` |
| SEC1-D-001, SEC1-CI-001, SEC1-Q-001 | Locally and CI verified: aligned runtime/types, time-bounded audit disposition, immutable CI and live repository controls, and full deterministic gate. | Package/workflow configuration; `SECURITY.md`; SEC-001 Completion Record. |
| REP1-A-001, REP1-A-002, REP1-A-003, REP1-A-004, REP1-A-005 | Repository consolidation is verified through active-link/stale-reference audits, Git-recoverable migration evidence, and the unchanged full runtime gate. | `issues/REP-001-repository-research-consolidation.md`; repository QA commands in its Completion Record. |
| REP2-A-001, REP2-A-002, REP2-A-003, REP2-A-004, REP2-A-005, REP2-A-006, REP2-A-007 | Active-tree hygiene removes verified duplicate/stale surfaces, preserves current evidence owners, leaves runtime behavior unchanged, makes the ordinary E2E gate explicitly provider-free, and machine-checks authority drift. | `issues/REP-002-active-tree-hygiene.md`; `pnpm verify:repo`; repository QA commands in its Completion Record. |

## Writing rule

One test may cover related assertions within one acceptance criterion, but it
must not combine unrelated failure modes. Each new production branch requires
either an acceptance test or a documented reason it is unreachable.

The issue specification is not evidence by itself; the test must name the
acceptance ID and assert the observable behavior.

Language-review tests assert required locales, ordered non-empty turns,
version/provenance links, review metadata, and downstream operational
invariants. They deliberately do not assert exact authored prose. A qualified
reviewer can therefore improve wording in `cases.ts`, update its version/review
record, and reuse the same executable specifications. See
`hotel_shoreline/NATIVE_REVIEW_GUIDE.md`.

## Closure checklist

When an issue is complete, record the exact tests and commands run in its
Completion Record, update this traceability table, and document residual risk.
Then update the affected package roadmap, root roadmap, and issue index before
preparing the next issue.
