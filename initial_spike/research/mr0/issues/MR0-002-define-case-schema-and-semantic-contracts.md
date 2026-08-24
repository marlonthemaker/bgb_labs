# MR0-002 - Define Case Schema And 12 Semantic Contracts

Status: ready

## Objective

Freeze a small language-independent case schema and complete the 12 MR-0 semantic contracts against the existing Hotel Aurora fixture and deterministic tools.

This task defines expected meaning and behavior before English, `es-ES`, and `pt-PT` language variants are authored.

## Inputs

- `research/mr0/hotel-aurora/world-contract.yaml`
- `research/mr0/hotel-aurora/tool-contracts.yaml`
- `research/mr0/cases/semantic-contracts-v0.1.yaml`
- `docs/02_NATIVE_ADOPTION.md`
- `docs/03_RESEARCH_METHOD.md`
- `docs/05_MR0.md`

## Required Case Schema

Define only the fields required to express and evaluate the initial corpus. Each semantic contract should identify, as applicable:

- stable contract ID and title;
- case class;
- user goal and speech act;
- context and preconditions;
- entities, quantities, temporal details, negation, conditions, and references;
- expected case and task structure;
- task-critical information;
- required fixture facts and tools;
- expected behavior and workflow;
- required clarification, escalation, abstention, or confirmation;
- acceptable outcomes;
- prohibited or invalid outcomes;
- deterministic checks;
- human-review requirements;
- lifecycle stages and native-adoption dimensions under test;
- representation or scope limits.

Fields may be omitted when they do not apply. Do not create a universal benchmark schema from these 12 cases.

## Corpus Shape

Complete exactly 12 contracts:

- 3 atomic knowledge or request cases;
- 3 compound cases;
- 3 conditional or negative-constraint cases;
- 3 pragmatic, ambiguous, corrective, or multi-turn cases.

The contracts should collectively exercise knowledge retrieval, reservation context, housekeeping, maintenance, late checkout, escalation, conditions, corrections, ambiguity, and task-critical information preservation using the frozen fixture.

## Constraints

Do not:

- author the final language variants in this task;
- infer expected behavior from model output;
- change fixture facts or tool behavior unless a documented contradiction makes a correction unavoidable;
- add new hotel systems, tools, state, or workflows for hypothetical coverage;
- build a runner, API, database, dashboard, or generic evaluation framework;
- introduce a universal score or benchmark claim.

If the draft contracts reveal a fixture contradiction, document it and make the smallest versioned correction with validation.

## Acceptance Criteria

- [ ] One explicit schema describes the 12 language-independent contracts.
- [ ] Exactly 12 contracts satisfy the required 3/3/3/3 corpus shape.
- [ ] Each contract states expected meaning, behavior, and outcome boundaries before language authoring.
- [ ] Task-critical information and conditional dependencies are explicit where relevant.
- [ ] Every fixture fact, reservation, and tool reference resolves.
- [ ] Deterministic checks and human-review needs are distinguished.
- [ ] Lifecycle stages and native-adoption dimensions under test are declared.
- [ ] No contract requires facts, tools, or persistent state outside the frozen fixture.
- [ ] Validation checks confirm the YAML parses and required schema fields are present.
- [ ] The issue records completion notes and the execution index advances to MR0-003.

## Verification

Extend the existing local validator rather than introducing a new validation framework:

```sh
ruby research/mr0/validate_contracts.rb
```
