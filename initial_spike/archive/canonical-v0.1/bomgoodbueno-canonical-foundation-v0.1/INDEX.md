---
title: bomgoodbueno Canonical Foundation Index
version: 0.1
status: canonical-draft
owner: bomgoodbueno founder
last_updated: 2026-08-20
dependencies: []
---

# bomgoodbueno Canonical Foundation v0.1

This repository-ready foundation establishes the initial operating canon for
bomgoodbueno, an R&D lab specializing in the native adoption of agentic systems.
It converts prior discovery work into controlled documents that can guide
organizational design, research operations, applied work, and eventual product
development.

This canon is intentionally not a full company handbook or complete software
specification. It is the foundation that future organizational, product,
engineering, commercial, and publication documents must inherit from.

## Canonical Thesis

bomgoodbueno exists to study and advance the democratization of digital
intelligence through applied native adoption analysis.

The founding claim is:

> Digital intelligence is not meaningfully democratized merely because a system
> can generate text in someone's language. It is democratized when people can
> access equivalent capabilities through their own language, cultural context,
> institutions, workflows, and modes of interaction.

Therefore:

- Access ≠ adoption.
- Support ≠ parity.
- Native capability is not translated output.
- A system that is fluent may still fail operationally.
- A system that can answer may still fail to execute the work correctly.
- Public claims about language, region, or agentic capability require evidence.

## Document Set

### Foundation

| Document | Purpose |
|---|---|
| [ORGANIZATION.md](docs/00-foundation/ORGANIZATION.md) | Defines bomgoodbueno, AILITW, Applied Lab, Research, and Public Goods. |
| [MISSION_VISION_PRINCIPLES.md](docs/00-foundation/MISSION_VISION_PRINCIPLES.md) | Establishes mission, vision, principles, and ethical commitments. |
| [STRATEGY.md](docs/00-foundation/STRATEGY.md) | Defines why now, where the lab plays, how it wins, and what it avoids. |
| [GLOSSARY.md](docs/00-foundation/GLOSSARY.md) | Defines shared vocabulary and canonical terms. |

### Research

| Document | Purpose |
|---|---|
| [RESEARCH_CHARTER.md](docs/01-research/RESEARCH_CHARTER.md) | Governs research method, evidence, limitations, and publication discipline. |
| [NATIVE_ADOPTION_FRAMEWORK.md](docs/01-research/NATIVE_ADOPTION_FRAMEWORK.md) | Defines native adoption and its measurable dimensions. |
| [AILITW_CHARTER.md](docs/01-research/AILITW_CHARTER.md) | Defines AI Living in the Wild as bomgoodbueno's field observatory. |
| [EVALUATION_FRAMEWORK.md](docs/01-research/EVALUATION_FRAMEWORK.md) | Defines the evaluation stack, metrics, evidence classes, and reliability rules. |
| [CASE_TASK_DECOMPOSITION.md](docs/01-research/CASE_TASK_DECOMPOSITION.md) | Specifies case/task decomposition as a first-class research and product capability. |
| [AILITW_PROTOCOL.md](docs/01-research/AILITW_PROTOCOL.md) | Defines operating procedure for public-system observation and controlled reruns. |
| [HUMAN_EVALUATION.md](docs/01-research/HUMAN_EVALUATION.md) | Defines the lean human evaluator network and review methodology. |
| [AILITW_001.md](docs/01-research/AILITW_001.md) | Specifies the first AILITW study: cross-language capability parity in EN/ES/pt-PT. |

## Authority and Precedence

When documents conflict, use this precedence order:

1. [MISSION_VISION_PRINCIPLES.md](docs/00-foundation/MISSION_VISION_PRINCIPLES.md)
2. [ORGANIZATION.md](docs/00-foundation/ORGANIZATION.md)
3. [STRATEGY.md](docs/00-foundation/STRATEGY.md)
4. [GLOSSARY.md](docs/00-foundation/GLOSSARY.md)
5. [RESEARCH_CHARTER.md](docs/01-research/RESEARCH_CHARTER.md)
6. [NATIVE_ADOPTION_FRAMEWORK.md](docs/01-research/NATIVE_ADOPTION_FRAMEWORK.md)
7. [AILITW_CHARTER.md](docs/01-research/AILITW_CHARTER.md)
8. [EVALUATION_FRAMEWORK.md](docs/01-research/EVALUATION_FRAMEWORK.md)
9. [CASE_TASK_DECOMPOSITION.md](docs/01-research/CASE_TASK_DECOMPOSITION.md)
10. [AILITW_PROTOCOL.md](docs/01-research/AILITW_PROTOCOL.md)
11. [HUMAN_EVALUATION.md](docs/01-research/HUMAN_EVALUATION.md)
12. [AILITW_001.md](docs/01-research/AILITW_001.md)

The glossary defines terms. The mission and organization documents define
purpose and structure. Research documents define method. A study document may
instantiate the method but may not silently redefine it.

## Dependency Graph

```text
MISSION / VISION / PRINCIPLES
        |
        v
ORGANIZATION
        |
        v
STRATEGY
        |
        +----------------+
        |                |
        v                v
RESEARCH CHARTER     GLOSSARY
        |                |
        +-------+--------+
                v
NATIVE ADOPTION FRAMEWORK
        |
        +----------------+
        |                |
        v                v
AILITW CHARTER    EVALUATION FRAMEWORK
        |                |
        |                v
        |        CASE / TASK DECOMPOSITION
        |                |
        +--------+-------+
                 v
          AILITW PROTOCOL
                 |
                 v
          HUMAN EVALUATION
                 |
                 v
             AILITW-001
```

## Operating Loops

bomgoodbueno should initially operate through four loops rather than heavy
departments.

### Discovery Loop

Find systems, qualify their public surfaces, record claims, map markets and
languages, and prepare cohorts for study.

### Research Loop

Define hypotheses, write protocols, build cases, run observations, evaluate
evidence, classify failures, publish findings, and preserve limitations.

### Applied Loop

Translate research into Native Adoption Analysis, experimentation, CompanyBench,
market-readiness review, agent/model assurance, and release/regression
assurance for real organizations.

### Engineering Loop

Convert research requirements into product infrastructure through explicit
specification, tests, implementation, verification, evidence, and documentation.

## Founding Scope

The founding language scope is:

- English.
- Spanish.
- Portuguese as used in Portugal (`pt-PT`).

This founding scope is deliberately narrow enough for careful human review and
wide enough to test whether capability is preserved across English, another
major global language, and a European Portuguese market context where "Portuguese
support" frequently conceals Brazilian-Portuguese assumptions.

## Product Dependency Model

The software should be derived from the science.

The first internal product surfaces should support AILITW and Applied Lab work:

- system and claim atlas;
- study and protocol management;
- case/task library;
- run and trace capture;
- evaluation workbench;
- human review workflow;
- evidence and provenance registry;
- report generation.

The lab should not begin by building generic SaaS. SaaS may emerge later from
recurring applied needs, especially cross-language release assurance and
capability parity monitoring.

## v0.1 Status

This foundation is a canonical draft. It is suitable for repository seeding,
planning, agentic development context, and first-study preparation. It contains
unresolved questions and explicit hypotheses rather than pretending that the
organization has already completed its research.

