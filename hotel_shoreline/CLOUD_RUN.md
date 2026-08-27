# Cloud Run Release Runbook — Hotel Shoreline

This runbook deploys and verifies the current fictional Hotel Shoreline
demonstration. Complete the [Google Cloud bootstrap](../docs/operations/GOOGLE_CLOUD_SETUP.md)
and [Cloud SQL ledger setup](CLOUD_SQL.md) first. Nothing here grants deployment
authority: reconfirm the approved issue, commit, account, project, region, and
cost boundary before any mutation.

As of 2026-08-27, merged-main revision
`hotel-shoreline-hsd006-388f840` serves 100% of production traffic in
`native-agent-poc` / `europe-west1`. Build
`78c4bb63-6fa6-4eda-8aeb-1f4848feb660` produced image digest
`sha256:6982c94812df2403eafda448d457b12ed199f29fa78392f89f78e3671f6da8dd`.

## Release invariants

- Deploy only an approved committed SHA from a clean working tree after its
  full deterministic gate and required PR check pass.
- Build from the root `Dockerfile`; the runtime is a minimal standalone Next.js
  server, runs as a non-root user, and includes the workspace SDK.
- Inspect `.gcloudignore` before every source upload. Local environments,
  credentials, dependencies, Git metadata, research, issue records, generated
  reports, and unrelated documentation stay outside the upload boundary.
- Pin `GEMINI_API_KEY` and `DATABASE_URL` to numeric Secret Manager versions.
  Never use `latest`, print values, or pass payloads as command arguments.
- The build identity has `roles/run.builder`. The runtime identity has only the
  two scoped secret-access bindings and `roles/cloudsql.client`; the database
  runtime login remains limited to `CONNECT`, schema `USAGE`, and table
  `SELECT`/`INSERT`.
- Public routes accept only synthetic bounded inputs and return sanitized typed
  evidence/errors. They do not expose credentials, database types, raw
  exceptions, provider prompts/responses, or hidden chain-of-thought.
- Deploy a tagged zero-traffic candidate, verify it, then explicitly promote
  that exact revision. Never let source deployment replace production traffic
  before the candidate gate.
- Cloud Run remains bounded at zero minimum/two maximum instances, concurrency
  four, one CPU, 512 MiB, and a 60-second request timeout. The application does
  not silently retry quota or provider failures.
- The USD 20 budget is an alert, not a hard cap. Cloud SQL does not scale to
  zero and currently has no HA, automated backups, or PITR claim.

## 1. Verify the release candidate locally

From a clean repository root:

```sh
git status --short
git rev-parse HEAD
pnpm install --frozen-lockfile
pnpm check
pnpm audit:prod
pnpm typecheck
HSD_E2E_PORT=3110 pnpm test:all
pnpm build
git diff --check
```

`git status --short` must be empty. Provider smokes are separate quota-bearing
evidence; run only the test named by the active issue and never treat a provider
failure as authorization to retry.

To inspect the standalone artifact without Docker:

```sh
HSD_PLANNER_MODE=deterministic \
HSD_LEDGER_MODE=memory \
PORT=8080 \
HOSTNAME=127.0.0.1 \
node hotel_shoreline/.next/standalone/hotel_shoreline/server.js
```

Verify the fixed Taskmaster run and one matched comparison, saved history,
exact-record inspection, JSON download, failure state, disclosure, and 390 px
layout. Stop the server with Ctrl-C.

## 2. Reconfirm target, identities, and pinned versions

Set non-secret release metadata in the current shell:

```sh
PROJECT_ID="native-agent-poc"
REGION="europe-west1"
SERVICE="hotel-shoreline"
ISSUE_LABEL="hsd-008"
REVISION_PREFIX="hsd008"
BUILD_SA="hotel-shoreline-builder@${PROJECT_ID}.iam.gserviceaccount.com"
RUNTIME_SA="hotel-shoreline-runtime@${PROJECT_ID}.iam.gserviceaccount.com"
GEMINI_SECRET="hotel-shoreline-gemini-key"
GEMINI_SECRET_VERSION="1"
DATABASE_SECRET="hotel-shoreline-database-url"
DATABASE_SECRET_VERSION="2"
CLOUD_SQL_INSTANCE="${PROJECT_ID}:${REGION}:hotel-shoreline-ledger"
COMMIT_SHA="$(git rev-parse HEAD)"
SHORT_SHA="$(git rev-parse --short=7 HEAD)"
REVISION_SUFFIX="${REVISION_PREFIX}-${SHORT_SHA}"
CANDIDATE_TAG="candidate-${SHORT_SHA}"

test "$(gcloud config get-value project)" = "$PROJECT_ID"
test "$(gcloud config get-value run/region)" = "$REGION"
git diff --quiet
git diff --cached --quiet
```

Confirm both numeric versions are enabled without reading either value:

```sh
gcloud secrets versions describe "$GEMINI_SECRET_VERSION" \
  --secret "$GEMINI_SECRET" --format='value(state)'
gcloud secrets versions describe "$DATABASE_SECRET_VERSION" \
  --secret "$DATABASE_SECRET" --format='value(state)'
```

Both commands must return `ENABLED`. Reinspect service-account IAM and the
database grants when either identity or secret binding changed.

## 3. Preview the source upload

```sh
UPLOAD_MANIFEST="$(mktemp)"
gcloud meta list-files-for-upload > "$UPLOAD_MANIFEST"

test "$(grep -Ec '(^|/)\.env($|\.)' "$UPLOAD_MANIFEST")" -eq 0
test "$(grep -Ec '(^|/)node_modules/' "$UPLOAD_MANIFEST")" -eq 0
test "$(grep -Ec '(^|/)research/' "$UPLOAD_MANIFEST")" -eq 0
test "$(grep -Ec '(^|/)(issues|docs)/' "$UPLOAD_MANIFEST")" -eq 0
sed -n '1,200p' "$UPLOAD_MANIFEST"
rm "$UPLOAD_MANIFEST"
```

The list should contain only the Docker/workspace configuration and runtime
package inputs expected by the root Dockerfile. Stop if a credential, local
environment, report, unrelated study, or duplicate artifact appears.

## 4. Deploy a tagged zero-traffic candidate

```sh
gcloud run deploy "$SERVICE" \
  --source . \
  --project "$PROJECT_ID" \
  --region "$REGION" \
  --build-service-account "projects/${PROJECT_ID}/serviceAccounts/${BUILD_SA}" \
  --service-account "$RUNTIME_SA" \
  --revision-suffix "$REVISION_SUFFIX" \
  --set-env-vars "HSD_PLANNER_MODE=gemini,GOOGLE_CLOUD_PROJECT=${PROJECT_ID},HSD_LEDGER_MODE=postgres" \
  --set-secrets "GEMINI_API_KEY=${GEMINI_SECRET}:${GEMINI_SECRET_VERSION},DATABASE_URL=${DATABASE_SECRET}:${DATABASE_SECRET_VERSION}" \
  --set-cloudsql-instances "$CLOUD_SQL_INSTANCE" \
  --labels "app=hotel-shoreline,issue=${ISSUE_LABEL},commit=${SHORT_SHA}" \
  --execution-environment gen2 \
  --cpu 1 \
  --memory 512Mi \
  --min-instances 0 \
  --max-instances 2 \
  --concurrency 4 \
  --timeout 60s \
  --ingress all \
  --allow-unauthenticated \
  --no-traffic \
  --tag "$CANDIDATE_TAG"
```

Record the Cloud Build ID, immutable image digest, revision name, and tagged
URL. Confirm the previous production revision still has 100% traffic.

## 5. Inspect configuration without exposing secrets

```sh
REVISION="${SERVICE}-${REVISION_SUFFIX}"

gcloud run revisions describe "$REVISION" \
  --region "$REGION" \
  --format='yaml(metadata.labels,spec.serviceAccountName,spec.timeoutSeconds,spec.containerConcurrency,spec.containers[0].image,spec.containers[0].resources,status.conditions)'

gcloud run services describe "$SERVICE" \
  --region "$REGION" \
  --format='table(status.url,status.latestReadyRevisionName,status.traffic[].revisionName,status.traffic[].percent,status.traffic[].tag)'
```

Verify commit/issue labels, runtime identity, immutable image digest, timeout,
concurrency, resource bounds, healthy conditions, Cloud SQL attachment, and
numeric secret references. Query selected fields only; never print a full
environment dump.

## 6. Verify the tagged application and evidence boundary

Resolve the tagged URL from the service description and choose a known
synthetic `COMPARISON_ID` from sanitized history:

```sh
CANDIDATE_URL="$(gcloud run services describe "$SERVICE" \
  --region "$REGION" \
  --format=json \
  | jq -r --arg tag "$CANDIDATE_TAG" \
    '.status.traffic[] | select(.tag == $tag) | .url')"
COMPARISON_ID="CANONICAL_SYNTHETIC_COMPARISON_UUID"

test -n "$CANDIDATE_URL"

curl --fail --silent --show-error "$CANDIDATE_URL/" > /tmp/hsd-home.html
curl --fail --silent --show-error \
  "$CANDIDATE_URL/api/native-adoption?limit=20" > /tmp/hsd-history.json
curl --fail --silent --show-error \
  "$CANDIDATE_URL/api/native-adoption/$COMPARISON_ID" > /tmp/hsd-evidence-a.json
curl --fail --silent --show-error \
  "$CANDIDATE_URL/api/native-adoption/$COMPARISON_ID" > /tmp/hsd-evidence-b.json

cmp /tmp/hsd-evidence-a.json /tmp/hsd-evidence-b.json
jq -e --arg id "$COMPARISON_ID" '
  .schemaVersion == "hotel-shoreline-public-evidence-v1" and
  .comparison.comparisonId == $id and
  .comparison.claimBoundary.environment == "fictional_synthetic_demo" and
  (.comparison.arms | length == 2)
' /tmp/hsd-evidence-a.json
```

Also prove malformed identity → typed 400, valid missing identity → typed 404,
and repository unavailability → typed 503 in a controlled test environment.
Search the export for database configuration, secret references, raw
exceptions, and hidden prompts; none may be present.

In a browser, refresh saved evidence, reopen the exact record, and verify:

- source turns, review status, versions, hashes, conditions, interventions,
  candidates, validation, operations, lifecycle, first loss, and measure
  definitions match the artifact;
- rejected, provider-failed, partial, successful, excluded, and not-reached
  states are not conflated;
- the download works at desktop and 390 px without horizontal overflow or
  keyboard/focus regression; and
- fictional, non-affiliation, synthetic, and non-research limits remain visible.

Inspect only allowlisted structured logs and confirm there are no unexpected
error-severity entries for the candidate revision. Logs must not contain keys,
request prose, node/tool inputs, provider payloads, raw exception messages, or
stack traces.

## 7. Promote, reverify, or roll back

Promote only the verified immutable revision:

```sh
gcloud run services update-traffic "$SERVICE" \
  --region "$REGION" \
  --to-revisions "${REVISION}=100"
```

Repeat homepage, disclosure, history, exact-export, typed-error, desktop/390 px,
and revision-log checks on the normal service URL. Record the final traffic
table. If any check fails, route 100% back to the explicitly named last verified
revision; never use a moving alias:

```sh
gcloud run services update-traffic "$SERVICE" \
  --region "$REGION" \
  --to-revisions "VERIFIED_REVISION=100"
```

Application rollback does not roll back the database. Schema changes require a
separately verified forward migration or controlled restore plan.

## 8. Provider evidence is explicit and quota-bearing

Run a real Gemini Taskmaster or matched-comparison proof only when the active
issue requires it and quota/cost are approved. Capture allowlisted response and
telemetry facts. A 429, 503, timeout, or malformed response must retain a typed
zero-operation/invalid arm without a false completion claim; do not retry merely
to manufacture a success. Existing HSD-004/HSD-005 Completion Records own prior
provider proof.

## 9. Record and clean up

The active issue Completion Record must include commit, PR/CI, build ID, image
digest, revision/tag/traffic, service URL, exact synthetic run or comparison
ID, API/browser/log assertions, limitations, and reviewer. Never include access
tokens, secret values, full environments, provider payloads, or raw database
rows.

After judging, review Cloud Run, Artifact Registry, Secret Manager, Cloud SQL,
and Cloud Build costs separately. Deleting the main service or database is a
destructive operation requiring explicit authorization and a retention/export
decision.

## Primary references

- [Deploy Cloud Run from source](https://cloud.google.com/run/docs/deploying-source-code)
- [Configure a source build service account](https://cloud.google.com/run/docs/configuring/services/build-service-account)
- [Configure Cloud Run secrets](https://cloud.google.com/run/docs/configuring/services/secrets)
- [Connect Cloud Run to Cloud SQL](https://cloud.google.com/sql/docs/postgres/connect-run)
- [Manage Cloud Run traffic](https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration)
- [Cloud Run request timeout](https://cloud.google.com/run/docs/configuring/request-timeout)
- [Cloud Run concurrency](https://cloud.google.com/run/docs/configuring/concurrency)
- [`gcloud` ignore behavior](https://cloud.google.com/sdk/gcloud/reference/topic/gcloudignore)
