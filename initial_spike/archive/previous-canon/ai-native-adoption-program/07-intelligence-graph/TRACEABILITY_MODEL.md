# Traceability Model

ID: `DOC-IG-0003`
Version: v0.2
Status: proposed

## Purpose

This document defines how program artifacts trace from raw observation to research finding, operational decision, and product packaging.

## Core Principle

Every important claim should be answerable in reverse:

> If someone asks "why do we believe this?", the repo should point back to the exact evidence, run, experiment, hypothesis, and limitations.

## Traceability Levels

### Level 0: Mentioned

An artifact mentions another ID, but the relationship is informal.

Use only for early notes.

### Level 1: Linked

An artifact explicitly lists linked IDs and relationship types.

Minimum acceptable level for roadmap, risk, assumption, and decision updates.

### Level 2: Evidence-Backed

A claim links to `EVT-*` evidence records and the experiment, run, or review that produced them.

Minimum acceptable level for findings.

### Level 3: Reproducible

A claim links to versioned inputs, prompts, systems, datasets, evaluator rubrics, run records, and analysis outputs.

Minimum acceptable level for benchmark releases and treatment promotion.

### Level 4: Customer-Claim Ready

A claim has evidence, limitations, trust controls, review status, and approved customer-facing wording.

Minimum acceptable level for external sales, marketing, or product claims.

## Required Trace Fields By Artifact

### Hypothesis

- `hypothesis_id`
- linked failure IDs
- linked evidence IDs when available
- linked experiment IDs
- status
- decision impact

### Experiment

- `experiment_id`
- hypothesis ID
- journey IDs
- language contexts
- baseline condition
- treatment condition
- metric IDs
- risk IDs
- expected evidence outputs

### Run

- `run_id`
- experiment ID and version
- system configuration
- prompt or product-surface version
- language context
- condition
- raw artifact URIs
- metric outputs
- failure IDs
- exclusion status if any

### Evidence Item

- `evidence_id`
- source type
- run, observation, review, or citation source
- sensitivity level
- consent or license status
- raw artifact URI
- derived artifact URI
- linked IDs

### Failure

- failure type ID
- evidence IDs
- journey IDs
- severity
- observable symptoms
- suspected mechanisms
- treatment candidates

### Treatment

- treatment ID
- target failure IDs
- intervention class IDs
- hypothesis ID
- baseline run IDs
- treatment run IDs
- implementation version
- rollback condition
- known risks

### Finding

- finding ID
- claim
- conditions
- supporting evidence IDs
- contradicting evidence IDs if any
- linked hypothesis IDs
- linked treatment IDs if any
- limitations
- confidence
- decision recommendation

### Decision

- decision ID
- finding IDs or assumption IDs
- rationale
- consequences
- review status
- reversal conditions

### Product Capability

- capability ID
- source finding IDs
- treatment IDs
- readiness gate IDs
- trust control IDs
- supported customer claims
- unsupported claims

## Traceability Rules

- A `FIND-*` without `EVT-*` links is a draft note, not a finding.
- A promoted `TRT-*` must link to both baseline and treatment runs.
- A roadmap-shaping `DEC-*` must link to at least one finding, assumption, risk, or migration document.
- A customer-facing claim must link to a finding and a trust review.
- Derived artifacts must never replace raw artifacts.
- If evidence is excluded, preserve the exclusion reason.

## Traceability Review

Before a synthesis or decision review, check:

1. Are all claims linked to evidence?
2. Are baseline and treatment conditions comparable?
3. Are language contexts explicit?
4. Are evaluator limits recorded?
5. Are risks and assumptions linked?
6. Are limitations visible wherever findings are summarized?
7. Are product claims restricted to validated scope?

## First Traceability Slice

Use `JRN-WILD-0001` as the first candidate slice unless a different journey is approved.

Target path:

```text
JRN-WILD-0001
  -> RUN baseline
  -> EVT evidence
  -> FAIL-WILD classifications
  -> HYP linked hypothesis
  -> TRT-SBOX treatment
  -> RUN treatment
  -> FIND result
  -> DEC decision
```
