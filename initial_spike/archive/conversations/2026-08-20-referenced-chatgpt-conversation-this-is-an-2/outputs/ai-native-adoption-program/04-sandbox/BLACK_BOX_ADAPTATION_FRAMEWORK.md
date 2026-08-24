# Black-Box Adaptation Framework

ID: `DOC-SBOX-0001`
Version: v0.1

## Purpose

Sandbox tests whether external layers can improve native adoption without model weights, provider cooperation, or internal system access.

## Adaptation Surface

- input rewriting
- language and locale routing
- prompt guardrails
- retrieval augmentation
- tool-call mediation
- clarification policies
- response repair
- evaluator-backed post-processing
- user-facing explanation and consent copy

## Core Hypothesis

Canonical definitions live in `01-research/HYPOTHESIS_REGISTER.md`.

- `HYP-SBOX-0001`
- `HYP-SBOX-0002`

## Treatment Pattern

1. Select a Wild failure and baseline.
2. State the Lab or product hypothesis.
3. Choose an intervention class.
4. Implement the minimum viable treatment.
5. Compare against baseline.
6. Retest in a Wild-like journey.

## Success Criteria

A treatment is promising when it improves the target adoption dimension without creating unacceptable regressions in task accuracy, safety, latency, cost, or user agency.

## Constraint

Do not hide uncertainty or override user intent to create the appearance of improvement.
