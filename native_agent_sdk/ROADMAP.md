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

## Next

### HSD-003 — Application adapter validation

Validate HSD-003's application-owned tool adapters against the existing public
`ToolRegistry` seam. Do not add hotel types, fixture data, or application
dependencies to this package unless the vertical slice proves a narrow,
domain-neutral SDK contract is missing.

### HSD-004 — Structured planning boundary

Add a provider-neutral planning interface only after the first application
adapter exists. Genkit/Gemini remains an integration concern, not core logic.

## Deferred until earned

- persistence or distributed idempotency;
- parallel scheduling, retries, deadlines, cancellation, or queues;
- APIs, hosted services, generic plugin registries, or public release policy.
