# Native Agent SDK

`@bomgoodbueno/native-agent-sdk` is the domain-independent core for Native
Agent. It owns semantic contracts, task graphs, fail-closed validation, a
deterministic executor, and ordered run evidence.

It deliberately has no dependency on Hotel Shoreline, Next.js, Genkit, a model
provider, a database, or cloud infrastructure. Applications may depend on this
package; this package must not depend on applications.

This package is private and unpublished during the hackathon demonstration.
Repository code is covered by the root MIT licence; no registry publication or
compatibility commitment has been made. Version `0.0.0` is a prototype boundary,
not a released product package.

## Public primitives

- `SemanticContract` declares allowed tools, prohibited effects, and required
  constraints for one bounded intent.
- `TaskGraph` represents a proposed decomposition and its dependencies.
- `validateTaskGraph` rejects malformed, cyclic, unsafe, or incomplete plans
  with stable machine-readable codes. It accepts only bounded JSON-safe task
  input, verifies registry keys and declared tool identities, and confirms that
  every registered tool is callable at the runtime boundary.
- `executeTaskGraph` invokes validated tools sequentially, records ordered
  events, skips dependent work after a failure, and supports run-scoped
  idempotent retries through an `ExecutionLedger`. Missing or throwing tools are
  represented as deterministic run outcomes rather than uncaught exceptions.
- `ToolExecutionResult` is a discriminated success/failure union: successful
  evidence may contain output, while failed evidence may contain an error code,
  but a result cannot claim both.

The prototype JSON boundary accepts finite numbers and plain JSON containers up
to 32 nested levels, 2,048 visited values, and 65,536 aggregate string/key
units. Cycles, accessors, sparse arrays, non-finite numbers, and values beyond
those limits fail closed with stable parse issues.

Applications define their own domain facts and tools. The SDK cannot prove that
a model understood a user's natural-language request; it makes the proposed
plan and execution evidence inspectable.

## Scope and extension rules

The SDK owns semantic contracts, task graphs, fail-closed validation,
deterministic orchestration, and ordered run evidence. It does not own a hotel
domain, UI, model provider, persistence, authentication, or cloud service.

- Add a stable error code before introducing a new validation failure.
- Keep tool adapters outside the package; they enter through `ToolRegistry`.
- Preserve deterministic ordering and explicit evidence when changing execution.
- Add acceptance-ID tests for every new validation or execution branch.

## Development

From the workspace root:

```sh
pnpm --filter @bomgoodbueno/native-agent-sdk build
pnpm test:unit
pnpm test:integration
pnpm test:coverage
```

Read the root [testing convention](../TESTING.md) and [SDK roadmap](ROADMAP.md)
before changing runtime behavior.
