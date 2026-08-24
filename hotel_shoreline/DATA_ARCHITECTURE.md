# Hotel Shoreline Evidence Ledger Architecture

## Decision

HSD-007 will use **Cloud SQL for PostgreSQL** for the deployed evidence ledger,
not Firestore. PostgreSQL suits the required append-only run history,
comparisons, joins, constraints, reviewer annotations, and portable reporting
better than a document database. The application stays portable by depending on
an application-owned repository port and standard PostgreSQL behavior.

Cloud SQL is managed PostgreSQL, supports normal PostgreSQL dump/restore tools,
and can be connected to Cloud Run using the Cloud SQL connection mechanism and
a least-privilege runtime service account. See [Cloud SQL for PostgreSQL
documentation](https://cloud.google.com/sql/docs/postgres) and [the Cloud Run
connection guide](https://cloud.google.com/sql/docs/postgres/connect-run).

## Storage boundary

```text
Hotel Shoreline server route / worker
  -> RunRepository port
      -> InMemoryRunRepository (unit and integration tests)
      -> PostgresRunRepository (local PostgreSQL and Cloud SQL)
  -> sanitized RunProjection API
  -> browser comparison and evidence UI
```

No browser code imports a database driver, receives a database credential, or
accesses Cloud SQL directly.

## Portability rules

- Use the standard PostgreSQL `pg` driver and SQL-first, versioned migrations.
- Keep migrations in the repository and make them forward-only; use a separate
  migration command/service identity from the Cloud Run runtime identity.
- Prefer portable PostgreSQL types and constraints: `uuid`, `text`, `boolean`,
  `integer`, `timestamptz`, `jsonb`, unique constraints, foreign keys, and
  check constraints. Generate UUIDs in application code.
- Do not depend on Firestore semantics, BigQuery, Cloud SQL extensions,
  proprietary triggers, or database-vendor-specific client APIs for the core
  ledger.
- Support export through a documented PostgreSQL logical dump plus a
  privacy-safe application export. Treat Cloud SQL backup as recovery support,
  not the only evidence-export mechanism.

This does not mean a database migration is effortless: networking, service
identity, secrets, backup/export permissions, and operational cutover still
require deliberate work. The repository port and standard schema keep the
application migration path tractable.

## Data model

Store immutable raw facts separately from derived and human-generated records.

| Table | Purpose | Mutation rule |
| --- | --- | --- |
| `run` | Immutable identity, case/locale, treatment arm, model/configuration, status, and provenance. | Insert only. |
| `run_event` | Ordered planning, validation, execution, and terminal events. | Insert only; unique `(run_id, sequence)`. |
| `run_artifact` | Sanitized request, candidate graph, validation result, tool events, and terminal outcome snapshots. | Insert only; content hash retained. |
| `evaluation` | Eligibility, descriptive measures, earliest-loss diagnosis, evaluator/rubric versions, and exclusion reason. | New evaluation revisions; never overwrite a raw run. |
| `review_annotation` | Qualified-review findings, confidence, disagreement, and representation limitation. | Append-only revision records. |
| `intervention` | Versioned treatment hypothesis, target failure, mechanism, parameters, activation, regression, and rollback criteria. | Versioned; immutable after use by a run. |

Use JSONB only for versioned evidence payloads whose internal shape is owned by
the application. Keep query-critical comparison dimensions as normalized
columns: case, locale, model, configuration hash, intervention version,
fixture/contract/tool version, status, eligibility, and timestamps.

## Security and operations

- Cloud Run runtime service account: only `Cloud SQL Client` and the single
  secret-access role it needs. No Owner, Editor, or database-admin role.
- Database credentials: stored in Secret Manager; never embedded in a
  `NEXT_PUBLIC_` variable, source code, image, or browser response.
- Cloud Run and Cloud SQL use the same region. Start with the documented Cloud
  Run Cloud SQL connection path; choose private networking only when the
  security need justifies its added setup.
- Use bounded connection pooling and set a connection timeout. Cloud Run
  scaling must be capped against database connection capacity.
- Define retention for synthetic runs, export/deletion procedure, backup
  recovery limits, and a cost cap before deployment.
- Run migrations through a dedicated command after backup/rollback planning;
  never run schema changes automatically in request handling.

## Deliberate exclusions

No real guest data, full-text customer transcripts, embeddings/vector search,
generic analytics warehouse, public administration API, or customer accounts
belong in the hackathon ledger.
