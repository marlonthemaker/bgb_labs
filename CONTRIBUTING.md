# Contributing to HSD

## Before editing

1. Read this guide, the root README, and the relevant package README/roadmap.
2. Inspect `git status`; preserve unrelated work.
3. Treat `research/canon/` as durable authority. Major semantic changes require
   an accepted decision record; active study changes stay within their protocol.
4. Keep dependencies one-way: Hotel Shoreline may import the SDK; the SDK may
   not import the application or its domain.

## Delivery rules

- One issue addresses one bounded outcome.
- Define acceptance IDs before code. Add them to tests and update `TESTING.md`.
- Prefer explicit data and deterministic behavior over speculative abstractions.
- Do not add secrets, real guest data, external side effects, or claims beyond
  the demo's stated scope.
- Keep comments for non-obvious intent, safety decisions, or invariants; do not
  narrate self-evident code.
- Keep status language precise: planned, implemented, locally verified,
  externally verified, deployed, and merged are different states. The issue
  index owns mutable status; issue files own acceptance evidence.
- Describe inspectable planning artifacts and tool evidence precisely. Do not
  claim access to hidden model chain-of-thought.

## Style and tooling

- Use TypeScript with strict compiler settings; do not use `any` to bypass a
  contract.
- Biome owns formatting and linting. Do not add Prettier or a parallel ESLint
  configuration without a documented need.
- Use named, immutable domain values and machine-readable error codes at
  boundaries.
- Test behavior, not implementation details.

## Verification

Run before review:

```sh
pnpm check
pnpm typecheck
pnpm test:all
pnpm build
git diff --check
```

Tests requiring a localhost server/browser may need the appropriate local
permission. Do not skip the E2E test for a visible workflow change.

A local pass and a GitHub Actions pass are separate quality evidence. Do not
mark an issue complete while its required PR check is failing or has not run.

## Commits

Use Conventional Commits with the HSD issue identifier:

```text
feat(sdk): add validated task graph runtime [HSD-002]
test(demo): cover fictional disclosure [HSD-001]
docs(workspace): define contribution conventions [HSD-002]
```
