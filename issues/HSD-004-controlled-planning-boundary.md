# HSD-004 — Taskmaster Agent and Controlled Planning Boundary

**Status:** Complete
**Repository:** `hotel_shoreline` (optional narrow SDK interface only)
**Depends on:** HSD-003
**Branch:** `feat/hsd-004-controlled-planning-boundary`

HSD-003 passed CI and merged through PR #1. HSD-004 deployment proof is recorded,
the final `Quality / verify` check passed at `2169166`, and PR #2 merged as
`36d02f6` on 2026-08-26.

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
point. See
[`docs/architecture/BOUNDARIES.md`](../docs/architecture/BOUNDARIES.md).

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
| HSD4-P-001 | `src/lib/genkit-planner.ts`, server route | Type/build verification, opt-in local smoke, and deployed revision prove Gemini 3.5 Flash, structured output, declared limits, and abort propagation. | None. |
| HSD4-P-002 | `src/lib/taskmaster.ts`, fixed API route | Integration/E2E success cases plus the deployed Gemini request prove event → candidate → validation → ordered execution. | None. |
| HSD4-P-003 | Planner envelope/schema/budget boundary | Local malformed/timeout/unavailable/unsafe/budget cases plus the deployed no-secret proof show typed `PLANNER_UNAVAILABLE` and zero operations. | None. |
| HSD4-P-004 | SDK parse/validate/execute call in `src/lib/taskmaster.ts` | Unsafe-candidate integration rejection plus deployed `validationOutcome=accepted` and two verified operations. | None. |
| HSD4-C-001 | Root container, route telemetry, and `hotel_shoreline/CLOUD_RUN.md` | Production build, Cloud Build, immutable image/revision, bounded service configuration, scoped identities/secret, success/failure responses, and sanitized Cloud Logging evidence. | None. |
| HSD4-UI-001 | `src/lib/taskmaster-view.ts`, `src/app/run-demo.tsx` | Unit/E2E projection cases plus deployed desktop and 390px browser checks with required disclosures. | None. |

## Scope boundaries

No client-side provider keys, free-form tool execution, hidden planner repair,
cross-language comparison, persistence, Cloud Tasks, real hotel integration, or
automatic retry. A planner may propose; it may never decide what is safe.

## Verification and documentation

Run the root full gate, deterministic planner integration suite, browser E2E,
and a documented deploy/smoke procedure. Update `TESTING.md`, the architecture
and submission constraints, Hotel Shoreline docs, root roadmap, issue index,
and this Completion Record. Do not begin HSD-005 until this external proof is
recorded, PR #2 merges, and green `main` is pulled.

## Current acceptance status

All acceptance criteria have direct local evidence and the external Cloud Run
proof required by this issue. Merge status remains separate from acceptance.

| Acceptance ID | State | Current evidence or gap |
| --- | --- | --- |
| HSD4-P-001 | Externally verified | Deployed revision `hotel-shoreline-hsd004-161c4161` used server-only Genkit and `gemini-3.5-flash`; the response retained declared planner metadata and limits. |
| HSD4-P-002 | Externally verified | The deployed fixed event produced two candidate nodes, preserved three constraints, passed validation, completed two ordered tools, and terminated at `execution.finished`. |
| HSD4-P-003 | Externally verified | Local edge cases remain green. A temporary same-image service without the secret returned HTTP 503, `PLANNER_UNAVAILABLE`, zero candidates/results/operations, and `planning.failed`; its sanitized `WARNING` event was retained before the service was deleted. |
| HSD4-P-004 | Externally verified | Local SDK rejection proves unsafe candidates cannot execute; deployed success telemetry recorded `validationOutcome=accepted` before two verified operations. |
| HSD4-C-001 | Externally verified | Cloud Build used the dedicated builder, the runtime uses the dedicated identity and pinned secret version 1, the public service is bounded to 1 CPU/512 MiB, concurrency 4, timeout 60 seconds, scale 0–2, and the immutable image digest is recorded below. |
| HSD4-UI-001 | Externally verified | Deployed desktop and 390px checks rendered candidate, constraints, budgets, lifecycle, outcomes, and the fictional/non-affiliation/non-research disclosure without horizontal layout failure. |

## Completion Record

External acceptance gates were satisfied and PR #2 merged on 2026-08-26.

**Branch used:** `feat/hsd-004-controlled-planning-boundary`
**Existing rebased commits:** `d157a3b feat(demo): add Taskmaster planning
boundary [HSD-004]`; `3094be2 chore(cloud): prepare HSD-004 Cloud Run
delivery`; `109dfc2 chore(demo): refresh Next generated types [HSD-004]`;
`a4d794d fix(demo): harden Gemini failure boundary [HSD-004]`;
`62cf385 docs(hsd): record HSD-004 provider failure evidence [HSD-004]`;
`14fce17 chore(cloud): harden HSD-004 release runtime [HSD-004]`;
`c2bcc6f docs(cloud): define HSD-004 deployment evidence [HSD-004]`;
`161c416 docs(hsd): freeze HSD-005 comparison design [HSD-005]`;
`2169166 docs(hsd): record HSD-004 Cloud Run proof [HSD-004]`.
**Review / PR:** [#2](https://github.com/marlonthemaker/bgb_labs/pull/2) is
merged as `36d02f6`; its final `Quality / verify` check passed in
[run 32983742017](https://github.com/marlonthemaker/bgb_labs/actions/runs/32983742017)
at `2169166` on 2026-08-26.
**Acceptance evidence:** Deterministic planner integration covers continuous
success, SDK rejection, malformed graph/envelope/usage, unsupported
configuration, timeout, provider unavailability, and turn/token/node budgets.
Projection/telemetry unit tests and browser tests cover server-sanitized
evidence, secret-free logs, success, typed failure, malformed API fallback,
zero-operation truth, and disclosures. Cloud project `native-agent-poc`
(`1075716782706`) in `europe-west1` serves
`https://hotel-shoreline-7larmcl4aa-ew.a.run.app`. Cloud Build
`7bd5d440-a347-4780-be5d-23c0768af5a3` built commit
`161c4161c0607f03bd81e8a68a33111837b0be7d` with
`hotel-shoreline-builder@native-agent-poc.iam.gserviceaccount.com`; revision
`hotel-shoreline-hsd004-161c4161` runs as
`hotel-shoreline-runtime@native-agent-poc.iam.gserviceaccount.com` from image
digest `sha256:edad9573bb6e9f7d05fee5e0806ef018c3f3da37b0e133d19b8b914360e5eec3`.
Success request `9adc3c7d-c82c-4bed-9d1f-6b11d09de8d1` returned HTTP 200,
two nodes, three constraints, two successful operations, and
`execution.finished`. Failure request `7d9c5319-aed7-462f-98d6-d4079ea98acd`
returned HTTP 503, `PLANNER_UNAVAILABLE`, zero operations, and `planning.failed`;
its temporary service was confirmed deleted.
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
checks, and `git diff --check` passed. Google Cloud CLI 582.0.0 is authenticated
through the isolated `hotel-shoreline-hsd` configuration. The six required APIs,
split identities, scoped secret version 1, 60-file secret-free upload manifest,
successful Cloud Build, immutable image, bounded/public service configuration,
deployed success/failure assertions, allowlisted `INFO`/`WARNING` logs, cleanup,
and desktop/390px browser checks passed. PR #2 CI passed at the deployed commit.
**Docs updated:** Testing traceability, architecture/product boundaries,
root/package roadmaps and READMEs, issue index, authorization-key migration,
Cloud identity/secret bootstrap, release/evidence/rollback procedure, and the
HSD-005 treatment contract are reconciled to the current local state.
**Known limitations / follow-up:** The public demonstration can consume provider
quota; scale-to-zero, max two instances, and a project-scoped USD 20 monthly
budget with 50%/90%/100% alerts bound and surface cost. The app remains synthetic,
ephemeral, non-research, and the recorded HSD-004 deployment intentionally lacks
the later HSD-005 comparison data and HSD-007 persistence. The key remains outside Git and pinned through Secret
Manager version 1. Provider availability remains an external dependency.
**Next issue readiness:** HSD-005 later completed and merged through PR #3 as
`d7a8963`; HSD-007 is now ready for analysis.

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

**Open HSD-004 gate:** None. Deployment, IAM, revision, success/failure,
logging, cleanup, responsive-browser evidence, CI, and merge are complete.

The repository-owned Cloud Run preparation is documented in
[`hotel_shoreline/CLOUD_RUN.md`](../hotel_shoreline/CLOUD_RUN.md). It specifies
the container build, private secret injection, least-privilege service identity,
bounded scaling/timeouts, local smoke procedure, and required submission proof.

Comments may explain a safety invariant, provider limitation, or deployment
trade-off only; they must not restate implementation mechanics.
