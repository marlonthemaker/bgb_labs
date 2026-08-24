# HSD-002 — Assured Task Runtime

**Status:** Complete
**Repository:** `native_agent_sdk`
**Depends on:** HSD-001
**Branch:** `feat/hsd-002-assured-task-runtime`

## Outcome

Provide a domain-neutral runtime that validates a proposed task graph, executes
it deterministically, and returns inspectable evidence without uncaught tool
exceptions.

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD2-C-001 | Non-object or non-JSON-safe contracts, graphs, nodes, and inputs are rejected with stable issues. | Unit |
| HSD2-C-002 | Tool, effect, dependency, cycle, constraint, and callable-registry boundaries fail closed. | Unit |
| HSD2-C-003 | A valid graph executes in deterministic order with ordered evidence. | Integration |
| HSD2-C-004 | Failure, blocked, skipped, rejected, unavailable-tool, thrown-tool, and replay paths have explicit safe outcomes. | Integration |

## Test and error strategy

Unit tests prove validation codes and paths. Integration tests use deterministic
tools to prove order, idempotency, failure propagation, and error conversion.
Missing and throwing tools become typed run outcomes; raw exceptions never cross
the SDK boundary.

## Completion Record

**Implementation summary:** semantic contracts, task graph validation,
deterministic executor, ordered events, and run-scoped idempotency.
**Acceptance evidence:** SDK unit and integration suites; configured coverage
thresholds (90% lines/statements/functions, 80% branches).
**Known limitations:** Sequential, in-memory execution only; no retries,
persistence, deadline, cancellation, or provider integration.
**Next issue readiness:** HSD-003 can validate app-owned deterministic tools
through the existing `ToolRegistry` seam.
