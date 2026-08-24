---
title: Research Charter
version: 0.1
status: canonical-draft
owner: bomgoodbueno research
last_updated: 2026-08-20
dependencies:
  - ../../INDEX.md
  - ../00-foundation/MISSION_VISION_PRINCIPLES.md
  - ../00-foundation/GLOSSARY.md
  - NATIVE_ADOPTION_FRAMEWORK.md
---

# Research Charter

## Purpose

This charter defines how bomgoodbueno conducts research. It protects the lab
from vague claims, weak evidence, overconfident benchmarks, and product-driven
distortion.

Research at bomgoodbueno exists to answer:

> What does it take for digital intelligence developed globally to become
> operationally native locally?

## Research Domains

bomgoodbueno's initial research domains are:

- native adoption of agentic systems;
- cross-language capability parity;
- multilingual agent evaluation;
- case/task decomposition;
- task-critical information preservation;
- workflow correctness;
- evaluation reliability;
- responsible public-system observation;
- release and regression assurance.

## Research Standards

Every research effort must identify:

- research question;
- hypothesis or hypotheses;
- system or cohort;
- language and locale scope;
- case selection method;
- protocol;
- evaluation method;
- evidence class;
- limitations;
- claim provenance;
- responsible testing boundary;
- publication or internal-use status.

## Observation vs Inference

Research documents must distinguish between:

- observation: what happened in a specific run, trace, review, or source;
- inference: what the lab concludes from observations;
- hypothesis: what remains plausible but unproven;
- claim: what the lab is willing to state;
- recommendation: what the lab suggests a customer, vendor, or researcher do.

Example:

```text
Observation:
The Spanish run omitted the refund deadline in 3 of 20 cases.

Inference:
The system may be weaker at preserving temporal constraints in Spanish.

Claim:
Only valid if supported across enough cases, reruns, and controls.
```

## Evidence Classes E0-E5

The lab uses six evidence classes.

### E0: Assertion or Untested Claim

A claim stated by a vendor, user, model, researcher, or document without direct
bomgoodbueno observation.

Use for:

- vendor marketing claims;
- documentation statements;
- model self-description;
- internal hypotheses.

Not sufficient for findings.

### E1: Anecdotal Observation

A single or informal observation without a controlled protocol.

Use for:

- exploratory notes;
- bug discovery;
- early screenshots;
- initial system reconnaissance.

Not sufficient for general claims.

### E2: Structured Observation

An observation captured under a defined case, language, surface, date, and
procedure, but without enough replication for a stable finding.

Use for:

- AILITW exploratory runs;
- first-pass case execution;
- documented examples.

Can support limited claims about observed behavior.

### E3: Controlled Evaluation

Multiple structured observations run under a protocol with predefined rubrics,
expected outcomes, trace capture, and failure classification.

Use for:

- benchmark comparisons;
- cross-language parity analysis;
- case/task decomposition evaluation;
- TCIP analysis.

Can support scoped research findings.

### E4: Replicated or Longitudinal Evidence

Controlled evaluation repeated across time, system versions, evaluators, or
cohorts.

Use for:

- drift analysis;
- release regression;
- market-readiness claims;
- more durable comparisons.

Can support stronger findings.

### E5: Independently Reviewed or Auditable Evidence

Evidence that has been independently reviewed, externally audited, or made
available with sufficient artifacts for reproducibility, subject to safety and
privacy limits.

Use for:

- public benchmark releases;
- certification-like claims;
- external research collaboration;
- high-confidence public reports.

## Claim Discipline

Claims must be scoped to their evidence.

Do not say:

> System X is bad at Portuguese.

Prefer:

> In AILITW-001, on the tested customer-support workflow cases, System X showed
> lower pt-PT task-critical information preservation than its English baseline
> under the stated protocol.

## Evaluation Method Mix

No single evaluation method is sufficient for native adoption.

The lab may combine:

- deterministic assertions;
- trace inspection;
- tool-call validation;
- LLM-assisted judging;
- native human review;
- certified linguistic review;
- domain expert review;
- inter-rater adjudication;
- longitudinal reruns.

The method must match the property.

Examples:

- Currency preservation may be deterministic.
- Register appropriateness requires human review.
- Workflow correctness may require trace and tool-call inspection.
- Policy adherence may require domain or customer review.
- Semantic equivalence may require bilingual or multilingual review.

## Translated Benchmarks Warning

Translated English cases are not automatically valid multilingual benchmarks.
They may preserve surface wording while losing difficulty, pragmatic force,
cultural validity, institutional meaning, or naturalness.

The lab therefore uses PNM testing:

- Parallel tests for aligned semantic tasks.
- Native tests for natural target-language expression.
- Market tests for local institutions, policies, and workflows.

PNM is defined in [GLOSSARY.md](../00-foundation/GLOSSARY.md) and used in
[AILITW_001.md](AILITW_001.md).

## Responsible Public-System Testing

AILITW may test public AI systems only within responsible boundaries:

- use ordinary public interfaces unless permission expands access;
- avoid excessive volume;
- avoid adversarial extraction of secrets or private data;
- avoid attempts to bypass restrictions;
- avoid operational disruption;
- respect robots, terms, and rate limits where applicable;
- preserve evidence without exposing sensitive data unnecessarily;
- consider notification before publication when findings are material,
  sensitive, or named.

## Research Artifacts

Each study should preserve:

- protocol version;
- case definitions;
- expected Semantic IR;
- expected task decomposition;
- run logs;
- traces;
- screenshots or transcripts where allowed;
- evaluator assignments;
- review rubrics;
- scoring outputs;
- failure classifications;
- analysis notebooks or scripts where applicable;
- publication draft;
- limitations.

## Independence and Conflicts

Paid Applied Lab work may fund research, but findings must not be adjusted to
please customers, vendors, or partners.

Research outputs must identify:

- whether the work was public, internal, customer-funded, or sponsored;
- whether systems had permissioned access;
- whether any evaluated organization reviewed results before publication;
- whether any data cannot be shared.

## Unresolved Research Questions

- How much replication is needed before a parity gap becomes publishable?
- Which human-review properties require certified reviewers rather than native
  reviewers?
- How should evaluator disagreement affect evidence class?
- What minimum artifact set is necessary for E5 in public-system research?
- How should bomgoodbueno compare systems that change their behavior during the
  study window?

