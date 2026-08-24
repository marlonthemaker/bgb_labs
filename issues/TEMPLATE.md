# HSD-XXX — Concise Outcome Name

**Status:** Draft | Ready for analysis | In progress | In review | Complete | Blocked
**Repository:** `native_agent_sdk` | `hotel_shoreline` | both
**Depends on:** HSD-XXX
**Branch:** `<type>/hsd-xxx-short-description`

## Outcome

State the user-visible or engineering capability and why it matters. State what
this issue does *not* prove.

## Scope

In scope:

- [ ] Bounded deliverable.

Out of scope:

- Explicit exclusions that prevent architecture or product drift.

## Acceptance criteria

| ID | Observable criterion | Test layer | Evidence location |
| --- | --- | --- | --- |
| HSDX-F-001 | A concrete, falsifiable behavior. | Unit / integration / E2E | Planned test path. |

## Test and QA strategy

- **Unit:** invariants, parsing, typed boundaries, and deterministic functions.
- **Integration:** component collaboration, fresh state, ordering, and durable
  outcomes using deterministic fakes.
- **E2E:** user-visible behavior and disclosure when a visible flow changes.
- **Boundary cases:** empty/malformed input, duplicate replay, invalid state,
  forbidden operation, and relevant size/locale/accessibility boundaries.
- **Failure behavior:** stable error code/status, safe user-facing message, no
  secret or raw exception exposure, and evidence sufficient for diagnosis.

## Design and security constraints

- Dependency direction and data ownership.
- Privacy, synthetic-data, authentication, authorization, or secret-handling
  constraints relevant to this issue.
- Determinism, idempotency, timeout, retry, cancellation, and concurrency
  requirements when applicable.

## Analysis gate

Before editing, report files likely to change, design choices, risks or
contradictions, acceptance-to-test mapping, and verification commands. Stop for
approval.

## Verification

```sh
pnpm check
pnpm typecheck
pnpm test:all
pnpm build
git diff --check
```

List any narrower or additional issue-specific commands here.

## Documentation and delivery updates

- [ ] `TESTING.md` traceability updated.
- [ ] Relevant package README and roadmap updated.
- [ ] Root roadmap and issue index status updated.
- [ ] Completion Record completed with actual command results.
- [ ] Immediate dependent issue reviewed and, if ready, moved to `Ready for analysis`.

## Completion Record

Complete only after review and QA; do not prefill planned work as completed.

**Completed date:**
**Implementation summary:**
**Acceptance evidence:**
**QA commands and results:**
**Known limitations / follow-up:**
**Docs updated:**
**Next issue readiness:**

## Branch, commits, and review

**Branch used:**
**Commits:**

```text
<hash> <Conventional Commit message>
```

**Review / PR:**
**Commit scope check:** Confirm unrelated work is excluded before committing.

## Required close-out handoff

Report, but do not execute without approval:

- QA statistics: command results, test counts, configured coverage/thresholds,
  and lint/type/build/diff status.
- Manual test checklist: primary success path, meaningful failure/boundary path,
  disclosure, and changed accessibility/responsive behavior.
- Copy/paste Git commands: scoped `git add`, Conventional Commit command,
  `git push -u origin <branch>`, and a `gh pr create` command with the approved
  title/body. Identify anything that cannot be run because remote access, `gh`,
  or user approval is absent.

## Comment policy

Comments are permitted only for non-obvious invariants, safety decisions,
domain constraints, or an intentionally surprising trade-off. They must explain
why, not restate code, and must be updated or removed when behavior changes.
