# Benchmark Spec

ID: `DOC-WILD-0003`
Version: v0.2

## Purpose

The Wild benchmark translates native adoption journeys into repeatable tests while preserving realistic user context.

## Benchmark Unit

A benchmark item is a journey, not just a prompt.

Required fields:

- `journey_id`
- `domain`
- `user_goal`
- `language_tag`
- `locale`
- `community_context`
- `domain_context`
- `accessibility_context`
- `representation_limits`
- `entry_surface`
- `preconditions`
- `success_criteria`
- `failure_taxonomy_scope`
- `human_review_required`
- `risk_level`

## Initial Journey Candidates

- `JRN-WILD-0001`: discover and configure a productivity agent in Portuguese.
- `JRN-WILD-0002`: ask a travel agent to plan a local itinerary with constraints in Spanish.
- `JRN-WILD-0003`: use a financial assistant to explain a document in Polish.
- `JRN-WILD-0004`: ask a support agent to resolve a subscription issue in Greek.
- `JRN-WILD-0005`: use a coding agent with German instructions and English code artifacts.

## Baseline

Each journey needs a baseline run before Sandbox treatment. Store baseline prompts, product copy, screenshots or transcripts, tool traces, and evaluator notes.

## Benchmark Principle

Do not over-sanitize journeys. The benchmark should preserve realistic ambiguity, mixed-language artifacts, local formats, and product friction.

Benchmark releases should include a representation statement as defined in `LOCALE_COMMUNITY_STANDARD.md`.
