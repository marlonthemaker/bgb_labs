# Data Architecture

ID: `DOC-PLAT-0004`
Version: v0.2

## Data Classes

- Registries: canonical structured records for program entities.
- Raw evidence: transcripts, traces, screenshots, prompts, outputs, logs.
- Derived evidence: annotations, metrics, embeddings, summaries, comparisons.
- Reports: findings, decision memos, benchmark releases.

## Suggested Directory Pattern

Future implementation can use:

- `registries/`
- `datasets/`
- `evidence/raw/`
- `evidence/derived/`
- `experiments/`
- `runs/`
- `reports/`

Schemas should be drafted through `TASK-REG-0002` and implemented with platform support before real evidence collection begins.

## Data Requirements

- Every record needs a stable ID.
- Every result links to source evidence.
- Every artifact has sensitivity metadata.
- Every dataset has version, license, and collection method.
- Every benchmark release has inclusion and exclusion criteria.

## Privacy

Treat multilingual user text as potentially identifying. Locale, dialect, spelling, and named entities can reveal identity even when names are removed.

## Retention

Define retention before collecting real user data. Synthetic and public data can follow a different policy from human-session evidence.

## Source Of Truth

Markdown documents define program semantics. `08-registries/` owns structured source-of-truth definitions once schemas exist. Platform systems should read, validate, analyze, and report on those records. Generated reports and dashboards are views, not sources of truth.
