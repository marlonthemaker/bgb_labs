---
title: Native Adoption Framework
version: 0.1
status: canonical-draft
owner: bomgoodbueno research
last_updated: 2026-08-20
dependencies:
  - ../../INDEX.md
  - ../00-foundation/MISSION_VISION_PRINCIPLES.md
  - ../00-foundation/GLOSSARY.md
  - RESEARCH_CHARTER.md
---

# Native Adoption Framework

## Definition

Native adoption is the process by which a general-purpose intelligent system
becomes capable of reliably understanding, reasoning, acting, and communicating
within the linguistic, cultural, institutional, operational, and regulatory
context of a particular population or market.

Native adoption is broader than localization and deeper than translation.

```text
Traditional localization
  product -> translate -> adapt interface -> local market

Agentic native adoption
  intelligence
    -> understand local language
    -> interpret local intent
    -> understand local concepts
    -> apply local knowledge
    -> follow local workflows
    -> interact with local systems
    -> respect local rules
    -> communicate natively
    -> produce equivalent outcome
```

## Central Research Question

> What does it take for intelligence developed globally to become operationally
> native locally?

## Six Dimensions

### N1: Linguistic Nativeness

Does the system understand and produce the language as actually used by the
target population?

Observable properties:

- locale-specific grammar and vocabulary;
- idioms;
- register;
- politeness;
- indirect requests;
- ambiguity;
- code-switching;
- learner-language tolerance;
- distinction between `pt-PT` and `pt-BR` where relevant.

### N2: Semantic Parity

Does meaning survive across languages?

Observable properties:

- intent preservation;
- entity preservation;
- condition preservation;
- temporal meaning;
- quantities;
- negation;
- scope;
- references and coreference;
- speech act.

### N3: Task Parity

Can the system identify and decompose the same work across languages?

Observable properties:

- correct case count;
- correct case boundaries;
- correct task decomposition;
- correct dependency structure;
- correct distinction between context and action;
- correct distinction between information request and operational request.

### N4: Operational Parity

Can the system execute equivalent workflows across languages and markets?

Observable properties:

- correct tool selection;
- correct tool arguments;
- correct policy path;
- correct escalation;
- correct refusal or abstention when needed;
- correct acknowledgement of action state;
- no premature execution.

### N5: Institutional Nativeness

Does the system understand local institutions, rules, conventions, documents,
market structures, regulatory expectations, and authority models?

Observable properties:

- local policy interpretation;
- market-specific documents;
- local units, dates, currencies, names, and forms;
- regulatory constraints;
- customer-service norms;
- public and private institutional references.

### N6: Experiential Nativeness

Does the interaction feel appropriate to a native user?

Observable properties:

- naturalness;
- tone;
- register;
- respectfulness;
- practical usefulness;
- no inappropriate literalism;
- no unnecessary explanation;
- no foreign workflow assumptions;
- user confidence.

## Native Capability

Native capability exists when the system can produce an equivalent outcome for
the local user, not merely an equivalent sentence.

Example:

```text
English user:
Can I cancel my subscription and get a refund?

pt-PT user:
Posso cancelar a subscrição e receber reembolso?
```

A natively capable system must preserve:

- the cancellation request;
- the refund question;
- the user's account or eligibility context;
- local policy terms;
- workflow sequence;
- any legal or market-specific constraints;
- appropriate language and register.

## Access, Support, and Parity

The framework treats three claims separately:

### Access

The user can reach the system.

### Support

The system accepts or responds in the language.

### Parity

The system provides equivalent capability.

```text
access <= support <= parity
```

The arrows are aspirational, not guaranteed. A system can be accessible without
support and can support a language without parity.

## PNM Testing

Native adoption evaluation requires Parallel, Native, and Market tests.

### Parallel Tests

Parallel tests preserve the same semantic task across languages. They are used
to measure cross-language parity.

### Native Tests

Native tests are authored directly in the target language. They are used to
measure natural user expression, pragmatics, idiom, register, and ambiguity.

### Market Tests

Market tests require market-specific knowledge, institutions, policies, or
workflows. They are used to measure institutional and operational nativeness.

PNM prevents a common error:

> A translated English test set is not the same as a native or market-valid
> evaluation set.

## Native Adoption Measurement

Native adoption can be measured through:

- language quality;
- semantic equivalence;
- case/task decomposition;
- TCIP;
- workflow correctness;
- tool correctness;
- policy correctness;
- human native review;
- parity ratios against a baseline;
- failure-class distribution;
- longitudinal stability.

## Capability Parity Ratio

A simple capability parity measure can compare target-language performance to a
baseline:

```text
LanguageParity(language, capability)
  = performance(language, capability) / performance(baseline, capability)
```

If English task success is 0.96 and pt-PT task success is 0.84:

```text
Parity_pt-PT = 0.84 / 0.96 = 87.5%
```

This ratio must be capability-specific. A single language score can hide the
real failure.

## Failure Families

Native adoption failures may include:

- unsupported access;
- surface-language failure;
- semantic drift;
- lost task-critical information;
- over-decomposition;
- under-decomposition;
- wrong dependency graph;
- wrong tool;
- wrong tool arguments;
- policy mismatch;
- local institution mismatch;
- register mismatch;
- market assumption mismatch;
- unsafe or unauthorized action;
- evaluation uncertainty.

Failure taxonomy is operationalized in
[EVALUATION_FRAMEWORK.md](EVALUATION_FRAMEWORK.md).

## Unresolved Questions

- Which dimensions should be combined into a future Native Adoption Index?
- Should parity be measured against English, against an ideal local reference,
  or both?
- How should the framework handle local workflows that should not match English
  because the market reality is different?
- What level of human review is required for N6 experiential nativeness?
- Can TCIP predict downstream workflow failure better than fluency scores?

