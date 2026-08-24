# HSD-006 — Evidence Experience

**Status:** Planned
**Repository:** `hotel_shoreline`
**Depends on:** HSD-005
**Branch:** `feat/hsd-006-evidence-experience`

## Outcome

Deliver an accessible, presentation-ready run experience that exposes request,
contract, graph, lifecycle, diagnosis, limitations, and a privacy-safe evidence
export.

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD6-U-001 | Run states distinguish planning, validation, execution, partial failure, and completion. | Unit / E2E |
| HSD6-U-002 | Evidence export is structured, deterministic, and excludes secrets and non-synthetic personal data. | Unit / integration |
| HSD6-U-003 | Primary flow works on desktop and mobile with keyboard-accessible controls and readable failure states. | E2E |

## Test and error strategy

Snapshot only stable semantic evidence, not incidental timestamps. Test empty,
failed, partial, malformed-export, and unavailable-run states. Errors must be
human-readable, non-sensitive, and connected to diagnostic evidence.

## Domain, traceability, and delivery

Presentation consumes a sanitized run projection; it cannot execute tools or
change evidence. `HSD6-U-001` maps to lifecycle projection tests and browser
state tests, `HSD6-U-002` to export serialization/redaction tests, and
`HSD6-U-003` to desktop/mobile keyboard E2E checks. QA verifies an exported
fixture contains run/contract/tool versions but no secrets or personal data.
Update actual test paths in `TESTING.md`, all user-visible limitations, the
roadmaps, and this Completion Record. Branch/commits/review use `TEMPLATE.md`;
comments may only explain accessibility, redaction, or evidence invariants.

## Scope boundaries

No analytics tracking, accounts, billing, broad dashboard, or claim beyond the
frozen demonstration conditions.

## Completion Record

**Branch used:**
**Commits:**
**Review / PR:**
**Acceptance evidence:**
**QA commands and results:**
**Docs updated:**
**Known limitations / follow-up:**
**Next issue readiness:**
