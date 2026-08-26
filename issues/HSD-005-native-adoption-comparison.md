# HSD-005 — Controlled Native-Adoption Comparison

**Status:** Planned
**Repository:** `hotel_shoreline`
**Depends on:** HSD-004
**Branch:** `feat/hsd-005-native-adoption-comparison`

## Entry gate

Do not create the HSD-005 branch until HSD-004 has deployed success and
zero-operation failure evidence, PR #2 is merged, and `main` is green. Locale
content may be drafted earlier, but it cannot be marked reviewed without an
identified qualified human reviewer and a representation-limitation record.

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

## Frozen treatment contract

The comparison isolates one planning intervention while keeping execution
safety constant.

| Condition | Planner receives | Shared after planning |
| --- | --- | --- |
| Baseline | Authored locale request, generic graph schema, declared planning budget, and no semantic-contract content. | Candidate captured unchanged; full Native Agent validation against the frozen contract; rejected candidates remain evidence and execute no tool; valid candidates use the same typed adapters. |
| Intervention | The identical request, schema, model/configuration, and budget plus the reviewed semantic contract and its versioned contract-guidance instructions. | The identical Native Agent validation, typed adapters, fresh fixture, evidence projection, and measure derivation. |

The intervention is therefore contract guidance during decomposition, not a
permission to repair output, change decoding settings, retry selectively, or
bypass validation. Both arms are safe to demonstrate: a baseline candidate may
be rejected more often or reach an operational adapter failure when its
arguments lose a critical fact, while an unsafe or contract-invalid candidate
is preserved and rejected rather than executed. Evaluation compares the
original candidates and truthful terminal outcomes; it never mutates either arm
into a pass.

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

Boundary cases must include duplicate case/variant/version identifiers,
unknown locale, missing or pending review, mismatched fixture/tool/contract
versions, changed model or planning budget, malformed candidate, provider
failure, validation rejection, partial tool failure, zero-denominator measure,
prohibited effect, and a derived record whose source hash does not match the
run. Every attempted run remains visible with an eligibility or exclusion
reason.

## Implementation slices inside HSD-005

These slices are ordered and non-overlapping. They remain one issue/PR because
the value gate is the matched comparison, but each slice should be a separate
reviewable commit.

1. **Case and review registry (`HSD5-D-*`).** Define immutable case families,
   authored locale variants, expected outcomes, provenance, review state, and
   representation limitations. No planner or scoring code belongs here.
2. **Intervention registry (`HSD5-I-001`).** Define immutable treatment
   versions and activation/regression/rollback rules. It may describe a
   treatment but cannot execute or score one.
3. **Run-condition builder (`HSD5-E-001`, `HSD5-E-003`).** Construct paired
   baseline/intervention specifications, hash comparison-critical
   configuration, and return typed exclusion reasons before orchestration.
4. **Evaluation (`HSD5-E-002`).** Derive individually named measures,
   numerators, denominators, and first-loss stage from immutable evidence. No
   aggregate “native score” and no model self-grading.
5. **Controlled orchestrator (`HSD5-E-*`).** Execute fresh, independent arms;
   preserve original candidates and all terminal states; never silently retry,
   translate, repair, or discard.
6. **Minimal comparison inspector (`HSD5-UI-001`).** Show one selected pair,
   its source facts, measures, exclusions, and limitations. HSD-006—not this
   issue—owns historical navigation, polished dashboards, export, and the
   submission-grade responsive experience.

Planned application paths are `src/lib/native-adoption/cases.ts`,
`interventions.ts`, `conditions.ts`, `evaluation.ts`, and `orchestrator.ts`,
with a narrow presentation projection. If implementation reveals a genuinely
domain-neutral SDK primitive, record a follow-up instead of expanding the SDK
during this issue.

## External evidence gate

Engineering completion requires at least one real-provider paired attempt for
each of the nine case-locale blocks (18 attempted runs), with invalid/provider
failed attempts retained. This supports an illustrative workflow observation
only. Three repetitions per arm (54 attempted runs) are required before
reporting a scoped descriptive difference under the protocol. If reviewer,
time, quota, or cost constraints prevent that sample, reduce the claim rather
than omitting attempts or weakening provenance.

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
