# Registry Index

ID: `DOC-REG-0002`
Version: v0.2
Status: proposed

## Purpose

This document defines the initial inventory of structured registries needed to operate the AI Native Adoption Program.

## Registry Principle

Canonical markdown documents define program semantics. Structured registries operationalize those definitions for repeated runs, validation, analysis, and reporting.

## Registry States

- `not_started`: defined conceptually, no structured file yet.
- `draft`: schema exists but has not been used in a completed loop.
- `active`: used by current work.
- `locked`: version frozen for a release or benchmark.
- `retired`: no longer used, retained for history.

## Initial Registries

### Foundation Registries

| Registry | Primary IDs | Semantic Owner | Operational Owner | Initial State |
|---|---|---|---|---|
| Document registry | `DOC-*` | Foundation | Registries | not_started |
| Term registry | term IDs if needed | Foundation | Registries | not_started |

### Research Registries

| Registry | Primary IDs | Semantic Owner | Operational Owner | Initial State |
|---|---|---|---|---|
| Hypothesis registry | `HYP-*` | Research | Registries | draft from markdown |
| Experiment registry | `EXP-*` | Research | Platform | not_started |
| Evidence registry | `EVT-*` | Research, Trust | Platform | not_started |
| Metric registry | `MET-*` | Research | Registries | not_started |
| Finding registry | `FIND-*` | Research | Registries | not_started |

### Wild Registries

| Registry | Primary IDs | Semantic Owner | Operational Owner | Initial State |
|---|---|---|---|---|
| Journey registry | `JRN-*` | Wild | Registries | draft from markdown |
| Failure taxonomy registry | `FAIL-*` | Wild | Registries | draft from markdown |
| Observation registry | `OBS-*` | Wild | Platform | not_started |
| Benchmark item registry | `JRN-*` or `BMK-*` if needed | Wild | Registries | not_started |

### Lab Registries

| Registry | Primary IDs | Semantic Owner | Operational Owner | Initial State |
|---|---|---|---|---|
| Diagnostic workstream registry | `EXP-LAB-*` | Lab | Registries | not_started |
| Representation metric registry | `MET-LAB-*` | Lab | Registries | draft from markdown |
| Mechanism registry | `MECH-*` if adopted | Lab | Registries | proposed |

### Sandbox Registries

| Registry | Primary IDs | Semantic Owner | Operational Owner | Initial State |
|---|---|---|---|---|
| Intervention class registry | `INT-SBOX-*` | Sandbox | Registries | draft from markdown |
| Treatment registry | `TRT-SBOX-*` | Sandbox | Registries | draft from markdown |
| Treatment result registry | `RUN-*`, `FIND-*` | Sandbox, Research | Platform | not_started |

### Platform Registries

| Registry | Primary IDs | Semantic Owner | Operational Owner | Initial State |
|---|---|---|---|---|
| Agent system registry | `AGENT-*` if adopted | Platform | Platform | proposed |
| Run registry | `RUN-*` | Platform | Platform | not_started |
| Artifact registry | `ART-*` if adopted | Platform | Platform | proposed |
| Dataset registry | `DATA-*` if adopted | Platform | Platform | proposed |

### Operations Registries

| Registry | Primary IDs | Semantic Owner | Operational Owner | Initial State |
|---|---|---|---|---|
| Decision registry | `DEC-*` | Operations | Registries | draft from markdown |
| Assumption registry | `ASM-*` | Operations | Registries | draft from markdown |
| Risk registry | `RISK-*` | Operations, Trust | Registries | draft from markdown |
| Roadmap registry | `TASK-*` | Operations | Registries | draft from markdown |

### v0.2 Domain Registries

| Registry | Primary IDs | Semantic Owner | Operational Owner | Initial State |
|---|---|---|---|---|
| Graph node registry | all IDs | Intelligence Graph | Registries | proposed |
| Graph edge registry | relationship records | Intelligence Graph | Registries | proposed |
| Trust control registry | `CTRL-TRUST-*` if adopted | Trust | Registries | proposed |
| Product capability registry | `CAP-PROD-*` if adopted | Product | Registries | proposed |
| Offer registry | `OFFER-PROD-*` if adopted | Product | Registries | proposed |
| Readiness gate registry | `GATE-PROD-*` if adopted | Product | Registries | proposed |

## Recommended File Layout

Future structured files should live under a root-level `registries/` directory once implementation begins:

```text
registries/
  documents/
  hypotheses/
  journeys/
  failures/
  experiments/
  runs/
  evidence/
  metrics/
  interventions/
  treatments/
  findings/
  decisions/
  assumptions/
  risks/
  graph/
  trust/
  product/
```

Do not create this structure until schemas are ready enough to avoid churn.

## First Registry Build Order

1. Hypotheses
2. Journeys
3. Failures
4. Intervention classes
5. Treatments
6. Experiments
7. Runs
8. Evidence
9. Metrics
10. Findings
11. Decisions, assumptions, and risks
12. Graph edges
13. Trust controls
14. Product readiness gates

## Acceptance Criteria

The registry layer is useful when:

- every registry has an owner
- every record has a stable ID
- every structured record links back to the canonical document that defines its meaning
- records can be validated before runs begin
- graph edges can be generated from registry links
- source-of-truth ownership is clear between markdown, registries, and generated reports
