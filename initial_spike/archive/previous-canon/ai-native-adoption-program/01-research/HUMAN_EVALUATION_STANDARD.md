# Human Evaluation Standard

ID: `DOC-RES-0005`
Version: v0.1

## Purpose

Human evaluation is required when automated metrics cannot judge native comprehension, pragmatic fit, cultural assumptions, trust, or user agency.

## Evaluator Profile

Record:

- language competence
- regional familiarity
- domain expertise
- evaluation training status
- conflict of interest

Evaluator identity can be pseudonymous, but qualifications and limits must be represented.

## Review Modes

- Native speaker review: language and pragmatic quality.
- Domain review: correctness and risk in specialized tasks.
- Journey review: end-to-end adoption and task experience.
- Comparative review: baseline versus treatment.

## Annotation Requirements

Each human annotation should include:

- `annotation_id`
- `evidence_id`
- `rubric_version`
- `rating`
- `failure_ids`
- `rationale`
- `confidence`

## Disagreement

When reviewers disagree, preserve disagreement rather than forcing consensus. A consensus note can be added only after the original ratings are stored.

## Guardrail

Do not use human evaluation to launder weak study design. If the prompt, journey, or baseline is invalid, mark the run invalid.
