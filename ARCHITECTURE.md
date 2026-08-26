# HSD Architecture Boundaries

HSD follows a small domain-driven design. Bounded contexts communicate through
explicit data contracts; they do not import each other’s implementation types.

| Context | Owner | Responsibilities | Must not own |
| --- | --- | --- | --- |
| Assurance Runtime | `native_agent_sdk` | Semantic contracts, task graphs, validation, execution lifecycle, ordered evidence. | Hotel facts, prompts, Gemini/Genkit, Next.js, cloud configuration, persistence. |
| Scenario | `hotel_shoreline` | Synthetic stay/policy fixture, task-specific tool adapters, run-local state, outcome projection. | Generic runtime abstractions or research-canon data. |
| Orchestration | `hotel_shoreline` server boundary | Convert `GuestRequestReceived` into a proposed graph through Genkit/Gemini; validate then execute; classify safe failures. | Direct browser credentials or SDK-internal provider coupling. |
| Intervention | `hotel_shoreline` application boundary | Version a targeted treatment hypothesis and its activation, regression, and rollback conditions. | Scoring itself, mutating run evidence, or silently changing matched conditions. |
| Evaluation | `hotel_shoreline` application boundary | Define reviewed cases, matched-condition eligibility, descriptive measures, and earliest-loss diagnosis from immutable run evidence. | Language-quality judgment without qualified review, raw-run mutation, policy enforcement, or treatment activation. |
| Evidence Ledger | `hotel_shoreline` infrastructure boundary | Store sanitized, append-only run, annotation, and derived-record provenance through an application-owned PostgreSQL repository port. | Browser database administration, credentials, or authority to rewrite raw evidence. |
| Presentation | `hotel_shoreline` UI | Render sanitized request, plan, evidence, diagnostics, limitations, and accessible failures. | Authority to execute arbitrary tools or alter evidence. |
| Research Canon | `initial_spike` | Method, evidence rules, vocabulary, and provenance. | Runtime dependency or mutable demo state. |

## Core flow

```text
GuestRequestReceived
  -> scenario contract + fixture snapshot
  -> Genkit/Gemini proposed graph
  -> Native Agent validate
  -> scenario tool adapters
  -> immutable run evidence
  -> evaluation eligibility and descriptive measures
  -> intervention selection/version for a matched retest
  -> append-only sanitized ledger
  -> sanitized presentation/comparison/export
```

The only permitted side-effect path is through an allowlisted Scenario tool
adapter after validation. A provider failure, invalid graph, unknown tool,
duplicate event, timeout, or adapter exception creates a typed terminal result
and ordered evidence; it never becomes an optimistic completion message.

## Anti-patterns prohibited

- “God” agent prompts that mix domain policy, tool implementation, UI copy, and
  error recovery.
- Provider-specific schemas or cloud SDK types in the assurance runtime.
- Tool invocation directly from browser input or model output without contract
  validation.
- Mutable shared fixture state, hidden translation, silent retry, or deletion of
  invalid runs.
- Treating deterministic demo checks as evidence of native-language quality;
  that requires the canon’s reviewed method and matched conditions.
- Letting a run-history comparison silently mix model, fixture, prompt,
  intervention, or locale conditions, or collapse distinct measures into a
  general “native score.”
- Giving the baseline arm direct execution authority. Both comparison arms use
  the same server-side Native Agent validation and typed execution boundary;
  the intervention adds only the declared contract guidance during planning.
