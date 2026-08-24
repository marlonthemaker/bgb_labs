# HSD-008 — Submission Release

**Status:** Planned
**Repository:** both (separate branches if code changes are needed)
**Depends on:** HSD-006 and HSD-007 only if cloud delivery is used
**Branch:** `docs/hsd-008-submission-release`

## Outcome

Produce a reproducible, honest hackathon submission with setup instructions,
architecture, limitations, evidence, and presentation material.

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD8-R-001 | A clean environment can install, verify, and build the exact submitted workspace. | QA |
| HSD8-R-002 | Docs disclose fictional status, non-affiliation, synthetic data, limitations, and third-party dependencies. | Review |
| HSD8-R-003 | Architecture, video script, screenshots, and evidence match current behavior and make no unsupported claim. | Review / E2E |
| HSD8-R-004 | No secret, credential, live data, generated noise, or unrelated change is included. | QA |

## Test and error strategy

Run the full gate from a clean install, inspect the packaged artifact and
repository status, and rehearse failure-state presentation. Treat any failed
verification, undocumented limitation, or claim mismatch as release-blocking.

## Scope boundaries

No new feature work except release-blocking corrections. Do not change the
research canon without explicit direction.

## Completion Record

Record final commands, artifact/version identifiers, screenshots or run IDs,
review outcome, release limitations, docs updated, and final commit/PR details
using `TEMPLATE.md`.
