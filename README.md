# bgb_labs

`bgb_labs` is a pnpm workspace for Native Agent: a domain-neutral assurance
SDK, the fictional Hotel Shoreline Google hackathon demonstration, and a
separate native-adoption research program.

## Workspace map

| Directory | Role | Dependency rule |
| --- | --- | --- |
| [`native_agent_sdk/`](native_agent_sdk/README.md) | Reusable, domain-neutral validated task runtime | Must not import the app, hotel concepts, model providers, or cloud services. |
| [`hotel_shoreline/`](hotel_shoreline/README.md) | Fictional hackathon demonstration | May import the SDK; owns all hotel, UI, fixture, and provider concerns. |
| [`research/`](research/README.md) | Research canon and versioned studies | Never a runtime dependency; public studies require their own access and evidence gates. |
| [`docs/`](docs/README.md) | Cross-project architecture, product, operations, and decisions | Owns shared guidance, not package behavior or mutable issue status. |

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
- **HSD-004 complete:** a server-side planner port, Genkit/Gemini adapter,
  deterministic test path, explicit timeout/turn/token/node budgets, SDK
  validation boundary, server-sanitized evidence, structured telemetry, and
  Cloud Run delivery exist and pass. The real-Gemini smoke, Cloud Build,
  bounded Cloud Run revision, deployed success/failure evidence, responsive UI,
  sanitized logs, and PR #2 CI passed on 2026-08-26; PR #2 merged as `36d02f6`.
- **HSD-005 complete:** three case families and nine authored
  `en`, `es-ES`, and `pt-PT` variants run as matched baseline/contract-guided
  pairs with hash-linked conditions, deterministic measures, safe failure
  retention, telemetry, and an inspectable UI. Variants remain explicitly
  pending human review and excluded from reviewer-qualified aggregate claims.
  PR #3 passed CI and merged on 2026-08-26 as `d7a8963`.
- **Next:** HSD-007 is ready for analysis and owns the portable PostgreSQL
  evidence ledger. The Iberia field study remains pre-pilot until HSD-008 and
  its responsible-access gate are complete.

Read the package roadmaps before changing behavior:

- [Native Agent SDK roadmap](native_agent_sdk/ROADMAP.md)
- [Hotel Shoreline roadmap](hotel_shoreline/ROADMAP.md)
- [HSD product roadmap](ROADMAP.md)
- [Architecture boundaries](docs/architecture/BOUNDARIES.md)
- [Product, research, and demonstration surfaces](docs/product/SURFACES.md)
- [Native-adoption research canon](research/canon/README.md)
- [Iberia field-study proposal](research/ailitw/studies/iberia-2026/README.md)
- [Hotel Shoreline controlled comparison protocol](hotel_shoreline/EVALUATION_PROTOCOL.md)
- [Hotel Shoreline native-language review guide](hotel_shoreline/NATIVE_REVIEW_GUIDE.md)
- [Hotel Shoreline PostgreSQL evidence-ledger architecture](hotel_shoreline/DATA_ARCHITECTURE.md)
- [Testing convention](TESTING.md)
- [Contributor guide](CONTRIBUTING.md)
- [Issue index](issues/README.md)
- [Google Cloud setup and deployment guide](docs/operations/GOOGLE_CLOUD_SETUP.md)

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

`pnpm meow` always starts the reliable deterministic planner, even when
`.env.local` contains a Gemini setting. Use the explicitly quota-bearing
`pnpm meow:gemini` command only when manually testing the provider path.

Local Gemini mode reads server-only values from
`hotel_shoreline/.env.local`; start from
[`hotel_shoreline/.env.example`](hotel_shoreline/.env.example). The committed
default CI/full-gate path remains deterministic and credential-free. The
separate real-Gemini browser checks are opt-in and skipped unless explicitly
enabled with approved credentials. Store local credentials only in the ignored
`hotel_shoreline/.env.local`, then run `pnpm test:e2e:gemini` for HSD-004,
`pnpm test:e2e:gemini:comparison` for one HSD-005 pair, or the deliberately
paced `pnpm test:e2e:gemini:matrix` for all nine blocks. The scripts expose only
the non-secret opt-in flag to Playwright and explicitly select Gemini. The
ordinary browser suite explicitly selects deterministic mode, regardless of
the local file.

## Quality standard

Biome is the single formatter and linter. TypeScript is strict. Every
behavior-changing acceptance criterion has a traceable test, and the full gate
includes unit, integration, browser E2E, coverage, and production build checks.
