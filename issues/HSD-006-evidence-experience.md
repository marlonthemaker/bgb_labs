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

## Scope boundaries

No analytics tracking, accounts, billing, broad dashboard, or claim beyond the
frozen demonstration conditions.

## Completion Record

Complete after HSD-005 with actual evidence, QA output, docs, commits, review,
and HSD-008 readiness using `TEMPLATE.md`.
