---
title: Evaluation Framework
version: 0.1
status: canonical-draft
owner: bomgoodbueno research
last_updated: 2026-08-20
dependencies:
  - ../../INDEX.md
  - ../00-foundation/GLOSSARY.md
  - RESEARCH_CHARTER.md
  - NATIVE_ADOPTION_FRAMEWORK.md
  - CASE_TASK_DECOMPOSITION.md
---

# Evaluation Framework

## Purpose

This document defines how bomgoodbueno evaluates agentic systems for native
adoption, cross-language capability parity, workflow correctness, and evidence
quality.

The framework assumes that final-answer evaluation is insufficient. Agentic
systems must be judged by the path they take and the outcomes they produce.

## Evaluation Stack

```text
Capability
  -> Contract
  -> Case
  -> Semantic IR
  -> Expected decomposition
  -> Run
  -> Trace
  -> Observation
  -> Evaluation
  -> Failure classification
  -> Evidence
  -> Claim
```

## Capability

A capability is a behaviorally observable ability. Examples:

- understand a support request;
- identify multiple cases in one message;
- preserve a refund deadline;
- select a cancellation workflow;
- call the right tool;
- explain a local policy in pt-PT;
- escalate safely.

## Contract

A contract defines what correct behavior means for a capability.

Minimum contract fields:

- capability name;
- scope;
- inputs;
- expected Semantic IR;
- expected task or workflow;
- allowed actions;
- prohibited actions;
- required evidence;
- scoring method;
- failure classes.

## Case

A case is the test instance presented to the system. Cases may be parallel,
native, or market-specific under PNM testing.

Each case should record:

- case ID;
- language and locale;
- source type;
- user-facing prompt;
- expected Semantic IR;
- task-critical information;
- expected case/task decomposition;
- expected workflow;
- acceptable outcomes;
- invalid outcomes;
- evidence requirements.

## Semantic IR

Semantic IR is the structured representation of meaning used to compare inputs,
expected behavior, and observed behavior across languages.

Semantic IR should capture:

- language/locale;
- speech act;
- cases;
- entities;
- constraints;
- quantities;
- temporal information;
- dependencies;
- requested action;
- required clarification;
- policy hooks;
- market context.

## Run and Trace

A run is one execution of a case against a system.

A trace is the record of what happened during that run.

Trace evidence should include, where available:

- system and version;
- date/time;
- surface;
- prompt or user message;
- model/provider identifier;
- retrieved evidence;
- intermediate reasoning artifacts if available and safe;
- tool calls;
- tool arguments;
- tool results;
- final response;
- screenshots or transcript;
- evaluator notes.

## Core Metrics

### Semantic Accuracy

Did the system preserve the meaning of the user request?

### Case F1

Did the system identify the right cases without over-decomposition or
under-decomposition?

### Case Boundary Accuracy

Did the system correctly decide which needs belong together, split apart,
continue, modify, duplicate, or depend on each other?

### Dependency Edge F1

Did the system identify conditional, sequential, or prerequisite relationships
between cases or tasks?

### TCIP

Task-Critical Information Preservation measures whether information necessary
for correct task completion survives the system trajectory.

Task-critical information may include:

- dates;
- times;
- quantities;
- names;
- account identifiers;
- room numbers;
- language variants;
- negative constraints;
- conditional clauses;
- eligibility rules;
- policy deadlines;
- tool parameters.

### Workflow Correctness

Did the system follow the right workflow for the case?

This includes:

- route;
- tool;
- arguments;
- execution order;
- escalation;
- abstention;
- confirmation;
- refusal when appropriate.

### Native Quality

Did the language feel natural and appropriate to native users?

Native quality must not override operational correctness. A response can be
beautifully written and still wrong.

### Capability Parity

Did the target language or market receive equivalent capability relative to the
baseline?

Parity should be measured per capability, not only as one aggregate score.

## Failure Taxonomy

### F-LANG: Language Failure

The system fails at language understanding or production.

Examples:

- wrong locale;
- unnatural register;
- mistranslated entity;
- idiom misunderstood.

### F-SEM: Semantic Failure

The system fails to preserve meaning.

Examples:

- drops negation;
- confuses actor;
- loses condition;
- changes amount.

### F-CASE: Case Decomposition Failure

The system identifies the wrong number or structure of cases.

Examples:

- over-decomposition;
- under-decomposition;
- missed continuation;
- duplicate not correlated;
- conditional case treated as independent.

### F-TCIP: Task-Critical Information Loss

The system loses information needed for correct execution.

### F-WORKFLOW: Workflow Failure

The system selects or follows the wrong process.

Examples:

- wrong tool;
- wrong ordering;
- premature execution;
- unnecessary escalation;
- failure to escalate.

### F-POLICY: Policy Failure

The system violates, ignores, misstates, or misapplies policy.

### F-INST: Institutional Failure

The system misunderstands a local institution, regulation, convention, market
structure, or document.

### F-EXP: Experiential Failure

The system communicates in a way that is unnatural, inappropriate, disrespectful,
or locally implausible.

### F-EVAL: Evaluation Uncertainty

The evaluation method cannot confidently determine correctness.

## Evaluator Selection

Evaluation methods should be chosen by property:

| Property | Preferred evidence |
|---|---|
| Entity preservation | deterministic assertion plus review |
| Tool arguments | deterministic assertion |
| Workflow path | trace inspection |
| Policy correctness | source-grounded rubric or domain review |
| Native register | native human review |
| Semantic equivalence | bilingual/multilingual review |
| Ambiguity handling | native review plus adjudication |
| Broad pattern claim | controlled runs plus replication |

## Evidence Class Assignment

The evidence class of a finding depends on:

- protocol rigor;
- sample size;
- evaluator reliability;
- trace completeness;
- repeatability;
- independence;
- artifact availability;
- scope of claim.

An E3 controlled evaluation can contain individual E2 observations. The final
claim should inherit the weakest material link unless limitations are explicit.

## Claim Provenance

Every evaluation output should connect:

```text
claim
  -> finding
  -> evaluation
  -> observation
  -> run
  -> case
  -> protocol
  -> source/system claim
```

This chain protects against unsupported summaries and enables later correction.

## Unresolved Questions

- What is the first stable definition of "passing" for cross-language parity?
- Should parity thresholds vary by capability class?
- Which failure classes should be mutually exclusive, and which can co-occur?
- How should LLM judges be calibrated against native human reviewers?
- What score should be assigned when the system refuses responsibly?

