# Experiment Runner Spec

ID: `DOC-PLAT-0003`
Version: v0.1

## Purpose

The experiment runner executes reproducible Wild, Lab, and Sandbox tests.

## Required Capabilities

- load experiment definitions
- resolve agent system configuration
- run language and journey variants
- capture prompts, responses, tool traces, timings, costs, and errors
- attach evaluator outputs
- write structured run records
- preserve raw artifacts
- compare baseline and treatment conditions

## Run Record Fields

- `run_id`
- `experiment_id`
- `experiment_version`
- `track`
- `agent_id`
- `language_tag`
- `journey_id`
- `condition`
- `started_at`
- `completed_at`
- `status`
- `artifact_uris`
- `metric_results`
- `failure_ids`
- `notes`

## Minimal v0 Runner

The first runner can be a local command-line workflow that reads structured files and writes JSONL results. It should prioritize repeatability over scale.

It should run locally by default on Apple Silicon with modest memory use. Hosted APIs can be called from local runs when the system under test is a closed model or cloud agent.

## Guardrails

Never silently retry in ways that alter the condition. Retries must be recorded as separate attempts or declared in the experiment design.
