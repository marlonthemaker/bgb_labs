---
title: Case and Task Decomposition
version: 0.1
status: canonical-draft
owner: bomgoodbueno research
last_updated: 2026-08-20
dependencies:
  - ../../INDEX.md
  - ../00-foundation/GLOSSARY.md
  - NATIVE_ADOPTION_FRAMEWORK.md
  - EVALUATION_FRAMEWORK.md
---

# Case and Task Decomposition

## Purpose

Case/task decomposition is a first-class research, product, and evaluation
capability for bomgoodbueno.

The central insight is that real user work rarely arrives as a clean single
intent. A person may include several needs, constraints, dependencies,
corrections, implied requests, and conversational framing in one message.

Agentic systems must therefore be evaluated on whether they can transform messy
human communication into coherent operational structure.

## Canonical Vocabulary

```text
Conversation
  human interaction over time

Message / Turn
  one communication event

Case
  one coherent user need requiring an operational outcome

Task
  work required to resolve a Case within the system boundary

Action
  one executable step in a Task
```

## Core Distinction

A case is not the same as a topic, sentence, intent label, or ticket.

A case should generally be separated when candidate needs can have different:

- operational outcomes;
- routing destinations;
- states;
- authority requirements;
- dependencies;
- resolution timelines.

This is the operational independence rule.

## Case Cohesion Test

Two candidate needs should remain one case when most of these are shared:

- same operational owner;
- same case type;
- same resolution event;
- same user goal;
- same temporal constraint;
- same authority level;
- same workflow path.

Otherwise, split them.

## Example

User:

```text
Hi, we're in 304. The shower isn't heating, could we get two more towels, and
can we leave our bags tomorrow after checkout? We have a taxi at 6:30.
```

Correct decomposition:

```text
Conversation: 1
Message: 1
Cases: 3

Case A
  type: issue
  intent: maintenance.plumbing.no_hot_water
  room: 304
  route: maintenance

Case B
  type: request
  intent: housekeeping.towels
  room: 304
  quantity: 2
  route: housekeeping

Case C
  type: information
  intent: luggage.storage.after_checkout
  date: tomorrow
  constraint: taxi at 06:30
  route: answer or clarify
```

The taxi is not necessarily a fourth case. It is task-critical context for the
luggage-storage case.

## Two Decomposers

The architecture should distinguish two conceptual operations.

### Case Decomposer

Question:

> How many distinct user needs are present, and how are they related?

Output:

```text
CaseCandidate[]
CaseGraph
```

### Task Planner

Question:

> What must the system do for each case within its permitted boundary?

Output:

```text
CasePlan
Task[]
Action[]
```

These do not need to be separate model calls in v0.1. They do need to be
separate concepts for evaluation.

## Semantic IR Relationship

Case decomposition should be represented in Semantic IR.

Canonical shape:

```json
{
  "locale": "en",
  "conversationActs": [
    {
      "type": "CASE",
      "caseId": "candidate-1",
      "caseType": "ISSUE",
      "intent": "maintenance.plumbing.no_hot_water",
      "entities": {
        "room": "304",
        "fixture": "shower"
      }
    },
    {
      "type": "CASE",
      "caseId": "candidate-2",
      "caseType": "REQUEST",
      "intent": "housekeeping.towels",
      "entities": {
        "room": "304",
        "item": "bath_towel",
        "quantity": 2
      }
    }
  ]
}
```

## Decomposition Classes

### C0: None

No operational case is present. Greetings, thanks, and small talk may be
context, not cases.

### C1: Atomic

One simple case.

### C2: Compound Same Owner

Multiple needs belong to one coherent case because they share owner, workflow,
and resolution.

Example: towels, pillow, and toilet paper as one room-supplies case.

### C3: Compound Independent

Multiple independent cases that can proceed separately.

Example: extra pillow plus leaking AC.

### C4: Dependent

Cases have conditional or ordering relationships.

Example: "If late checkout is not possible, can you hold our bags?"

### C5: Mixed Information and Action

The user asks for information and possibly requests action.

Example: "Is breakfast included, and if so can you prepare something early?"

### C6: Ambiguous

A possible case requires clarification.

Example: "Do you have extra pillows?" may be availability question or indirect
delivery request.

### C7: Continuation

The message continues an open case.

### C8: Duplicate or Correlation

The message refers to an existing case and should not create a duplicate.

### C9: Cancellation or Modification

The user cancels or changes an earlier case.

### C10: Multi-Turn Assembled

The case is only fully apparent across multiple turns.

## Language Edge Cases

Case decomposition must explicitly test language phenomena:

- indirect requests;
- ellipsis;
- coreference;
- negation;
- conditional clauses;
- temporal references;
- code-switching;
- learner-language;
- pragmatic softening;
- local idiom;
- formal/informal register;
- dialect or locale mismatch.

These may change whether an utterance is an information request, action request,
complaint, correction, or escalation.

## Task-Critical Information Preservation

TCIP is mandatory in decomposition evaluation.

The system must preserve:

- what is requested;
- who or what it applies to;
- quantity;
- date/time;
- constraints;
- conditionals;
- exclusions;
- priority;
- authorization requirements;
- locale-specific meaning.

A system can identify the right case and still fail if it loses TCIP.

## CaseGraph

A CaseGraph represents:

- cases;
- case relationships;
- dependencies;
- conditions;
- continuations;
- duplicates;
- modifications;
- state transitions;
- expected workflow links.

Example:

```text
Late checkout availability
  -- if denied --> luggage storage until 17:00
```

## Evaluation Metrics

The decomposition evaluation suite should include:

- Case F1;
- Case Boundary Accuracy;
- over-decomposition rate;
- under-decomposition rate;
- Dependency Edge F1;
- continuation accuracy;
- duplicate/correlation accuracy;
- modification accuracy;
- TCIP;
- workflow decision accuracy;
- clarification quality.

## Research Hypotheses

### H1: Decomposition predicts operational success

Systems that decompose cases correctly will outperform fluent systems that treat
compound user messages as single intents.

### H2: Language affects decomposition

Indirectness, pragmatics, ellipsis, and locale-specific forms will create
measurable decomposition gaps across English, Spanish, and pt-PT.

### H3: CaseGraph improves reliability

Explicit CaseGraph representation will reduce missed cases, duplicate cases,
wrong dependencies, and premature execution.

### H4: TCIP predicts downstream failure

Task-critical information loss will explain many workflow failures that surface
fluency metrics miss.

## Unresolved Questions

- How expressive should Semantic IR be in v0.1?
- Which decomposition classes are essential for AILITW-001 versus future
  CompanyBench work?
- Should case boundaries be scored before or after task planning?
- How should the lab score acceptable alternative decompositions?
- Can deterministic validators catch enough TCIP failures to reduce human
  review burden?

