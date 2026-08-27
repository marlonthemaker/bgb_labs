# Research Method

## Purpose

The research method combines controlled cases, external reference measures, bomgoodbueno diagnostics, human review, and intervention testing.

It exists to produce decision-grade knowledge rather than persuasive demonstrations or broad language claims.

## Research Loop

Each complete study should follow this shape:

1. Frame a narrow question, decision, and falsifiable hypothesis.
2. Freeze the system, fixture, language scope, budget, and expected behavior.
3. Author semantic contracts and distinguish parallel, native, and market variants.
4. Define ground truth and evaluator requirements before execution.
5. Run the baseline under recorded conditions.
6. Evaluate behavior, traces, outcomes, and uncertainty.
7. Diagnose the earliest failure in the six-stage lifecycle.
8. Select the smallest intervention tied to that diagnosis.
9. Retest under matched conditions and check regressions.
10. Report findings, limitations, decisions, and reusable implications.

Hotel Shoreline is the current controlled implementation of this loop. It
calibrates engineering and evaluation behavior but is not a field study.

## Unit Of Evaluation

The initial unit is a semantic contract: a language-independent definition of the user's intended need, relevant context, expected behavior, allowed outcomes, prohibited outcomes, and evidence required to judge the case.

Language variants instantiate the contract. They do not define ground truth independently.

A contract should identify, as applicable:

- stable ID and case class;
- source type: parallel, native, or market;
- user goal and speech act;
- entities, quantities, temporal details, conditions, negation, and references;
- expected case and task structure;
- expected knowledge, policy, workflow, tools, or clarification;
- acceptable and invalid outcomes;
- task-critical information;
- evaluation method and human-review requirement;
- fixture and tool references;
- representation limits.

## Reference Mix

An early study should not invent a large benchmark before proving the method.

It should reproduce the shape of selected external approaches over a small shared corpus, then add the bomgoodbueno native-adoption diagnosis and intervention layer.

The intended mix is:

- reference points from external studies;
- experiments from the controlled fixture;
- lifecycle diagnosis;
- deterministic and trace-based checks;
- native human review where needed;
- targeted intervention testing.

External methods should be cited and scoped. Similarity to an external method does not imply reproduction unless its essential conditions were actually reproduced.

## Ground Truth

Ground truth is authored and reviewed, not inferred from model output.

It must be frozen before the relevant run and should identify acceptable alternatives where more than one behavior is valid. Changes after execution require a new version or explicit amendment.

Translation variants and native-authored variants must remain distinguishable. A reviewer may improve naturalness without silently changing the semantic contract.

## Observation And Claim Discipline

Research artifacts must distinguish:

- **Observation** - what happened in a specific run, trace, review, or source.
- **Inference** - an interpretation supported by one or more observations.
- **Hypothesis** - a plausible explanation or prediction not yet established.
- **Finding** - a scoped conclusion supported by declared evidence.
- **Recommendation** - an action proposed from the evidence and decision context.

Claims must state what was tested, under which conditions, with which system, fixture, model, harness, scorer, evaluator, and budget, plus relevant limitations.

Do not generalize from a tested workflow to an entire language, culture, market, model family, or product.

## Evidence Levels

The canon uses one evidence scale:

- **E0 - Untested claim**: assertion, vendor statement, model self-description, or internal hypothesis without direct observation.
- **E1 - Exploratory observation**: anecdotal or single observation without a controlled protocol.
- **E2 - Structured observation**: captured under a defined case, surface, language, date, and procedure, but without sufficient controlled comparison.
- **E3 - Controlled evaluation**: predefined cases, expected outcomes, recorded conditions, evaluation rules, and enough runs or review to support a scoped finding.
- **E4 - Replicated or longitudinal evidence**: controlled evaluation repeated across time, versions, systems, evaluators, or comparable cohorts.
- **E5 - Independently reviewed or auditable evidence**: externally reviewed or supported by enough inspectable artifacts for independent audit or reproduction, subject to privacy and safety limits.

The evidence level describes support for a claim, not the quality of its prose. A report may contain items at different levels.

Hotel Shoreline targets credible E3 evidence for its controlled scope. It does
not by itself support broad market, language, production, or certification
claims.

## Evaluation Method

No single evaluator is sufficient for every property. Match the method to the property:

| Property | Preferred evidence |
|---|---|
| Fixture fact, entity, quantity, date, negation, or tool argument | Deterministic assertion plus targeted review |
| Workflow path, ordering, escalation, or tool selection | Trace and outcome inspection |
| Policy correctness | Source-grounded rubric or domain review |
| Semantic equivalence | Bilingual or multilingual review |
| Pragmatics, register, ambiguity, or native quality | Qualified native review |
| Broad or durable claim | Controlled runs plus replication and independent review as risk requires |

Automated scoring may support triage, deterministic checks, rubric coverage, and consistency analysis. It must not be the only basis for native-experience, cultural-fit, high-risk, or customer-facing superiority claims.

## Human Review

Human review is required where automated checks cannot judge pragmatic intent, idiomaticity, register, ambiguity, local institutional meaning, trust calibration, or appropriate user experience.

Record enough reviewer metadata to interpret the evidence:

- language competence and regional familiarity;
- domain expertise where relevant;
- review training and rubric version;
- conflict of interest;
- confidence and known limits.

Preserve original disagreement. Adjudication may add a resolution note but must not erase dissenting evaluations.

Community or domain review is required before high-risk or community-wide claims. A native speaker is not automatically representative of every region, class, dialect, domain, or accessibility context.

## Run And Evidence Record

Each evaluation claim should be traceable through:

```text
claim or finding
  -> evaluation
  -> run and trace
  -> language variant
  -> semantic contract
  -> fixture and tool-contract version
  -> method and limitations
```

Record, where applicable:

- run ID and timestamp;
- system, model, provider, and version or snapshot;
- prompt, policy, fixture, case, tool, harness, and scorer versions;
- language and locale;
- budget and decoding settings;
- tool calls, arguments, results, and final response;
- evaluator and rubric versions;
- raw and derived artifact locations;
- exclusions, errors, and limitations.

Raw evidence should not be silently overwritten by annotations or summaries. Exclusions require a reason.

## Validity Rules

- Baseline and intervention conditions must differ only in declared ways.
- Expected behavior and rubric anchors must be defined before judging results.
- Invalid or interrupted runs must not be silently counted as passes or failures.
- Evidence involving private or identifying text requires explicit handling and retention rules.
- Accessibility considerations must be addressed or explicitly declared out of scope.
- Representation limits must accompany claims about a locale, community, or market.
- Paid work must identify conflicts and must not alter findings to satisfy a customer.

## Small First

Use a small, deliberately selected contract set before expanding to a benchmark.

Breadth is earned only after one complete baseline, diagnosis, intervention, retest, and report can be reproduced and reviewed.
