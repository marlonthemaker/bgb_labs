# System Architecture

ID: `DOC-PLAT-0002`
Version: v0.2

## Architecture Goal

Support a closed loop from Wild observation to Lab diagnosis to Sandbox treatment to Wild retest.

## Architecture Position

The v0 architecture is a local-first research operating system, not a SaaS platform. It should run on a capable laptop, preserve evidence rigor, and leave clear upgrade paths for cloud execution when the work earns it.

## Logical Components

- Registry access layer: reads, validates, and writes structured records owned by `08-registries/`.
- Evidence store: stores raw and derived artifacts with metadata.
- Experiment runner: executes benchmark journeys and controlled tests.
- Evaluation service: applies automated metrics and manages human review packets.
- Analysis workspace: notebooks, reports, and diagnostic artifacts.
- Treatment layer: black-box adapters, routers, post-processors, and guardrails.
- Reporting layer: human-readable findings, decision memos, and dashboards.

## Data Flow

1. Define journey or experiment in registry.
2. Run baseline through experiment runner.
3. Store traces and outputs as evidence.
4. Evaluate and map failures.
5. Diagnose with Lab methods where needed.
6. Apply Sandbox treatment.
7. Compare treatment to baseline.
8. Publish finding and decision recommendation.

## Early Architecture Bias

Use files and simple structured registries first. Add services only when repeated runs, access control, or evaluator workflows require them.

## Recommended v0 Physical Architecture

- Repository: canonical docs, schemas, runner code, treatment prototypes, and reports.
- Local registry: SQLite or structured files for hypotheses, journeys, experiments, runs, evidence, metrics, failures, treatments, findings, assumptions, risks, and decisions, using definitions owned by `08-registries/`.
- Local evidence lake: JSONL for event streams, Parquet for derived tables, and file storage for transcripts, screenshots, traces, and review packets.
- Local analysis: DuckDB over JSONL and Parquet, with Python notebooks or scripts for repeatable analysis.
- Local runner: command-line experiment execution that can target hosted models, local models, or manual review packets.
- Optional local UI: a lightweight evaluator and run-review interface once file review becomes painful.
- Cloud extensions: hosted model APIs, shared object storage, batch compute, and deployment only after local limits are reached.

## Boundary Rule

Keep the evidence model provider-neutral. Provider adapters may know about specific APIs, but experiment records, evidence records, metrics, and findings should not depend on one vendor's object model.
