# bgb_labs

bgb_labs is the working repository for bomgoodbueno, an applied research lab for the native adoption of agentic AI systems.

The lab studies whether deployed AI systems remain useful, reliable, and appropriate when people interact through different languages, locales, institutions, workflows, and native modes of expression.

## Mission And Vision

The mission is to advance the democratization of digital intelligence through applied native adoption analysis.

The vision is that people should not receive weaker digital intelligence because their language, locale, institution, or workflow was not a system's default design environment. Capability claims should become observable, testable, comparable, and accountable across languages and local contexts.

The canonical organization strategy lives in [`docs/01_ORG_STRATEGY.md`](docs/01_ORG_STRATEGY.md).

## Core Thesis

An AI system can generate fluent text in a language while still losing the ability to understand the user's need, preserve constraints, retrieve the right policy, choose a workflow, call a tool correctly, escalate appropriately, or deliver an equivalent outcome.

Therefore:

- access is not adoption;
- support is not parity;
- native capability is not translated output;
- fluency does not prove workflow correctness;
- language and agentic capability claims require scoped evidence.

Native adoption asks whether practical capability survives across languages and local contexts, where it first breaks when it does not, and which targeted intervention can improve the result.

## What We Are Building

The first product is a credible and reproducible method, not a SaaS platform.

The method closes this loop:

```text
define expected behavior
  -> run a controlled or responsibly accessed system
  -> evaluate behavior, traces, and outcomes
  -> diagnose the earliest lifecycle failure
  -> apply the smallest targeted intervention
  -> retest under matched conditions
  -> report evidence, limitations, and decisions
```

The six diagnostic stages are Input, Understand, Decompose, Retrieve/Reason, Act, and Respond. The full conceptual model lives in [`docs/02_NATIVE_ADOPTION.md`](docs/02_NATIVE_ADOPTION.md), and the evidence rules live in [`docs/03_RESEARCH_METHOD.md`](docs/03_RESEARCH_METHOD.md).

## Program Areas

### Controlled Research

Method Research checkpoints prove the evaluation and intervention loop in small reproducible environments. MR-0 uses the fictional Hotel Aurora fixture and 12 semantic contracts across English, `es-ES`, and `pt-PT`.

### AILITW

AILITW applies a mature method to public, cooperative, or responsibly accessed live agents. It does not begin until the controlled method and responsible-access model are ready.

### Applied Lab

The Applied Lab turns diagnosed failures into targeted interventions, matched retests, implementation handoffs, and eventually customer work.

### Product Engineering

Product Engineering builds only the tools repeatedly required by research or applied delivery. Reports and inspectable files come before CLIs, SDKs, APIs, or hosted systems.

### Public Goods

Methods, rubrics, synthetic data, reports, or tools may be released when evidence, privacy, licensing, and responsible-publication requirements are satisfied.

## Current Stage

MR-0 is the active pre-MVP gate. It asks whether bomgoodbueno can:

- measure multilingual agent capability differences in a controlled environment;
- diagnose where language-related failures enter the agent lifecycle;
- compare findings against selected external reference approaches;
- test whether one targeted intervention changes the result;
- produce a reproducible, reviewable report.

Hotel Aurora is only a controlled research fixture. It is not a hotel product or commercial direction.

Current MR-0 task state lives in [`research/mr0/README.md`](research/mr0/README.md).

## Maturity Path

Program maturity and product-capability maturity are separate.

| Program phase | Question being answered |
|---|---|
| MR-0 controlled proof | Can the method measure, diagnose, and test an intervention reproducibly? |
| Native Adoption Protocol | Which parts of the method survive codification beyond Hotel Aurora? |
| MR-1 cooperative live proof | Does the method work on a responsibly accessed deployed agent? |
| AILITW research | Can the method produce responsible, useful findings across constrained live targets? |
| Native Adoption Analysis | Will organizations pay for the resulting decision value and handoff? |
| Repeatable service and earned tooling | Which repeated workflows deserve standardization or software? |
| Product or network decision | Does evidence support a platform, benchmark network, partner model, or continued service-led shape? |

An individual method, treatment, tool, or offer moves through:

```text
concept
  -> research-backed
  -> treatment-backed
  -> trust-reviewed
  -> pilot-ready
  -> package-ready
```

The requirements for each state are defined in [`docs/06_PRODUCT_ENGINEERING.md`](docs/06_PRODUCT_ENGINEERING.md). Completing a roadmap phase does not automatically promote every capability.

## Commercial Direction

The expected first service is a Native Adoption Analysis: a scoped evaluation of a customer's agent or workflow, lifecycle diagnosis, intervention recommendation or test, and research-grade implementation handoff.

The first customer hypothesis is AI-enabled customer support and CX, with SaaS AI product teams as a secondary wedge. Localization, global-content, trust, governance, evaluation, and CX specialists may become influencers or partners.

The intended sequence is:

```text
customer discovery
  -> cooperative narrow evidence
  -> Native Adoption Analysis
  -> repeated readiness or regression work
  -> software only where delivery patterns justify it
```

Customer segments, free-snapshot concepts, pricing, channels, and conversion assumptions remain hypotheses. See [`docs/09_GO_TO_MARKET.md`](docs/09_GO_TO_MARKET.md).

## Boundaries

Until evidence and decisions promote them, this repository should not produce:

- a hotel operations product;
- a generic evaluation or model-ranking platform;
- a broad benchmark or public leaderboard;
- APIs, databases, dashboards, authentication, or billing;
- generic customer integrations or broad adapter systems;
- public live-agent scraping or uncontrolled automation;
- certification or community-wide language claims;
- broad AI consulting detached from native adoption.

## Repository Map

- `docs/` - active Canon v0.2.
- `research/mr0/` - controlled Hotel Aurora method proof and execution index.
- `research/ailitw/` - live-agent research inputs and market intelligence.
- `labs/` - reserved applied research and experimental work, used only when earned.
- `platform/` - reserved tooling, schemas, and runners, used only when earned.
- `products/` - preserved product candidates and historical directions.
- `decisions/` - accepted method, strategy, and architecture decisions.
- `archive/` - previous canon, generated work, and conversation provenance.
- `references/` - papers and external research notes.
- `src/` and `tests/` - implementation and verification when the active research task requires them.

## Authority And Provenance

The active source of truth is Canon v0.2, indexed in [`docs/00_INDEX.md`](docs/00_INDEX.md).

Accepted decisions record major semantic changes. Active research files instantiate the canon. This README and `AGENTS.md` are derived surfaces and cannot override the canon.

Archived documents are valuable context but not current authority. [`MIGRATION.md`](MIGRATION.md) records which archived ideas were adapted, deferred, superseded, or retained as hypotheses. [`archive/README.md`](archive/README.md) explains the source layout and duplicate exports.

## Working In This Repository

Before changing files:

1. Read [`AGENTS.md`](AGENTS.md).
2. Read [`docs/00_INDEX.md`](docs/00_INDEX.md) and the canonical document for the task.
3. Read the current execution index and issue under the relevant research track.
4. Check accepted decisions and existing worktree changes.
5. Keep the change within the current maturity and scope gates.

For MR-0, start with [`research/mr0/README.md`](research/mr0/README.md). Validate the frozen contracts with:

```sh
ruby research/mr0/validate_contracts.rb
```
