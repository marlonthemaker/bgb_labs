# Hotel Shoreline

Hotel Shoreline is a fictional hotel-operations demonstration for Native Agent.
It makes task decomposition, contract validation, deterministic tool use, and
evidence visible through a deliberately constrained workflow. HSD-005 adds a
matched baseline/contract-guided inspector across three case families and
`en`, `es-ES`, and `pt-PT` authored variants. Those variants are currently
project-authored drafts: they run for engineering evaluation but are excluded
from reviewer-qualified aggregate claims until human review is recorded.

It is built independently for a hackathon and is not affiliated with, endorsed
by, or operated by Google. Its results are illustrative demonstrations, not
research findings or claims of general language parity.

The application may depend on `@bomgoodbueno/native-agent-sdk`. Hotel facts,
tools, UI, and model integrations stay in this application and must not leak
back into the SDK.

## Architecture

```text
guest request
  -> application-owned semantic contract and fixture
  -> proposed task graph
  -> Native Agent validation
  -> deterministic Hotel Shoreline tools
  -> outcome and run evidence
```

Current capabilities are:

- a versioned synthetic fixture, deterministic hotel tools, validated task
  execution, and inspectable ordered evidence;
- an opt-in server-side Gemini/Genkit planner with explicit budgets,
  fail-closed errors, sanitized telemetry, and Cloud Run delivery; and
- an in-memory matched baseline/contract-guided comparison across three case
  families and three authored locale variants, with deterministic measures and
  explicit human-review eligibility; and
- a release-security baseline with bounded public request bodies, sanitized 400
  and 413 failures, browser security headers, immutable CI actions, and a
  time-bounded production dependency risk record; and
- a completed evidence ledger with a versioned comparison record, matching
  in-memory/`pg` repository contracts, forward-only PostgreSQL migration, and a
  sanitized history API. PostgreSQL 17 and a least-privilege Cloud SQL path are
  locally/CI verified; the merged-main Cloud Run revision externally retrieved
  pre-deployment synthetic evidence and now serves production traffic.

There is no real hotel data. Memory-mode history is process-local; the deployed
Cloud SQL path stores synthetic demo evidence without claiming HA, backups, or
multi-tenant isolation. The
[issue index](../issues/README.md) is the machine-checked delivery-status view,
and the package [roadmap](ROADMAP.md) owns sequencing. Completed issue records retain the
detailed local, provider, deployment, and CI evidence.

The planned comparison method and its claim limits are in
[the controlled comparison protocol](EVALUATION_PROTOCOL.md).
Language reviewers should follow the non-blocking
[native-language review guide](NATIVE_REVIEW_GUIDE.md).
The durable storage choice and portability rules are in
[the PostgreSQL evidence-ledger architecture](DATA_ARCHITECTURE.md).
Cloud SQL setup, cost, retention, migration, and rollback steps are in
[`CLOUD_SQL.md`](CLOUD_SQL.md).

“Evidence” means structured plans, validation decisions, tool calls/results,
lifecycle events, sanitized configuration metadata, and evaluator annotations.
Hotel Shoreline does not expose or claim access to hidden model chain-of-thought.

## Development

From the workspace root:

```sh
pnpm --filter @bomgoodbueno/hotel-shoreline dev
pnpm --filter @bomgoodbueno/hotel-shoreline test:coverage
pnpm test:e2e
pnpm test:e2e:gemini
pnpm test:e2e:gemini:comparison
pnpm test:e2e:gemini:matrix
pnpm --filter @bomgoodbueno/hotel-shoreline build
```

From the root, `pnpm meow` forces deterministic mode for reliable development.
`pnpm meow:gemini` explicitly enables the quota-bearing provider mode. A 429
quota response is shown as `PLANNER_QUOTA_EXHAUSTED`, executes zero operations,
and is never retried silently.

Optional local Gemini mode uses `hotel_shoreline/.env.local`; copy
`.env.example` in this directory and keep the key server-only. The ignored file
is loaded by Next.js, so agents can run `pnpm test:e2e:gemini` without receiving
the credential in a prompt or command. The Gemini and ordinary browser commands
force fresh servers in Gemini and deterministic modes, respectively; the local
planner selection is used for manual development runs.

All three Gemini commands are quota-bearing and serialized. The base command
runs only the HSD-004 smoke, `:comparison` runs one focused HSD-005 pair, and
`:matrix` runs all nine HSD-005 blocks while attaching every paired response to
the ignored Playwright HTML report. The matrix deliberately paces independent
blocks to respect shared provider capacity; it does not retry either arm.
Provider failure is evidence and does not authorize a retry or silent repair.

Ledger mode defaults to `memory`, which keeps local/CI browser workflows
credential-free. Set `HSD_LEDGER_MODE=postgres` and inject the server-only
`DATABASE_URL` only after applying `migrations/001_evidence_ledger.sql` through
the separate migration command. Neither value may use a `NEXT_PUBLIC_` prefix.

## Guardrails

- Keep all fixture state synthetic and deterministic.
- Keep secrets, guest data, and operational credentials out of the browser.
- Introduce provider calls only server-side and keep malformed output fail-closed.
- Keep the comparison request at or below 4 KiB of UTF-8 JSON; the fixed
  Taskmaster request accepts no client-supplied body.
- Retain the fictional, non-affiliation, and non-research disclosure in visible
  flows.
- Do not describe demonstration runs as research findings.

See the root [testing convention](../TESTING.md), [contributor guide](../CONTRIBUTING.md),
and this package's [roadmap](ROADMAP.md).
