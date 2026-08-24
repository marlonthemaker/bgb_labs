# Treatment Protocol

ID: `DOC-SBOX-0003`
Version: v0.1

## Treatment Record

Each treatment uses `TRT-SBOX-####`.

Required fields:

- `treatment_id`
- `intervention_class_ids`
- `target_failure_ids`
- `hypothesis_id`
- `baseline_run_ids`
- `implementation_version`
- `languages`
- `journeys`
- `evaluation_metrics`
- `human_review_plan`
- `rollback_condition`
- `known_risks`

## Example

`TRT-SBOX-0001`: Portuguese native adoption prompt router.

- Intervention classes: `INT-SBOX-0001`, `INT-SBOX-0002`, `INT-SBOX-0004`
- Target failures: `FAIL-WILD-0003`, `FAIL-WILD-0004`, `FAIL-WILD-0008`
- Hypothesis: `HYP-SBOX-0002`
- Treatment thesis: native prompting plus locale-aware uncertainty repair improves comprehension and trust for `pt-PT` journeys.

## Treatment States

- drafted
- implemented
- baseline-matched
- evaluated
- promoted
- rejected
- archived

## Promotion Rule

Promote only if the treatment beats baseline on target metrics and does not regress safety, accuracy, or user control beyond the declared threshold.
