# Evidence-ledger migrations

Migrations are forward-only, SQL-first, and portable PostgreSQL. They are never
run from a request handler or automatically at application startup.

`001_evidence_ledger.sql` creates the append-only comparison, run, event,
artifact, evaluation, intervention, and reviewer-annotation tables. It is
idempotent for initial setup; destructive rollback is an explicit database
restore or instance replacement, not a down migration that discards evidence.

Apply it with a migration identity/database user, never the Cloud Run runtime
user:

```sh
read -r -s DATABASE_URL
export DATABASE_URL
pnpm --filter @bomgoodbueno/hotel-shoreline migrate:ledger
unset DATABASE_URL
```

Before a later migration, export/backup the database, test the forward change
against a disposable PostgreSQL instance, document compatibility with the
currently deployed application, and define the revision rollback path.
