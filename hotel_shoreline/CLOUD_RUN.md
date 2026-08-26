# Cloud Run Release Runbook — HSD-004

This runbook deploys and verifies the fictional Hotel Shoreline demonstration.
Complete [`../GOOGLE_CLOUD_SETUP.md`](../GOOGLE_CLOUD_SETUP.md) first. Nothing in
this document authorizes a deployment; run Google Cloud mutation commands only
after confirming the active account, project, region, commit, and expected cost.

## Release invariants

- Deploy only an approved, committed SHA from a clean working tree.
- Build from the root `Dockerfile`; it produces a minimal Next.js standalone
  runtime, runs as a non-root user, and includes the workspace SDK.
- `.gcloudignore` controls uploaded source and `.dockerignore` controls the
  container build context. Both exclude local environments, credentials, test
  artifacts, Git metadata, the research canon, and dependencies.
- `GEMINI_API_KEY` is a server-only Secret Manager environment variable pinned
  to a numeric version. Never use `latest` for a release revision.
- The custom build identity has `roles/run.builder`; the runtime identity has
  access only to the one Gemini secret and no broad project role.
- Cloud Run is public only because judges need the demo. The only mutation route
  accepts a fixed synthetic event, projects an allowlisted response, and cannot
  receive arbitrary hotel/tool input.
- The application planner stops after 30 seconds. Cloud Run uses 60 seconds so
  the app can return its typed failure before the platform closes the request.
- Scale-to-zero, two maximum instances, four concurrent requests per instance,
  one CPU, and 512 MiB memory bound hackathon cost and provider pressure.

## 1. Verify the release candidate locally

From the repository root:

```sh
git status --short
git rev-parse HEAD
pnpm install --frozen-lockfile
pnpm check
pnpm typecheck
pnpm test:all
pnpm build
pnpm test:e2e:gemini
git diff --check
```

`git status --short` must be empty before deployment. The credentialed smoke
uses only the ignored `hotel_shoreline/.env.local` key.

Verify the same standalone artifact used by the container without Docker:

```sh
HSD_PLANNER_MODE=deterministic \
PORT=8080 \
HOSTNAME=127.0.0.1 \
node hotel_shoreline/.next/standalone/hotel_shoreline/server.js
```

In a second terminal, open `http://127.0.0.1:8080`, run the fixed request, and
confirm the actual two-node candidate, three preserved constraints, bounded
planning metadata, `execution.finished`, two successful nodes, and two
operations. Stop the server with Ctrl-C.

If Docker is installed, also verify the exact container:

```sh
docker build --pull -t hotel-shoreline:hsd-004 .
docker run --rm -p 8080:8080 \
  -e HSD_PLANNER_MODE=deterministic \
  hotel-shoreline:hsd-004
```

Docker is optional for a source deployment because Cloud Build builds the root
Dockerfile remotely.

## 2. Reconfirm the cloud target

The bootstrap guide defines these shell values:

```sh
PROJECT_ID="PROJECT_ID"
REGION="europe-west1"
SERVICE="hotel-shoreline"
BUILD_SA="hotel-shoreline-builder@${PROJECT_ID}.iam.gserviceaccount.com"
RUNTIME_SA="hotel-shoreline-runtime@${PROJECT_ID}.iam.gserviceaccount.com"
SECRET_ID="hotel-shoreline-gemini-key"
SECRET_VERSION="1"

COMMIT_SHA="$(git rev-parse HEAD)"
SHORT_SHA="$(git rev-parse --short=8 HEAD)"
REVISION_SUFFIX="hsd004-${SHORT_SHA}"

test "$(gcloud config get-value project)" = "$PROJECT_ID"
test -n "$SECRET_VERSION"
git diff --quiet
git diff --cached --quiet
```

Do not proceed when any assertion fails. Confirm the numeric secret version is
enabled without reading its value:

```sh
gcloud secrets versions describe "$SECRET_VERSION" \
  --secret="$SECRET_ID" \
  --format='value(state)'
```

Expected output: `ENABLED`.

## 3. Preview the upload boundary

`gcloud meta list-files-for-upload` uses the active ignore configuration. Save
the list outside the repository and inspect it before source deployment:

```sh
gcloud meta list-files-for-upload > /tmp/hotel-shoreline-upload.txt

test "$(grep -Ec '(^|/)\.env($|\.)' /tmp/hotel-shoreline-upload.txt)" -eq 0
test "$(grep -Ec '(^|/)node_modules/' /tmp/hotel-shoreline-upload.txt)" -eq 0
test "$(grep -Ec '(^|/)initial_spike/' /tmp/hotel-shoreline-upload.txt)" -eq 0

sed -n '1,200p' /tmp/hotel-shoreline-upload.txt
```

The list should contain the Dockerfile, workspace manifests/configuration, and
the two package source trees only.

## 4. Deploy the release revision

The following source deployment uses the root Dockerfile and the dedicated
Cloud Build identity:

```sh
gcloud run deploy "$SERVICE" \
  --source . \
  --region "$REGION" \
  --build-service-account "projects/${PROJECT_ID}/serviceAccounts/${BUILD_SA}" \
  --service-account "$RUNTIME_SA" \
  --revision-suffix "$REVISION_SUFFIX" \
  --set-env-vars "HSD_PLANNER_MODE=gemini,GOOGLE_CLOUD_PROJECT=${PROJECT_ID}" \
  --set-secrets "GEMINI_API_KEY=${SECRET_ID}:${SECRET_VERSION}" \
  --labels "app=hotel-shoreline,issue=hsd-004,commit=${SHORT_SHA}" \
  --execution-environment gen2 \
  --cpu 1 \
  --memory 512Mi \
  --min-instances 0 \
  --max-instances 2 \
  --concurrency 4 \
  --timeout 60s \
  --ingress all \
  --allow-unauthenticated
```

Source deployment sends the filtered context to Cloud Build, builds and stores
an image in Artifact Registry, creates a revision, and sends it 100% of service
traffic. If IAM changes were just applied, allow several minutes for
propagation before diagnosing a permissions failure.

## 5. Verify configuration without exposing secrets

```sh
SERVICE_URL="$(gcloud run services describe "$SERVICE" \
  --region "$REGION" \
  --format='value(status.url)')"

SUCCESS_REVISION="$(gcloud run services describe "$SERVICE" \
  --region "$REGION" \
  --format='value(status.latestReadyRevisionName)')"

printf 'Service URL: %s\nRevision: %s\nCommit: %s\n' \
  "$SERVICE_URL" "$SUCCESS_REVISION" "$COMMIT_SHA"

gcloud run services describe "$SERVICE" \
  --region "$REGION" \
  --format='yaml(metadata.labels,status.url,status.latestReadyRevisionName,spec.template.spec.serviceAccountName,spec.template.spec.timeoutSeconds,spec.template.spec.containerConcurrency,spec.template.metadata.annotations.autoscaling\.knative\.dev/maxScale,spec.template.spec.containers[0].resources)'

gcloud secrets get-iam-policy "$SECRET_ID"
```

The output must identify the intended revision, runtime service account,
60-second timeout, concurrency 4, maximum scale 2, and pinned secret reference.
It must never contain the secret value.

## 6. Verify the deployed success path

```sh
curl --fail --silent --show-error "$SERVICE_URL/" > /tmp/hsd004-home.html

HTTP_STATUS="$(curl --silent --show-error \
  --output /tmp/hsd004-success.json \
  --write-out '%{http_code}' \
  --request POST \
  "$SERVICE_URL/api/taskmaster")"

test "$HTTP_STATUS" = "200"
jq -e '
  .status == "succeeded" and
  .plannerFramework == "genkit" and
  .plannerModel == "gemini-3.5-flash" and
  .operationCount == 2 and
  (.candidateGraph.nodes | length) == 2 and
  (.candidateGraph.preservedConstraintIds | length) == 3 and
  (.nodeResults | all(.status == "succeeded")) and
  .lifecycle[-1] == "execution.finished"
' /tmp/hsd004-success.json
```

Then perform the browser check at desktop and approximately 390 px width. The
fictional, non-affiliation, and non-research disclosure must remain visible.

Inspect only allowlisted structured telemetry:

```sh
gcloud logging read \
  'resource.type="cloud_run_revision" AND resource.labels.service_name="hotel-shoreline" AND jsonPayload.event="taskmaster.run.completed"' \
  --project "$PROJECT_ID" \
  --limit 10 \
  --freshness 1h \
  --format='table(timestamp,severity,jsonPayload.requestId,jsonPayload.status,jsonPayload.errorCode,jsonPayload.operationCount,jsonPayload.candidateNodeCount,jsonPayload.terminalLifecycleEvent)'
```

Successful evidence is `INFO`, `succeeded`, two operations, two candidate
nodes, and `execution.finished`. Logs must not contain a key, request text,
node input, tool output, exception message, or stack.

Cloud Logging ingestion is asynchronous. If a just-completed run is absent,
repeat the read after a short propagation interval; do not rerun the model or
weaken the query merely to obtain an immediate row.

## 7. Capture a controlled deployed failure

HSD4-P-003 requires external evidence that unavailable planning performs no
operation. Create a temporary second service from the already-built immutable
image, intentionally omit the secret binding, capture the typed failure, then
delete only that temporary service.

```sh
DEPLOYED_IMAGE="$(gcloud run revisions describe "$SUCCESS_REVISION" \
  --region "$REGION" \
  --format='value(spec.containers[0].image)')"

FAILURE_SERVICE="hotel-shoreline-failure-proof"

gcloud run deploy "$FAILURE_SERVICE" \
  --image "$DEPLOYED_IMAGE" \
  --region "$REGION" \
  --service-account "$RUNTIME_SA" \
  --set-env-vars "HSD_PLANNER_MODE=gemini,GOOGLE_CLOUD_PROJECT=${PROJECT_ID}" \
  --clear-secrets \
  --min-instances 0 \
  --max-instances 1 \
  --concurrency 1 \
  --timeout 60s \
  --ingress all \
  --allow-unauthenticated

FAILURE_URL="$(gcloud run services describe "$FAILURE_SERVICE" \
  --region "$REGION" \
  --format='value(status.url)')"

FAILURE_STATUS="$(curl --silent --show-error \
  --output /tmp/hsd004-failure.json \
  --write-out '%{http_code}' \
  --request POST \
  "$FAILURE_URL/api/taskmaster")"

test "$FAILURE_STATUS" = "503"
jq -e '
  .status == "planning_failed" and
  .plannerFramework == "genkit" and
  .errorCode == "PLANNER_UNAVAILABLE" and
  .operationCount == 0 and
  (.nodeResults | length) == 0 and
  .lifecycle[-1] == "planning.failed"
' /tmp/hsd004-failure.json
```

Capture the non-secret response and corresponding `WARNING` log, then remove
the exact temporary service:

```sh
gcloud run services delete "$FAILURE_SERVICE" --region "$REGION"
```

Deleting the named failure-proof service is destructive but does not affect the
main `hotel-shoreline` service.

## 8. Record HSD-004 evidence

Update the HSD-004 Completion Record with:

- project ID and region;
- full commit SHA and Cloud Run image digest;
- service URL and successful revision name;
- runtime and build service-account names plus sanitized IAM proof;
- model, fixture, contract, and planner versions;
- successful response assertions and allowlisted completion log;
- temporary failure-proof revision/service evidence showing zero operations;
- desktop/mobile screenshots with disclosure;
- limitations, timestamp, PR check, and reviewer.

Do not commit access tokens, secret values, full environment dumps, or logs
containing provider payloads.

## 9. Roll back or clean up

List revisions before changing traffic:

```sh
gcloud run revisions list --service "$SERVICE" --region "$REGION"
```

To roll back, explicitly choose a previously verified revision:

```sh
gcloud run services update-traffic "$SERVICE" \
  --region "$REGION" \
  --to-revisions VERIFIED_REVISION=100
```

After the hackathon, review Cloud Run, Artifact Registry, Secret Manager, and
Cloud Build costs independently. Deleting the main service is optional and
destructive, and does not delete images or secrets:

```sh
gcloud run services delete "$SERVICE" --region "$REGION"
```

## Primary references

- [Deploy Cloud Run from source](https://cloud.google.com/run/docs/deploying-source-code)
- [Configure a source build service account](https://cloud.google.com/run/docs/configuring/services/build-service-account)
- [Configure Cloud Run secrets](https://cloud.google.com/run/docs/configuring/services/secrets)
- [Cloud Run request timeout](https://cloud.google.com/run/docs/configuring/request-timeout)
- [Cloud Run concurrency](https://cloud.google.com/run/docs/configuring/concurrency)
- [Cloud Run ingress](https://cloud.google.com/run/docs/securing/ingress)
- [`gcloud` ignore behavior](https://cloud.google.com/sdk/gcloud/reference/topic/gcloudignore)
