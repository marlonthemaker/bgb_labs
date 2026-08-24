# Native Agent SDK

`@bomgoodbueno/native-agent-sdk` is the domain-independent core for Native
Agent. It owns semantic contracts, task graphs, fail-closed validation, a
deterministic executor, and ordered run evidence.

It deliberately has no dependency on Hotel Shoreline, Next.js, Genkit, a model
provider, a database, or cloud infrastructure. Applications may depend on this
package; this package must not depend on applications.

This package is private during the hackathon demonstration. Its licence and
publication terms have not been selected.

## Public primitives

- `SemanticContract` declares allowed tools, prohibited effects, and required
  constraints for one bounded intent.
- `TaskGraph` represents a proposed decomposition and its dependencies.
- `validateTaskGraph` rejects malformed, cyclic, unsafe, or incomplete plans
  with stable machine-readable codes.
- `executeTaskGraph` invokes validated tools sequentially, records ordered
  events, skips dependent work after a failure, and supports run-scoped
  idempotent retries through an `ExecutionLedger`.

Applications define their own domain facts and tools. The SDK cannot prove that
a model understood a user's natural-language request; it makes the proposed
plan and execution evidence inspectable.
