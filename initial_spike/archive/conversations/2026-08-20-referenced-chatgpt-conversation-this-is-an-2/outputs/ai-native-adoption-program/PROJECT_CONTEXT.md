# Project Context

This repository is for a research, knowledge, and product program investigating native adoption of multilingual AI agents.

## Program Shape

The program has one evidence substrate, three research tracks, and four v0.2 architecture domains:

- Wild asks what happens to users in realistic multilingual agent use.
- Lab asks why systems behave that way.
- Sandbox asks how much can be improved externally through black-box adaptation.
- Intelligence Graph connects observations, hypotheses, failures, treatments, findings, decisions, and product implications.
- Registries turn canonical definitions into structured source-of-truth records.
- Trust governs evidence integrity, validity, evaluator reliability, and auditability.
- Product packages validated research and treatments into reusable offerings.

The intended loop is:

1. Wild detects adoption failures.
2. Lab turns those failures into causal hypotheses.
3. Sandbox tests external interventions.
4. Wild retests whether the intervention improves native adoption.

## Current Status

This is a v0.2 architecture migration scaffold. It preserves the v0.1 canonical docs and adds top-level domains for Intelligence Graph, Registries, Trust, and Product. It does not yet contain datasets, code, benchmark results, or fully defined structured registries.

## Guidance For Coding Agents

Before adding implementation work, read:

- `00-foundation/PROGRAM_CHARTER.md`
- `00-foundation/ID_SYSTEM.md`
- `00-foundation/ARCHITECTURE_MIGRATION_V0.2.md`
- `00-foundation/FIRST_PRINCIPLES_REVIEW.md`
- `00-foundation/STANDARDS_ALIGNMENT.md`
- `01-research/HYPOTHESIS_REGISTER.md`
- `02-wild/LOCALE_COMMUNITY_STANDARD.md`
- `05-platform/DOMAIN_MODEL.md`
- `05-platform/CUSTOMER_INTEGRATION_STRATEGY.md`
- `05-platform/EXPERIMENT_RUNNER_SPEC.md`
- `05-platform/TOOLING_STRATEGY.md`
- `07-intelligence-graph/README.md`
- `07-intelligence-graph/GRAPH_ONTOLOGY.md`
- `07-intelligence-graph/TRACEABILITY_MODEL.md`
- `08-registries/README.md`
- `08-registries/REGISTRY_INDEX.md`
- `08-registries/SCHEMA_CONVENTIONS.md`
- `09-trust/README.md`
- `09-trust/EVIDENCE_INTEGRITY_STANDARD.md`
- `09-trust/EVALUATOR_RELIABILITY_STANDARD.md`
- `10-product/README.md`
- `10-product/PRODUCT_ARCHITECTURE.md`
- `10-product/READINESS_CRITERIA.md`
- `10-product/VALUE_GENERATION_MODEL.md`
- `06-operations/DOCUMENT_LIFECYCLE.md`
- `06-operations/ROADMAP.md`

Preserve the ID system from `00-foundation/ID_SYSTEM.md`. New code should make IDs first-class fields rather than burying them in filenames or notes. Prefer structured formats for registries and results. Do not add provider-specific assumptions until they are represented as `ASM-*` entries.

## Immediate Build Bias

Start small and complete:

- one benchmark journey
- three to five languages
- two agent systems
- one baseline run
- one Sandbox treatment
- one Wild retest

The early goal is not breadth. The early goal is proving that the learning loop works.

## Quality Bar

Do not treat a fluent multilingual output as success by itself. Success requires a traceable improvement in adoption, task outcome, trust, safety, access, or decision quality under a declared language, locale, community, and domain context.

Before adding more documents or generated artifacts, check `06-operations/DOCUMENT_LIFECYCLE.md` to determine whether the artifact should be canonical, living, append-only, human-authored, generated, superseded, or deferred.
