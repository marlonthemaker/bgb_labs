# Hotel Shoreline

Hotel Shoreline is a fictional hotel-operations demonstration for Native Agent.
It makes multilingual task decomposition, validation, deterministic tool use,
and evidence visible through a deliberately constrained workflow.

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

The current application is only a verified foundation screen. It has no real
hotel data, model call, cloud integration, or persistent state. HSD-003 adds a
versioned, synthetic fixture and one manually planned English compound vertical
slice. Its full scope and acceptance criteria are in
[`issues/HSD-003-deterministic-hotel-shoreline-vertical-slice.md`](../issues/HSD-003-deterministic-hotel-shoreline-vertical-slice.md).

## Development

From the workspace root:

```sh
pnpm --filter @bomgoodbueno/hotel-shoreline dev
pnpm test:e2e
pnpm --filter @bomgoodbueno/hotel-shoreline build
```

## Guardrails

- Keep all fixture state synthetic and deterministic.
- Keep secrets, guest data, and operational credentials out of the browser.
- Introduce provider calls only server-side and keep malformed output fail-closed.
- Retain the fictional, non-affiliation, and non-research disclosure in visible
  flows.
- Do not describe demonstration runs as research findings.

See the root [testing convention](../TESTING.md), [contributor guide](../CONTRIBUTING.md),
and this package's [roadmap](ROADMAP.md).
