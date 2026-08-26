# Google Cloud Bootstrap — Hotel Shoreline

This guide prepares a new, dedicated Google Cloud project for HSD-004. It owns
account, identity, API, key, and secret setup. The repeatable deploy, evidence,
rollback, and cleanup commands live in
[`hotel_shoreline/CLOUD_RUN.md`](hotel_shoreline/CLOUD_RUN.md).

The commands below change Google Cloud state and may incur cost. Review the
active account, project, region, and billing configuration before running them.
Never paste a Gemini key into Git, a command argument, an issue, a PR, a log, or
chat.

## Target architecture

```text
public judge/browser
  -> Cloud Run service (max 2 instances, scale to zero)
      -> server-only Genkit / Gemini call
      -> Native Agent validation
      -> synthetic Hotel Shoreline adapters

Cloud Build identity -> builds source only
Cloud Run identity   -> reads one pinned Secret Manager version only
```

Cloud SQL is intentionally deferred to HSD-007. HSD-004 needs Cloud Run,
Secret Manager, Cloud Build, Artifact Registry, and the Gemini API only.

## 1. Choose the project and region

Create a dedicated project in the
[Google Cloud console](https://console.cloud.google.com/), attach billing, and
record the immutable **project ID**. For a Lisbon-based hackathon deployment,
`europe-west1` is a reasonable default and keeps the future HSD-007 Cloud SQL
instance co-locatable. Use a different supported region if policy or judging
latency requires it.

Create a billing budget before deployment. A normal budget sends alerts; it
does not automatically stop usage. Cloud Run's scale-to-zero and maximum
instance settings remain the primary cost bounds for this demo.

## 2. Use the installed `gcloud` CLI or Cloud Shell

Google Cloud CLI 582.0.0 is installed on the current workstation. No active
account, project, or Cloud Run region was configured when this guide was last
verified on 2026-08-26. Authenticate and create the named configuration below,
or use Cloud Shell if local browser authentication is inconvenient:

- Recommended for the first deployment: open Cloud Shell from the Google Cloud
  console, clone this repository, check out the approved commit, and run the
  commands there. Cloud Shell already has an authenticated `gcloud` CLI.
- On another workstation: install the current
  [Google Cloud CLI](https://cloud.google.com/sdk/docs/install), then follow the
  same named-configuration procedure.

Use a named configuration so another Google project is not changed by accident:

```sh
gcloud config configurations create hotel-shoreline-hsd --activate
# If it already exists instead:
# gcloud config configurations activate hotel-shoreline-hsd

gcloud auth login
gcloud config set project PROJECT_ID
gcloud config set run/region REGION
gcloud config list
gcloud auth list --filter=status:ACTIVE
```

Stop if the account, project ID, or region is not exactly the intended target.

## 3. Set local shell values

Replace the first two values only in your current shell. Do not commit them.

```sh
PROJECT_ID="PROJECT_ID"
REGION="europe-west1"
SERVICE="hotel-shoreline"
BUILD_SA_NAME="hotel-shoreline-builder"
RUNTIME_SA_NAME="hotel-shoreline-runtime"
SECRET_ID="hotel-shoreline-gemini-key"

BUILD_SA="${BUILD_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
RUNTIME_SA="${RUNTIME_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
DEPLOYER_ACCOUNT="$(gcloud config get-value account)"

test "$(gcloud config get-value project)" = "$PROJECT_ID"
test -n "$DEPLOYER_ACCOUNT"
```

Confirm billing is enabled in the console, or inspect it without exposing any
credential:

```sh
gcloud billing projects describe "$PROJECT_ID"
```

## 4. Create or migrate the Gemini key

As of August 2026, Google AI Studio creates Gemini **authorization keys** by
default, and Google states that standard Gemini keys stop working in September
2026. In [Google AI Studio](https://aistudio.google.com/app/apikey):

1. Select the dedicated project.
2. Create a fresh authorization key, or migrate an existing standard key.
3. Confirm it is restricted to the Gemini API.
4. Keep the value visible only long enough to place it in the ignored local file
   and Secret Manager.

For local verification only, use `hotel_shoreline/.env.local`:

```sh
cp -n hotel_shoreline/.env.example hotel_shoreline/.env.local
chmod 600 hotel_shoreline/.env.local
git check-ignore -v hotel_shoreline/.env.local
```

Do not create a `NEXT_PUBLIC_GEMINI_API_KEY`; that prefix would make the value
browser-visible at build time.

## 5. Enable only the required APIs

```sh
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com \
  iam.googleapis.com \
  generativelanguage.googleapis.com
```

API enablement can take several minutes to propagate.

## 6. Create separate build and runtime identities

```sh
gcloud iam service-accounts create "$BUILD_SA_NAME" \
  --display-name="Hotel Shoreline source build"

gcloud iam service-accounts create "$RUNTIME_SA_NAME" \
  --display-name="Hotel Shoreline Cloud Run runtime"
```

The build identity gets the project-level Cloud Run Builder role. The runtime
identity receives no project-wide role.

```sh
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${BUILD_SA}" \
  --role="roles/run.builder"
```

For a non-Owner deployer, grant the documented source-deploy permissions. An
Owner may already have the underlying permissions, but explicit least-privilege
bindings are clearer for a durable deployment account.

```sh
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="user:${DEPLOYER_ACCOUNT}" \
  --role="roles/run.sourceDeveloper"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="user:${DEPLOYER_ACCOUNT}" \
  --role="roles/serviceusage.serviceUsageConsumer"

gcloud iam service-accounts add-iam-policy-binding "$RUNTIME_SA" \
  --member="user:${DEPLOYER_ACCOUNT}" \
  --role="roles/iam.serviceAccountUser"
```

If the deployer is a service account, replace the `user:` member type with
`serviceAccount:`.

## 7. Store and pin the Gemini key

Create the secret container first:

```sh
gcloud secrets create "$SECRET_ID" --replication-policy=automatic
```

Add the key through hidden standard input so it does not enter shell history:

```sh
read -r -s GEMINI_API_KEY
printf '%s' "$GEMINI_API_KEY" \
  | gcloud secrets versions add "$SECRET_ID" --data-file=-
unset GEMINI_API_KEY
```

Grant the runtime identity access on this secret only:

```sh
gcloud secrets add-iam-policy-binding "$SECRET_ID" \
  --member="serviceAccount:${RUNTIME_SA}" \
  --role="roles/secretmanager.secretAccessor"
```

Record the enabled numeric version without reading its value:

```sh
SECRET_VERSION="$(gcloud secrets versions list "$SECRET_ID" \
  --filter='state=ENABLED' \
  --sort-by='~createTime' \
  --limit=1 \
  --format='value(name)')"

test -n "$SECRET_VERSION"
```

Cloud Run environment-variable secrets are resolved when an instance starts.
The deployment pins `SECRET_VERSION` rather than using `latest`, making a bad
rotation reversible through a normal revision rollback.

## 8. Verify identity boundaries before deployment

```sh
gcloud iam service-accounts describe "$BUILD_SA"
gcloud iam service-accounts describe "$RUNTIME_SA"
gcloud secrets get-iam-policy "$SECRET_ID"
gcloud projects get-iam-policy "$PROJECT_ID" \
  --flatten='bindings[].members' \
  --filter="bindings.members:serviceAccount:${RUNTIME_SA}" \
  --format='table(bindings.role)'
```

The last command should show no broad project role for the runtime identity.
Secret access should appear only on the single secret's policy.

## 9. Continue with the deployment runbook

Run the repository and standalone-server gates, then deploy and capture proof
using [`hotel_shoreline/CLOUD_RUN.md`](hotel_shoreline/CLOUD_RUN.md). Do not
deploy from an uncommitted tree: the deployed revision must map to an approved
commit SHA.

What can be shared safely for assisted deployment:

- project ID;
- selected region;
- active account email;
- service/revision names and URLs;
- non-secret IAM role names and sanitized logs.

Never share the API key, secret payload, access token, service-account key file,
or full environment dump.

## Primary references

- [Cloud Run source deployment](https://cloud.google.com/run/docs/deploying-source-code)
- [Cloud Run source build identity](https://cloud.google.com/run/docs/configuring/services/build-service-account)
- [Cloud Run secret configuration](https://cloud.google.com/run/docs/configuring/services/secrets)
- [Secret Manager best practices](https://cloud.google.com/secret-manager/docs/best-practices)
- [Gemini API key guidance](https://ai.google.dev/gemini-api/docs/api-key)
- [Google Cloud budget behavior](https://cloud.google.com/billing/docs/how-to/budgets)
