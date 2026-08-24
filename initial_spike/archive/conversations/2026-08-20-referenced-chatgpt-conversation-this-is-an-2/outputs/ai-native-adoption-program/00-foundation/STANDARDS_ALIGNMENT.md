# Standards Alignment

ID: `DOC-FOUND-0008`
Version: v0.2
Status: proposed

## Purpose

This document maps the AI Native Adoption Program to external standards and best-practice references. It is not a compliance claim. It is a design crosswalk that helps the program stay aligned with mature industry practice.

## Reference Standards And Frameworks

### NIST AI Risk Management Framework

Reference: https://www.nist.gov/itl/ai-risk-management-framework

Relevance:

- trustworthy AI characteristics
- risk mapping, measurement, management, and governance
- operational documentation practices
- lifecycle risk management

Program alignment:

- `09-trust/` owns evidence integrity and evaluator reliability.
- `06-operations/RISK_REGISTER.md` owns active program risks.
- `07-intelligence-graph/TRACEABILITY_MODEL.md` supports auditability from claim to evidence.

Needed improvement:

- create explicit risk review checkpoints in the delivery lifecycle
- classify risks by affected group, severity, reversibility, and detectability

### NIST Generative AI Profile

Reference: https://www.nist.gov/itl/ai-risk-management-framework

Relevance:

- generative AI-specific risk management
- content provenance, hallucination, misuse, privacy, and evaluation concerns
- model and system limitations

Program alignment:

- `01-research/EVIDENCE_STANDARD.md` requires evidence links and sensitivity levels.
- `04-sandbox/TREATMENT_PROTOCOL.md` requires rollback conditions and known risks.
- `09-trust/EVIDENCE_INTEGRITY_STANDARD.md` defines claim readiness.

Needed improvement:

- add model/system card fields to the agent system registry
- document hallucination, overtrust, and culturally inappropriate certainty as first-class risks

### ISO/IEC 42001 AI Management System

Reference: https://www.iso.org/standard/42001

Relevance:

- AI management-system governance
- policies, objectives, roles, risk treatment, monitoring, and continual improvement
- traceability, transparency, reliability, and responsible use

Program alignment:

- `06-operations/OPERATING_MODEL.md` defines cadence and roles.
- `06-operations/DECISION_LOG.md` and `ASSUMPTION_REGISTER.md` support governance records.
- `06-operations/PRODUCT_DELIVERY_LIFECYCLE.md` defines a repeatable lifecycle.

Needed improvement:

- define explicit management review inputs and outputs
- assign Trust and Product approval authority
- track corrective actions after failed reviews

### BCP 47 Language Tags

Reference: https://datatracker.ietf.org/doc/html/rfc5646

Relevance:

- standard language identification
- interoperable language tags for evidence, journeys, runs, and evaluations

Program alignment:

- `00-foundation/GLOSSARY.md` recommends BCP-47 language tags.
- `08-registries/SCHEMA_CONVENTIONS.md` requires language tag validation.

Needed improvement:

- distinguish language tag, locale, region, script, community context, and task domain
- define how mixed-language and code-switching cases are represented

### Unicode CLDR

Reference: https://cldr.unicode.org/

Relevance:

- locale data for dates, numbers, currencies, units, collation, pluralization, and other locale conventions
- industry-standard data used by operating systems, browsers, and major software platforms

Program alignment:

- Wild failure taxonomy includes locale mismatch.
- Benchmark spec preserves local formats and product friction.

Needed improvement:

- require CLDR-aware checks for locale-sensitive tasks
- separate locale data errors from cultural judgment errors

### WCAG 2.2

Reference: https://www.w3.org/TR/WCAG22/

Relevance:

- accessibility principles for perceivable, operable, understandable, and robust experiences
- testable accessibility criteria for web and product surfaces

Program alignment:

- Native adoption includes comprehension, agency, trust, and continuation.
- Product readiness requires user-facing claim and delivery controls.

Needed improvement:

- treat accessibility as a first-class adoption dimension
- include assistive technology and low-literacy considerations where relevant
- avoid assuming language access alone equals accessibility

## Crosswalk Summary

| External Practice | Repo Mechanism | Gap |
|---|---|---|
| Risk governance | Risk register, trust docs, lifecycle | needs risk review gates |
| Traceability | ID system, graph, evidence standard | needs first implemented graph slice |
| Lifecycle management | product delivery lifecycle | needs management review inputs/outputs |
| Locale correctness | language tags, benchmark spec | needs locale/community validity standard |
| Accessibility | adoption dimensions | needs explicit accessibility checks |
| Responsible product claims | readiness criteria, evidence integrity | needs claim approval authority |

## Alignment Rule

The program should use standards as guardrails, not theater. A reference belongs in the repo only when it changes a decision, field, review gate, risk control, or product claim.
