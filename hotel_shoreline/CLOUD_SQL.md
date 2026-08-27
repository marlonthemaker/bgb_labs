# Cloud SQL Evidence Ledger Runbook — HSD-007

This runbook records and operates the HSD-007 Cloud SQL deployment in
`native-agent-poc` / `europe-west1`. As of 2026-08-27,
`hotel-shoreline-ledger` is externally provisioned. Merged-main revision
`hotel-shoreline-hsd007-4f1a1d5` first proved persistence by retrieving a
synthetic comparison written before its deployment. Current merged-main
revision `hotel-shoreline-hsd008-b7fd869` retrieved that same record through
the public evidence boundary and now receives 100% of production traffic.
HSD-007 and HSD-006 are complete; HSD-008 is in owner release review. Cloud SQL
does not scale to zero; the existing USD 20 alert is notification, not a
spending cap.

## Deployed development shape

- PostgreSQL 17, Enterprise edition, zonal `europe-west1-b`.
- `db-f1-micro`, fixed 10 GiB HDD, storage auto-growth disabled.
- Automated backups and point-in-time recovery disabled; no HA or recovery
  objective is claimed.
- Deletion protection enabled; no authorized-network CIDR is configured.
- Official 2026-08-27 list price for the shared-core compute in
  `europe-west1` was USD 7.665/month before storage/network usage.
- Cloud Run remains capped at two instances and four concurrent requests per
  instance; the application pool is capped at three connections per instance.

## Release boundary

```text
migration operator + migration DB user
  -> forward-only SQL migration

public Cloud Run service
  -> runtime service account with Cloud SQL Client
  -> bounded pg pool (maximum 3 connections per instance)
  -> runtime DB user with SELECT/INSERT only
  -> append-only evidence tables
```

The browser receives sanitized history summaries and may request a versioned
public projection of one exact synthetic record. That projection intentionally
contains authored synthetic turns, structured candidate/validation/operation
evidence, measures, provenance, and claim limits. It never contains
`DATABASE_URL`, Cloud SQL administration, credentials, raw database rows,
database-driver types, provider prompts/responses, or raw exceptions.

## 1. Verify code and cost before provisioning

Run the ordinary full gate plus the real PostgreSQL contract. CI supplies a
pinned PostgreSQL 17 service; a local database may be supplied through the
server-only test URL.

```sh
pnpm check
pnpm audit:prod
pnpm typecheck
pnpm test:all
HSD_TEST_DATABASE_URL='postgresql://USER:PASSWORD@127.0.0.1:5432/DATABASE' pnpm test:postgres
pnpm build
```

In Google Cloud, review the current Cloud SQL estimate for the exact region,
edition, machine, storage, backup, and network choices. The budget alert is not
a spending cap. Stop if the expected hackathon lifetime exceeds the approved
budget.

## 2. Freeze names and enable the API

```sh
PROJECT_ID="native-agent-poc"
REGION="europe-west1"
INSTANCE="hotel-shoreline-ledger"
DATABASE="hotel_shoreline"
RUNTIME_DB_USER="hotel_shoreline_runtime"
MIGRATION_DB_USER="hotel_shoreline_migrator"
RUNTIME_SA="hotel-shoreline-runtime@${PROJECT_ID}.iam.gserviceaccount.com"
DATABASE_URL_SECRET="hotel-shoreline-database-url"

test "$(gcloud config get-value project)" = "$PROJECT_ID"
gcloud services enable sqladmin.googleapis.com
```

Use a supported PostgreSQL 17 configuration shown by the current Cloud SQL CLI
and pricing calculator. Start with the smallest supported non-HA development
configuration that meets connection/storage requirements; cap storage rather
than enabling unbounded automatic growth. Do not copy an outdated tier command
without checking `gcloud sql instances create --help`.

## 3. Separate cloud and database authority

Grant the existing Cloud Run runtime identity only connection authority:

```sh
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${RUNTIME_SA}" \
  --role="roles/cloudsql.client"
```

Create separate migration and runtime database users with generated random
passwords. Cloud SQL admin-created PostgreSQL users initially inherit
`cloudsqlsuperuser`; explicitly revoke that membership from both identities.
The migration user applies and owns created tables. After migration, grant the
runtime user only `CONNECT`, schema `USAGE`, and `SELECT`/`INSERT` on the
evidence tables; do not grant `UPDATE`, `DELETE`, `TRUNCATE`, `CREATE`, or
ownership. Revoke default public privileges.

Do not use `SELECT ... FOR UPDATE` in the append-only repository: PostgreSQL
requires UPDATE authority for that lock. Exact replay and races are resolved by
the unique key plus `INSERT ... ON CONFLICT`, preserving the runtime role's
strict SELECT/INSERT boundary.

Store the runtime connection URL as one Secret Manager value. For the Cloud Run
Unix socket, `pg` accepts a URL shaped like this, with URL-encoded credentials:

```text
postgresql://USER:PASSWORD@localhost/DATABASE?host=/cloudsql/PROJECT:REGION:INSTANCE
```

Add the secret through hidden standard input and grant the runtime identity
access only to that secret. Pin a numeric version in the Cloud Run revision.

## 4. Apply migration outside request handling

Connect as the migration user through an approved Cloud SQL path, export
`DATABASE_URL` only in the current shell, and run:

```sh
pnpm --filter @bomgoodbueno/hotel-shoreline migrate:ledger
unset DATABASE_URL
```

Then connect as the runtime user and verify it can select/insert but cannot
update, delete, truncate, or create. Never place migration credentials in the
Cloud Run revision.

## 5. Deploy a bounded revision

Update the existing Cloud Run service with the instance attachment,
`HSD_LEDGER_MODE=postgres`, and the pinned `DATABASE_URL` secret. Keep maximum
instances at two and concurrency at four; with a pool maximum of three this
bounds application connections to six plus migration/administrative sessions.
Deploy only a clean approved commit and retain the prior memory-mode revision
for traffic rollback.

## 6. Verify without exposing credentials

1. Run a deterministic matched comparison.
2. Fetch `GET /api/native-adoption?limit=20` and find its sanitized summary.
3. Fetch `GET /api/native-adoption/{comparisonId}` twice and confirm the
   versioned public JSON artifacts are byte-identical and privacy-safe.
4. Restart or redeploy the service and confirm both summary and exact export
   remain.
5. Confirm an exact record replay is idempotent and a conflicting identity is
   rejected.
6. Inspect Cloud Logging for typed ledger availability errors only; logs must
   not include the URL, password, request turns, candidate graph, operation
   input, or raw database exception.
7. Verify the runtime database role still cannot mutate or delete evidence.

## Retention, export, recovery, and deletion

- Retain synthetic hackathon records for 30 days after submission unless a
  documented study/publication need extends that period.
- Use a privacy-safe application export for sharing. Use `pg_dump`/`pg_restore`
  for portability and controlled recovery; Cloud SQL backups are additional
  recovery support, not the only export.
- Record actual backup/PITR configuration and perform a disposable restore test
  before claiming a recovery point or recovery time.
- Deletion is an operator-controlled retention action, never a public API. Take
  the approved export first, then delete the explicit database/instance only
  after traffic is rolled back or the service is detached.
- Application rollback sends Cloud Run traffic to the prior compatible
  revision. Schema rollback restores a pre-migration database; do not issue ad
  hoc destructive down SQL.

## Primary references

- [Cloud SQL for PostgreSQL](https://cloud.google.com/sql/docs/postgres)
- [Connect Cloud Run to Cloud SQL](https://cloud.google.com/sql/docs/postgres/connect-run)
- [Cloud SQL IAM roles](https://cloud.google.com/sql/docs/postgres/iam-roles)
- [PostgreSQL export and import](https://cloud.google.com/sql/docs/postgres/import-export)
