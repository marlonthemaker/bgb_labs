# HSD-004 — Taskmaster Agent and Controlled Planning Boundary

**Status:** In progress
**Repository:** `hotel_shoreline` (optional narrow SDK interface only)
**Depends on:** HSD-003
**Branch:** `feat/hsd-004-controlled-planning-boundary`

HSD-003 passed CI and merged through PR #1. PR #2 targets `main`; its latest
pushed closeout commits and `Quality / verify` check passed on 2026-08-26.

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
| HSD4-P-001 | `src/lib/genkit-planner.ts`, server route | Type/build verification plus the 2026-08-25 credentialed smoke prove Gemini 3.5 Flash, minimal thinking, structured output, limits, and abort propagation. | Repeat through deployed Cloud Run revision. |
| HSD4-P-002 | `src/lib/taskmaster.ts`, fixed API route | `src/integration/taskmaster.integration.test.ts`; successful lifecycle cases in `e2e/foundation.spec.ts` | Repeat through deployed Gemini/Cloud Run path. |
| HSD4-P-003 | Planner envelope/schema/budget boundary | Malformed graph/envelope/usage, timeout, unavailable, unsafe, turn, token, and node cases in `src/integration/taskmaster.integration.test.ts`; typed and malformed API cases in `e2e/foundation.spec.ts` | Demonstrate one deployed no-operation failure. |
| HSD4-P-004 | SDK parse/validate/execute call in `src/lib/taskmaster.ts` | Unsafe-candidate integration case asserts SDK rejection and zero operations. | None locally; repeat in deployed smoke evidence. |
| HSD4-C-001 | Root container, route telemetry, and `hotel_shoreline/CLOUD_RUN.md` | Production build, local workflows, sanitized structured-log tests, and Cloud Trace validation. | Authorized deployment, IAM/revision/URL evidence, and deployed smoke. |
| HSD4-UI-001 | `src/lib/taskmaster-view.ts`, `src/app/run-demo.tsx` | Unit projection/parser tests plus browser success, server-response sanitization, failure, malformed-response, and disclosure cases. | Manual responsive/accessibility and deployed-browser pass. |

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
| HSD4-P-001 | Externally verified locally | The server-only Genkit adapter uses `gemini-3.5-flash`, minimal thinking, a 1,024-output-token ceiling, and the orchestration abort signal. After a separately observed transient provider 503 failed closed with `PLANNER_UNAVAILABLE` and zero operations, the credentialed browser smoke passed on 2026-08-25: one test passed in 4.9 seconds with the provider workflow completing in 3.3 seconds. Credentialed and credential-free browser suites force fresh servers with explicit Gemini and deterministic modes, respectively, so local environment state cannot change the tested condition. |
| HSD4-P-002 | Externally verified locally; deployed proof open | The deterministic and credentialed Gemini paths both prove continuous event → candidate → validation → ordered two-tool execution, and the browser renders the actual candidate without per-step direction. |
| HSD4-P-003 | Locally verified | Malformed graphs/envelopes/usage, unsupported planner configuration, unsafe candidates, timeout, unavailability, and turn/output-token/node budget breaches have direct tests. Every pre-execution failure records zero operations; unexpected route crashes return sanitized 500 evidence and log only the exception type; a no-payload Genkit sink prevents provider-owned exception messages and stacks from bypassing the telemetry allowlist. |
| HSD4-P-004 | Locally verified | An unsafe tool proposal is rejected by the SDK before scenario operations execute. |
| HSD4-C-001 | Locally prepared, externally unverified | A minimal non-root Next.js standalone runtime, explicit Docker/gcloud ignore boundaries, split build/runtime identity plan, pinned-secret procedure, bounded Cloud Run configuration, and deploy/evidence/rollback runbook exist. The generated standalone server completed the deterministic two-operation flow on 2026-08-26. Docker/Cloud Build and an authorized Cloud Run revision, IAM proof, URL, and deployed smoke remain unverified. |
| HSD4-UI-001 | Locally verified | The server projects an allowlisted response before transport and the client validates it again. Unit/browser tests prove private inputs/outputs remain absent, plus actual candidate, budgets, success, typed failure, zero-operation truth, malformed fallback, and disclosures. |

## Completion Record

Do not complete this record until the external gates below are satisfied.

**Branch used:** `feat/hsd-004-controlled-planning-boundary`
**Existing rebased commits:** `d157a3b feat(demo): add Taskmaster planning
boundary [HSD-004]`; `3094be2 chore(cloud): prepare HSD-004 Cloud Run
delivery`; `109dfc2 chore(demo): refresh Next generated types [HSD-004]`;
`a4d794d fix(demo): harden Gemini failure boundary [HSD-004]`;
`62cf385 docs(hsd): record HSD-004 provider failure evidence [HSD-004]`.
The final deployment-hardening follow-up remains uncommitted; record its hash
when HSD-004 reaches final closure.
**Review / PR:** [#2](https://github.com/marlonthemaker/bgb_labs/pull/2) is
open against `main`, mergeable, and its `Quality / verify` check passed on
2026-08-26 at `62cf385`. The deployment-hardening follow-up requires its own
push and fresh CI pass before deployment.
**Acceptance evidence:** Deterministic planner integration covers continuous
success, SDK rejection, malformed graph/envelope/usage, unsupported
configuration, timeout, provider unavailability, and turn/token/node budgets.
Projection/telemetry unit tests and browser tests cover server-sanitized
evidence, secret-free logs, success, typed failure, malformed API fallback,
zero-operation truth, and disclosures. The table above separates these local
results from unverified Cloud Run behavior.
**QA commands and results:** On 2026-08-26, `pnpm check` passed across 39
formatted/linted files; `pnpm typecheck` passed both packages; `pnpm test:all`
passed 31 unit, 18 integration, and 5 deterministic browser E2E tests; the
credentialed smoke remains intentionally excluded from the default gate and
passed separately (1 test in 4.6 seconds, 2.7-second provider workflow). The
SDK coverage run passed 18 tests at 94.47% statements, 87.69% branches, 96.77%
functions, and 94.4% lines. Hotel Shoreline coverage passed 31 tests at 92.59%
statements, 86.09% branches, 100% functions, and 97.82% lines. Both exceed their
90/80/90/90 thresholds. `pnpm build` passed the SDK and Next.js 16.3.2
production/standalone builds, including static `/` and dynamic
`/api/taskmaster`. The generated standalone server completed the deterministic
API flow with two candidate nodes, three constraints, two successful node
results, and two operations. The default browser suite passed on isolated port
3102 while a manual server retained port 3000; invalid port configuration also
failed with a typed configuration error. Secret scans, ignored-file/permission
checks, and `git diff --check` passed. Google Cloud CLI 582.0.0 was installed,
but it has no active account/project configuration; Docker, Cloud Build, and
Cloud Run were not run. PR #2's pushed closeout `Quality / verify` check passed;
the deployment-hardening follow-up now requires commit, push, and fresh CI.
**Docs updated:** Testing traceability, architecture/product boundaries,
root/package roadmaps and READMEs, issue index, authorization-key migration,
Cloud identity/secret bootstrap, release/evidence/rollback procedure, and the
HSD-005 treatment contract are reconciled to the current local state.
**Known limitations / follow-up:** The local key remains outside version control
and the credentialed provider path is verified. No authorized Cloud Run
revision, least-privilege service identity/Secret Manager binding, URL, or
deployed smoke evidence exists. HSD-005 must not begin until that final external
gate is recorded and PR #2 is merged.
**Next issue readiness:** HSD-005 is specified but blocked. Verify and push the
deployment-hardening follow-up, capture Cloud Run proof, merge PR #2, then move
HSD-005 to ready for implementation.

## Current implementation evidence

- A server-only Next route accepts the fixed event and selects a planner.
- The deterministic planner is the credential-free default; `GeminiTaskPlanner`
  uses Genkit and the Google GenAI plugin when `HSD_PLANNER_MODE=gemini` and a
  server-only `GEMINI_API_KEY` are configured.
- Planning is bounded to one turn, 1,024 output tokens, and four candidate
  nodes. The deterministic planner has a two-second deadline; Gemini uses
  minimal thinking and a 30-second network deadline. The orchestration boundary
  validates reported usage and structure before SDK validation or tool access.
- Integration tests cover event-to-execution success, unsafe graph rejection,
  malformed graph/envelope/usage, timeout, planner unavailability, and explicit
  turn/token/node budget failures with zero pre-validation operations.
- The server emits only the allowlisted candidate/lifecycle/outcome response;
  the client validates that public contract again. Browser E2E covers actual
  candidate evidence, response sanitization, successful lifecycle, typed
  planning failure, malformed API evidence, and retained disclosures.

The UI exposes lifecycle labels and terminal node statuses. It does not expose
hidden model chain-of-thought and must never claim to do so. The planned
evidence experience may expose structured candidate plans, validation decisions,
tool calls, arguments, outcomes, and sanitized metadata.

**Open HSD-004 gate:** capture authorized Cloud Run revision/IAM/URL and
deployed-smoke proof, then merge PR #2 after its final CI run. External work
requires a Google Cloud project, Secret Manager configuration, and explicit
deployment approval; HSD-004 must not be marked complete until that evidence is
captured.

The repository-owned Cloud Run preparation is documented in
[`hotel_shoreline/CLOUD_RUN.md`](../hotel_shoreline/CLOUD_RUN.md). It specifies
the container build, private secret injection, least-privilege service identity,
bounded scaling/timeouts, local smoke procedure, and required submission proof.

Comments may explain a safety invariant, provider limitation, or deployment
trade-off only; they must not restate implementation mechanics.
