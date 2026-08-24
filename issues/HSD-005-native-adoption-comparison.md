# HSD-005 — Native Adoption Comparison

**Status:** Planned
**Repository:** `hotel_shoreline`
**Depends on:** HSD-004
**Branch:** `feat/hsd-005-native-adoption-comparison`

## Outcome

Demonstrate matched `en`, `es-ES`, and `pt-PT` requests against frozen semantic
contracts and fixture conditions, making plan and execution differences
inspectable without claiming research validity or general parity.

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD5-L-001 | Each locale variant links to exactly one versioned semantic contract and carries review status. | Unit |
| HSD5-L-002 | Fresh fixture state and explicit model/mode configuration make compared runs reproducible. | Integration |
| HSD5-L-003 | Unsupported locale, pending review, translation mismatch, and invalid plan states fail closed with a truthful explanation. | Unit / integration |
| HSD5-UI-001 | Users can inspect locale, contract, mode, configuration, outcome, and stated limitation. | E2E |

## Test and error strategy

Test contract-to-fixture references, reviewed/pending locale gating, fresh-state
isolation, and comparable evidence. Do not use runtime translation as a hidden
fallback. Render any unsupported or invalid condition without language-quality
claims.

## Scope boundaries

Exactly three declared variants; no broad benchmark, real guests, or research
claim. Metrics are descriptive evidence only until separately specified.

## Completion Record

Complete after HSD-004 with actual evidence, QA output, docs, commits, review,
and HSD-006 readiness using `TEMPLATE.md`.
