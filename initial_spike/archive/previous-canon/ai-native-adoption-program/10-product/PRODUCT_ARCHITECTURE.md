# Product Architecture

ID: `DOC-PROD-0002`
Version: v0.2
Status: proposed

## Purpose

This document defines how validated research becomes reusable product capability.

## Product Thesis

Organizations adopting agentic AI across languages need more than translation quality checks. They need a repeatable way to discover native adoption failures, diagnose causes, test external fixes, and package evidence-backed improvements.

## Product Boundary

The product architecture packages validated program work. It does not invent claims independently from research, evidence, trust review, or traceability.

## Product Capability Types

### Diagnostic Capabilities

- native adoption journey review
- multilingual failure classification
- representation or behavior diagnostics
- trust and evaluator reliability review
- benchmark gap analysis

### Intervention Capabilities

- prompt guardrail package
- language and locale strategy router
- clarification layer
- response repair layer
- tool mediation layer
- retrieval grounding package
- evaluator gate
- UI copy adaptation package

### Evidence Capabilities

- benchmark run report
- baseline versus treatment comparison
- evidence-backed finding memo
- adoption scorecard
- trust readiness review

### Platform Capabilities

- local experiment runner
- registry templates
- evidence schema package
- analysis notebook or script package
- evaluator review packet workflow

## Product Architecture Layers

```text
Research Loop
  Wild -> Lab -> Sandbox -> Wild retest

Intelligence Layer
  graph ontology -> traceability -> findings -> decisions

Trust Layer
  evidence integrity -> evaluator reliability -> claim review

Packaging Layer
  capabilities -> offers -> readiness gates -> customer claims
```

## Capability Record

Each product capability should include:

- `capability_id`
- title
- capability type
- source finding IDs
- source treatment IDs
- target failure IDs
- target language contexts
- required evidence level
- trust controls
- supported claims
- unsupported claims
- readiness state
- owner

## Product States

- `concept`: product idea, no validated evidence yet
- `research_backed`: linked findings exist
- `treatment_backed`: linked treatment improved target metrics
- `trust_reviewed`: evidence and evaluator reliability reviewed
- `pilot_ready`: usable with a narrow customer or internal pilot
- `package_ready`: documented, repeatable, and supportable
- `retired`: no longer offered

## Packaging Rule

Do not package a capability as product-ready unless:

- source findings are traceable
- evidence integrity is reviewed
- limitations are explicit
- supported and unsupported claims are separated
- operating requirements are known
- rollback or failure handling is defined

## First Product Architecture Target

The first product candidate should be narrow:

`Portuguese native adoption prompt-router package`

Possible source path:

```text
JRN-WILD-0001
  -> FAIL-WILD-0003 / FAIL-WILD-0004 / FAIL-WILD-0008
  -> HYP-SBOX-0002
  -> INT-SBOX-0001 / INT-SBOX-0002 / INT-SBOX-0004
  -> TRT-SBOX-0001
  -> FIND
  -> CAP-PROD
```

## Product Non-Goals In v0.2

- broad model ranking platform
- claims of universal multilingual quality
- self-serve SaaS before the closed loop works
- fine-tuning products before black-box adaptation is validated
- customer-facing benchmarks without trust review
