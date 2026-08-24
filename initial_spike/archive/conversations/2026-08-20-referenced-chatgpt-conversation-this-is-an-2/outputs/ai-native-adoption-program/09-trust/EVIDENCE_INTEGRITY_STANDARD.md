# Evidence Integrity Standard

ID: `DOC-TRUST-0002`
Version: v0.2
Status: proposed

## Purpose

This standard defines the minimum integrity requirements for evidence used in research findings, decisions, benchmark releases, and product claims.

## Integrity Principle

Evidence should remain traceable, reviewable, and honest about its limits. A clean narrative is less important than a reliable chain from raw artifact to claim.

## Evidence Classes

Use the source types from `01-research/EVIDENCE_STANDARD.md`:

- Wild session observation
- benchmark run
- human evaluation
- automated metric
- model trace
- representation probe
- intervention result
- external citation

## Integrity Requirements

Every evidence item must include:

- stable `EVT-*` ID
- source type
- language tag and locale where relevant
- agent system and version
- journey or experiment ID
- collection timestamp
- raw artifact URI when legally and ethically possible
- derived artifact URI when analysis is produced
- consent or license status
- sensitivity level
- linked IDs
- exclusion status if excluded

## Chain Of Custody

Raw evidence must be preserved separately from derived annotations, summaries, embeddings, or metric tables.

Derived artifacts must record:

- input evidence IDs
- transformation method
- tool or script version when applicable
- reviewer or automation source
- timestamp
- limitations

## Exclusion Rules

Evidence may be excluded for validity, consent, duplication, corruption, safety, or scope reasons.

Excluded evidence should retain:

- evidence ID
- exclusion reason
- exclusion date
- reviewer or process
- whether it can be used for any limited purpose

Do not delete excluded evidence records unless retention or privacy rules require removal.

## Claim Readiness Levels

### Internal Exploration

Allowed evidence:

- exploratory observations
- incomplete runs
- rough reviewer notes

Required label:

- exploratory

### Internal Decision

Required evidence:

- linked evidence IDs
- declared method
- stated limitations
- at least one reviewer or owner

Required label:

- decision-grade candidate

### Benchmark Release

Required evidence:

- versioned journey or experiment
- reproducible run records
- baseline definition
- evaluator rubric when human review is used
- exclusion log
- limitation note

Required label:

- benchmark-grade

### Customer-Facing Claim

Required evidence:

- linked finding
- supporting and contradicting evidence review
- trust review
- approved wording
- clear scope
- limitation statement

Required label:

- claim-ready

## Integrity Checks

Before a finding is promoted, confirm:

- raw artifacts exist or a missing-artifact rationale is recorded
- derived analysis links to raw evidence
- language context is explicit
- system versions are recorded
- evaluator qualifications and limits are available when human review is used
- baseline and treatment conditions are comparable
- sensitivity level and consent/license status are present
- limitations are visible in the finding

## Privacy And Sensitivity

Treat multilingual free-form text as potentially identifying. Locale, dialect, spelling, named entities, and mixed-language content can reveal identity even when names are removed.

Evidence with `S2` or `S3` sensitivity must not be used in public examples without explicit approval and redaction review.

## Audit Trail

Durable claims should be auditable through:

```text
claim
  -> finding
  -> evidence IDs
  -> raw artifacts
  -> run or review context
  -> method
  -> limitations
```

## Failure Conditions

Evidence integrity fails when:

- raw and derived artifacts are mixed without labels
- evidence cannot be linked to the run or review that produced it
- excluded evidence silently influences a finding
- evaluator-generated content is treated as native user data
- customer-facing claims exceed the evidence scope
- privacy or license status is unknown
