# HSD-004 — Taskmaster Agent and Controlled Planning Boundary

**Status:** In progress
**Repository:** `hotel_shoreline` (optional narrow SDK interface only)
**Depends on:** HSD-003
**Branch:** `feat/hsd-004-controlled-planning-boundary`

This is a stacked branch and PR on HSD-003. It must not merge before HSD-003's
corrected CI check passes and HSD-003 merges to `main`.

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
| HSD4-P-001 | Partially implemented | Server-only Genkit/Gemini adapter and declared model metadata exist. No opt-in real-provider smoke test or recorded provider evidence exists. |
| HSD4-P-002 | Partially locally verified | The deterministic planner proves continuous event → plan → validation → two-tool execution. The Gemini path has not been exercised with real credentials. |
| HSD4-P-003 | Partially locally verified | Unsafe and unavailable planners produce zero operations. Timeout conversion exists but lacks a direct test; malformed structured output, explicit turn/token budget enforcement, and browser-visible failure evidence remain open. |
| HSD4-P-004 | Locally verified | An unsafe tool proposal is rejected by the SDK before scenario operations execute. |
| HSD4-C-001 | Prepared, unverified | Dockerfile and runbooks exist. No authorized Cloud Run revision, IAM proof, URL, or deployed smoke evidence exists. |
| HSD4-UI-001 | Partially locally verified | The browser proves the successful lifecycle. It currently renders the frozen static graph rather than the actual candidate graph and has no E2E failure-state proof. |

## Completion Record

Do not complete this record until the external gates below are satisfied.

**Branch used:** `feat/hsd-004-controlled-planning-boundary`
**Commits:** `52569c0 feat(demo): add Taskmaster planning boundary [HSD-004]`;
`e514142 chore(cloud): prepare HSD-004 Cloud Run delivery`;
`344593f chore(demo): refresh Next generated types [HSD-004]`
**Review / PR:** [#2](https://github.com/marlonthemaker/bgb_labs/pull/2),
stacked on HSD-003; open. Its first CI run failed during pnpm bootstrap before
project checks ran, and the workflow correction remains to be pushed.
**Acceptance evidence:** Local deterministic-planner integration, unsafe and
unavailable planner behavior, SDK rejection, and successful browser lifecycle
evidence are present. The status table above identifies all unverified behavior.
**QA commands and results:** Local full verification was recorded before the
external gates; re-run it against the approved final commit before closure.
**Docs updated:** Cloud Run guide, deployment preparation, test traceability,
root/package roadmaps, and secure environment guidance are in progress and
must be reconciled at closure.
**Known limitations / follow-up:** Local timeout/malformed/budget and failure-UI
coverage remains incomplete. The UI does not yet render the planner's actual
candidate graph. No authorized Google Cloud project, Secret Manager secret,
real-Gemini smoke run, or Cloud Run deployment proof exists. HSD-005 must not
begin until these are resolved and recorded.
**Next issue readiness:** Not ready. Finish the listed local gaps, then capture
the external Google proof.

## Current implementation evidence

- A server-only Next route accepts the fixed event and selects a planner.
- The deterministic planner is the credential-free default; `GeminiTaskPlanner`
  uses Genkit and the Google GenAI plugin when `HSD_PLANNER_MODE=gemini` and a
  server-only `GEMINI_API_KEY` are configured.
- Integration tests cover event-to-execution success, unsafe graph rejection
  with zero operations, and planner unavailability with zero operations.
- Browser E2E covers receipt, planning, validation, and execution lifecycle.

The UI exposes lifecycle labels and terminal node statuses. It does not expose
hidden model chain-of-thought and must never claim to do so. The planned
evidence experience may expose structured candidate plans, validation decisions,
tool calls, arguments, outcomes, and sanitized metadata.

**Open HSD-004 gates:** complete the local gaps in the acceptance-status table,
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
