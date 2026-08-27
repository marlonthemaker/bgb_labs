# HSD-006 — Evidence Experience

**Status:** In progress
**Repository:** `hotel_shoreline`
**Depends on:** HSD-005, HSD-007
**Branch:** `feat/hsd-006-evidence-experience`

## Outcome

Deliver an accessible, presentation-ready run and comparison experience that
exposes request, contract, graph, lifecycle, earliest-loss diagnosis,
baseline/intervention condition, limitations, and a privacy-safe evidence
export backed by the durable run ledger. A viewer can run a comparison, find it
in saved history, reopen the exact immutable evidence, and download a stable
JSON artifact without receiving database records, credentials, hidden prompts,
or a causal/research claim.

This issue improves evidence legibility and portability. It does not add a
general analytics dashboard, authenticate customers, create reviewer findings,
or establish statistical significance.

## Scope

In scope:

- a sanitized newest-first saved-comparison history and exact-record retrieval;
- a record-derived public evidence DTO with explicit schema/provenance and
  claim boundary;
- lifecycle, condition, source, validation, operation, first-loss, and measure
  inspection for both matched arms;
- deterministic JSON download of the currently inspected saved record; and
- keyboard, responsive, empty, malformed, missing, and unavailable states.

Out of scope:

- aggregate scoreboards, arbitrary filtering/query builders, charts, or broad
  benchmark-platform abstractions;
- changing evaluation measures, interventions, authored variants, or reviewer
  status;
- authentication, authorization, multi-tenant isolation, deletion, annotation,
  or any other ledger mutation; and
- raw database rows, provider prompts/responses, hidden chain-of-thought, real
  guest data, or claims beyond the frozen fictional demonstration.

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD6-H-001 | A viewer can load newest-first sanitized history, reopen one exact immutable ledger record, and retain the current evidence when history/detail is empty, missing, malformed, or unavailable. Valid missing records return typed 404; malformed identities return typed 400; repository failures return typed 503. | Unit / E2E | `hotel_shoreline/src/unit/evidence-ledger/view.unit.test.ts`; `hotel_shoreline/e2e/evidence-experience.spec.ts` |
| HSD6-U-001 | Each arm distinguishes received, planning, validation, execution, partial/failed, and completed states from ordered recorded lifecycle facts; pair exclusion remains a separate visible qualification state. Stages never reached are not presented as completed. | Unit / E2E | `hotel_shoreline/src/unit/evidence-experience.unit.test.ts`; `hotel_shoreline/e2e/evidence-experience.spec.ts` |
| HSD6-U-002 | Current and reopened comparisons expose authored source turns/review, case/variant/contract/fixture/tool versions, matched provider/model/prompt/budget/hash facts, intervention, candidate, validation, operations, first-loss diagnosis, and each measure's definition/direction/numerator/denominator without causal, parity, or chain-of-thought overclaim. | Unit / E2E | `hotel_shoreline/src/unit/evidence-experience.unit.test.ts`; `hotel_shoreline/e2e/evidence-experience.spec.ts` |
| HSD6-U-003 | A saved comparison has one versioned, deterministic UTF-8 JSON download projected only from its immutable record. The artifact retains source content hash and claim boundary, uses a safe filename, and excludes database configuration/types, secrets, raw exceptions, hidden prompts, and non-synthetic personal data. | Unit / E2E | `hotel_shoreline/src/unit/evidence-experience.unit.test.ts`; `hotel_shoreline/e2e/evidence-experience.spec.ts` |
| HSD6-U-004 | Primary run/history/inspect/download and meaningful failure flows remain usable at desktop and 390 px, with native keyboard controls, visible focus, labeled regions, polite status announcements, readable overflow, and the fictional/non-affiliation/non-research disclosure. | E2E | `hotel_shoreline/e2e/evidence-experience.spec.ts` |

## Current acceptance status

| Acceptance ID | State | Evidence or remaining gap |
| --- | --- | --- |
| HSD6-H-001 | Planned | Ledger list/get ports exist; detail route, public parser, and history UI remain. |
| HSD6-U-001 | Planned | Raw lifecycle/status exists; truthful presentation mapping remains. |
| HSD6-U-002 | Planned | Live comparison shows core facts; immutable-record provenance and full measure/condition definitions remain. |
| HSD6-U-003 | Planned | Immutable records exist; public export schema, serialization, route, and download remain. |
| HSD6-U-004 | Planned | Existing controls/disclosure are responsive; the new history/export flow needs keyboard/mobile/failure evidence. |

The experience may display structured candidate plans, contract facts,
validation issues, tool names/arguments/results, lifecycle events, model and
configuration metadata, and annotations. It must not display or claim hidden
chain-of-thought. Use “planning evidence” or “structured decision trace,” not
“model reasoning,” unless the displayed artifact is explicitly defined.

## Test and QA strategy

- **Unit:** prove record-derived DTO projection, strict public parsing,
  deterministic serialization, lifecycle-stage derivation, history parsing,
  source/provenance preservation, and forbidden-field exclusion. Snapshot only
  stable semantic evidence, never incidental wall-clock output.
- **Integration/E2E:** use the real Next Route Handlers and in-memory repository
  for run → append → list → retrieve → download. PostgreSQL behavior remains
  covered by HSD-007's shared repository contract rather than duplicated here.
- **Boundary cases:** empty history; malformed history/detail payload; malformed
  and valid-missing UUID; rejected, planning-failed, partial/failed, and
  succeeded arms; zero-operation run; undefined measure denominator; duplicate
  lifecycle event; long JSON values; 390 px overflow; keyboard activation.
- **Failure behavior:** return only `INVALID_LEDGER_QUERY` (400),
  `EVIDENCE_NOT_FOUND` (404), or `LEDGER_UNAVAILABLE` (503) plus request ID.
  History/detail failure cannot clear an already inspected comparison, enable a
  download for unparsed data, or imply completion. Logs contain typed codes and
  request IDs, not raw records or exception messages.

## Domain, traceability, and delivery

Presentation consumes a sanitized DTO; it cannot execute tools or change
evidence. Server projection derives saved views only from the selected immutable
record so later case-definition edits cannot rewrite history. Client modules
own DTO types/parsers only and never import repository, PostgreSQL, environment,
provider, or orchestration modules. The new dynamic route validates its path
parameter, returns `Cache-Control: no-store`, and reads through the repository
port. The current list route remains a minimal summary boundary.

`HSD6-H-001` maps history/detail parsing to the saved-flow E2E;
`HSD6-U-001` maps lifecycle derivation to browser state;
`HSD6-U-002` maps source/condition/measure/claim projection to the inspector;
`HSD6-U-003` maps exact-record export/serialization/redaction to download; and
`HSD6-U-004` maps desktop/mobile keyboard and disclosure checks. Comments may
only explain accessibility, redaction, or immutable-evidence invariants.

## Analysis record

**Current implementation:** POST persists a comparison and returns a sanitized
live projection; GET lists history summaries. The UI can run and inspect a live
pair but cannot list, reopen, or export saved evidence. Public parsing and
server projection share one module, which risks pulling server-owned case data
into the client graph. The repository already has an exact-record `get` port.

**Implementation order:** freeze this specification and `TESTING.md`; separate
client DTO parsing from server record projection; add strict history/export
contracts and tests; add the validated exact-record download Route Handler; add
the history/inspect/download UI and lifecycle presentation; run focused and
full gates; reconcile documentation and Completion Record.

**Files likely to change:** this issue, `TESTING.md`, evidence/native-adoption
view modules, the native-adoption Route Handlers, `native-adoption-demo.tsx`,
`globals.css`, focused unit/E2E tests, package README/roadmap, root README, and
issue index. No SDK, schema migration, provider, evaluation, intervention, case
text, or research-canon file should change.

**Risks/contradictions:** a saved view must not use current mutable definitions;
an attachment endpoint also serves in-app inspection and must remain parseable;
memory-mode history is process-local while Cloud SQL is durable; public access
is acceptable only for synthetic demo evidence and does not establish a future
customer authorization model.

## Verification

```sh
pnpm check
pnpm audit:prod
pnpm typecheck
pnpm test:unit
pnpm test:integration
pnpm test:e2e
pnpm test:coverage
pnpm build
git diff --check
```

## Completion Record

**Branch used:**
**Commits:**
**Review / PR:**
**Acceptance evidence:**
**QA commands and results:**
**Docs updated:**
**Known limitations / follow-up:**
**Next issue readiness:**
