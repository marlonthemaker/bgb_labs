# Governance

## Purpose

Governance keeps the repository clear about what is authoritative, what happened, what is still a hypothesis, and what may be claimed or built.

The process should be proportional to the risk and maturity of the work. Governance exists to prevent real errors, not to create documentation for its own sake.

## Authority Order

Within the repository, use this order when guidance conflicts:

1. The latest accepted decision record for the disputed question.
2. The active canon in `docs/`.
3. A locked or approved study definition for its specific execution scope.
4. Active research records, issues, and reviewed artifacts.
5. `AGENTS.md` and `README.md` as derived execution and orientation surfaces.
6. Research inputs and exploratory notes.
7. Archived material.

Accepted decisions should be incorporated into the affected canonical documents promptly. A study may instantiate canon but cannot silently redefine organization strategy, evidence rules, product gates, or public-testing boundaries.

Direct user instructions govern the current agent task unless they require a repository-level semantic change, in which case the durable change should also be recorded.

## Document Classes

### Canon

Durable identity, strategy, principles, method, scope, product gates, commercial sequencing, and governance. Major semantic changes require a decision record.

### Decision Records

Append-only records of durable choices, rationale, consequences, and supersession. Do not rewrite accepted decision history to make it appear cleaner.

### Living Operating Records

Roadmaps, task indexes, issue lists, risks, assumptions, and active research status. Keep them current without treating them as immutable history.

### Study Definitions

Fixtures, semantic contracts, protocols, rubrics, ground truth, and intervention plans. Editable before approval; locked or versioned once a run begins.

### Evidence And Run Records

Raw outputs, traces, annotations, exclusions, and metric results. Preserve what happened. Correct through amendments or new records rather than silent overwrite.

### Findings And Reports

Human-authored interpretation and communication. Editable as drafts; versioned or superseded after release.

### Generated Views

Derived indexes, tables, exports, and reports produced from source artifacts. Change the source or generator rather than hand-editing reproducible output.

### Archive

Historical context and provenance. Archived files are never direct execution dependencies.

## Status Vocabulary

Use these statuses when an artifact needs lifecycle state:

- `draft` - incomplete and freely editable;
- `proposed` - complete enough for review but not accepted;
- `accepted` - approved as durable guidance;
- `active` - currently used operationally;
- `locked` - frozen for a run, review, release, or external use;
- `complete` - the defined work and acceptance criteria are satisfied;
- `superseded` - replaced by a newer artifact;
- `retired` - intentionally no longer used;
- `archived` - preserved outside active work.

Do not use `complete` when required verification, review, or reporting remains.

## Change Types

### Editorial

Typos, formatting, broken links, or wording with no semantic effect. No decision record is required.

### Minor Semantic

Clarification, a bounded field addition, or a stricter checklist that does not change strategy or claims. Update all affected references and note study impact where applicable.

### Major Semantic

Changes to mission, definitions, evidence levels, language scope, readiness gates, product sequence, public-testing boundaries, authority, or claim policy.

Major semantic changes require:

- an accepted decision record;
- updates to affected canonical owners;
- an impact note for active studies or artifacts;
- supersession or migration guidance where terms or contracts changed.

## Current Task Ownership

Mutable task state must have one owner.

During MR-0:

- `research/mr0/README.md` owns the current task and completed-task list;
- individual issue files own their acceptance criteria and completion notes;
- `docs/08_ROADMAP.md` owns phase sequence, not per-task status;
- `docs/00_INDEX.md`, `README.md`, and `AGENTS.md` link to the execution index rather than duplicate the next task.

## Research Traceability

Use the smallest traceability chain that supports the claim and stage:

```text
claim or decision
  -> finding or report
  -> evaluation and evidence
  -> run and trace
  -> case or semantic contract
  -> fixture, system, and method version
```

At MR-0 scale, stable file identifiers and explicit references are sufficient. Do not build a generic graph or registry system solely to represent this chain.

## Claim Review

Before a public, customer-facing, or roadmap-shaping claim, verify:

- evidence level and direct support;
- system, language, locale, workflow, and time scope;
- evaluator fit, confidence, and disagreement;
- contradicting or excluded evidence;
- representation and accessibility limits;
- privacy, permission, and license status;
- wording that does not exceed the evidence;
- owner and reversal condition for the resulting decision.

Higher-risk claims require stronger review. Certification-like or community-wide claims are outside the current maturity level.

## Archive Promotion

When archived material appears useful:

1. Locate the exact source and its status at the time it was produced.
2. Compare it with active canon and decisions.
3. Check whether its terminology, sequence, assumptions, or architecture have been superseded.
4. Classify it as promote, adapt, defer, reject, or retain as hypothesis.
5. Record significant disposition in `../MIGRATION.md`.
6. Use a decision record for major semantic promotion.
7. Update the active canonical owner instead of linking execution to the archive.

Duplicated archive exports are provenance copies, not independent corroboration.

## Review Cadence

Review documents when the work creates a reason:

- before locking a study definition;
- after a completed baseline or intervention loop;
- before changing a roadmap phase;
- before an external claim or customer handoff;
- when an assumption is falsified;
- when repeated work suggests productization;
- when a new decision conflicts with current wording.

Routine formatting and status maintenance should not require a broad governance ceremony.
