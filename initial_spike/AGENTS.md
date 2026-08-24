# Repository Operating Contract

Read this file before making changes in `bgb_labs`.

This contract tells coding and research agents how to interpret repository authority, find the current task, preserve research validity, and avoid premature product or platform work.

## Purpose

bomgoodbueno studies and improves native adoption of agentic AI systems across languages, locales, and native modes of expression.

The current goal is to prove a small, credible, reproducible method that can measure capability gaps, diagnose the earliest lifecycle failure, test a targeted intervention, and report evidence honestly.

## Authority And Precedence

Use this order when instructions conflict:

1. The user's direct instruction for the current task.
2. The latest accepted decision record for the disputed question.
3. The active canon indexed by `docs/00_INDEX.md`.
4. A locked or approved study definition for its specific execution scope.
5. The current research index and issue.
6. This file and `README.md` as derived guidance.
7. Active research inputs and exploratory notes.
8. Archived material.

If a direct request changes durable strategy, method, product gates, or public-testing policy, implement the requested task and record the repository-level semantic change in a decision and the affected canonical owner.

Archived files never override active canon. Repetition across duplicate archive exports is not independent evidence.

## Required Reading

For every task:

1. Read `docs/00_INDEX.md`.
2. Read the canonical owner for the task.
3. Read the current execution index and issue.
4. Check relevant accepted decisions.
5. Inspect existing files and worktree state before editing.

Use this routing guide:

| Task | Required context |
|---|---|
| Organization, mission, or strategy | `docs/01_ORG_STRATEGY.md`, `docs/08_ROADMAP.md` |
| Native-adoption concepts or terminology | `docs/02_NATIVE_ADOPTION.md`, `docs/GLOSSARY.md` |
| Cases, evaluation, evidence, or reports | `docs/03_RESEARCH_METHOD.md`, relevant study doc |
| Public or live-agent research | `docs/04_AILITW.md`, `docs/03_RESEARCH_METHOD.md`, `docs/10_GOVERNANCE.md` |
| MR-0 work | `docs/05_MR0.md`, `research/mr0/README.md`, active MR-0 issue |
| Product or engineering | `docs/06_PRODUCT_ENGINEERING.md`, relevant research requirement |
| Intervention or customer handoff | `docs/07_APPLIED_LAB.md`, `docs/03_RESEARCH_METHOD.md` |
| Roadmap or sequencing | `docs/08_ROADMAP.md`, current execution index |
| Commercial or market work | `docs/09_GO_TO_MARKET.md`, `docs/04_AILITW.md` when live systems are involved |
| Canon, archive, or migration changes | `docs/10_GOVERNANCE.md`, `MIGRATION.md`, `decisions/` |

Do not read the whole archive by default. Use it only when the task concerns migration, provenance, or recovery of a specific concept.

## Current Execution

The active program gate is MR-0 Controlled Method POC.

`research/mr0/README.md` is the single owner of current MR-0 task state. Read it rather than relying on a next-task statement copied into another file.

The roadmap owns phase order. Individual issue files own task acceptance criteria and completion notes.

## Non-Negotiable Boundaries

- Keep MR-0 small, deterministic, and controlled.
- Do not turn Hotel Aurora into a product, demo business, or persistent simulation.
- Do not build generic platform machinery before the method earns it.
- Do not add APIs, databases, dashboards, authentication, billing, broad adapters, customer integrations, or hosted services without an accepted decision.
- Do not automate against live public agents before the AILITW entry gates are satisfied.
- Do not publish certification, universal language, community-wide, model-superiority, or broad market claims from narrow evidence.
- Do not let archived Hospeda, Language Mesh, CompanyBench, graph, registry, or platform plans silently re-enter active scope.
- Prefer one clear research artifact over broad architecture.

## Research Integrity

Ground truth must be authored and reviewed before the run. A model cannot define the expected answer used to judge itself.

Keep these distinctions explicit:

- observation;
- inference;
- hypothesis;
- finding;
- recommendation.

Every substantive result must identify:

- what was tested and why;
- system, model, fixture, case, tool, harness, scorer, and relevant versions;
- language, locale, and case-source type;
- run conditions and budget;
- expected behavior and evaluation method;
- evidence level;
- human reviewer basis where applicable;
- invalid or excluded runs;
- limitations and representation boundaries.

Use deterministic assertions for deterministic properties. Use qualified human review for pragmatics, register, ambiguity, native quality, institutional meaning, or other properties automation cannot validly judge alone.

Preserve evaluator disagreement and confidence. Do not force consensus merely to produce a cleaner result.

Diagnose a failure at the earliest relevant lifecycle stage: Input, Understand, Decompose, Retrieve/Reason, Act, or Respond.

## MR-0 Rules

The fixture is Hotel Aurora, a fictional 24-room Porto hotel with deterministic knowledge and fake operational tools.

The language scope is English (`en`), Spanish for Spain (`es-ES`), and Portuguese for Portugal (`pt-PT`). Do not generalize findings to all Spanish- or Portuguese-speaking users.

The initial corpus is 12 semantic contracts across atomic, compound, conditional or negative-constraint, pragmatic, ambiguous, corrective, and multi-turn behavior.

Allowed implementation:

- static YAML or other inspectable fixture files;
- deterministic tool contracts;
- small task-owned schemas;
- local validation and analysis scripts;
- a minimal reproducible runner when required;
- review packets and report artifacts.

Do not create infrastructure for hypothetical future cases. Add only fields and code required by an active contract, evaluation, or reporting need.

## Engineering Rules

- Follow existing repository patterns before introducing a new abstraction.
- Keep source data and expected behavior explicit and versionable.
- Prefer structured parsers and validators over ad hoc text processing.
- Make deterministic behavior testable without external services.
- Keep raw observations separate from derived analysis.
- Record invalid or excluded runs rather than deleting inconvenient evidence.
- Build the smallest reproducible path through the active task.
- Add tests in proportion to research risk and shared behavioral impact.
- Do not create a generic framework from a single implementation.

When a repeated need suggests productization, document the repeated evidence and check the maturity gates in `docs/06_PRODUCT_ENGINEERING.md` before expanding architecture.

## Documentation Rules

Identify the document class before editing: canon, decision, living record, study definition, evidence, report, generated view, or archive.

- Major semantic canon changes require a decision record.
- Study definitions must be versioned or locked before execution.
- Raw evidence and completed run records are not silently rewritten.
- Released reports are superseded or amended, not invisibly changed.
- Generated artifacts should be changed through their source or generator.
- Mutable task state must remain in its designated execution index.
- Update canonical owners before updating derived summaries in README or this file.

When promoting archive content:

1. Name the source and concept.
2. Compare it with current canon.
3. Classify it as promote, adapt, defer, reject, or retain as hypothesis.
4. Record significant disposition in `MIGRATION.md`.
5. Create a decision for major semantic changes.
6. Move accepted guidance into an active canonical document.

Do not make new active documents depend on archived instructions.

## Commercial And Public Claims

Customer discovery is allowed during MR-0. Do not represent discovery interest as validation of a sellable service or software product.

Exact prices, target lists, market statistics, outreach quotas, and competitor claims in market-intelligence files require current verification before external use.

Public or customer-facing claims must be narrower than the evidence and must state tested scope, limitations, and representation boundaries. Paid work does not buy favorable findings.

## Worktree And Scope Discipline

- Preserve user changes and unrelated work already present in the worktree.
- Do not reset, delete, or rewrite unrelated files.
- Keep edits within the active issue unless a required consistency fix is clearly identified.
- Record necessary follow-up rather than expanding the task into a speculative subsystem.
- Use decision records for durable architecture or strategy choices, not for routine implementation details.

## Definition Of Done

A task is complete only when:

- its stated acceptance criteria are satisfied;
- changed structured artifacts parse and validate;
- relevant tests or review checks pass;
- references and terminology agree with canon;
- no mutable status pointer was duplicated;
- evidence, limitations, and invalid cases are preserved where relevant;
- the issue records completion notes and verification;
- the execution index points to the correct next task.

For the frozen MR-0 fixture and tool contracts, run:

```sh
ruby research/mr0/validate_contracts.rb
```

Report what changed, what was verified, and anything that could not be verified.
