# bgb_labs

`bgb_labs` is a pnpm workspace for the Native Agent hackathon demonstration.
It contains a reusable assurance SDK, a fictional Hotel Shoreline application,
and a separate research canon preserved as provenance.

## Workspace map

| Directory | Role | Dependency rule |
| --- | --- | --- |
| [`native_agent_sdk/`](native_agent_sdk/README.md) | Reusable, domain-neutral validated task runtime | Must not import the app, hotel concepts, model providers, or cloud services. |
| [`hotel_shoreline/`](hotel_shoreline/README.md) | Fictional hackathon demonstration | May import the SDK; owns all hotel, UI, fixture, and provider concerns. |
| [`initial_spike/`](initial_spike/README.md) | Research canon and provenance | Not a runtime dependency and not changed by HSD work without explicit direction. |

## HSD status

Snapshot verified 2026-08-26. The [issue index](issues/README.md) is the sole
owner of mutable issue status; this section summarizes current capability.

- **HSD-001 complete:** workspace, strict TypeScript, private package boundary,
  minimal demo shell, and disclosure.
- **HSD-002 complete:** JSON-safe semantic contracts and task graphs,
  fail-closed validation (including defensive tool-registry checks), deterministic
  execution, explicit execution failures, and run-scoped idempotency.
- **HSD-003 complete:** a versioned synthetic fixture, deterministic hotel tool
  adapters, frozen English contract/graph, ordered run evidence, and browser
  vertical slice passed locally and in CI; PR #1 merged on 2026-08-24.
- **HSD-004 ready to merge:** a server-side planner port, Genkit/Gemini adapter,
  deterministic test path, explicit timeout/turn/token/node budgets, SDK
  validation boundary, server-sanitized evidence, structured telemetry, and
  Cloud Run delivery exist and pass. The real-Gemini smoke, Cloud Build,
  bounded Cloud Run revision, deployed success/failure evidence, responsive UI,
  sanitized logs, and PR #2 CI passed on 2026-08-26. PR #2 merge is the only
  remaining HSD-004 closure gate.
- **Next after PR #2 merges:** HSD-005, a small, reviewed,
  baseline/intervention comparison across `en`, `es-ES`, and `pt-PT`, followed
  by durable run history and a presentation-ready evidence experience.

Read the package roadmaps before changing behavior:

- [Native Agent SDK roadmap](native_agent_sdk/ROADMAP.md)
- [Hotel Shoreline roadmap](hotel_shoreline/ROADMAP.md)
- [HSD product roadmap](ROADMAP.md)
- [Architecture boundaries](ARCHITECTURE.md)
- [Product, research, and demonstration surfaces](PRODUCT_SURFACES.md)
- [Hotel Shoreline controlled comparison protocol](hotel_shoreline/EVALUATION_PROTOCOL.md)
- [Hotel Shoreline PostgreSQL evidence-ledger architecture](hotel_shoreline/DATA_ARCHITECTURE.md)
- [Testing convention](TESTING.md)
- [Contributor guide](CONTRIBUTING.md)
- [Issue index](issues/README.md)
- [Google Cloud setup and deployment guide](GOOGLE_CLOUD_SETUP.md)

## Local setup

Requires Node `22.17.0` and pnpm `10.13.1`.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm check
pnpm typecheck
pnpm test:all
pnpm build
```

The browser test requires Playwright Chromium once per environment:

```sh
pnpm exec playwright install chromium
```

Local Gemini mode reads server-only values from
`hotel_shoreline/.env.local`; start from
[`hotel_shoreline/.env.example`](hotel_shoreline/.env.example). The committed
default CI/full-gate path remains deterministic and credential-free. The
separate real-Gemini browser smoke is opt-in and skipped unless explicitly
enabled with approved credentials. Store local credentials only in the ignored
`hotel_shoreline/.env.local`, then run `pnpm test:e2e:gemini`; the script exposes
only the non-secret opt-in flag to Playwright and explicitly selects Gemini.
The ordinary browser suite explicitly selects deterministic mode, regardless
of the local file.

## Quality standard

Biome is the single formatter and linter. TypeScript is strict. Every
behavior-changing acceptance criterion has a traceable test, and the full gate
includes unit, integration, browser E2E, coverage, and production build checks.
