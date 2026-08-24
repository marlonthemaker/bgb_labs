# Evaluation Standard

ID: `DOC-RES-0004`
Version: v0.1

## Evaluation Scope

Evaluation covers adoption, task success, language quality, cultural fit, safety, and trust calibration.

## Metric Families

- Adoption: discovery success, onboarding comprehension, continuation intent.
- Task: completion, correctness, tool success, recovery from error.
- Language: fluency, terminology, register, code-switch handling.
- Cultural: local relevance, assumptions, norms, examples, entities.
- Trust: uncertainty expression, overclaiming, user control, consent clarity.
- Safety: harmful content, privacy leakage, unsafe advice, policy mismatch.

## Score Structure

Use 1-5 ordinal scores for human ratings unless a metric requires a binary or continuous value. Always define anchors before evaluation.

Example:

- 1: unusable or misleading
- 3: partially usable with friction
- 5: native-feeling and task-appropriate

## Comparison Rule

Absolute scores are useful, but decisions should rely on matched comparisons across language, task, system, and treatment condition whenever possible.

## Output

Each evaluation should produce:

- metric table
- linked evidence IDs
- evaluator notes
- failure IDs
- recommended finding or follow-up experiment
