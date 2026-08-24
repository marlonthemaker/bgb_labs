# ID System

ID: `DOC-FOUND-0005`
Version: v0.2

This document is the canonical source of truth for program IDs.

## Format

Use:

`<PREFIX>-<TRACK>-####`

For run records, use:

`RUN-YYYYMMDD-####`

## Tracks

- `ALL`: cross-program
- `WILD`: native adoption observation and benchmarks
- `LAB`: diagnostics and representation research
- `SBOX`: black-box adaptation and intervention
- `PLAT`: platform, data, and tooling
- `OPS`: operations and governance
- `FOUND`: foundation documents
- `RES`: research standards
- `IG`: intelligence graph and traceability
- `REG`: structured registries and schema governance
- `TRUST`: evidence integrity, validity, safety, and auditability
- `PROD`: product architecture, packaging, and readiness

## Prefixes

- `DOC`: canonical document
- `HYP`: hypothesis
- `EXP`: experiment design
- `RUN`: experiment run
- `EVT`: evidence item
- `OBS`: observation
- `FAIL`: failure type or instance
- `INT`: intervention class
- `TRT`: treatment protocol
- `MET`: metric
- `JRN`: user journey or benchmark journey
- `BMK`: benchmark release or benchmark package, if separated from journeys
- `FIND`: finding
- `MECH`: proposed mechanism
- `DEC`: decision
- `ASM`: assumption
- `RISK`: risk
- `TASK`: roadmap issue
- `AGENT`: agent system under study
- `ART`: artifact
- `DATA`: dataset
- `CTRL`: trust control
- `CAP`: product capability
- `OFFER`: product offer
- `GATE`: readiness gate

## Ownership

- Hypothesis definitions live in `01-research/HYPOTHESIS_REGISTER.md`.
- Failure definitions live in `02-wild/FAILURE_TAXONOMY.md`.
- Intervention definitions live in `04-sandbox/INTERVENTION_TAXONOMY.md`.
- Treatment records live in `04-sandbox/TREATMENT_PROTOCOL.md` until structured registries exist.
- Roadmap tasks live in `06-operations/ROADMAP.md`.
- Assumptions live in `06-operations/ASSUMPTION_REGISTER.md`.
- Decisions live in `06-operations/DECISION_LOG.md`.
- Risks live in `06-operations/RISK_REGISTER.md`.
- Document lifecycle rules live in `06-operations/DOCUMENT_LIFECYCLE.md`.
- Intelligence graph definitions live in `07-intelligence-graph/`.
- Structured registry definitions live in `08-registries/`.
- Trust standards live in `09-trust/`.
- Product architecture definitions live in `10-product/`.
- Locale and community validity rules live in `02-wild/LOCALE_COMMUNITY_STANDARD.md`.
- Standards alignment and the first-principles quality bar live in `00-foundation/`.

## Rules

- Never reuse an ID for a different meaning.
- Do not redefine canonical IDs in secondary documents.
- When a document mentions a canonical ID, either link to the owning register or quote only a short label.
- Prefer explicit ID fields in structured data over IDs hidden in filenames.
- Retired IDs remain reserved.
