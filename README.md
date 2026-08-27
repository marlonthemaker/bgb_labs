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

## Current product lifecycle

Native Agent provides the validated, evidence-producing task runtime. Hotel
Shoreline provides the fictional deterministic and Gemini/Genkit demonstration,
including a matched baseline/contract-guided comparison. HSD-007 is implementing
the portable PostgreSQL evidence ledger; its local record, repository,
migration, and sanitized history boundary are implemented, while Cloud SQL
deployment remains unverified. The final evidence experience and submission
packaging follow in the order defined by the [roadmap](ROADMAP.md).

Individual issue metadata owns delivery status; the
[issue index](issues/README.md) is its machine-checked derived view. Completed
acceptance and QA evidence remains in the individual issue records.
The Iberia study is a separate pre-pilot research proposal and does not
authorize public-agent execution.

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
- [Security policy](SECURITY.md)
- [Production dependency risk](docs/operations/DEPENDENCY_RISK.md)
- [Repository security controls](docs/operations/REPOSITORY_SECURITY.md)

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
