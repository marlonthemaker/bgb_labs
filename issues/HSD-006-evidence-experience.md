# HSD-006 — Evidence Experience

**Status:** Ready for analysis
**Repository:** `hotel_shoreline`
**Depends on:** HSD-005, HSD-007
**Branch:** `feat/hsd-006-evidence-experience`

## Outcome

Deliver an accessible, presentation-ready run and comparison experience that
exposes request, contract, graph, lifecycle, earliest-loss diagnosis,
baseline/intervention condition, limitations, and a privacy-safe evidence
export backed by the durable run ledger.

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD6-U-001 | Run states distinguish receipt, planning, validation, execution, partial failure, completion, and comparison exclusion. | Unit / E2E |
| HSD6-U-002 | A comparison view exposes matched-condition metadata, source facts, measure definitions, and invalid-run handling without causal or parity overclaim. | Unit / E2E |
| HSD6-U-003 | Evidence export is structured, deterministic, and excludes secrets and non-synthetic personal data. | Unit / integration |
| HSD6-U-004 | Primary flow works on desktop and mobile with keyboard-accessible controls and readable failure states. | E2E |

The experience may display structured candidate plans, contract facts,
validation issues, tool names/arguments/results, lifecycle events, model and
configuration metadata, and annotations. It must not display or claim hidden
chain-of-thought. Use “planning evidence” or “structured decision trace,” not
“model reasoning,” unless the displayed artifact is explicitly defined.

## Test and error strategy

Snapshot only stable semantic evidence, not incidental timestamps. Test empty,
failed, partial, malformed-export, and unavailable-run states. Errors must be
human-readable, non-sensitive, and connected to diagnostic evidence.

## Domain, traceability, and delivery

Presentation consumes a sanitized run projection; it cannot execute tools or
change evidence. `HSD6-U-001` maps to lifecycle projection tests and browser
state tests, `HSD6-U-002` to comparison-source/measure/claim-boundary tests,
`HSD6-U-003` to deterministic export serialization and redaction tests, and
`HSD6-U-004` to desktop/mobile keyboard E2E checks. QA verifies an exported
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
