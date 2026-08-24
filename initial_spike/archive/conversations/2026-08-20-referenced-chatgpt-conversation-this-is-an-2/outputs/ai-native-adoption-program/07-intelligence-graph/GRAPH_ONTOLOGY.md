# Graph Ontology

ID: `DOC-IG-0002`
Version: v0.2
Status: proposed

## Purpose

This document defines the first ontology for the AI Native Adoption Program intelligence graph. The graph connects research, evidence, interventions, decisions, and product artifacts so the program can answer:

- What do we know?
- What evidence supports it?
- What failures does it explain?
- What treatment changed it?
- What product decision did it enable?

## Design Rule

The graph is not a replacement for canonical documents or registries. Canonical documents define meaning. Registries store operational records. The graph connects those records into explainable paths.

## Core Node Types

### Program Entities

- `Program`: the AI Native Adoption Program.
- `Track`: Wild, Lab, Sandbox, Platform, Operations, Intelligence Graph, Registries, Trust, or Product.
- `LanguageContext`: language tag, locale, region, script, code-switch assumptions, and evaluator limits.
- `AgentSystem`: the model, agent, product surface, or toolchain under study.
- `Journey`: a realistic user goal and interaction context.

### Research Entities

- `Hypothesis`: a testable claim from `01-research/HYPOTHESIS_REGISTER.md`.
- `Experiment`: a planned comparison.
- `Run`: an execution of an experiment.
- `Metric`: a measurement definition.
- `EvidenceItem`: raw or derived support for analysis.
- `Observation`: a Wild or evaluator note linked to evidence.
- `Failure`: an observed or classified adoption breakdown.
- `Mechanism`: a proposed explanation for why a failure occurred.
- `Finding`: an evidence-backed claim with scope and limitations.

### Intervention Entities

- `InterventionClass`: a reusable adaptation class from `04-sandbox/INTERVENTION_TAXONOMY.md`.
- `Treatment`: a specific, versioned protocol from `04-sandbox/TREATMENT_PROTOCOL.md`.
- `TreatmentResult`: a baseline versus treatment comparison.
- `Regression`: a new or worsened issue caused by a treatment.

### Governance Entities

- `Assumption`: an unproven premise from `06-operations/ASSUMPTION_REGISTER.md`.
- `Risk`: a possible harm, validity issue, or execution concern.
- `Decision`: a durable program choice from `06-operations/DECISION_LOG.md`.
- `TrustControl`: an evidence, evaluation, privacy, or auditability requirement.

### Product Entities

- `ProductCapability`: a reusable capability derived from validated research or treatment work.
- `Offer`: a packaged product, service, benchmark, report, or tool.
- `ReadinessGate`: a criterion that must pass before packaging.
- `CustomerClaim`: a claim that may appear in customer-facing material.

## Core Edge Types

Use explicit relationship names when possible.

- `belongs_to`: entity belongs to a program, track, journey, or offer.
- `tests`: experiment tests a hypothesis.
- `executes`: run executes an experiment.
- `produces`: run, review, or analysis produces evidence.
- `supports`: evidence supports a finding, mechanism, decision, or claim.
- `contradicts`: evidence conflicts with a hypothesis, mechanism, finding, or claim.
- `observes`: observation records a user or system behavior.
- `classifies_as`: observation or run maps to a failure type.
- `explains`: mechanism explains a failure.
- `targets`: treatment targets a failure, metric, or journey.
- `uses`: treatment uses an intervention class.
- `compares_to`: treatment result compares treatment against baseline.
- `improves`: result improves a metric, failure rate, or adoption dimension.
- `regresses`: result worsens a metric, safety property, cost, latency, or user agency.
- `requires_control`: claim, offer, finding, or run requires a trust control.
- `updates`: finding updates an assumption, risk, decision, or roadmap task.
- `enables`: finding or treatment enables a product capability.
- `packages_as`: product capability packages into an offer.

## Required Graph Paths

### Observation To Finding

```text
Journey
  -> Run
  -> EvidenceItem
  -> Observation
  -> Failure
  -> Hypothesis
  -> Finding
```

### Failure To Treatment

```text
Failure
  -> Mechanism
  -> InterventionClass
  -> Treatment
  -> TreatmentResult
  -> Finding
```

### Finding To Product

```text
Finding
  -> ProductCapability
  -> ReadinessGate
  -> Offer
  -> CustomerClaim
```

### Claim To Evidence

```text
CustomerClaim
  -> Finding
  -> EvidenceItem
  -> Run
  -> Experiment
  -> Hypothesis
```

## Minimum Node Fields

Every graph node should include:

- `id`
- `type`
- `label`
- `status`
- `owner`
- `source_uri`
- `created_at`
- `updated_at`
- `linked_ids`

Optional but preferred:

- `version`
- `language_context`
- `sensitivity_level`
- `confidence`
- `limitations`

## Minimum Edge Fields

Every graph edge should include:

- `source_id`
- `relationship`
- `target_id`
- `created_at`
- `source_uri`

Optional but preferred:

- `confidence`
- `rationale`
- `evidence_id`
- `valid_from`
- `valid_until`

## Confidence Labels

- `observed`: directly recorded in evidence.
- `inferred`: derived from analysis or review.
- `proposed`: plausible but not tested.
- `validated`: supported by matched baseline and treatment evidence.
- `rejected`: contradicted or no longer supported.

## Boundary With Domain Model

`05-platform/DOMAIN_MODEL.md` defines broad program entities. This document defines graph-specific nodes, edges, and required traceability paths. If the two diverge, update both documents rather than allowing duplicate definitions to drift.

## First Implementation Target

The first graph slice should trace one benchmark journey through:

1. one baseline run
2. one evidence item
3. one failure classification
4. one hypothesis
5. one treatment
6. one treatment result
7. one finding
8. one decision or product implication
