# Locale And Community Standard

ID: `DOC-WILD-0004`
Version: v0.2
Status: proposed

## Purpose

This standard defines how the program represents language, locale, culture, accessibility, and community context in Wild studies, benchmarks, evaluations, and product claims.

## Core Principle

A language tag is necessary for interoperability, but it is not enough to describe the people, setting, or usability requirements represented by a study.

## Required Context Fields

Every journey, experiment, run, evaluation, and finding should declare:

- `language_tag`: BCP 47 tag such as `pt-PT`, `es-MX`, or `de-DE`
- `locale`: region-specific formatting and convention context
- `script`: writing system when relevant
- `community_context`: target user community or usage setting
- `domain_context`: task domain such as travel, health, finance, education, support, or coding
- `register_expectation`: formal, informal, technical, institutional, youth, elder, mixed, or other
- `code_switching_assumption`: whether mixed-language use is expected, allowed, or excluded
- `accessibility_context`: reading level, assistive technology, disability considerations, low bandwidth, device constraints, or other access needs
- `evaluator_fit`: why evaluators are qualified for this context and where their limits are
- `representation_limits`: who or what the study does not represent

## Language, Locale, And Culture Distinctions

Use these distinctions consistently:

- Language: the linguistic system being used.
- Locale: region-linked conventions such as dates, numbers, currencies, forms of address, collation, units, and formats.
- Community context: the people and setting represented by the journey.
- Cultural context: norms, expectations, institutions, references, taboos, and trust signals.
- Accessibility context: whether the interaction is usable for people with different abilities, literacy levels, devices, and environmental constraints.

Do not use one of these as a proxy for all the others.

## Locale Data Practice

Where a task depends on dates, numbers, currencies, names, addresses, pluralization, units, sorting, or region-specific formats, use CLDR-aware expectations where possible.

Tag failures carefully:

- locale data error: wrong date, number, currency, unit, address, or sorting convention
- cultural fit error: wrong norm, assumption, reference, register, or institutional expectation
- product localization error: UI copy, permissions, onboarding, or help text creates friction
- model behavior error: output or agent behavior fails despite correct surrounding product context

## Accessibility Practice

Native adoption must not assume that fluent text equals access.

Where relevant, evaluate:

- clarity of instructions
- reading level and cognitive load
- screen-reader compatibility of product surfaces
- keyboard or mobile navigation constraints
- error recovery for users with limited literacy or low bandwidth
- availability of plain-language explanations
- whether consent and permissions are understandable

Use WCAG-aligned thinking for user-facing web or app surfaces when the product journey includes them.

## Community Review Requirements

Use community or domain review when:

- a finding could affect a marginalized or underrepresented language community
- the task involves health, finance, law, education, immigration, employment, or public services
- cultural norms materially affect trust, safety, or task success
- the journey includes dialect, code-switching, indigenous language, or low-resource language assumptions
- product claims will reference a specific language community

## Representation Statement

Every benchmark release or product claim should include a representation statement:

```text
This work represents <language/locale/community/task context>.
It does not represent <excluded communities, domains, dialects, accessibility contexts, or deployment settings>.
The evaluator basis was <evaluator profile>.
The main uncertainty is <uncertainty>.
```

## Anti-Patterns

- treating one country variant as the whole language
- using bilingual internal staff as a universal substitute for target users
- translating an English journey and calling it native
- ignoring accessibility because the text is fluent
- collapsing cultural fit into preference
- removing realistic ambiguity from benchmarks
- claiming broad language support from one domain or journey

## Acceptance Criteria

A Wild artifact meets this standard when:

- language and locale are explicit
- community and domain context are declared
- code-switching assumptions are visible
- accessibility considerations are either addressed or explicitly out of scope
- evaluator fit and limits are recorded
- representation limits are stated before claims are made
