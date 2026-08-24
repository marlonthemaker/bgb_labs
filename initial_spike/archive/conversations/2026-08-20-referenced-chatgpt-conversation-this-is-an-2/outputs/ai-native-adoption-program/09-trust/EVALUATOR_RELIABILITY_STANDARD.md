# Evaluator Reliability Standard

ID: `DOC-TRUST-0003`
Version: v0.2
Status: proposed

## Purpose

This standard defines reliability requirements for human and automated evaluation in the AI Native Adoption Program.

## Reliability Principle

Evaluator judgment is evidence, not truth. It must carry qualifications, limits, disagreement, and uncertainty.

## Evaluator Types

- Native speaker evaluator
- Regional or cultural context evaluator
- Domain expert evaluator
- Journey evaluator
- Comparative baseline-treatment evaluator
- Automated evaluator model
- Hybrid evaluator workflow

## Required Evaluator Metadata

Each evaluator or evaluator configuration should record:

- evaluator ID or pseudonymous ID
- evaluator type
- language competence
- regional familiarity
- domain expertise
- training status
- conflict of interest
- review mode
- rubric version
- known limitations

For automated evaluators, record:

- model or tool name
- version or snapshot
- prompt version
- temperature or decoding settings where applicable
- calibration examples if used
- known failure modes

## Review Packet Requirements

Every review packet should include:

- evidence IDs
- journey or experiment context
- language context
- system condition without leaking unnecessary treatment labels
- rubric version
- rating anchors
- failure taxonomy options
- free-text rationale field
- confidence field
- escalation path for uncertainty or harm

## Reliability Controls

Use these controls based on risk:

- single review for low-risk exploratory work
- second review for roadmap-shaping findings
- comparative review for treatment promotion
- domain expert review for specialized topics
- adjudication note when disagreement affects a decision
- blind condition labels when feasible
- calibration examples before repeated annotation

## Disagreement Handling

Preserve original disagreement.

Allowed follow-up:

- add a consensus note
- request another review
- split the claim by language, region, domain, or journey condition
- lower confidence
- mark the evidence insufficient

Do not erase minority evaluator judgments just to simplify a finding.

## Minimum Reliability By Use

### Exploratory Observation

- one qualified reviewer or documented user observation
- confidence required
- limitations required

### Internal Finding

- reviewer qualification recorded
- rubric version recorded
- linked evidence IDs
- disagreement preserved

### Treatment Promotion

- matched baseline-treatment review
- target metrics evaluated
- regressions reviewed
- at least one reliability check or second review for meaningful risk

### Customer-Facing Claim

- evidence integrity check complete
- reviewer limits visible
- disagreement reviewed
- trust approval recorded
- claim wording restricted to evaluated scope

## Automated Evaluator Guardrails

Automated evaluators may assist with:

- triage
- consistency checks
- first-pass ratings
- rubric coverage checks
- regression detection

Automated evaluators must not be the only basis for:

- cultural fit claims
- high-risk domain conclusions
- native speaker experience claims
- customer-facing superiority claims

## Reliability Metrics

Candidate metrics:

- agreement rate by rubric dimension
- disagreement rate by language or locale
- reviewer confidence distribution
- annotation completion time
- escalation frequency
- reversal rate after adjudication
- automated-human disagreement rate

## Failure Conditions

Evaluator reliability fails when:

- evaluator qualifications are missing
- automated ratings are presented as human user experience
- disagreement is overwritten
- rubric anchors are defined after review
- treatment labels bias comparative review without acknowledgement
- high-risk conclusions rely on unqualified review
