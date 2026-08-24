# Experiment Standard

ID: `DOC-RES-0003`
Version: v0.1

## Experiment Definition

An experiment is a planned comparison that tests a hypothesis under declared conditions.

## Required Fields

- `experiment_id`: `EXP-<TRACK>-####`
- `hypothesis_id`
- `track`
- `owner`
- `research_question`
- `systems_under_test`
- `languages`
- `tasks_or_journeys`
- `baseline_condition`
- `treatment_condition`
- `metrics`
- `human_review_plan`
- `stopping_rule`
- `risk_notes`

## Run IDs

Each execution receives a run ID:

`RUN-YYYYMMDD-####`

Runs should link to the exact experiment version, dataset version, prompt version, evaluator version, and system configuration.

## Experiment States

- proposed
- approved
- running
- paused
- complete
- invalidated
- archived

## Validity Checks

Before analysis, confirm:

- language tags match the intended population
- prompts and product surfaces were versioned
- baseline and treatment differ only in declared ways
- human evaluator criteria were available before review
- excluded runs have documented exclusion reasons
