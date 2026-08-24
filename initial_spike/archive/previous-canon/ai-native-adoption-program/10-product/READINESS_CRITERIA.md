# Readiness Criteria

ID: `DOC-PROD-0004`
Version: v0.2
Status: proposed

## Purpose

This document defines readiness gates for turning research artifacts into product capabilities, offers, and customer-facing claims.

## Readiness Principle

A product artifact is ready only for the scope its evidence supports.

## Readiness Gates

### Gate 1: Concept Ready

Required:

- problem statement
- target user or customer
- target language context
- linked hypothesis or assumption
- known risks

Allowed use:

- internal discussion
- roadmap planning

Not allowed:

- customer claim
- treatment promotion

### Gate 2: Research Ready

Required:

- linked journey or experiment
- linked evidence IDs
- failure or metric mapping
- stated limitations
- owner

Allowed use:

- internal finding
- follow-up experiment planning
- treatment design

Not allowed:

- external superiority claim
- package-ready offer

### Gate 3: Treatment Ready

Required:

- treatment protocol
- target failure IDs
- baseline run IDs
- treatment run IDs
- baseline-treatment comparison
- regression review
- rollback condition

Allowed use:

- internal pilot
- scoped implementation

Not allowed:

- broad product claim
- unsupported language expansion

### Gate 4: Trust Ready

Required:

- evidence integrity check
- evaluator reliability check if human review is used
- privacy and sensitivity review
- supported and unsupported claims
- contradiction or limitation review

Allowed use:

- pilot-ready customer discussion
- controlled demo
- internal or partner report

Not allowed:

- public benchmark release unless benchmark-specific controls pass

### Gate 5: Package Ready

Required:

- repeatable delivery process
- versioned artifacts
- documented inputs and outputs
- support and failure handling
- claim-ready wording
- owner
- update cadence

Allowed use:

- packaged offer
- customer-facing proposal within validated scope
- repeatable delivery

Not allowed:

- claims beyond tested languages, journeys, systems, or treatment conditions

## Artifact-Specific Criteria

### Treatment Package

Ready when:

- treatment has versioned implementation
- baseline and treatment runs are comparable
- target metrics improved or tradeoffs are accepted
- regressions are documented
- rollback condition is clear

### Benchmark Package

Ready when:

- journey definitions are stable
- language contexts are explicit
- scoring rubric is versioned
- evaluator requirements are defined
- exclusion rules are documented
- limitations are published with results

### Report Package

Ready when:

- findings link to evidence
- confidence and limitations are stated
- methods are summarized
- unsupported claims are excluded
- trust review is complete for external use

### Platform Package

Ready when:

- schemas are versioned
- runner behavior is repeatable
- evidence storage is documented
- validation checks exist
- local setup is documented

## Readiness Failure Conditions

An artifact is not ready when:

- evidence is missing or untraceable
- language context is vague
- baseline and treatment are not comparable
- evaluator qualifications are missing
- limitations are hidden
- claims generalize beyond the tested scope
- privacy or license status is unknown

## First Readiness Target

Apply these gates to the first closed loop before building a broader benchmark or product prototype.
