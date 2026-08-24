# Roadmap

ID: `DOC-OPS-0002`
Version: v0.2

## Milestone 0: Scaffold Complete

Status: complete when this repository exists and the v0.1 canonical docs are reviewed.

## Milestone 1: First Closed Loop

Goal: prove the Wild-Lab-Sandbox-Wild loop on one narrow adoption problem.

Architecture migration prerequisites:

- `TASK-OPS-0004`: review and accept `00-foundation/ARCHITECTURE_MIGRATION_V0.2.md`.
- `TASK-IG-0001`: review and accept the graph ontology for journeys, failures, evidence, hypotheses, treatments, findings, decisions, and product implications.
- `TASK-IG-0002`: review and accept the traceability model from observation to product decision.
- `TASK-REG-0001`: review and accept the initial registry index and schema conventions.
- `TASK-TRUST-0001`: review and accept evidence integrity and evaluator reliability standards.
- `TASK-PROD-0001`: review and accept product architecture, offer model, and readiness criteria.
- `TASK-REG-0002`: draft first structured schemas for hypotheses, journeys, failures, interventions, treatments, experiments, runs, evidence, findings, and graph edges.
- `TASK-IG-0003`: create the first traceability slice for `JRN-WILD-0001`.
- `TASK-OPS-0005`: review and accept first-principles review and standards alignment.
- `TASK-WILD-0003`: apply locale, community, accessibility, and representation fields to the first journey set.
- `TASK-PROD-0002`: define value metrics for the first closed-loop assessment offer.
- `TASK-TRUST-0002`: define claim approval authority and trust review checklist for external-facing claims.
- `TASK-OPS-0007`: review and accept `06-operations/DOCUMENT_LIFECYCLE.md` before adding schemas, generated views, or study artifacts.

Recommended issues:

- `TASK-OPS-0001`: approve charter, thesis, principles, and ID system.
- `TASK-WILD-0001`: define five journeys and select three to five launch languages.
- `TASK-WILD-0002`: create baseline rubrics for native adoption scoring.
- `TASK-LAB-0001`: select two diagnostic probes for tool intent and uncertainty.
- `TASK-SBOX-0001`: implement first prompt-router treatment.
- `TASK-PLAT-0001`: implement local registry storage and validation for schemas defined through `TASK-REG-0002`.
- `TASK-PLAT-0002`: build minimal local experiment runner.
- `TASK-PLAT-0003`: implement local-first analysis using DuckDB over JSONL or Parquet.
- `TASK-PLAT-0004`: package the first CLI and define the MCP tool surface.
- `TASK-OPS-0002`: run first synthesis review and decide whether to expand scope.
- `TASK-OPS-0003`: define cloud escalation rules, budget ceilings, and shutdown conditions.
- `TASK-OPS-0006`: define management review inputs, outputs, corrective actions, and approval authority for pilots and external claims.

## Milestone 2: Benchmark Alpha

Goal: release an internal benchmark with multiple journeys, languages, systems, and treatment comparisons.

## Milestone 3: Product Prototype

Goal: package Sandbox adaptation as a usable proxy layer with evaluation reporting.

## Milestone 4: Public Research Narrative

Goal: publish a research memo or paper-style report with evidence, limitations, and reproducible artifacts.
