# HSD Agent Guide

Work only within the active HSD issue. Preserve existing user changes.

## Read first

1. `README.md`
2. `CONTRIBUTING.md`
3. `TESTING.md`
4. The affected package's `README.md` and `ROADMAP.md`
5. `git status`

For Next.js application changes, also read `hotel_shoreline/AGENTS.md` and the
relevant locally installed Next.js guide before editing application code.

## Boundaries

- `initial_spike/` is a protected research source, not a runtime dependency.
- `native_agent_sdk/` remains model-, framework-, cloud-, and hotel-neutral.
- `hotel_shoreline/` is fictional and must retain its non-affiliation and
  non-research disclosure.
- No commit, push, deployment, package publication, or PR creation without
  explicit approval.

## Definition of done

Every change has scoped acceptance criteria, traceable tests, a clean diff, and
passes the full verification gate in `CONTRIBUTING.md`.
