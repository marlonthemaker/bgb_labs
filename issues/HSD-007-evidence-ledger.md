# HSD-007 — Portable Evidence Ledger

**Status:** Complete
**Repository:** `hotel_shoreline`
**Depends on:** HSD-005, SEC-001
**Branch:** `feat/hsd-007-evidence-ledger`

## Outcome

Store sanitized, versioned run evidence in PostgreSQL so matched
baseline/intervention runs can be retrieved and compared across model, locale,
configuration, date, and intervention version. The repository must preserve
raw run facts and invalid runs without permitting the browser to access
database administration surfaces. Cloud SQL for PostgreSQL is the deployed
implementation; a local PostgreSQL implementation supports development.

Background delivery is not part of this issue. If measured run latency later
demonstrates a genuine need, a separate decision and issue may add a narrow
authenticated worker without changing this repository port.

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD7-R-001 | One repository port has in-memory and PostgreSQL implementations with the same contract: insert-only records, deterministic ordering, idempotent exact replay, and a typed conflict for a different record using the same identity. | Unit / integration | `hotel_shoreline/src/integration/evidence-ledger.contract.ts`; in-memory and PostgreSQL suites. |
| HSD7-R-002 | A versioned comparison record preserves synthetic authored input, review state, contract/fixture/tool, planner/model/configuration, intervention, candidate, validation, lifecycle, operation, terminal, eligibility, measure, and invalid-run provenance with content hashes. | Unit | `hotel_shoreline/src/unit/evidence-ledger/records.unit.test.ts` |
| HSD7-R-003 | Database configuration and drivers remain server-only; write/read Route Handlers return sanitized projections and typed 400/404/409/413/503 errors without credentials, raw exceptions, or hidden prompts. | Integration / E2E | `hotel_shoreline/src/unit/evidence-ledger/config.unit.test.ts`; `hotel_shoreline/e2e/evidence-ledger.spec.ts` |
| HSD7-R-004 | Forward-only SQL migrations create portable constrained tables for comparisons, runs, events, artifacts, evaluations, interventions, and review annotations; the PostgreSQL repository contract runs against PostgreSQL rather than a mocked SQL client. | PostgreSQL integration | `hotel_shoreline/src/integration/evidence-ledger.postgres.integration.test.ts` |
| HSD7-O-001 | Cloud SQL guidance documents separate migration/runtime identities, bounded pooling, same-region connection, retention/export/deletion, backup/restore limits, rollback, cost, and required APIs. | QA / docs | `hotel_shoreline/CLOUD_SQL.md`; migration README. |
| HSD7-Q-001 | Deterministic full gate, PostgreSQL contract gate, production build, audit disposition, migration review, and secret/diff scans pass. | Full gate | Completion Record. |

## Current acceptance status

| Acceptance ID | State | Evidence or remaining gap |
| --- | --- | --- |
| HSD7-R-001 | Locally, CI, and externally verified | Shared contract passed in memory and pinned PostgreSQL 17.8; merged-main Cloud Run retrieved evidence written before its deployment. |
| HSD7-R-002 | Locally and CI verified | Version/hash/failure/provenance tests pass without raw provider detail. |
| HSD7-R-003 | Externally verified | Tagged Cloud Run POST persistence, sanitized GET history, typed invalid query, and disclosure checks pass. |
| HSD7-R-004 | Locally, CI, and externally verified | Migration and real PostgreSQL contract passed in PR #13; the SELECT/INSERT-only runtime-role regression passed locally, in CI, and on Cloud SQL. |
| HSD7-O-001 | Externally verified | Bounded Cloud SQL shape, separate identities, revoked `cloudsqlsuperuser`, Secret Manager v2, IAM, migration, least privilege, cost, and limitations are recorded. |
| HSD7-Q-001 | Locally, CI, and externally verified | PR #13 passed, merged-main revision `hotel-shoreline-hsd007-4f1a1d5` receives 100% production traffic, and the normal service URL retrieves pre-deployment evidence. |

## Test and error strategy

Use a real disposable PostgreSQL database for the adapter contract; never make
automated tests depend on a live Google project or substitute a SQL mock for
database constraints. Local unit/E2E tests use a fresh in-memory repository;
CI supplies PostgreSQL. Test duplicate IDs, exact replay, conflicting replay,
invalid provenance, ordering/pagination, sanitization, unavailable repository,
poisoned input, and typed responses. Test the append-only invariant:
annotations and evaluation revisions are separate from raw facts and cannot
overwrite them.

## Domain, traceability, and delivery

Infrastructure records immutable facts; Scenario owns effects, Assurance
Runtime owns validation/evidence, Evaluation owns derived measurements, and
Intervention owns treatment definitions. The ledger may store all four but may
not reinterpret or mutate them. PostgreSQL/`pg` types stop at the infrastructure
adapter; Route Handlers depend only on the repository port and sanitized
application projections.

## Scope boundaries

No public admin API, customer authentication, real hotel integrations, Cloud
Tasks, automatic request-time migration, database types in the SDK/evaluation
domains, or implied unlimited durability claim. Do not provision or deploy
Cloud SQL until code/migration QA and a cost review pass.

## Analysis record

**Relevant state:** comparisons are generated and sanitized in memory but are
discarded after each response. Current run objects already contain the required
candidate, validation, lifecycle, operation, configuration, intervention, and
evaluation facts. There is no repository port, migration, database dependency,
history API, or Cloud SQL configuration.

**Implementation order:** define/validate a versioned application record and
shared repository contract; prove it with an in-memory adapter; add SQL-first
migrations and `pg` adapter against real PostgreSQL; integrate persistence and
sanitized history projection at the server route; then document and verify the
Cloud SQL boundary. Background delivery remains excluded.

**Risks:** PostgreSQL is not currently running on the workstation, so the real
adapter gate must use a disposable CI service or an explicitly provisioned
local database. Cloud SQL does not scale to zero, so provisioning requires a
separate cost review. Authenticated multi-user isolation is not claimed; all
records are synthetic public-demo evidence. Reviewer annotations remain empty
until genuine review is recorded.

## Completion Record

Completed after the least-privilege fix passed CI and the merged-main Cloud SQL
revision received production traffic and retrieved its prior record.

**Branches used:** `feat/hsd-007-evidence-ledger` and
`fix/hsd-007-least-privilege-runtime`.

**Commits:** `62a2028`, `06065ce`, `e2919dd`, and `899395e` delivered the
ledger through PR #12; `50e5ead` removes an UPDATE-requiring row lock and runs
the PostgreSQL contract through a SELECT/INSERT-only role.

**Review / PR:** PR #12 delivered the core ledger. PR #13 passed its pinned
PostgreSQL CI service in 1m36s and merged into `main` as `4f1a1d5`.

**Acceptance evidence:** R001/R002 use one shared contract and version/hash
record tests; R003 uses configuration/projection unit tests and live Route
Handler E2E; R004 uses PostgreSQL 17.8 and migration 001. Cloud SQL instance
`hotel-shoreline-ledger` and zero-traffic revision
`hotel-shoreline-hsd007-50e5ead` persisted comparison
`c076d46e-1043-4073-a25f-66086d8a01d1` and retrieved its sanitized summary.
The preserved arms were a typed baseline rejection and intervention planner
timeout; pending human review correctly excluded the pair from aggregates.
Merged-main revision `hotel-shoreline-hsd007-4f1a1d5` then retrieved the same
record at 0% traffic, was promoted to 100%, and retrieved it again through the
normal service URL. Its Cloud Build was
`ba08e259-ea30-4699-a933-6b1701069328`; disclosure, typed invalid-query, and
history redaction checks passed, with zero error-severity revision log entries
at closeout.

**QA commands and results:**

- `pnpm install --frozen-lockfile`, `pnpm check`, `pnpm audit:prod`, and
  `pnpm typecheck` — passed.
- `HSD_E2E_PORT=3108 pnpm test:all` — passed: 76 unit, 27 ordinary integration,
  and 15 deterministic E2E tests; the credentialed provider tests (3) and local
  PostgreSQL adapter test (1) skipped by their explicit opt-in gates.
- `pnpm test:postgres` with a disposable PostgreSQL 17.8 URL — 1 passed; shared
  contract covered insert, exact/concurrent replay, conflict, ordering, query
  validation, integrity, copy isolation, and a SELECT/INSERT-only runtime role.
- Migration 001 applied twice successfully to the disposable PostgreSQL 17.8
  cluster; the cluster shut down cleanly and was moved to Trash.
- SDK coverage — 92.17% statements, 88.26% branches, 97.14% functions, 92.11%
  lines.
- Hotel coverage — 91.60% statements, 87.23% branches, 99.44% functions,
  93.59% lines; evidence-ledger core is 94.02% statements, 92.94% branches,
  100% functions, and 94.82% lines.
- `pnpm build` — passed; Next standalone traces `pg@8.23.0` and emits the two
  dynamic API routes.
- `git diff --check`, repository duplicate scan, and high-risk secret-pattern
  scan — passed.

**Docs updated:** root/package README and roadmap, testing, data architecture,
Cloud SQL/migration runbooks, environment example, issue/index.

**Known limitations / follow-up:** the provisioned shared-core instance has no
HA, automated backup, PITR, or SLA claim and does not scale to zero. The USD 20
alert is not a cap. Runtime authentication/multi-tenant isolation and Cloud
Tasks remain out of scope. Review annotations remain empty until genuine human
review. The two prior revisions remain at 0% as explicit rollback targets.

**Next issue readiness:** HSD-006 is Ready for analysis. Its prerequisite ledger
is complete; implementation must begin from its acceptance/test plan rather
than expanding the dashboard surface opportunistically.
