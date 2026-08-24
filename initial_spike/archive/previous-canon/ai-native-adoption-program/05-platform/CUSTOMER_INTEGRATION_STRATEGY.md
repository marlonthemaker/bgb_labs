# Customer Integration Strategy

ID: `DOC-PLAT-0006`
Version: v0.1

## Purpose

Define the handoff surfaces customers should use to adopt the program's tooling, evidence, and findings.

## Customer Archetypes

- Agent builders: teams building agentic products that need multilingual adoption diagnostics and treatment recommendations.
- Model and platform teams: teams improving model behavior, scaffolds, tools, routing, and policy behavior across languages.
- Enterprise adoption teams: organizations deploying agents to multilingual users and needing realistic adoption evidence.
- Research and evaluation teams: groups producing benchmarks, studies, and reports.
- Localization and trust teams: groups responsible for language quality, cultural fit, consent, policy, and trust calibration.

## Integration Surface Ladder

Expose surfaces in this order:

1. Reports and review packets.
2. File-based benchmark and evidence artifacts.
3. Local CLI.
4. Python SDK.
5. MCP server.
6. CI action.
7. REST API.
8. Hosted dashboard and managed runner.

## Surface 1: Reports And Review Packets

Best for executives, researchers, evaluators, and customer pilots.

Expose:

- finding summaries
- benchmark scorecards
- failure maps
- treatment comparisons
- evaluator packets
- decision memos

Do not expose raw sensitive evidence by default.

## Surface 2: Files And Schemas

Best for technical customers who want portable artifacts without platform lock-in.

Expose:

- JSON Schema definitions
- JSONL run records
- Parquet derived datasets
- Markdown benchmark cards
- versioned rubrics
- treatment manifests

Files should remain the first serious integration surface because they are inspectable, versionable, easy to diff, and compatible with local analysis.

## Surface 3: Local CLI

Best for developers, evaluation engineers, and applied researchers.

Expose commands for:

- validating registries
- running benchmarks
- preparing evaluator packets
- comparing baseline and treatment runs
- exporting reports
- replaying a run from stored artifacts

The CLI should be installable without a long setup path.

## Surface 4: Python SDK

Best for teams embedding evaluation into notebooks, internal scripts, or research pipelines.

Expose:

- schema objects
- loaders and validators
- runner APIs
- metric functions
- treatment interfaces
- export utilities

The SDK should stay close to the CLI implementation so behavior does not fork.

## Surface 5: MCP Server

Best for AI-native handoff into coding agents, research agents, and customer internal assistants.

Expose tools for:

- list journeys
- create experiment draft
- validate experiment
- run local baseline
- run treatment comparison
- summarize evidence
- generate evaluator packet
- create finding draft

Expose resources for:

- canonical docs
- schemas
- rubrics
- benchmark cards
- sanitized evidence summaries

Expose prompts for:

- failure analysis
- treatment design
- research review
- decision memo drafting

MCP tools that touch files, invoke models, or send data externally should require clear user approval.

## Surface 6: CI Action

Best for customers who want native adoption checks inside product delivery.

Expose:

- benchmark regression checks
- treatment regression checks
- schema validation
- report artifact upload
- pass/fail thresholds

CI should start as a wrapper around the CLI.

## Surface 7: REST API

Best when customers need system-to-system integration.

Expose:

- experiments
- runs
- evidence metadata
- metrics
- findings
- treatments
- exports

Use OpenAPI for the public contract and JSON Schema for shared payload validation.

## Surface 8: Hosted Dashboard And Managed Runner

Best for larger teams with collaboration, permissions, audit, and evaluator workflow needs.

Expose:

- benchmark library
- run history
- evidence browser
- evaluator queues
- findings review
- decision dashboard
- treatment comparison dashboard

Do not build this before repeated local workflows prove the product shape.

## Installation Strategy

Recommended sequence:

1. Repository template or source checkout for early collaborators.
2. `uv` project setup for developers and researchers.
3. `uvx` one-shot CLI for trial use.
4. `pipx` durable CLI install for regular users.
5. Docker image for reproducible customer environments.
6. MCP server package for AI-agent integrations.
7. GitHub Action for CI checks.
8. Hosted product for collaborative teams.

## What To Expose

Expose:

- benchmark definitions
- public rubrics
- schemas
- local runner
- local analyzer
- treatment manifests
- adapter interfaces
- sanitized example evidence
- reports and scorecards
- MCP tools for safe automation

Keep internal or gated:

- raw user evidence
- sensitive transcripts
- evaluator identities
- provider secrets
- paid model credentials
- customer-specific findings
- unreviewed high-risk claims
- proprietary customer prompts unless explicitly approved

## Product Rule

Every customer-facing surface should preserve the same underlying IDs, schemas, lifecycle stages, and evidence links. The interface can change; the evidence model should not.
