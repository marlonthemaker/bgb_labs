# Google Cloud Setup and Deployment Guide

This guide takes a new Google developer account from local development to one
minimal Cloud Run deployment for the fictional Hotel Shoreline demo. Do not
paste an API key into Git, a GitHub issue, a PR, or chat.

## What you will create

- One dedicated Google Cloud project with billing and a budget alert.
- One Gemini API key, stored locally only for optional local testing.
- One Secret Manager secret for the deployed service.
- One least-privilege Cloud Run runtime service account.
- One public, scale-to-zero Cloud Run demo service.

Gemini remains server-side. The browser sends only the fixed synthetic event;
the SDK still validates every proposed graph before a tool executes.

## 1. Create a dedicated Google Cloud project

In the [Google Cloud console](https://console.cloud.google.com/), create a new
project, for example `bgb-hotel-shoreline-demo`. Attach billing and create a
budget alert before deployment. Record its **project ID** (not display name),
then choose one supported region, for example `europe-west1`.

## 2. Install and authenticate the Google Cloud CLI

Use Cloud Shell in the Google Cloud console, or install the [Google Cloud CLI](https://cloud.google.com/sdk/docs/install)
locally. Then run:

```sh
gcloud init
gcloud auth login
gcloud config set project PROJECT_ID
gcloud config set run/region REGION
gcloud config list
```

Confirm the final command shows the intended project and region before
continuing.

## 3. Create the Gemini API key

Open [Google AI Studio](https://aistudio.google.com/app/apikey), select the new
project, and create an API key. Restrict it to the Gemini API and your project
where the console allows. Treat it as a password.

For an optional local smoke test only:

```sh
cp hotel_shoreline/.env.example hotel_shoreline/.env.local
# Edit hotel_shoreline/.env.local:
# HSD_PLANNER_MODE=gemini and GEMINI_API_KEY=your-key.
pnpm --filter @bomgoodbueno/hotel-shoreline dev
```

Before any Git operation, verify the key file is ignored:

```sh
git check-ignore -v hotel_shoreline/.env.local
git status --short
```

Never create a `NEXT_PUBLIC_GEMINI_API_KEY`; Next.js would expose it to browser
code.

## 4. Enable APIs and create runtime identity

```sh
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com

gcloud iam service-accounts create hotel-shoreline-runtime \
  --display-name="Hotel Shoreline Cloud Run runtime"
```

Set temporary shell values; do not put these in Git:

```sh
PROJECT_ID="PROJECT_ID"
RUNTIME_SA="hotel-shoreline-runtime@${PROJECT_ID}.iam.gserviceaccount.com"
SECRET_ID="hotel-shoreline-gemini-key"
```

## 5. Store the key in Secret Manager

Create the secret and add the key without putting it in shell history:

```sh
gcloud secrets create "$SECRET_ID" --replication-policy=automatic
read -r -s GEMINI_API_KEY
printf '%s' "$GEMINI_API_KEY" | gcloud secrets versions add "$SECRET_ID" --data-file=-
unset GEMINI_API_KEY

gcloud secrets add-iam-policy-binding "$SECRET_ID" \
  --member="serviceAccount:${RUNTIME_SA}" \
  --role="roles/secretmanager.secretAccessor"
```

The runtime account gets secret access only on this one secret. Do not grant it
Owner, Editor, or broad project-wide roles.

## 6. Verify locally

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm typecheck
pnpm test:all
pnpm build
```

Run the deterministic browser flow first. Then run one Gemini-mode smoke test
with `hotel_shoreline/.env.local` and confirm no key appears in the UI. Use the
deterministic integration suite—not an intentionally malformed live-provider
request—to verify that invalid planning produces zero operations.

## 7. Deploy to Cloud Run

From the repository root, deploy using the checked-in root `Dockerfile`:

```sh
gcloud run deploy hotel-shoreline \
  --source . \
  --region REGION \
  --service-account "$RUNTIME_SA" \
  --set-env-vars HSD_PLANNER_MODE=gemini \
  --set-secrets "GEMINI_API_KEY=${SECRET_ID}:latest" \
  --max-instances 2 \
  --concurrency 4 \
  --timeout 30s \
  --allow-unauthenticated
```

Cloud Build uses the Dockerfile and the root ignore rules prevent `.env` from
being uploaded. Copy the resulting Cloud Run URL and run the fixed request.

## 8. Capture evidence and control costs

Record the deployed URL, revision, project/region, commit SHA, fixture version,
model identifier, and one successful Gemini run. Also record a safe failure
that shows zero operations.

For a short hackathon demo, retain scale-to-zero and delete the service when it
is no longer needed:

```sh
gcloud run services delete hotel-shoreline --region REGION
```

Deleting the service does not delete Secret Manager data or build images; review
those resources separately.

Cloud SQL for PostgreSQL is deliberately deferred to HSD-007. It is not needed
to close HSD-004 and this guide does not provision a database. The future
ledger design is documented in
[`hotel_shoreline/DATA_ARCHITECTURE.md`](hotel_shoreline/DATA_ARCHITECTURE.md).

## What to send me next

Send only the project ID and chosen region—never the API key. Then explicitly
say whether you authorize API enablement and Cloud Run deployment. I can verify
the active project, create the runtime identity and secret binding, deploy, and
capture non-secret HSD-004 evidence with you.
