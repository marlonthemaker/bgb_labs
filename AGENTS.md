# HSD Agent Guide

Work only within the active HSD issue. The root [product roadmap](ROADMAP.md)
sets delivery order; [`issues/`](issues/README.md) is the authoritative backlog
and issue specification record. Preserve existing user changes.

## Read first

1. `README.md`
2. `CONTRIBUTING.md`
3. `TESTING.md`
4. `ROADMAP.md` and the active issue in `issues/`
5. The affected package's `README.md` and `ROADMAP.md`
6. `git status`

For a submission-facing issue, also read
[`issues/HACKATHON-CONSTRAINTS.md`](issues/HACKATHON-CONSTRAINTS.md) and verify
its official external source before changing a claim or delivery gate.

For Next.js application changes, also read `hotel_shoreline/AGENTS.md` and the
relevant locally installed Next.js guide before editing application code.

## Boundaries

- `initial_spike/` is a protected research source, not a runtime dependency.
- `native_agent_sdk/` remains model-, framework-, cloud-, and hotel-neutral.
- `hotel_shoreline/` is fictional and must retain its non-affiliation and
  non-research disclosure.
- Keep domain boundaries explicit: the SDK owns assurance semantics; Hotel
  Shoreline owns its fictional scenario and tool adapters; orchestration owns
  Gemini/Genkit and Cloud Run integration; presentation only renders sanitized
  run evidence. Do not bypass validation or let provider/cloud types cross into
  the SDK.
- No commit, push, deployment, package publication, or PR creation without
  explicit approval.

## Definition of done

Follow this issue lifecycle without skipping a record update:

1. **Specify:** create or refine the issue from
   [`issues/TEMPLATE.md`](issues/TEMPLATE.md). Give every observable criterion
   a stable acceptance ID, a test strategy, boundary cases, and expected
   failure behavior.
2. **Test plan:** update `TESTING.md` with planned traceability before or with
   the tests. Tests name their acceptance IDs and act as executable examples.
3. **Implement:** make only the active issue's scoped code change. Fail closed
   at trust boundaries and return typed, inspectable errors rather than leaking
   raw exceptions.
4. **QA:** run the issue's required checks plus the full gate in
   `CONTRIBUTING.md`; inspect `git diff --check` and the final diff.
5. **Close out:** update the issue's Completion Record, `TESTING.md`, affected
   READMEs/roadmaps, and the issue index. Record residual risk and links to
   follow-ups; do not silently expand scope.
6. **Prepare next:** move only the immediate dependent issue to `Ready for
   analysis` when its prerequisites are met. Do not begin it without approval.

Every completed change has scoped acceptance criteria, traceable tests, a
clean diff, documented error behavior, and a passing full verification gate.
