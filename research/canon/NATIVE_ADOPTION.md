# Native Adoption

## Definition

Native adoption means an AI system remains useful when a person expresses intent and attempts real work through their own language, locale, register, pragmatic style, institutional context, and workflow.

It is a system property, not only a model or translation property. It may depend on the interface, prompt, model, orchestration, retrieval, tools, policy, memory, local knowledge, escalation behavior, and response.

## Core Question

Does the system preserve practical capability across languages and native expression modes?

If not:

- where does capability first break;
- what information or user outcome is affected;
- what evidence supports that diagnosis;
- what intervention most directly addresses the break.

## Access, Support, And Parity

These are separate claims:

- **Access**: the user can reach the system.
- **Support**: the system accepts or responds in the language.
- **Parity**: the system provides comparable capability for the tested work and context.

A system can be accessible without meaningful language support and can support a language without capability parity.

## Diagnostic Lifecycle

Canon v0.2 uses a lean six-stage lifecycle:

1. **Input** - receive the user's language, message, context, and interaction state.
2. **Understand** - infer meaning, intent, entities, constraints, references, and pragmatic force.
3. **Decompose** - identify coherent needs, tasks, dependencies, continuations, and required clarification.
4. **Retrieve/Reason** - obtain and apply the relevant knowledge, policy, state, and reasoning.
5. **Act** - select and execute permitted tools, arguments, ordering, escalation, abstention, or confirmation.
6. **Respond** - communicate the outcome, uncertainty, limitations, and next steps appropriately.

Failures should be tagged to the earliest stage where the relevant capability was lost. Downstream symptoms may also be recorded, but they do not replace the earliest-cause diagnosis.

## Evaluation Dimensions

The lifecycle says where a failure enters. The following dimensions say what kind of native capability is affected.

### Linguistic Nativeness

Grammar, vocabulary, idiom, register, politeness, indirectness, ambiguity, code-switching, and tolerance of natural variation.

### Semantic Parity

Preservation of intent, entities, quantities, negation, conditions, temporal meaning, scope, reference, and speech act.

### Task Parity

Identification of the same coherent needs, dependencies, clarifications, and work across languages.

### Operational Parity

Equivalent policy paths, retrieval, tools, arguments, ordering, escalation, confirmation, abstention, and outcomes.

### Institutional Nativeness

Correct treatment of local conventions, documents, institutions, rules, units, dates, currencies, names, and authority models.

### Experiential Nativeness

Natural, respectful, useful interaction with appropriate confidence, register, explanation, and recovery behavior.

A single failure may affect several dimensions. A fluent response can still fail semantic, task, operational, or institutional parity.

## Parallel, Native, And Market Tests

Native-adoption research distinguishes three case sources:

- **Parallel tests** preserve the same semantic contract across languages so capability can be compared.
- **Native tests** are authored directly in the target language to represent natural expression, pragmatics, ambiguity, and register.
- **Market tests** depend on local institutions, policies, formats, knowledge, or workflows.

Translated English prompts are not automatically valid native or market tests. Case records must identify their source type.

## Context Requirements

Where relevant, a study should declare:

- BCP 47 language tag;
- locale and regional conventions;
- domain and workflow;
- expected register;
- code-switching assumptions;
- accessibility assumptions or exclusions;
- reviewer fit;
- representation limits.

A language tag is necessary for interoperability but does not represent an entire culture, community, market, or accessibility context.

## Capability And Outcome Principle

Native capability exists when the system can produce an acceptable outcome for the tested user and context, not merely an equivalent sentence.

Evaluation may consider:

- semantic correctness;
- task-critical information preservation;
- decomposition and dependency handling;
- retrieval and policy correctness;
- tool and argument correctness;
- workflow completion and recovery;
- appropriate escalation or refusal;
- native human review;
- parity against a declared baseline;
- stability across reruns or releases.

Parity should be reported per capability or outcome. A single aggregate language score can hide the actual failure and should not be treated as a universal Native Adoption Index without separate validation.

## Initial Language Scope

The founding controlled and Iberia studies use:

- English (`en`);
- Spanish for Spain (`es-ES`);
- Portuguese for Portugal (`pt-PT`).

This is a controlled founding scope, not a claim about broader Spanish- or Portuguese-speaking communities.

## Product Principle

The product is the ability to measure, diagnose, and improve native adoption. Any software exists to support that loop.
