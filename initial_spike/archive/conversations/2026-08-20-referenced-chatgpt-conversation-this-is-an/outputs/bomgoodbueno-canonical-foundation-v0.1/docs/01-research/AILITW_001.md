---
title: "AILITW-001: Supported != Equivalent"
version: 0.1
status: study-draft
owner: bomgoodbueno research
last_updated: 2026-08-20
dependencies:
  - ../../INDEX.md
  - AILITW_CHARTER.md
  - AILITW_PROTOCOL.md
  - NATIVE_ADOPTION_FRAMEWORK.md
  - EVALUATION_FRAMEWORK.md
  - CASE_TASK_DECOMPOSITION.md
  - HUMAN_EVALUATION.md
---

# AILITW-001: Supported ≠ Equivalent

## Full Title

Supported ≠ Equivalent: Cross-Language Capability Parity in Deployed AI Systems.

## Study Status

Draft protocol for the first AILITW study.

## Research Question

When deployed AI systems claim to support multiple languages, do they preserve
equivalent capability across English, Spanish, and Portuguese as used in
Portugal?

## Founding Thesis

Language support is not the same as capability parity.

A system may respond fluently in a supported language while failing deeper
agentic properties:

- semantic preservation;
- case/task decomposition;
- task-critical information preservation;
- policy application;
- workflow correctness;
- tool or action suitability;
- local institutional understanding;
- native user experience.

## Language Scope

AILITW-001 covers:

- English (`en`);
- Spanish (`es`);
- Portuguese as used in Portugal (`pt-PT`).

## System Scope

The initial cohort should include deployed AI systems with public or permissioned
surfaces that make language or market-support claims.

Candidate categories:

- customer-support agents;
- AI help centers;
- SaaS support assistants;
- fintech or banking support assistants where safe and public;
- travel or commerce agents where no real transaction is triggered;
- public model-product assistants with multilingual claims.

Final system selection must follow [AILITW_PROTOCOL.md](AILITW_PROTOCOL.md).

## Hypotheses

### H1: Support claims overstate parity

At least some systems that claim Spanish or Portuguese support will show lower
capability parity in those languages than in English.

### H2: pt-PT exposes hidden support gaps

Systems that support "Portuguese" may respond in Brazilian Portuguese, rely on
Brazilian assumptions, or fail to handle Portugal-specific usage and
institutions.

### H3: Decomposition gaps are larger than fluency gaps

Systems may produce fluent responses while failing case/task decomposition,
especially for compound, conditional, ambiguous, or multi-turn inputs.

### H4: TCIP predicts workflow failure

Loss of task-critical information will correlate with wrong workflow decisions,
wrong tool arguments, or incomplete outcomes.

### H5: PNM cases reveal different failure modes

Parallel, Native, and Market tests will surface different kinds of failures.
Translated or parallel cases alone will miss native and market gaps.

### H6: Evaluation method affects findings

LLM-only judging will miss or misclassify some native-quality, pragmatic, and
workflow failures that human review identifies.

## Case Design

AILITW-001 should use a balanced set of cases across PNM classes.

### Parallel Cases

Same semantic task across English, Spanish, and pt-PT.

Purpose:

- measure semantic parity;
- compare case/task decomposition across languages;
- compute capability-specific parity ratios.

### Native Cases

Cases authored directly in each language.

Purpose:

- measure natural user expression;
- test pragmatics and indirectness;
- detect non-native response quality;
- avoid artifacts from translated English.

### Market Cases

Cases requiring target-market context.

Purpose:

- test institutional nativeness;
- expose policy or workflow assumptions;
- distinguish Portuguese language support from Portugal readiness.

## Minimum Case Classes

AILITW-001 should include at least:

- C1 atomic;
- C2 compound same owner;
- C3 compound independent;
- C4 dependent;
- C5 mixed information/action;
- C6 ambiguous;
- C7 continuation;
- C9 cancellation/modification.

C8 duplicate/correlation and C10 multi-turn assembled should be included if the
system surface supports stateful interaction.

## Example Case Families

The first case library may include:

- account access;
- subscription cancellation;
- refund eligibility;
- billing date change;
- address update;
- delivery issue;
- appointment rescheduling;
- product troubleshooting;
- travel or booking support where no real transaction is triggered.

Each family should include:

- one English baseline;
- one Spanish parallel case;
- one pt-PT parallel case;
- one native Spanish case;
- one native pt-PT case;
- at least one market-sensitive variant where applicable.

## Metrics

Primary metrics:

- semantic accuracy;
- Case F1;
- Case Boundary Accuracy;
- Dependency Edge F1;
- TCIP;
- workflow correctness;
- policy correctness;
- capability parity ratio;
- native quality;
- evaluator confidence.

Secondary metrics:

- unnecessary escalation;
- unsafe action;
- refusal correctness;
- clarification quality;
- response completeness;
- locale drift;
- answer/action confusion.

## Evidence Target

AILITW-001 should aim for E3 controlled evaluation for its main findings.

E4 may be reached for selected findings if reruns are performed across time or
system versions.

E5 is not required for v0.1 unless artifacts can be independently reviewed
without violating responsible testing limits.

## Human Evaluation Plan

Human review is required for:

- native quality;
- pt-PT vs pt-BR distinction;
- pragmatic intent;
- ambiguous speech acts;
- semantic equivalence disputes;
- market-specific interpretation.

Initial model:

- founder first-pass review across EN/ES/pt-PT;
- external native or certified reviewers for a subset of contested or material
  cases;
- adjudication for disagreements affecting public claims.

## Analysis Plan

The analysis should report:

- system claim summary;
- cohort description;
- case inventory;
- per-language results;
- per-capability results;
- capability parity ratios;
- failure-class distribution;
- PNM comparison;
- human-review disagreement;
- limitations;
- unresolved hypotheses.

Do not report only aggregate scores. The most valuable output is a capability by
language matrix.

Example structure:

| Capability | EN | ES | pt-PT | Main Gap |
|---|---:|---:|---:|---|
| Semantic preservation | TBD | TBD | TBD | TBD |
| Case decomposition | TBD | TBD | TBD | TBD |
| TCIP | TBD | TBD | TBD | TBD |
| Workflow correctness | TBD | TBD | TBD | TBD |
| Native quality | TBD | TBD | TBD | TBD |

## Stopping Conditions

Pause or stop a test if:

- the system asks for private credentials;
- the case would trigger a real transaction;
- the system enters a sensitive domain outside scope;
- rate limits or terms indicate testing should stop;
- a finding appears severe enough to require notification before continued
  probing;
- evaluator uncertainty makes the study design invalid.

## Expected Outputs

AILITW-001 should produce:

- study report;
- claim provenance table;
- system atlas entries;
- case library v0.1;
- scoring rubrics;
- failure examples;
- parity matrix;
- methodology notes;
- internal product requirements for the research console.

## Definition of Done

AILITW-001 is done when:

- the protocol is frozen for the study;
- the system cohort is selected;
- all cases are authored and reviewed;
- runs are captured;
- human review is completed where required;
- results are scored;
- limitations are documented;
- claims are assigned evidence classes;
- publication decision is made;
- product requirements derived from the study are recorded.

## Unresolved Questions

- How many systems should be included in the first cohort?
- Should the first public report name systems or anonymize them?
- What is the minimum number of cases per capability for E3?
- Should English always be the baseline, or should each language also be
  compared to an ideal local reference?
- How should failed access, refusal, and rate limiting be scored?
- Which market-sensitive pt-PT cases are safest and most valuable for v0.1?

