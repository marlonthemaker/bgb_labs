# HSD-007 — Cloud Delivery Hardening

**Status:** Planned / optional
**Repository:** `hotel_shoreline`
**Depends on:** HSD-003
**Branch:** `feat/hsd-007-cloud-delivery-hardening`

## Outcome

If deployment requirements demand it, add a minimal Cloud Run execution path
with authenticated asynchronous work and retry-safe idempotency.

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

## Scope boundaries

Optional for submission. No public admin API, customer authentication, or real
hotel integrations. Do not deploy without explicit approval.

## Completion Record

Complete only if chosen, with actual environment-free evidence, security review,
QA output, docs, commits, review, and HSD-008 readiness using `TEMPLATE.md`.
