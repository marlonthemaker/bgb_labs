# AI Native Adoption Program

Version: v0.2

This repository scaffolds a research, knowledge, and product program for multilingual agentic systems. The shared thesis is that native adoption should be measured, explained, improved, governed, and packaged as one loop rather than as separate research efforts.

## Tracks

- Wild: observe whether real users can discover, understand, trust, and complete tasks with agentic systems in their own languages and cultural contexts.
- Lab: diagnose and explain multilingual model and system behavior using controlled representation, evaluation, and failure-analysis work.
- Sandbox: test black-box adaptation layers that improve native adoption without internal model access, fine-tuning, or provider cooperation.

## Repository Map

- `00-foundation/`: program charter, thesis, principles, glossary, ID system.
- `01-research/`: hypothesis register and standards for research quality, evidence, experiments, evaluation, and human review.
- `02-wild/`: native adoption framework, failure taxonomy, benchmark specification.
- `03-lab/`: representation research agenda and metrics.
- `04-sandbox/`: black-box adaptation and intervention protocols.
- `05-platform/`: domain model, system architecture, customer integrations, tooling strategy, runner spec, data architecture.
- `06-operations/`: operating model, product lifecycle, roadmap, risks, decisions, assumptions.
- `07-intelligence-graph/`: knowledge architecture, ontology, traceability, and synthesis links.
- `08-registries/`: structured source-of-truth records, schema conventions, and validation.
- `09-trust/`: evidence integrity, evaluator reliability, governance, validity, and auditability.
- `10-product/`: product architecture, offer model, readiness criteria, and packaging rules.

## Source Of Truth Map

- v0.2 migration plan: `00-foundation/ARCHITECTURE_MIGRATION_V0.2.md`
- First-principles review: `00-foundation/FIRST_PRINCIPLES_REVIEW.md`
- Standards alignment: `00-foundation/STANDARDS_ALIGNMENT.md`
- ID rules: `00-foundation/ID_SYSTEM.md`
- Hypotheses: `01-research/HYPOTHESIS_REGISTER.md`
- Failures: `02-wild/FAILURE_TAXONOMY.md`
- Locale and community validity: `02-wild/LOCALE_COMMUNITY_STANDARD.md`
- Interventions: `04-sandbox/INTERVENTION_TAXONOMY.md`
- Treatments: `04-sandbox/TREATMENT_PROTOCOL.md`
- Architecture: `05-platform/SYSTEM_ARCHITECTURE.md`
- Customer integrations: `05-platform/CUSTOMER_INTEGRATION_STRATEGY.md`
- Tooling: `05-platform/TOOLING_STRATEGY.md`
- Product lifecycle: `06-operations/PRODUCT_DELIVERY_LIFECYCLE.md`
- Document lifecycle: `06-operations/DOCUMENT_LIFECYCLE.md`
- Roadmap tasks: `06-operations/ROADMAP.md`
- Decisions: `06-operations/DECISION_LOG.md`
- Assumptions: `06-operations/ASSUMPTION_REGISTER.md`
- Risks: `06-operations/RISK_REGISTER.md`
- Intelligence graph domain: `07-intelligence-graph/README.md`
- Graph ontology: `07-intelligence-graph/GRAPH_ONTOLOGY.md`
- Traceability model: `07-intelligence-graph/TRACEABILITY_MODEL.md`
- Registry domain: `08-registries/README.md`
- Registry index: `08-registries/REGISTRY_INDEX.md`
- Schema conventions: `08-registries/SCHEMA_CONVENTIONS.md`
- Trust domain: `09-trust/README.md`
- Evidence integrity: `09-trust/EVIDENCE_INTEGRITY_STANDARD.md`
- Evaluator reliability: `09-trust/EVALUATOR_RELIABILITY_STANDARD.md`
- Product domain: `10-product/README.md`
- Product architecture: `10-product/PRODUCT_ARCHITECTURE.md`
- Offer model: `10-product/OFFER_MODEL.md`
- Readiness criteria: `10-product/READINESS_CRITERIA.md`
- Value generation: `10-product/VALUE_GENERATION_MODEL.md`

## First Milestone

The canonical milestone list lives in `06-operations/ROADMAP.md`.

## Working Rule

Every claim should connect to evidence, every failure should map to a taxonomy, every intervention should map to a treatment protocol, and every finding should be retestable across at least one track boundary.

Every product claim should be narrower than the evidence behind it, and every language or culture claim should state who and what it does not represent.

Use `06-operations/DOCUMENT_LIFECYCLE.md` before editing, approving, freezing, superseding, or generating program documents.
