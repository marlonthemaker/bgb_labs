# HSD Delivery Roadmap

HSD is a staged demonstration proof that Native Agent can make a constrained operational
request inspectable from decomposition through verified outcome. The reusable
SDK stays domain-neutral; Hotel Shoreline is a synthetic, fictional
demonstration. This roadmap sequences work so each stage earns the complexity
of the next one.

The [issue backlog](issues/README.md) is the authoritative execution record.
Every issue holds its acceptance IDs, test strategy, error behavior, scope
limits, and completion record.

## Delivery sequence

| Stage | Issues | Product outcome | Quality gate |
| --- | --- | --- | --- |
| Foundation | HSD-001–002 | Strict workspace and fail-closed deterministic task runtime. | SDK contracts, errors, execution evidence, and test gates pass. |
| Deterministic proof | HSD-003 | One synthetic English hotel request runs end to end without a model. | Fresh state, typed tools, truthful evidence, and browser proof. |
| Taskmaster agent proof | HSD-004 | A Gemini/Genkit agent receives a guest-request event, plans, validates, routes, and completes it autonomously on Cloud Run. | Google stack requirement and safe failure paths are demonstrated in one continuous run. |
| Controlled comparison | HSD-005 | Matched authored-language requests expose baseline/intervention task and operational differences. | Frozen conditions, explicit review state, invalid-run preservation, no research overclaim. |
| Release security baseline | SEC-001 | Public SDK, HTTP, dependency, and repository trust boundaries are hardened before persistence. | Pathological input, advisory disposition, headers, and immutable CI evidence pass. |
| Evidence ledger | HSD-007 | A privacy-safe, portable PostgreSQL run history permits reproducible comparison across models, dates, modes, and interventions. | Append-only evidence, least-privilege access, idempotent writes, cost/security review. |
| Evidence experience | HSD-006 | Accessible lifecycle and comparison experience exports reproducible evidence. | Failure states, privacy-safe export, responsive E2E coverage. |
| Submission release | HSD-008 | Reproducible hackathon submission and recorded limitations. | Full verification and disclosure review. |

## Dependency flow

```text
HSD-001 -> HSD-002 -> HSD-003 -> HSD-004 -> HSD-005 -> REP-002 -> SEC-001 -> HSD-007 -> HSD-006 -> HSD-008
```

Individual issue metadata owns current status; the
[issue index](issues/README.md) is its machine-checked derived view. Issue
Completion Records own acceptance, QA, deployment, commit, and PR evidence;
this roadmap owns only sequence and gates.

HSD-004—not HSD-007—is the minimum hackathon-compliant submission gate:
Gemini 3.5+, a Google agent framework (Genkit), and a Google Cloud service
(Cloud Run). HSD-007 is not required merely to enter, but is required for the
durable model/history/intervention comparison now promised by this roadmap. It
must follow—not delay—the HSD-004 deployment proof.

See [hackathon constraints](issues/HACKATHON-CONSTRAINTS.md), and re-check the
official rules immediately before submitting.

## Post-release research sequence

The HSD-008 repository and deployment gates are complete. Owner video, Devpost,
tag, and judging-freeze signoff remain the only active release critical path:

```text
HSD-007 -> HSD-006 -> HSD-008
  -> AILITW-001 access audit and 27-cell pilot freeze
  -> field-suite foundation and feasibility pilot
  -> focused field study and failure promotion
  -> controlled Shoreline analogue interventions
  -> publication, operator handoff, and authorized validation
```

The detailed follow-up and commercialization gates live in the
[Iberia integration guide](research/ailitw/studies/iberia-2026/INTEGRATION_GUIDE.md).
Public-agent collection is not authorized and must not delay HSD-008 owner
release signoff.

## Exit principles

- Do not introduce a model before the deterministic no-model slice is proven.
- Do not call the project a Taskmaster submission until HSD-004 proves a guest
  request event is autonomously planned, safely routed, and completed with the
  required Google stack.
- Do not make reviewer-qualified multilingual claims before contracts, fixture
  conditions, baseline/intervention settings, and review status are frozen and
  visible. Pending drafts may run for engineering evidence when clearly excluded.
- Do not add persistence or cloud queues before the local evidence flow is
  reliable, its failure behavior is understood, and the persisted schema is
  justified by a comparison or release requirement.
- Do not mark an issue complete until its specification, tests, QA evidence,
  package docs, backlog status, and next-issue readiness agree.
