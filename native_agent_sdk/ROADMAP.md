# Native Agent SDK Roadmap

This roadmap governs the reusable SDK, not Hotel Shoreline's fictional domain.
It avoids promoting demo-specific code into a public product contract.

## Complete

### HSD-001 — Package foundation

- Strict TypeScript package with explicit exports and verification commands.
- No application, model, hotel, database, or cloud dependency.

### HSD-002 — Assured task runtime

- Versioned semantic contracts and task graphs.
- Fail-closed structural, dependency, tool, effect, cycle, idempotency, and
  task-level constraint validation, including JSON-safe input and defensive
  runtime tool-registry checks.
- Deterministic execution with ordered run events, explicit unavailable-tool
  and tool-execution-error outcomes, and run-scoped idempotency.
- Acceptance-traceable unit and integration coverage above the configured SDK
  quality thresholds.

## Current integration boundary

### HSD-003 and HSD-004 — Application validation

Hotel Shoreline's deterministic slice and partial HSD-004 implementation use
the existing public `ToolRegistry` and task-graph contracts without an SDK
change.
Genkit/Gemini, Cloud Run, fixtures, locales, evaluation, persistence, and UI
remain application concerns; none may become SDK dependencies.

## Next SDK change only if earned

HSD-005/HSD-007 may reveal a repeated, domain-neutral need for versioned run
provenance or comparison metadata. Do not add it to the SDK from one demo:
first show that the application schema is stable across multiple controlled
cases and that a smaller application-owned record is insufficient.

## Deferred until earned

- persistence or distributed idempotency;
- parallel scheduling, retries, deadlines, cancellation, or queues;
- APIs, hosted services, generic plugin registries, or public release policy.
