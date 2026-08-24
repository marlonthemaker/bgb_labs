# Tooling Strategy

ID: `DOC-PLAT-0005`
Version: v0.1

## Principle

Use local-first tooling by default. Move workloads to cloud only when scale, model access, collaboration, security, or uptime clearly requires it.

The current target machine is an Apple Silicon MacBook Air with 16 GB memory. The first platform should assume this is enough for documentation, schemas, small datasets, local analysis, local dashboards, lightweight experiment runs, and small open-weight model experiments.

## Local-First Stack

Recommended v0 stack:

- Git for versioning.
- Markdown for canonical docs.
- Python for evaluation, analysis, runners, and data processing.
- `uv` or equivalent for reproducible Python environments.
- SQLite for small registries and local state.
- DuckDB for local analytical queries over JSONL, CSV, and Parquet.
- JSONL for run logs and evidence event streams.
- Parquet for larger derived datasets.
- Polars or pandas for analysis.
- A local web app only when evaluator workflows or dashboards need it.
- Local small models and embeddings only when they are good enough for the task and licensing permits.

## Avoid In v0

- Kubernetes.
- A cloud data warehouse.
- Microservices.
- Complex workflow orchestration.
- Premature multi-tenant auth.
- Fine-tuning infrastructure before the black-box layer is proven.
- A heavy annotation platform before human review volume justifies it.

## Cloud Escalation Criteria

Use cloud resources when one of these conditions is true:

- The target model or agent exists only behind a hosted API.
- A benchmark batch is too slow or too memory-intensive locally.
- Human evaluators need shared access outside the local machine.
- Sensitive data requires managed access controls and audit logs.
- A public or partner-facing demo needs reliable uptime.
- GPU workloads are required for larger representation experiments.

## Recommended Cloud Use

- Hosted model APIs for target systems and evaluator models.
- Managed object storage for encrypted evidence artifacts when collaboration begins.
- Lightweight hosted database only after local SQLite/DuckDB becomes a bottleneck.
- Batch compute for repeated large experiment runs.
- Static hosting for public reports or demos.

## Customer-Facing Tooling

The customer-facing integration strategy lives in `CUSTOMER_INTEGRATION_STRATEGY.md`.

Implementation should expose one core engine through multiple surfaces:

- CLI for local use.
- Python SDK for notebooks and internal pipelines.
- MCP server for AI-agent handoff.
- CI action for regression gates.
- REST API only when customers need service integration.
- Hosted UI only when collaboration and workflow volume justify it.

## Cost Discipline

Every cloud workload should have:

- owner
- purpose
- expected duration
- budget ceiling
- data sensitivity level
- rollback or shutdown condition

## Tooling Assumptions

Canonical definitions live in `06-operations/ASSUMPTION_REGISTER.md`.

- `ASM-PLAT-0001`
- `ASM-PLAT-0002`
- `ASM-PLAT-0003`
- `ASM-PLAT-0004`
