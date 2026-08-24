---
title: AILITW Charter
version: 0.1
status: canonical-draft
owner: bomgoodbueno research
last_updated: 2026-08-20
dependencies:
  - ../../INDEX.md
  - ../00-foundation/ORGANIZATION.md
  - ../00-foundation/MISSION_VISION_PRINCIPLES.md
  - RESEARCH_CHARTER.md
  - NATIVE_ADOPTION_FRAMEWORK.md
---

# AILITW Charter

## Name

AILITW means AI Living in the Wild.

## Role

AILITW is bomgoodbueno's field observatory. It studies deployed AI systems as
they exist outside controlled model leaderboards: in public products,
customer-facing agents, permissioned enterprise environments, market rollouts,
language surfaces, and real workflows.

AILITW is a research program inside bomgoodbueno, not the organization itself.

## Purpose

AILITW exists to answer:

- What do AI systems actually do in the wild?
- Do systems preserve capability across supported languages?
- Do vendor support claims match observed behavior?
- Where do agentic workflows fail across languages and markets?
- Which failures are linguistic, semantic, operational, institutional,
  experiential, or evaluative?
- How do systems drift after release?

## What Counts as "In the Wild"

A system is in the wild when it is deployed or represented as usable beyond a
private research sandbox.

Eligible contexts include:

- public chatbots;
- public AI assistants;
- customer-support agents;
- product copilots;
- vendor demos;
- public documentation-backed agents;
- permissioned customer systems;
- APIs available under ordinary developer terms;
- deployed enterprise workflows with authorization.

Ineligible contexts include:

- systems accessed through bypassed permissions;
- leaked private deployments;
- internal-only systems without permission;
- security-sensitive surfaces where testing would create operational risk.

## System Atlas

AILITW should maintain an atlas of systems, surfaces, claims, markets, and
languages.

Minimum fields:

- system name;
- owner/vendor;
- surface tested;
- access type;
- language claims;
- market claims;
- agentic capability claims;
- date observed;
- source URL or provenance;
- testing permissions;
- risk notes;
- study eligibility.

## Observational and Controlled Evidence

AILITW uses both observational and controlled evidence.

### Observational Evidence

Observation of public behavior under realistic interaction constraints.

Useful for:

- discovery;
- finding candidate failures;
- claim checking;
- building WildBench cases.

### Controlled Evidence

Protocol-driven evaluation with predefined cases, expected outcomes, scoring,
and reruns.

Useful for:

- parity measurement;
- benchmark reports;
- failure distribution analysis;
- release/regression comparisons.

## Responsible Testing Boundary

AILITW must follow the responsible testing commitments in
[RESEARCH_CHARTER.md](RESEARCH_CHARTER.md).

AILITW must not:

- overload systems;
- attempt unauthorized access;
- seek private user data;
- manipulate real transactions without permission;
- cause financial, operational, or reputational harm;
- publish sensitive details without considering notification or redaction.

## AILITW Outputs

AILITW may produce:

- system profiles;
- claim provenance records;
- cross-language parity reports;
- failure taxonomies;
- WildBench case sets;
- responsible public-system testing notes;
- public research reports;
- Applied Lab leads;
- product requirements for internal tooling.

## Relationship to Applied Lab

AILITW discovers and validates general patterns.

Applied Lab applies those patterns to a specific organization.

```text
AILITW:
Does this class of system show pt-PT parity gaps?

Applied Lab:
Does your deployed customer-support agent preserve refund workflow capability
in pt-PT, Spanish, and English?
```

AILITW findings may inform Applied Lab offers. Applied Lab work may generate
methods or anonymized patterns for AILITW, subject to confidentiality.

## Relationship to Public Goods

AILITW should create public goods when doing so improves the field and does not
create avoidable harm.

Potential public goods:

- anonymized failure examples;
- synthetic case sets;
- PNM test templates;
- rubrics;
- evidence-class methodology;
- annual or quarterly native adoption reports.

## Founding AILITW Program

The founding program is cross-language capability parity in deployed AI systems
across English, Spanish, and Portuguese as used in Portugal.

The first study is specified in [AILITW_001.md](AILITW_001.md):

> Supported ≠ Equivalent: Cross-Language Capability Parity in Deployed AI
> Systems.

## Unresolved Questions

- What qualifies a public AI system for named publication?
- How should AILITW handle systems that block repeated testing?
- What is the minimum observation count for a public parity report?
- When should system owners receive pre-publication notification?
- Should the atlas itself become public, partially public, or internal-only in
  v0.1?

