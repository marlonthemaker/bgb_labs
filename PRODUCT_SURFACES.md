# Product, Research, and Demonstration Surfaces

This document prevents the Hotel Shoreline hackathon demo from becoming an
accidental definition of bomgoodbueno's company or Native Agent's product. The
active company strategy and research method remain authoritative in
`initial_spike/docs/`; this is an HSD implementation boundary.

## Three deliberately separate surfaces

| Surface | Owner and purpose | Durable asset | Must not become |
| --- | --- | --- | --- |
| bomgoodbueno research and applied-delivery surface | The company’s evidence-backed Native Adoption Analysis method: frame, baseline, diagnose, treat, retest, and decide. | Canon, methods, reviewed cases, reports, and treatment patterns. | A hotel product, generic model leaderboard, or unsupported SaaS promise. |
| Native Agent product surface | `native_agent_sdk`: a domain-neutral assurance component that validates constrained task graphs and produces execution evidence. | Stable SDK contracts, validation semantics, error codes, and deterministic runtime behavior. | A Genkit wrapper, cloud host, multilingual evaluator, hotel domain, or database product. |
| Hotel Shoreline demonstration surface | A fictional, synthetic reference application that makes one controlled agent workflow and its evidence visible to hackathon judges. | Demo-specific fixtures, adapters, UI, Genkit integration, Cloud Run deployment, and presentation assets. | Evidence of real hotel capability, company product scope, or broad multilingual parity. |

## Evaluation is not intervention

The demo adopts the applied-delivery loop without conflating its roles.

```text
case and reviewed language variant
  -> baseline run
  -> immutable evidence ledger
  -> evaluation and earliest-loss diagnosis
  -> intervention selection/version
  -> matched retest
  -> evaluation/comparison
  -> decision and scoped presentation
```

| Bounded context | Owns | Must not own |
| --- | --- | --- |
| Scenario | Synthetic hotel facts, authored requests, semantic contracts, expected outcomes, and typed tool adapters. | Provider integration, aggregate scoring, persistence infrastructure. |
| Orchestration | Planner port, Genkit/Gemini adapter, timeout/budget handling, and event-to-run coordination. | Authorization policy or language-quality judgment. |
| Assurance Runtime | Graph semantics, contract validation, deterministic execution, and ordered evidence. | Locale content, intervention selection, cloud/database types. |
| Intervention | A versioned treatment hypothesis: target lifecycle failure, mechanism, parameters, activation condition, regression condition, and rollback decision. | Rewriting raw evidence, scoring itself, or silently changing the comparison condition. |
| Evaluation | Eligibility, deterministic measures, earliest-loss diagnosis, reviewer annotations, comparison, and limitations. | Executing tools, changing planner behavior, or inferring native quality without qualified review. |
| Evidence Ledger | Append-only raw evidence, annotations, and derived-record provenance through a repository port. | Browser administration, hidden prompts/credentials, or mutable run rewriting. |
| Presentation | Sanitized run, comparison, and limitation projections. | Planning, execution, treatment activation, or evaluation authority. |

## Baseline safety rule

“Baseline” must not mean an unsafe production path. Both arms retain the same
server-side invocation, schema parsing, full Native Agent contract validation,
tool allowlisting, synthetic state, and typed adapters. The intervention arm
adds only the declared semantic-contract guidance to planning. Unsafe or
contract-invalid candidates are recorded and rejected, never executed merely
to make a comparison look dramatic.

## Productization rule

The product surface may absorb a capability only after repeated research or
applied-delivery use demonstrates a stable, domain-neutral contract and lower
cost/error than application-owned code. Until then, Hotel Shoreline remains a
reference demonstration and the company surface remains research/service-led.
