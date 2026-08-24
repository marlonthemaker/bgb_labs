# Hypothesis Register

ID: `DOC-RES-0006`
Version: v0.1

This document is the canonical source of truth for active program hypotheses.

## Cross-Program

`HYP-ALL-0001`: Multilingual adoption gaps are not only model-quality gaps; they also emerge from product surfaces, agent scaffolds, retrieval, tool use, cultural assumptions, and evaluation design.

- Status: active
- Primary tracks: Wild, Lab, Sandbox

`HYP-ALL-0002`: A shared evidence substrate across Wild, Lab, and Sandbox will produce faster learning than isolated benchmark, interpretability, or intervention projects.

- Status: active
- Primary tracks: Platform, Operations

## Wild

`HYP-WILD-0001`: Many multilingual failures appear before task execution, during discovery, expectation-setting, consent, or instruction framing.

- Status: active
- Linked failure areas: discovery mismatch, instruction opacity, unsafe trust signal

`HYP-WILD-0002`: Tool and policy surfaces degrade native adoption even when model text quality is strong.

- Status: active
- Linked failure areas: tool handoff failure, error recovery failure

`HYP-WILD-0003`: Users abandon agents earlier when uncertainty, permission, and consent are not expressed in locally natural language.

- Status: active
- Linked failure areas: instruction opacity, unsafe trust signal, locale mismatch

## Lab

`HYP-LAB-0001`: Tool intent representations and tool-selection behavior are less stable across languages than general semantic representations.

- Status: active
- Linked metrics: `MET-LAB-0001`, `MET-LAB-0002`

`HYP-LAB-0002`: Uncertainty, refusal, consent, and policy concepts show language-dependent behavior that affects trust.

- Status: active
- Linked metrics: `MET-LAB-0003`

`HYP-LAB-0003`: Cultural and locale entities are represented unevenly, producing confident but locally wrong outputs.

- Status: active
- Linked metrics: `MET-LAB-0004`

`HYP-LAB-0004`: Translation-first strategies improve some low-resource tasks but degrade native-feeling interaction for others.

- Status: active
- Linked failure areas: `FAIL-WILD-0005`, `FAIL-WILD-0009`

## Sandbox

`HYP-SBOX-0001`: Some native adoption gaps can be recovered through black-box adaptation layers without access to model weights.

- Status: active
- Linked intervention areas: prompt guardrails, routers, response repair, tool mediation

`HYP-SBOX-0002`: Routing, prompt guards, translation strategies, response repair, and evaluator-backed post-processing can improve outcomes for selected language-task pairs.

- Status: active
- Linked intervention areas: strategy router, evaluator gate, response repair

## Review Rule

Promote a hypothesis only when it has linked evidence, at least one completed experiment or study, and a stated decision impact.
