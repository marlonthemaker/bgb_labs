# Document Lifecycle

ID: `DOC-OPS-0007`
Version: v0.2
Status: proposed

## Purpose

This guide defines how program documents are reviewed, approved, edited, frozen, superseded, and used. It exists to keep the AI Native Adoption Program sustainable as the repository grows from architecture into studies, reports, registries, and product artifacts.

## Core Principle

Not every document should behave the same way.

Some documents are constitutional and should change rarely. Some are living operating records. Some are append-only evidence or study records. Some are human-authored reports. Some are generated views. Confusing these classes will make the repo harder to trust.

## Document Classes

### Class A: Constitutional Documents

Purpose: define durable program identity and non-negotiable principles.

Examples:

- `00-foundation/PROGRAM_CHARTER.md`
- `00-foundation/RESEARCH_THESIS.md`
- `00-foundation/PRINCIPLES.md`
- `00-foundation/ID_SYSTEM.md`
- `00-foundation/FIRST_PRINCIPLES_REVIEW.md`

Editability:

- editable while `proposed`
- controlled after acceptance
- no major semantic change without a decision log entry

Review cadence:

- approve before build begins
- revisit monthly during v0.2
- revisit quarterly after the first closed loop

Approval owner:

- Program lead

### Class B: Standards And Methods

Purpose: define how research, evidence, evaluation, trust, registry, and product work must be done.

Examples:

- `01-research/*STANDARD.md`
- `02-wild/LOCALE_COMMUNITY_STANDARD.md`
- `08-registries/SCHEMA_CONVENTIONS.md`
- `09-trust/EVIDENCE_INTEGRITY_STANDARD.md`
- `09-trust/EVALUATOR_RELIABILITY_STANDARD.md`
- `10-product/READINESS_CRITERIA.md`

Editability:

- living until tested by the first closed loop
- controlled once used by active studies
- changes during a study require impact notes

Review cadence:

- review before first use
- revisit after each completed study
- monthly synthesis check

Approval owners:

- relevant domain lead
- Trust lead for evidence, evaluator, privacy, or claim standards

### Class C: Architecture And Design Documents

Purpose: define how the system, graph, registries, platform, and product architecture fit together.

Examples:

- `00-foundation/ARCHITECTURE_MIGRATION_V0.2.md`
- `05-platform/SYSTEM_ARCHITECTURE.md`
- `05-platform/DATA_ARCHITECTURE.md`
- `07-intelligence-graph/GRAPH_ONTOLOGY.md`
- `07-intelligence-graph/TRACEABILITY_MODEL.md`
- `10-product/PRODUCT_ARCHITECTURE.md`

Editability:

- editable while architecture is being validated
- controlled after implementation depends on them
- major changes require migration notes

Review cadence:

- review before schema or platform build
- revisit after first traceability slice
- monthly while platform work is active

Approval owners:

- Program lead
- Platform lead
- relevant domain lead

### Class D: Living Operating Records

Purpose: keep current program operations honest and navigable.

Examples:

- `06-operations/ROADMAP.md`
- `06-operations/RISK_REGISTER.md`
- `06-operations/ASSUMPTION_REGISTER.md`
- `06-operations/DECISION_LOG.md`
- `06-operations/OPERATING_MODEL.md`

Editability:

- living
- append or update according to cadence
- never rewrite history to make past decisions look cleaner

Review cadence:

- risks and blockers: weekly
- roadmap: weekly or after major decisions
- assumptions: biweekly
- decision log: whenever a durable decision is made
- operating model: monthly or after role/process changes

Approval owner:

- Program lead

### Class E: Study Definitions

Purpose: define planned work before it is run.

Examples:

- future `EXP-*` experiment records
- journey definitions
- metric definitions
- treatment protocols before execution
- human review plans

Editability:

- editable until approved
- locked once a run begins
- changes after approval require a new version or amendment

Review cadence:

- before baseline run
- before treatment run
- after invalidation or scope change

Approval owners:

- track lead
- Evaluation lead where human review is used
- Trust lead for sensitive or external-facing work

### Class F: Study Outputs And Evidence Records

Purpose: preserve what happened.

Examples:

- future `RUN-*` records
- `EVT-*` evidence records
- raw artifacts
- review annotations
- exclusion logs
- metric outputs

Editability:

- append-only after creation
- corrections are new records or explicit amendments
- raw evidence is never overwritten by derived evidence

Review cadence:

- daily while a study is running
- weekly during synthesis
- after exclusions or integrity issues

Approval owners:

- Platform lead for storage integrity
- Research or track lead for interpretation
- Trust lead for sensitivity or claim readiness

### Class G: Human-Authored Findings And Reports

Purpose: communicate analysis, interpretation, and decisions.

Examples:

- `FIND-*` finding memos
- synthesis reports
- benchmark reports
- customer-facing reports
- public research narratives

Editability:

- editable as drafts
- controlled after release
- supersede rather than silently rewrite released reports

Review cadence:

- draft review before decision use
- trust review before external use
- monthly synthesis for internal reports

Approval owners:

- Program lead
- Trust lead for external claims
- Product lead for customer-facing material

### Class H: Generated Views And Derived Artifacts

Purpose: present or compute from source records.

Examples:

- dashboards
- generated tables
- derived metric files
- generated registry indexes
- exported review packets

Editability:

- do not hand-edit if they can be regenerated
- update the source record or generator instead
- label generation date and source inputs

Review cadence:

- regenerate when source records change
- validate before reports or decisions

Approval owner:

- Platform lead

## Document Statuses

Use these statuses consistently:

- `draft`: incomplete, safe to edit freely
- `proposed`: complete enough for review, not yet accepted
- `in_review`: actively under review
- `accepted`: approved as current guidance
- `active`: currently used operationally
- `locked`: frozen for a study, benchmark, release, or external use
- `superseded`: replaced by a newer artifact
- `retired`: no longer used, retained for history
- `archived`: preserved but outside active work

## Change Types

### Editorial Change

Examples:

- typo
- formatting
- broken link
- wording that does not change meaning

Approval:

- no decision log required

### Minor Semantic Change

Examples:

- clarify a definition
- add a required field
- tighten a review checklist

Approval:

- owning lead approval
- mention in weekly review if it affects active work

### Major Semantic Change

Examples:

- change the ID system
- change evidence requirements
- alter readiness gates
- change product claim policy
- move ownership between domains

Approval:

- decision log entry
- version bump
- impact note for affected docs, schemas, and studies

## What Should Not Be Edited Casually

Do not casually edit:

- accepted constitutional documents
- the ID system
- completed run records
- raw evidence records
- released benchmark reports
- released customer-facing reports
- decision history
- archived study outputs

Use amendments, superseding documents, or new versions instead.

## What Should Stay Living

Keep these documents actively maintained:

- roadmap
- risks
- assumptions
- decisions
- active registry index
- active schemas
- active treatment protocols before execution
- active study plans before locking
- product readiness and value assumptions during pilot discovery

## Daily, Weekly, Monthly Rhythm

### Daily During Active Studies

Update:

- run records
- evidence records
- observation notes
- exclusions
- blocker notes
- data integrity issues

Do not update:

- thesis
- principles
- ID system
- released reports

### Weekly

Review:

- roadmap tasks
- active risks
- study status
- evidence gaps
- evaluator issues
- treatment regressions
- platform blockers

Outputs:

- roadmap updates
- risk updates
- new decisions if needed
- next-week priority list

### Biweekly

Review:

- assumptions
- scope
- language/community selection
- trust issues
- product value signals
- resource and cloud escalation needs

Outputs:

- updated assumptions
- scope decisions
- blocked or approved claims

### Monthly

Review:

- thesis drift
- standards changes
- document status inventory
- stale proposed docs
- open decisions
- value-generation evidence
- public or customer-facing readiness

Outputs:

- synthesis memo or decision review
- accepted/superseded document updates
- archive list
- next milestone changes

## Current v0.2 Review Sequence

Before building more, review and decide in this order:

1. Foundation: charter, thesis, principles, ID system, first-principles review.
2. Architecture: v0.2 migration, graph ontology, traceability model.
3. Research method: research, evidence, experiment, evaluation, human evaluation standards.
4. Wild validity: native adoption framework, failure taxonomy, benchmark spec, locale/community standard.
5. Trust: evidence integrity and evaluator reliability standards.
6. Registries: registry index and schema conventions.
7. Product: product architecture, offer model, readiness criteria, value generation.
8. Operations: operating model, roadmap, risks, assumptions, decision log, document lifecycle.

## What To Evaluate

For each document ask:

- Is this document necessary?
- Is the owner clear?
- Is the status clear?
- Does it conflict with another document?
- Does it create decision value?
- Does it prevent a real failure mode?
- Is it too abstract to guide action?
- Is it too detailed for this stage?
- Does it define what is out of scope?
- Does it need to be accepted now or can it remain proposed?

## Approve, Update, Deny

### Approve

Approve when:

- purpose is clear
- owner is clear
- scope is right for v0.2
- no major conflict exists
- it is good enough to guide the first closed loop

### Update

Update when:

- the direction is right but wording, ownership, fields, or gates are unclear
- it overlaps another document
- it needs a stronger acceptance criterion
- it needs a narrower scope

### Deny Or Defer

Deny or defer when:

- it is not needed for the first closed loop
- it creates process without decision value
- it overclaims maturity
- it conflicts with the quality bar
- no owner can be assigned
- it should be generated from registries rather than manually maintained

## Minimum Approval Set Before Build

Before creating schemas or running the first study, approve or explicitly amend:

- `00-foundation/PROGRAM_CHARTER.md`
- `00-foundation/RESEARCH_THESIS.md`
- `00-foundation/PRINCIPLES.md`
- `00-foundation/ID_SYSTEM.md`
- `01-research/EVIDENCE_STANDARD.md`
- `01-research/EXPERIMENT_STANDARD.md`
- `01-research/EVALUATION_STANDARD.md`
- `02-wild/BENCHMARK_SPEC.md`
- `02-wild/LOCALE_COMMUNITY_STANDARD.md`
- `07-intelligence-graph/TRACEABILITY_MODEL.md`
- `08-registries/SCHEMA_CONVENTIONS.md`
- `09-trust/EVIDENCE_INTEGRITY_STANDARD.md`
- `09-trust/EVALUATOR_RELIABILITY_STANDARD.md`
- `06-operations/DOCUMENT_LIFECYCLE.md`

The rest can remain `proposed` while the first closed loop tests them.

## Review Output Template

Use this format after each review batch:

```text
Review batch:
Date:
Reviewer:
Documents reviewed:
Approved:
Approved with amendments:
Deferred:
Denied:
Required edits:
Open questions:
Decision IDs created:
Next review batch:
```
