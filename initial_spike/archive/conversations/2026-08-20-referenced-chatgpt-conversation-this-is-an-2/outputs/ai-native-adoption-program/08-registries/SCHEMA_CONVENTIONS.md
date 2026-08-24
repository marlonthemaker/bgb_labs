# Schema Conventions

ID: `DOC-REG-0003`
Version: v0.2
Status: proposed

## Purpose

This document defines conventions for future structured registry schemas.

## Format Strategy

Use the simplest durable format that supports the workflow:

- Markdown for canonical meaning and human review.
- YAML for small hand-authored registries where comments and readability matter.
- JSONL for append-friendly run, event, evidence, and observation records.
- SQLite for local registry joins, validation, and app state.
- Parquet for derived analytical tables.

Do not introduce a database as the only source of truth until export and versioning are solved.

## Required Common Fields

Every registry record should include:

- `id`
- `type`
- `version`
- `status`
- `owner`
- `source_doc`
- `created_at`
- `updated_at`
- `linked_ids`

Recommended fields:

- `title`
- `description`
- `language_tags`
- `sensitivity_level`
- `limitations`
- `notes`

## ID Conventions

Use the canonical ID system from `00-foundation/ID_SYSTEM.md`.

If a new prefix is needed:

1. propose it in the owning domain document
2. record the rationale in `06-operations/DECISION_LOG.md` if durable
3. update `00-foundation/ID_SYSTEM.md`
4. reserve retired IDs permanently

## Status Values

Use shared status values when possible:

- `proposed`
- `approved`
- `active`
- `paused`
- `complete`
- `validated`
- `rejected`
- `archived`
- `retired`

Domain-specific states are allowed only when the owning canonical doc defines them.

## Versioning

Use semantic versions for schemas:

- `0.x`: draft schemas, breaking changes allowed
- `1.x`: stable enough for repeated studies
- `2.x`: stable enough for releases, external reporting, or productized workflows

Record versions separately for:

- schema version
- record version
- prompt or product-surface version
- dataset version
- evaluator rubric version
- treatment implementation version

## Linking

Use `linked_ids` for general links and explicit fields for required relationships.

Example:

```yaml
id: EXP-WILD-0001
type: experiment
hypothesis_id: HYP-WILD-0001
journey_ids:
  - JRN-WILD-0001
metric_ids:
  - MET-WILD-0001
linked_ids:
  - FAIL-WILD-0003
  - RISK-OPS-0002
```

## Validation Rules

Minimum validation should check:

- ID format
- required fields
- allowed status values
- valid BCP-47 language tags where applicable
- linked IDs exist or are explicitly marked external
- sensitivity level is present for evidence and artifacts
- baseline and treatment fields are present when comparison is required
- customer-facing claims link to findings and trust controls

## Sensitivity Levels

Use the sensitivity levels from `01-research/EVIDENCE_STANDARD.md`:

- `S0`: public or synthetic
- `S1`: internal non-sensitive
- `S2`: user-generated or evaluator-generated text
- `S3`: personal, regulated, or high-risk content

## Directory And File Naming

Use lowercase directories and descriptive filenames:

```text
registries/hypotheses/hypotheses.yaml
registries/journeys/journeys.yaml
registries/runs/runs.jsonl
registries/evidence/evidence.jsonl
registries/graph/edges.jsonl
```

Generated files should include `generated` in the path or filename and should not be treated as canonical sources of truth.

## Migration From Markdown

When converting markdown definitions into structured records:

1. preserve the original ID
2. link `source_doc`
3. copy only stable definitions
4. keep explanatory prose in markdown
5. record unresolved ambiguity in `notes`
6. validate links before the registry becomes active

## First Schema Targets

Create draft schemas in this order:

1. hypothesis
2. journey
3. failure type
4. intervention class
5. treatment
6. experiment
7. run
8. evidence item
9. finding
10. graph edge
