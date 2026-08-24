# HSD-005 — Controlled Native-Adoption Comparison

**Status:** Planned
**Repository:** `hotel_shoreline`
**Depends on:** HSD-004
**Branch:** `feat/hsd-005-native-adoption-comparison`

## Outcome

Demonstrate a small, pre-specified, paired comparison of baseline planning and
semantic-contract-guided task assurance across reviewed `en`, `es-ES`, and
`pt-PT` variants. A run must make the request, semantic contract, candidate
graph, validation decision, tool calls, terminal state, and configuration
inspectable. This is a controlled demonstration of a diagnostic/intervention
method, not evidence of broad language, cultural, model, or hotel-operations
parity.

The intervention is deliberately narrow: the planner may propose a graph, but
the assurance runtime rejects plans that lose declared critical facts, violate
constraints, select undeclared tools, or produce prohibited effects. It must
not silently translate, repair, or overwrite the authored language variant.

Read `hotel_shoreline/EVALUATION_PROTOCOL.md` before implementation.

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD5-D-001 | Three authored case families—compound, conditional/negative, and corrective/multi-turn—have versioned semantic contracts, expected operational outcomes, and reviewed `en`, `es-ES`, and `pt-PT` variants. | Unit / review |
| HSD5-D-002 | Every locale variant links to exactly one semantic-contract version, fixture/tool version, review record, and representation limitation. | Unit |
| HSD5-I-001 | Each treatment arm references a versioned intervention specification with target lifecycle failure, proposed mechanism, parameters, activation condition, regression check, and rollback/rejection condition. | Unit / review |
| HSD5-E-001 | A matched baseline and intervention run record the same case, locale, fixture, model/version, decoding/budget settings, and run mode; only declared treatment differences may vary. | Integration |
| HSD5-E-002 | The evidence projection calculates descriptive task-completion, critical-information-retention, constraint-preservation, task-graph-validity, tool/argument-correctness, verified-completion, and prohibited-action measures from versioned run facts. | Unit / integration |
| HSD5-E-003 | Invalid, interrupted, pending-review, unsupported-locale, or non-comparable runs are retained with a reason and excluded from aggregate comparison by default. | Unit / integration |
| HSD5-UI-001 | Users can inspect the locale, source request, contract, mode, configuration, lifecycle diagnosis, outcome, measure definitions, and stated limitation for each run. | E2E |

## Test and error strategy

Predefine expected operational outcomes and measurement rules before executing
the compared runs. Treat case and locale as blocking factors: baseline and
intervention observations are paired within the same case/locale/fixture/model
condition, with fresh state for every run. Preserve raw run records and invalid
runs; derived measures may reference them but may not mutate them.

Test contract-to-fixture references, review gating, intervention-version
immutability, fresh-state isolation,
configuration equivalence, measure calculations, and invalid-run exclusion. Do
not use runtime translation as a hidden fallback. Human review is required for
pragmatics, register, idiomaticity, or cultural interpretation; automated
checks only establish deterministic properties.

## Domain, traceability, and delivery

The Scenario context owns authored variants, review status, and expected
outcomes. The Intervention context owns the versioned treatment definition; it
does not judge the result. The Assurance Runtime evaluates graphs, not language
quality. The Evaluation context owns only deterministic measure derivation and
comparison eligibility; it may not infer native quality or activate a
treatment. `HSD5-D-001` maps to case and variant validation, `HSD5-D-002` to
provenance validation, `HSD5-I-001` to intervention validation,
`HSD5-E-001` to matched-run integration tests, `HSD5-E-002` to measure
calculation tests, `HSD5-E-003` to invalid-state tests, and `HSD5-UI-001` to a
browser comparison flow. QA records fixture, contract, model, planner, prompt,
locale, reviewer, budget, intervention version, and invalid-run reason. Add
actual paths to `TESTING.md`; never substitute model-generated translations for
review.

Update the root/package roadmaps, contract provenance, limitations, and this
Completion Record. Branch/commits/review use `TEMPLATE.md`; comments may only
explain review, representation, or comparison invariants.

## Scope boundaries

Exactly three case families and three declared locale variants; no broad
benchmark, real guests, hidden translation, or research claim. Measures are
descriptive controlled evidence only. Any aggregate difference is an
exploratory observation unless the protocol's review and repetition conditions
are met.

## Completion Record

**Branch used:**
**Commits:**
**Review / PR:**
**Acceptance evidence:**
**QA commands and results:**
**Docs updated:**
**Known limitations / follow-up:**
**Next issue readiness:**
