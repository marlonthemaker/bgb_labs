# HSD-004 — Taskmaster Agent and Controlled Planning Boundary

**Status:** In progress
**Repository:** `hotel_shoreline` (optional narrow SDK interface only)
**Depends on:** HSD-003
**Branch:** `feat/hsd-004-controlled-planning-boundary`

HSD-003 passed CI and merged through PR #1. This branch is rebased locally onto
that merge; PR #2 must be updated to target `main` and re-run CI before review.

## Outcome

Deliver the minimum compliant Taskmaster agent: when a synthetic
`GuestRequestReceived` event arrives, Genkit calls Gemini 3.5+ to propose a
structured graph; Native Agent validates it; allowlisted Hotel Shoreline tools
complete it; Cloud Run serves the real application. The user starts the event
but never directs individual planning or execution steps.

This is the first submission-capable path. It proves a narrow autonomous
workflow and inspectable safety boundary, not a general-purpose hotel agent or
a research finding.

## Domain and architecture

`GuestRequestReceived` is the orchestration command. The Scenario context owns
the event payload, frozen contract, and adapters; the Planning port returns a
candidate graph only; the Assurance Runtime remains the sole policy enforcement
point. See [`ARCHITECTURE.md`](../ARCHITECTURE.md).

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD4-P-001 | Genkit uses Gemini 3.5+ behind a server-only planning port; only allowlisted model/version metadata appears in evidence. | Integration |
| HSD4-P-002 | One `GuestRequestReceived` event autonomously produces a candidate graph, then a validated, ordered maintenance/housekeeping outcome without step-by-step user direction. | Integration / E2E |
| HSD4-P-003 | Malformed, unsafe, timed-out, unavailable, or over-budget planning output produces a typed failed run and invokes no scenario tool. | Unit / integration |
| HSD4-P-004 | A valid candidate graph is validated by the existing SDK before deterministic execution; it cannot select undeclared tools or effects. | Integration |
| HSD4-C-001 | The app deploys to Cloud Run with least-privilege service identity, bounded instances/timeouts, documented variables, and a captured deployment proof. | QA |
| HSD4-UI-001 | The run record distinguishes event receipt, planning, validation, execution, and terminal failure/completion while retaining required disclosures. | E2E |

## Test and error strategy

Use a deterministic fake provider for success, malformed schema, timeout,
transport failure, token/turn budget breach, and unsafe tool proposal; it is
the default test double. Assert no tool runs on planning/validation failure.
Add one opt-in smoke test for the real configured provider only when credentials
exist; it must be excluded from CI and record no secret. Provider errors are
sanitized, classified, and recorded with non-secret metadata.

E2E must show a continuous event-to-outcome run and a truthfully rendered
failure state. QA must record the Cloud Run URL or console evidence required by
the hackathon without adding a permanent production dependency to tests.

## Traceability map

| Acceptance ID | Code boundary | Direct evidence | Remaining QA |
| --- | --- | --- | --- |
| HSD4-P-001 | `src/lib/genkit-planner.ts`, server route | Type check and production build verify the server-only Genkit adapter, fixed model metadata, schema, configured output ceiling, and abort propagation; `e2e/gemini.smoke.spec.ts` is the opt-in provider test. | Run the credentialed smoke and preserve sanitized evidence. |
| HSD4-P-002 | `src/lib/taskmaster.ts`, fixed API route | `src/integration/taskmaster.integration.test.ts`; successful lifecycle cases in `e2e/foundation.spec.ts` | Repeat through deployed Gemini/Cloud Run path. |
| HSD4-P-003 | Planner envelope/schema/budget boundary | Malformed graph/envelope/usage, timeout, unavailable, unsafe, turn, token, and node cases in `src/integration/taskmaster.integration.test.ts`; typed and malformed API cases in `e2e/foundation.spec.ts` | Demonstrate one deployed no-operation failure. |
| HSD4-P-004 | SDK parse/validate/execute call in `src/lib/taskmaster.ts` | Unsafe-candidate integration case asserts SDK rejection and zero operations. | None locally; repeat in deployed smoke evidence. |
| HSD4-C-001 | Root container plus `hotel_shoreline/CLOUD_RUN.md` | Production build and local deterministic workflow. | Authorized deployment, IAM/revision/URL evidence, and deployed smoke. |
| HSD4-UI-001 | `src/lib/taskmaster-view.ts`, `src/app/run-demo.tsx` | `src/unit/taskmaster-view.unit.test.ts`; success, failure, malformed response, and disclosure E2E cases. | Manual responsive/accessibility and deployed-browser pass. |

## Scope boundaries

No client-side provider keys, free-form tool execution, hidden planner repair,
cross-language comparison, persistence, Cloud Tasks, real hotel integration, or
automatic retry. A planner may propose; it may never decide what is safe.

## Verification and documentation

Run the root full gate, deterministic planner integration suite, browser E2E,
and a documented deploy/smoke procedure. Update `TESTING.md`, the architecture
and submission constraints, Hotel Shoreline docs, root roadmap, issue index,
and this Completion Record. Do not mark HSD-005 ready until the Cloud Run proof
and the required Google-stack evidence are captured.

## Current acceptance status

`Implemented` means code exists; `locally verified` means the specified
behavior has direct automated evidence. Neither means deployed proof exists.

| Acceptance ID | State | Current evidence or gap |
| --- | --- | --- |
| HSD4-P-001 | Partially locally verified | The Genkit/Gemini module is marked server-only, fixes `gemini-3.5-flash` metadata, configures a 1,024-output-token ceiling, and receives the orchestration abort signal. Type/build verification and an opt-in browser smoke exist; that smoke has not run and no provider evidence exists. |
| HSD4-P-002 | Locally verified; external proof open | The deterministic planner proves continuous event → candidate → validation → ordered two-tool execution, and the browser renders the actual candidate. The Gemini path has not been exercised with real credentials. |
| HSD4-P-003 | Locally verified | Malformed graphs/envelopes/usage, unsafe candidates, timeout, unavailability, and turn/output-token/node budget breaches have direct tests. Every such pre-execution failure records zero scenario operations; browser tests prove typed failure and malformed-response fallback. |
| HSD4-P-004 | Locally verified | An unsafe tool proposal is rejected by the SDK before scenario operations execute. |
| HSD4-C-001 | Prepared, unverified | Dockerfile and runbooks exist. No authorized Cloud Run revision, IAM proof, URL, or deployed smoke evidence exists. |
| HSD4-UI-001 | Locally verified | A whitelisted view projection removes unused server fields. The browser proves the actual candidate, budgets, successful lifecycle, typed planning failure, zero-operation truth, malformed-response fallback, and required disclosures. |

## Completion Record

Do not complete this record until the external gates below are satisfied.

**Branch used:** `feat/hsd-004-controlled-planning-boundary`
**Existing rebased commits:** `d157a3b feat(demo): add Taskmaster planning
boundary [HSD-004]`; `3094be2 chore(cloud): prepare HSD-004 Cloud Run
delivery`; `109dfc2 chore(demo): refresh Next generated types [HSD-004]`.
This closeout prepares the next scoped hardening and documentation commits;
record their resulting hashes when HSD-004 reaches final closure.
**Review / PR:** [#2](https://github.com/marlonthemaker/bgb_labs/pull/2),
open. At the 2026-08-24 local QA snapshot, GitHub still recorded its old stacked
base and failed pre-bootstrap check; the local branch was rebased onto merged
`main` and still required a force-with-lease push, retargeting, and a corrected
workflow run.
**Acceptance evidence:** Deterministic planner integration covers continuous
success, SDK rejection, malformed graph/envelope/usage, timeout, provider
unavailability, and turn/token/node budgets. Projection unit tests and browser
tests cover sanitized candidate evidence, success, typed failure, malformed API
fallback, zero-operation truth, and disclosures. The table above separates
these local results from unverified provider/cloud behavior.
**QA commands and results:** On 2026-08-24, `pnpm check` passed across 35
formatted/linted files; `pnpm typecheck` passed both packages; `pnpm test:all`
passed 24 unit, 17 integration, and 5 deterministic browser E2E tests (46 unique
tests); the credentialed Gemini browser smoke was correctly skipped. The
SDK coverage rerun passed 18 tests at 94.47% statements, 87.69% branches,
96.77% functions, and 94.4% lines. The Hotel Shoreline core coverage run passed
23 tests at 91.3% statements, 87.15% branches, 100% functions, and 97.45% lines.
Both exceed their 90/80/90/90 thresholds. `pnpm build` passed the SDK and
Next.js 16.3.2 production builds, including static `/` and dynamic
`/api/taskmaster`; `git diff --check` passed.
**Docs updated:** Testing traceability, root/package roadmaps and READMEs,
HSD-003 closure, issue index, Cloud Run preparation, and secure environment
guidance are reconciled to the current local state.
**Known limitations / follow-up:** No authorized Google Cloud project, Secret
Manager secret, real-Gemini smoke run, Cloud Run revision/IAM/URL evidence, or
updated PR #2 CI exists. HSD-005 must not begin until these are resolved and
recorded.
**Next issue readiness:** Not ready. Deliver PR #2 through CI, then capture the
real-Gemini and Cloud Run proof.

## Current implementation evidence

- A server-only Next route accepts the fixed event and selects a planner.
- The deterministic planner is the credential-free default; `GeminiTaskPlanner`
  uses Genkit and the Google GenAI plugin when `HSD_PLANNER_MODE=gemini` and a
  server-only `GEMINI_API_KEY` are configured.
- Planning is bounded to one turn, 1,024 output tokens, four candidate nodes,
  and two seconds. The Genkit request uses the output-token ceiling and receives
  an abort signal on timeout; the orchestration boundary validates reported
  usage and structure before SDK validation or tool access.
- Integration tests cover event-to-execution success, unsafe graph rejection,
  malformed graph/envelope/usage, timeout, planner unavailability, and explicit
  turn/token/node budget failures with zero pre-validation operations.
- A client-safe projection exposes only the candidate/lifecycle/outcome fields
  the presentation uses. Browser E2E covers actual candidate evidence,
  successful lifecycle, typed planning failure, malformed API evidence, and
  retained disclosures.

The UI exposes lifecycle labels and terminal node statuses. It does not expose
hidden model chain-of-thought and must never claim to do so. The planned
evidence experience may expose structured candidate plans, validation decisions,
tool calls, arguments, outcomes, and sanitized metadata.

**Open HSD-004 gates:** deliver the rebased branch through corrected PR #2 CI,
then perform an authorized real-Gemini smoke run and capture Cloud Run
deployment proof. External work requires a Google Cloud project,
credentials/secret configuration, and explicit deployment approval; HSD-004
must not be marked complete until all local and external gates are captured.

The repository-owned Cloud Run preparation is documented in
[`hotel_shoreline/CLOUD_RUN.md`](../hotel_shoreline/CLOUD_RUN.md). It specifies
the container build, private secret injection, least-privilege service identity,
bounded scaling/timeouts, local smoke procedure, and required submission proof.

Comments may explain a safety invariant, provider limitation, or deployment
trade-off only; they must not restate implementation mechanics.
