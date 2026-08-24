# HSD-007 — Cloud Delivery Hardening

**Status:** Planned / optional
**Repository:** `hotel_shoreline`
**Depends on:** HSD-003
**Branch:** `feat/hsd-007-cloud-delivery-hardening`

## Outcome

Extend the HSD-004 Cloud Run service only if the demo needs execution beyond one
request/response: add authenticated asynchronous work, resumable run state, and
retry-safe idempotency. Cloud Run itself is already required and proven in
HSD-004; this issue is optional resilience, not basic compliance.

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD7-D-001 | Browser clients never access cloud credentials, queues, or database administration surfaces directly. | Review / integration |
| HSD7-D-002 | Worker requests are authenticated and duplicate delivery does not repeat an operational effect. | Integration |
| HSD7-D-003 | Timeout, retry exhaustion, and unavailable dependency states produce persisted truthful terminal status. | Integration / E2E |
| HSD7-D-004 | Deployment configuration documents least-privilege IAM, cost caps, required APIs, and rollback. | QA / docs |

## Test and error strategy

Use emulators or deterministic ports where possible; never make tests depend on
a live project. Test unauthorized workers, duplicate messages, poisoned input,
timeout, retry exhaustion, and sanitized status responses.

## Domain, traceability, and delivery

Infrastructure transports a run; the Scenario owns the effect and the Assurance
Runtime owns validation/evidence. `HSD7-D-001` maps to configuration and API
boundary tests, `HSD7-D-002` to authenticated duplicate-delivery integration
tests, `HSD7-D-003` to terminal-state tests, and `HSD7-D-004` to deployment
review. QA captures IAM, ingress, scale/time/cost settings, and rollback proof
without committing credentials. Update actual test paths in `TESTING.md`, docs,
roadmaps, backlog, and Completion Record. Branch/commits/review use
`TEMPLATE.md`; comments may only explain a security or idempotency invariant.

## Scope boundaries

Optional for submission. No public admin API, customer authentication, real
hotel integrations, or implied durability claim. Do not deploy without explicit
approval.

## Completion Record

**Branch used:**
**Commits:**
**Review / PR:**
**Acceptance evidence:**
**QA commands and results:**
**Docs updated:**
**Known limitations / follow-up:**
**Next issue readiness:**
