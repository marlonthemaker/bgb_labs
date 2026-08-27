# HSD-007 — Evidence Ledger and Bounded Background Delivery

**Status:** Ready for analysis
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

If the finalized demo needs genuine delayed/background completion, extend the
Cloud Run service with a narrow authenticated Cloud Tasks worker. Cloud Run
itself is already required and proven in HSD-004; background execution is not
added merely to create architectural theater.

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD7-R-001 | A repository port has in-memory and PostgreSQL implementations; the deployed adapter targets Cloud SQL for PostgreSQL, and records are append-only, sanitized, and versioned. | Unit / integration |
| HSD7-R-002 | A run record preserves immutable input, contract, fixture/tool, planner/model, configuration, intervention, lifecycle, measure, reviewer, and invalid-run provenance needed for comparison. | Unit / integration |
| HSD7-R-003 | Browser clients never access cloud credentials, queues, or database administration surfaces directly; read APIs return only sanitized projections. | Review / integration |
| HSD7-D-001 | If enabled, worker requests are authenticated and duplicate delivery does not repeat an operational effect. | Integration |
| HSD7-D-002 | If enabled, timeout, retry exhaustion, and unavailable dependency states produce persisted truthful terminal status. | Integration / E2E |
| HSD7-D-003 | Deployment configuration documents least-privilege IAM, retention, deletion/rollback procedure, cost caps, required APIs, and recovery limits. | QA / docs |

## Test and error strategy

Use deterministic ports and emulators where possible; never make automated
tests depend on a live project. Test duplicate run IDs, invalid provenance,
sanitization/redaction, non-comparable records, unavailable repository,
unauthorized workers, duplicate messages, poisoned input, timeout, retry
exhaustion, and sanitized status responses. Test the append-only invariant:
annotations are separate from raw run facts and cannot overwrite them.

## Domain, traceability, and delivery

Infrastructure transports and records a run; the Scenario owns the effect, the
Assurance Runtime owns validation/evidence, and the Evaluation layer owns only
derived measurements. `HSD7-R-001` maps to repository contract tests,
`HSD7-R-002` to provenance/immutability tests, `HSD7-R-003` to API boundary and
sanitization tests, `HSD7-D-001` to authenticated duplicate-delivery tests,
`HSD7-D-002` to terminal-state tests, and `HSD7-D-003` to deployment review.
QA captures IAM, ingress, Cloud SQL connection limits, retention, scale/time/cost
settings, and rollback proof without committing credentials. Update actual test paths in `TESTING.md`,
docs, roadmaps, backlog, and Completion Record. Branch/commits/review use
`TEMPLATE.md`; comments may only explain a privacy, security, or idempotency
invariant.

## Scope boundaries

No public admin API, customer authentication, real hotel integrations, or
implied unlimited durability claim. Cloud Tasks is optional only if a true
background lifecycle belongs in the final demo; the run ledger is required for
historical comparison. Do not deploy without explicit approval.

## Completion Record

**Branch used:**
**Commits:**
**Review / PR:**
**Acceptance evidence:**
**QA commands and results:**
**Docs updated:**
**Known limitations / follow-up:**
**Next issue readiness:**
