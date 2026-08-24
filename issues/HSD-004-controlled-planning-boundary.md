# HSD-004 — Controlled Planning Boundary

**Status:** Planned
**Repository:** `hotel_shoreline` (optional narrow SDK interface only)
**Depends on:** HSD-003
**Branch:** `feat/hsd-004-controlled-planning-boundary`

## Outcome

Add an application-owned, provider-neutral planning port that can request a
structured task graph and route all output through the SDK validator.

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD4-P-001 | Provider configuration is server-side and its metadata is captured without secrets. | Integration |
| HSD4-P-002 | Malformed, unsafe, timed-out, or unavailable planning output produces a truthful typed failed run without tool execution. | Unit / integration |
| HSD4-P-003 | Valid structured output is validated by the same SDK contract before deterministic execution. | Integration |
| HSD4-UI-001 | The run record distinguishes planning failure from validation or tool failure. | E2E |

## Test and error strategy

Use a deterministic fake provider for success, malformed schema, timeout, and
transport failure. Assert no tool runs on planning/validation failure. Provider
errors are sanitized, classified, and recorded with non-secret metadata.

## Scope boundaries

No unsupported free-form tool execution, client-side provider keys, language
comparison, persistence, or cloud queues. A concrete provider adapter is only
added after the port and fake-provider tests pass.

## Completion Record

Complete after HSD-003 with actual evidence, QA output, docs, commits, review,
and HSD-005 readiness using `TEMPLATE.md`.
