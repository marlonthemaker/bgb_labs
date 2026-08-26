# Cloud Run Deployment — HSD-004

This runbook deploys the fictional Hotel Shoreline demonstration. It is not an
authorization to deploy; use it only with explicit approval and a dedicated
Google Cloud project.

## Required configuration

- Node/containers are built from the root `Dockerfile` so the workspace SDK is
  included.
- `GEMINI_API_KEY` is stored in Secret Manager and injected at runtime; never
  commit it or use a `NEXT_PUBLIC_` variable.
- `HSD_PLANNER_MODE=gemini` enables the Genkit/Gemini planner. Omit it or set
  `deterministic` for the credential-free demo baseline.
- HSD-004 fixes the application planning envelope in code: one planning turn,
  1,024 output tokens, and four candidate nodes. The credential-free planner
  has a two-second deadline; the network-backed Gemini planner has a 30-second
  deadline and requests minimal thinking for this constrained graph. These are
  evidence-bearing safety limits, not browser-controlled variables.
- The Cloud Run service account must have only the roles required to access the
  configured secret. Browser users get no Google Cloud credentials.
- The route writes one-line structured JSON completion/crash telemetry to
  stdout/stderr for Cloud Logging, including request correlation, duration,
  planner metadata, terminal status, and aggregate counts. It never logs the
  API key, prompt, tool inputs/outputs, exception message, or hidden reasoning.
- The server installs a no-payload Genkit log sink because the Google AI plugin's
  default error logger includes provider messages and stack traces. Provider
  failures are represented only by the route's typed, allowlisted completion
  event (for example, a `WARNING` carrying `PLANNER_UNAVAILABLE` with zero
  operations). Only unexpected route crashes use `ERROR` severity.

## Pre-deploy checks

```sh
pnpm check
pnpm typecheck
pnpm test:all
pnpm build
docker build -t hotel-shoreline:hsd-004 .
docker run --rm -p 8080:8080 -e HSD_PLANNER_MODE=deterministic hotel-shoreline:hsd-004
```

Visit `http://localhost:8080`, run the fixed request, and confirm the UI shows
the actual candidate graph, planning budget, event/planning/validation/execution
lifecycle, two successful node outcomes, and two recorded operations.

For the opt-in real-provider browser smoke, put the approved `GEMINI_API_KEY`
in the ignored `hotel_shoreline/.env.local`. The dedicated script disables
server reuse and explicitly starts Next.js in Gemini mode; the ordinary browser
suite likewise forces a fresh deterministic server:

```sh
cp hotel_shoreline/.env.example hotel_shoreline/.env.local
chmod 600 hotel_shoreline/.env.local
# Edit .env.local locally; never paste the key into a prompt, command, or log.
pnpm test:e2e:gemini
```

The smoke is skipped by default and in CI. Record the commit, model metadata,
result, and non-secret run evidence; never copy the key into output or docs.

## Approved deploy procedure

Replace the placeholders only in your local terminal. First create a dedicated
least-privilege service account and grant it Secret Manager access to the single
Gemini secret. Configure the project and APIs, then deploy:

```sh
gcloud config set project PROJECT_ID
gcloud services enable run.googleapis.com cloudbuild.googleapis.com secretmanager.googleapis.com
gcloud run deploy hotel-shoreline \
  --source . \
  --region REGION \
  --service-account hotel-shoreline-runtime@PROJECT_ID.iam.gserviceaccount.com \
  --set-env-vars HSD_PLANNER_MODE=gemini \
  --set-secrets GEMINI_API_KEY=hotel-shoreline-gemini-key:latest \
  --max-instances 2 \
  --concurrency 4 \
  --timeout 60s \
  --allow-unauthenticated
```

The demo may be public for judging, but the route exposes only the fixed
synthetic event and has no arbitrary tool input. Capture the Cloud Run URL and
a console/deployment view in the submission video. Do not leave the service
running after the demo unless its cost and access controls are reviewed.

## Required evidence

- Cloud Run revision URL and revision/service-account configuration.
- One Gemini-mode fixed-request smoke run, showing no secret in UI, logs, or
  evidence.
- A deliberately unavailable/invalid planner run showing zero operations.
- Documented model identifier, fixture version, commit SHA, and limitations.
