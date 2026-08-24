# HSD-003 — Deterministic Hotel Shoreline Vertical Slice

**Status:** Complete
**Repository:** `hotel_shoreline` (SDK changes are out of scope unless a narrow,
domain-neutral gap is demonstrated)
**Branch:** `feat/hsd-003-deterministic-shoreline-slice`

## Outcome

Hotel Shoreline can visibly execute one fixed English compound request against
an app-owned, synthetic hotel fixture. The request is represented by a frozen
semantic contract and manually authored task graph, validated by Native Agent,
then executed by deterministic Hotel Shoreline tools. The UI exposes the plan,
ordered execution evidence, and final operational outcome.

This is a quality gate for task decomposition and execution assurance. It is
not model planning, a multilingual claim, a live hotel integration, or a
production hotel system.

## Fixed demonstration scenario

Use a new, explicitly fictional stay identifier and room number such as
`shoreline-stay-204` / `204`; do not reuse any research-canon fixture.

The frozen request is: **“The hot water in room 204 is not working. Please send
two extra towels as well.”**

The plan must create independent, correctly typed operations for maintenance
and housekeeping. The final outcome must distinguish their individual results;
it must not claim work was completed if a deterministic tool reports failure.

## Acceptance criteria

| ID | Criterion |
| --- | --- |
| HSD3-F-001 | All fixture facts, stay identifiers, policy values, and initial state are versioned, synthetic, application-owned, and isolated for every run. |
| HSD3-F-002 | Maintenance and housekeeping adapters use explicit input/output contracts, produce deterministic results, and are safe when a task is replayed with its idempotency key. |
| HSD3-F-003 | The frozen semantic contract and manually authored graph preserve the request’s room, towel quantity, allowed tools, and prohibited effects; the graph validates through the SDK. |
| HSD3-F-004 | A user can run the fixed request from the application and inspect the validated graph, ordered tool events, per-task status, and a truthful final outcome. |
| HSD3-T-001 | Unit tests cover fixture validity, tool input validation, deterministic state isolation, and adapter idempotency. |
| HSD3-T-002 | An integration test executes the frozen graph against fresh deterministic tools and asserts task order, inputs, evidence, and final state. |
| HSD3-UI-001 | A browser E2E test demonstrates the fixed request and retains the fictional/non-affiliation/non-research disclosure. |

## Scope boundaries

In scope: a local deterministic fixture, manual graph, app-owned tool adapters,
a minimal visible run record, and acceptance-traceable tests.

Out of scope: Genkit or Gemini, prompt generation, locales other than the fixed
English request, Firestore, Cloud Tasks, APIs, authentication, retries,
parallel execution, real guest data, real operational actions, and research or
language-parity claims.

## Expected design constraints

- Keep hotel types, fixture data, and adapters in `hotel_shoreline`; consume the
  SDK only through public exports.
- Use immutable fixture definitions and create fresh mutable state per run.
- Do not expose secrets, internal tool implementations, or unsafe arbitrary
  request input to the browser.
- Make a failed maintenance or housekeeping task visible as a failed outcome;
  do not paper over it with optimistic copy.
- Add HSD-003 entries to [`TESTING.md`](../TESTING.md) when their tests land.

## Test and error strategy

- **Unit:** fixture schema/version, adapter input validation, replay behavior,
  and independent fresh-state construction.
- **Integration:** execute the frozen graph using fresh tool adapters; assert
  operation ordering, exact room and towel quantity, evidence, and final state.
- **E2E:** run the fixed request through the visible application, verify the
  evidence and outcome, and retain the disclosure.
- **Boundary cases:** malformed task input, wrong stay/room, non-positive towel
  quantity, duplicate idempotency key, unavailable tool, and an adapter failure.
- **Failure behavior:** no adapter mutates state for invalid input; tool errors
  become an explicit failed task/run outcome with a safe message and ordered
  evidence. The UI never reports success for failed work.

## Planned traceability

| Acceptance IDs | Intended code boundary | Test evidence | QA evidence |
| --- | --- | --- | --- |
| HSD3-F-001, HSD3-T-001 | Scenario fixture and run factory | Hotel Shoreline unit fixture/tool tests | Fresh-run inspection and `pnpm test:unit` |
| HSD3-F-002 | Scenario tool adapters | Adapter replay/input unit tests | `pnpm test:unit`, `pnpm typecheck` |
| HSD3-F-003, HSD3-T-002 | Frozen contract/graph plus SDK adapter | Deterministic vertical-slice integration test | `pnpm test:integration`, evidence review |
| HSD3-F-004, HSD3-UI-001 | Presentation projection | Playwright fixed-request flow | `pnpm test:e2e`, responsive visual review |

Names and locations become durable only when the implementation lands; update
`TESTING.md` in the same change with the actual paths.

## Analysis gate

Before implementation, inspect the current application and SDK public exports,
then report:

1. the precise files to add or change;
2. whether the existing `ToolRegistry` seam is sufficient;
3. the state-isolation and idempotency design;
4. the UI evidence model and failure representation;
5. the unit, integration, E2E, type-check, and build commands.

Stop after that analysis for approval. Do not implement this issue, commit,
push, deploy, or begin HSD-004.

## Expected verification after implementation

```sh
pnpm check
pnpm typecheck
pnpm test:unit
pnpm test:integration
pnpm test:e2e
pnpm build
git diff --check
```

## Proposed commit boundary

```text
feat(demo): add deterministic Hotel Shoreline vertical slice [HSD-003]
test(demo): cover deterministic Shoreline execution [HSD-003]
```

## Documentation and delivery updates

- [x] Add HSD-003 acceptance IDs and actual test paths to `TESTING.md`.
- [x] Update Hotel Shoreline README/roadmap and root roadmap/index status.
- [x] Complete the Completion Record with actual QA output and residual risk.
- [x] Review HSD-004 and move it to `Ready for analysis` only after HSD-003 is
  complete and approved.

## Completion Record

**Completed date:** 2026-08-24
**Implementation summary:** Added `shoreline-fixture-v1`, fresh state/tool
factories, adapter-level idempotency, the frozen English contract/graph, and a
small run-evidence panel.
**Acceptance evidence:** `hotel_shoreline/src/unit/shoreline.unit.test.ts`,
`hotel_shoreline/src/integration/shoreline.integration.test.ts`, and
`hotel_shoreline/e2e/foundation.spec.ts`.
**QA commands and results:** `pnpm check`, `pnpm typecheck`, `pnpm test:unit`,
`pnpm test:integration`, `pnpm test:coverage`, `pnpm test:e2e`, `pnpm build`,
and `git diff --check` passed. HSD-003 adds 3 unit, 2 integration, and 1 E2E
test; the existing SDK coverage gate remains above threshold.
**Known limitations / follow-up:** The flow is local and deterministic, with no
model, server-side planning, Cloud Run, persistence, retry, or live hotel
operation. HSD-004 must supply the required Gemini/Genkit and Cloud Run proof.
**Docs updated:** Root and Hotel Shoreline READMEs/roadmaps, issue index, and
testing traceability.
**Next issue readiness:** HSD-004 is ready for analysis only.

## Branch, commits, and review

**Branch used:** `feat/hsd-003-deterministic-shoreline-slice`
**Commits:** Pending explicit approval; no commit created.
**Review / PR:** Pending explicit approval; no PR created.
**Commit scope check:** Confirm unrelated work is excluded before committing.

## Comment policy

Keep comments only for fixture invariants, safety decisions, or a surprising
trade-off. Explain why, not the code's mechanics, and update or remove comments
when behavior changes.
