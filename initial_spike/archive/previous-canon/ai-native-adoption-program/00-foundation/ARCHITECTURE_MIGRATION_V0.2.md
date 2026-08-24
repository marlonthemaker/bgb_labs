# Architecture Migration v0.2

ID: `DOC-FOUND-0006`
Version: v0.2
Status: proposed

## Purpose

This document defines the additive v0.2 architecture migration for the AI Native Adoption Program. It integrates the newer insight that the program is not only a three-track research loop, but also a knowledge and product operating system.

The migration preserves all v0.1 canonical documents. No existing folders, IDs, or documents are deleted, renamed, or replaced in this phase.

## Current Architecture Assessment

The v0.1 repository already has a coherent foundation:

- `00-foundation/` defines the mission, thesis, principles, glossary, and ID system.
- `01-research/` defines research quality standards and hypothesis handling.
- `02-wild/`, `03-lab/`, and `04-sandbox/` define the core closed-loop research tracks.
- `05-platform/` defines the local-first architecture, data model, tooling, and experiment runner.
- `06-operations/` defines the operating model, roadmap, risks, decisions, assumptions, and product lifecycle.

This structure is correct for proving the Wild-Lab-Sandbox-Wild loop. Its main gap is that several concepts are currently embedded inside existing folders even though they are becoming durable program domains:

- the intelligence graph that connects failures, evidence, hypotheses, interventions, findings, and product decisions
- structured registries as first-class source-of-truth artifacts
- trust, safety, governance, and evidence integrity
- commercial product packaging and reusable offerings

## Rationale For Changes

The v0.1 architecture answers:

> How do we research multilingual native adoption?

The v0.2 architecture must also answer:

> How does research become reusable intelligence, governed evidence, and product capability?

The new domains make that transformation explicit without weakening the original research loop.

## New Top-Level Domains

### `07-intelligence-graph/`

Owns the knowledge architecture that connects program artifacts into a queryable graph of claims, evidence, failures, mechanisms, interventions, treatments, findings, decisions, and product implications.

Initial scope:

- graph ontology
- entity and relationship definitions
- traceability rules
- synthesis patterns
- finding-to-product knowledge links

### `08-registries/`

Owns structured source-of-truth records that operationalize the canonical docs.

Initial scope:

- registry schema inventory
- JSONL, YAML, SQLite, or Parquet conventions
- migration rules from markdown tables to structured records
- validation requirements
- ownership boundaries for each registry

### `09-trust/`

Owns trust, safety, validity, governance, and evidence integrity across research and productization.

Initial scope:

- evidence quality controls
- evaluator reliability
- privacy and consent requirements
- misuse and cultural harm review
- benchmark validity checks
- auditability requirements

### `10-product/`

Owns the commercial product architecture that packages validated work into usable offerings.

Initial scope:

- product thesis
- offer architecture
- packaging rules for validated treatments, benchmarks, reports, and tools
- customer-facing evidence standards
- product readiness criteria
- pricing, distribution, and delivery assumptions when ready

## Updated Document Hierarchy

The v0.2 additive hierarchy is:

```text
00-foundation/
01-research/
02-wild/
03-lab/
04-sandbox/
05-platform/
06-operations/
07-intelligence-graph/
08-registries/
09-trust/
10-product/
```

This sequence avoids renumbering existing directories during the migration. If a future release wants Intelligence Graph and Registries to appear before Research, that should be handled as a separate path migration with redirects or aliases.

## Artifact Additions

Created in this migration:

- `00-foundation/ARCHITECTURE_MIGRATION_V0.2.md`
- `00-foundation/FIRST_PRINCIPLES_REVIEW.md`
- `00-foundation/STANDARDS_ALIGNMENT.md`
- `02-wild/LOCALE_COMMUNITY_STANDARD.md`
- `07-intelligence-graph/README.md`
- `07-intelligence-graph/GRAPH_ONTOLOGY.md`
- `07-intelligence-graph/TRACEABILITY_MODEL.md`
- `08-registries/README.md`
- `08-registries/REGISTRY_INDEX.md`
- `08-registries/SCHEMA_CONVENTIONS.md`
- `09-trust/README.md`
- `09-trust/EVIDENCE_INTEGRITY_STANDARD.md`
- `09-trust/EVALUATOR_RELIABILITY_STANDARD.md`
- `06-operations/DOCUMENT_LIFECYCLE.md`
- `10-product/README.md`
- `10-product/PRODUCT_ARCHITECTURE.md`
- `10-product/OFFER_MODEL.md`
- `10-product/READINESS_CRITERIA.md`
- `10-product/VALUE_GENERATION_MODEL.md`

Recommended next artifacts:

- draft structured schemas for the first closed loop
- create the first graph slice for `JRN-WILD-0001`
- define the first treatment package candidate
- create first structured records for hypotheses, journeys, failures, interventions, and treatments
- define management review authority for pilots, benchmark releases, and customer-facing claims

## Deprecated Or Merged Artifacts

No artifacts are deprecated in this migration.

Expected future merges or ownership clarifications:

- Registry implementation details may move from `05-platform/` into `08-registries/`, while platform retains execution architecture.
- Product packaging guidance may move from `06-operations/PRODUCT_DELIVERY_LIFECYCLE.md` into `10-product/`, while operations retains cadence and governance.
- Evidence integrity rules may be referenced from `01-research/` and `06-operations/`, but owned by `09-trust/`.
- Graph relationship definitions may extend `05-platform/DOMAIN_MODEL.md`, but should be owned by `07-intelligence-graph/` once formalized.

## Migration Steps

1. Establish additive domain folders and README files.
2. Update `README.md` so the repository map and source-of-truth map mention the new domains.
3. Update `00-foundation/ID_SYSTEM.md` with new domain codes.
4. Record the architecture migration decision in `06-operations/DECISION_LOG.md`.
5. Add v0.2 roadmap tasks for the first concrete artifacts.
6. Draft the recommended next artifacts in the order below.
7. Only after the new documents are stable, consider whether any v0.1 documents should link, split, or transfer ownership.

## Implementation Order

1. Intelligence Graph first: define the ontology and traceability model before building more registries.
2. Registries second: use the graph model to define schema boundaries and validation rules.
3. Trust third: define evidence integrity, evaluator reliability, and audit requirements before external claims are made.
4. Product fourth: define product packaging only after the evidence and trust model can support customer-facing claims.
5. Platform updates last: update execution architecture once the new conceptual boundaries are clear.

## Migration Principles

- Preserve existing canonical docs.
- Prefer cross-links over duplicated definitions.
- Treat markdown as semantic source of truth until structured registries are ready.
- Make IDs explicit before adding new artifacts.
- Do not commercialize findings unless the trust domain can explain the evidence limits.
- Do not expand platform complexity until the first closed loop remains reproducible.

## Acceptance Criteria

The v0.2 migration is complete when:

- the four new domains have initial canonical documents
- the ID system includes the new domain codes
- registry ownership is clear
- the graph can trace at least one journey from observation to product decision
- trust standards define what evidence is acceptable for internal versus customer-facing claims
- product readiness criteria define when a treatment, benchmark, or report can be packaged
