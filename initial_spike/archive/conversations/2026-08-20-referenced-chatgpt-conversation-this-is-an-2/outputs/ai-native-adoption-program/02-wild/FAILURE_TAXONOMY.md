# Failure Taxonomy

ID: `DOC-WILD-0002`
Version: v0.1

## Failure ID Format

Failure types use `FAIL-<TRACK>-####`. Failure instances link to the type and evidence item.

## Initial Failure Types

- `FAIL-WILD-0001`: Discovery mismatch. The user cannot determine what the agent is for.
- `FAIL-WILD-0002`: Capability miscalibration. The user believes the agent can or cannot do something incorrectly.
- `FAIL-WILD-0003`: Instruction opacity. The user cannot understand required actions, consent, or constraints.
- `FAIL-WILD-0004`: Locale mismatch. The agent uses entities, formats, norms, or assumptions from the wrong region.
- `FAIL-WILD-0005`: Register mismatch. The agent's tone or formality is inappropriate for the user or task.
- `FAIL-WILD-0006`: Tool handoff failure. A tool, integration, or permission step breaks the multilingual journey.
- `FAIL-WILD-0007`: Error recovery failure. The system cannot repair after misunderstanding or tool failure.
- `FAIL-WILD-0008`: Unsafe trust signal. The system overstates certainty or hides uncertainty.
- `FAIL-WILD-0009`: Translation artifact. Literal translation harms meaning, usability, or credibility.
- `FAIL-WILD-0010`: Evaluation blind spot. A benchmark marks success while native users experience failure.

## Severity

- S1: inconvenience
- S2: task friction
- S3: task failure
- S4: trust, safety, legal, financial, or health risk

## Rule

A failure can have multiple causes. Tag observable failure separately from suspected mechanism.
