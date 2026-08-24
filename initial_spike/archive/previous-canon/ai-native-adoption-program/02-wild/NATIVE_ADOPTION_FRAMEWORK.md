# Native Adoption Framework

ID: `DOC-WILD-0001`
Version: v0.1

## Purpose

Wild measures whether agentic systems work for multilingual users in realistic settings.

## Adoption Dimensions

- Discovery: can the user find and understand the agent's purpose?
- Comprehension: does the user understand instructions, choices, limits, and next steps?
- Intent fit: does the agent infer the user's task correctly in language and context?
- Execution: can the agent complete the task with tools, memory, or retrieval when needed?
- Repair: can the system recover from confusion, ambiguity, or errors?
- Trust calibration: does the user know when to rely on the system?
- Continuation: would the user keep using it?

## Native Adoption Score

`NAS = weighted score across discovery, comprehension, execution, repair, trust, and continuation`

Weights should be declared per journey. Do not use one universal score across all domains until validated.

## Initial Wild Hypotheses

Canonical definitions live in `01-research/HYPOTHESIS_REGISTER.md`.

- `HYP-WILD-0001`
- `HYP-WILD-0002`
- `HYP-WILD-0003`

## Output

Every Wild study should produce observations, failure mappings, benchmark candidates, and Lab or Sandbox follow-up questions.
