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

- **HSD-001 complete:** workspace, strict TypeScript, private package boundary,
  minimal demo shell, and disclosure.
- **HSD-002 complete:** JSON-safe semantic contracts and task graphs,
  fail-closed validation (including defensive tool-registry checks), deterministic
  execution, explicit execution failures, and run-scoped idempotency.
- **Next:** HSD-003, the deterministic Hotel Shoreline vertical slice. Its
  approved-ready specification is in the issue index below.

Read the package roadmaps before changing behavior:

- [Native Agent SDK roadmap](native_agent_sdk/ROADMAP.md)
- [Hotel Shoreline roadmap](hotel_shoreline/ROADMAP.md)
- [HSD product roadmap](ROADMAP.md)
- [Testing convention](TESTING.md)
- [Contributor guide](CONTRIBUTING.md)
- [Issue index](issues/README.md)

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

## Quality standard

Biome is the single formatter and linter. TypeScript is strict. Every
behavior-changing acceptance criterion has a traceable test, and the full gate
includes unit, integration, browser E2E, coverage, and production build checks.
