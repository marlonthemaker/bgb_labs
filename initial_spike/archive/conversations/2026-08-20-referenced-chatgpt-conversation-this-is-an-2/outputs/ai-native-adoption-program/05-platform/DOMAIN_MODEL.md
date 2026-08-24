# Domain Model

ID: `DOC-PLAT-0001`
Version: v0.1

## Core Entities

- Program: the whole three-track system.
- Track: Wild, Lab, or Sandbox.
- Agent system: external or internal system under study.
- Language context: language tag, locale, region, script, and code-switch assumptions.
- Journey: a realistic user goal and interaction context.
- Experiment: planned comparison.
- Run: execution of an experiment.
- Evidence item: raw or derived artifact supporting analysis.
- Failure: adoption or behavior breakdown.
- Intervention: adaptation class.
- Treatment: concrete intervention protocol.
- Metric: measurement definition.
- Finding: evidence-backed claim.
- Decision: operational or research choice.
- Assumption: unproven premise that affects plans.
- Risk: possible harm, validity issue, or execution problem.

## Key Relationships

- A journey can produce observations and benchmark items.
- A failure instance links to evidence and one or more failure types.
- A Lab experiment links hypotheses to metrics and evidence.
- A Sandbox treatment targets failure IDs and produces baseline/treatment comparisons.
- A finding links hypotheses, evidence, methods, and limitations.
- Decisions should link to findings or assumptions.

## Implementation Guidance

Represent IDs as explicit fields. Treat documents as the source of program semantics and structured registries as the source of operational truth.
