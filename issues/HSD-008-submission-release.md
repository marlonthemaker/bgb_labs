# HSD-008 — Submission Release

**Status:** Planned
**Repository:** both (separate branches if code changes are needed)
**Depends on:** HSD-006 and HSD-007
**Branch:** `docs/hsd-008-submission-release`

## Outcome

Produce a reproducible, honest hackathon submission with setup instructions,
architecture, limitations, evidence, and presentation material.

The presentation must tell one continuous story: a native-language guest event
becomes a Gemini/Genkit candidate plan, Native Agent validates it, allowlisted
tools act, the evidence ledger retains the result, and the comparison view
shows the declared baseline/intervention difference and limitation. It must
also show real Google Cloud execution. Do not imply that the controlled demo is
a broad multilingual benchmark.

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD8-R-001 | A clean environment can install, verify, and build the exact submitted workspace. | QA |
| HSD8-R-002 | Docs disclose fictional status, non-affiliation, synthetic data, limitations, and third-party dependencies. | Review |
| HSD8-R-003 | Architecture, video script, screenshots, run-history comparison, and evidence match current behavior and make no unsupported claim. | Review / E2E |
| HSD8-R-004 | No secret, credential, live data, generated noise, or unrelated change is included. | QA |

## Test and error strategy

Run the full gate from a clean install, inspect the packaged artifact and
repository status, and rehearse failure-state presentation. Treat any failed
verification, undocumented limitation, or claim mismatch as release-blocking.

## Traceability and delivery

`HSD8-R-001` maps to clean-install/full-gate logs, `HSD8-R-002` to disclosure
review, `HSD8-R-003` to the continuous-demo/E2E checklist, and `HSD8-R-004` to
repository, dependency, and secret scans. QA is release-blocking and records
the exact commit, deployed Cloud Run proof, video URL, package versions, and
submission fields. Update all README/roadmap/backlog state atomically. Use the
template’s branch, commit, review, and comment rules; no post-deadline changes
to the submitted artifact during judging.

## Scope boundaries

No new feature work except release-blocking corrections. Do not change the
research canon without explicit direction.

## Completion Record

Record final commands, artifact/version identifiers, screenshots or run IDs,
review outcome, release limitations, docs updated, and final commit/PR details
using `TEMPLATE.md`.
