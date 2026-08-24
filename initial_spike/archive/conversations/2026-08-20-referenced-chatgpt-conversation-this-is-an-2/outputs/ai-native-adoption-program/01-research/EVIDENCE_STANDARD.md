# Evidence Standard

ID: `DOC-RES-0002`
Version: v0.1

## Evidence Item

Every evidence item receives an `EVT-*` ID and should be machine-readable.

Minimum fields:

- `evidence_id`
- `track`
- `source_type`
- `language_tag`
- `agent_id`
- `journey_id` or `experiment_id`
- `timestamp`
- `raw_artifact_uri`
- `derived_artifact_uri`
- `consent_or_license`
- `sensitivity_level`
- `linked_ids`
- `notes`

## Source Types

- Wild session observation
- benchmark run
- human evaluation
- automated metric
- model trace
- representation probe
- intervention result
- external citation

## Chain Of Custody

Evidence should preserve raw artifacts when legally and ethically possible. Derived annotations must never overwrite raw evidence. If evidence is excluded, retain an exclusion record with rationale.

## Sensitivity Levels

- S0: public or synthetic
- S1: internal non-sensitive
- S2: user-generated or evaluator-generated text
- S3: personal, regulated, or high-risk content

## Linking Rule

No `FIND-*` should exist without linked `EVT-*` records. No `TRT-*` should be considered validated without linked baseline and treatment evidence.
