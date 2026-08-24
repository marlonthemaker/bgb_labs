# HSD-004 — Taskmaster Agent and Controlled Planning Boundary

**Status:** Planned
**Repository:** `hotel_shoreline` (optional narrow SDK interface only)
**Depends on:** HSD-003
**Branch:** `feat/hsd-004-controlled-planning-boundary`

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

## Completion Record

**Branch used:**
**Commits:**
**Review / PR:**
**Acceptance evidence:**
**QA commands and results:**
**Docs updated:**
**Known limitations / follow-up:**
**Next issue readiness:**

Comments may explain a safety invariant, provider limitation, or deployment
trade-off only; they must not restate implementation mechanics.
