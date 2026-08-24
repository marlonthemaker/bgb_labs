---
title: Glossary
version: 0.1
status: canonical-draft
owner: bomgoodbueno founder
last_updated: 2026-08-20
dependencies:
  - ../../INDEX.md
  - MISSION_VISION_PRINCIPLES.md
---

# Glossary

This glossary defines the canonical vocabulary for bomgoodbueno Foundation v0.1.
If a later document uses a term differently, this glossary controls unless the
glossary itself is revised.

## Access

The ability to reach or use a system, product surface, model, feature, or
interface. Access does not prove adoption, parity, or capability.

Canonical principle: Access ≠ adoption.

## Adoption

The practical integration of a system into the context where users actually
work, communicate, decide, and act.

## Agentic System

An AI system that does more than generate text. It may interpret user goals,
maintain state, decompose work, retrieve information, select tools, execute
actions, and coordinate outcomes.

## AILITW

AI Living in the Wild. bomgoodbueno's field observatory for studying deployed AI
systems in real public or permissioned contexts.

## Applied Lab

The bomgoodbueno operating unit that translates research methods into practical
Native Adoption Analysis, CompanyBench, market-readiness review,
experimentation, assurance, and release/regression work.

## Capability

A behaviorally observable ability of a system. A capability may include
understanding, decomposition, reasoning, retrieval, tool use, policy adherence,
communication, or task completion.

## Capability Parity

The degree to which users in different languages or markets receive equivalent
capability from the same system.

Capability parity is not the same as identical output. Equivalent outcomes may
require different phrasing, workflows, policies, or local knowledge.

## Case

One coherent user need requiring an operational outcome. A single message may
contain zero, one, or multiple cases. A case may be informational, operational,
ambiguous, conditional, continued, modified, or duplicated.

## Case Boundary Accuracy

The degree to which a system correctly identifies where cases begin, end,
merge, split, or relate to existing cases.

## CaseGraph

A structured representation of one or more cases and their relationships,
including independence, dependency, condition, continuation, modification, or
duplication.

## Case/Task Decomposition

The process of transforming natural user communication into coherent cases and
then into bounded tasks the system is permitted to perform.

## Claim

A statement made by a system vendor, organization, researcher, model, or report.
Claims may concern language support, capability, safety, availability,
performance, or market readiness.

## Claim Provenance

The record of where a claim came from, when it was observed, what source
supports it, and what evidence class it currently has.

## CompanyBench

A company-specific benchmark built from a customer's actual workflows, policies,
language scope, markets, and success criteria.

## Cross-Language Capability Parity

The evaluation of whether capability remains equivalent across language
conditions. The founding AILITW-001 scope evaluates English, Spanish, and
Portuguese as used in Portugal.

## E0-E5 Evidence Classes

The canonical evidence ladder used by bomgoodbueno. Defined in
[RESEARCH_CHARTER.md](../01-research/RESEARCH_CHARTER.md) and operationalized
in [EVALUATION_FRAMEWORK.md](../01-research/EVALUATION_FRAMEWORK.md).

## Evaluation Reliability

The degree to which an evaluation method produces trustworthy, stable,
interpretable results for the property it claims to measure.

## Experiential Nativeness

The degree to which interaction feels appropriate, natural, respectful, and
locally intelligible to a native user.

## Human Evaluator

A person who reviews language, workflow, institutional, or task behavior under a
defined role and rubric. A human evaluator may be native, certified, fluent,
domain-specific, or an adjudicator.

## Institutional Nativeness

The degree to which a system understands and respects local institutions,
regulations, conventions, documents, market structures, and authority models.

## Language Support

A product or model claim that a language can be used. Language support does not
imply capability parity.

Canonical principle: Support ≠ parity.

## Linguistic Nativeness

The degree to which a system understands and produces a language as actually
used by native speakers in the target locale, including register, idiom,
pragmatics, ambiguity, and dialect or regional variation.

## Market Test

A test case requiring market-specific knowledge, workflow, law, institution,
policy, or convention. A market test is not simply a translated English case.

## Native Adoption

The process by which a general-purpose intelligent system becomes capable of
reliably understanding, reasoning, acting, and communicating within the
linguistic, cultural, institutional, operational, and regulatory context of a
particular population or market.

## Native Adoption Analysis

An Applied Lab method for assessing the extent to which a system is natively
adopted in a target language, locale, market, workflow, or institution.

## Native Capability

The ability to complete work appropriately inside a local context. Native
capability is not translated output.

## Native Test

A test case authored directly in the target language and context, reflecting how
native users would naturally express the need.

## Operational Parity

The degree to which a system can execute equivalent workflows across languages
or markets.

## Parallel Test

A test case designed so that the same semantic task appears across multiple
languages. It may be translated, transcreated, or separately authored and then
aligned through Semantic IR.

## PNM Testing

Parallel, Native, and Market testing. PNM distinguishes three test classes:

- Parallel: same semantic task across languages.
- Native: naturally authored target-language expression.
- Market: target-market-specific policy, workflow, institution, or convention.

PNM prevents the lab from confusing translated test sets with valid native or
market evaluation.

## Public Goods

Research outputs, datasets, tools, methods, and reports released for broader
use when safe, ethical, and methodologically appropriate.

## Semantic IR

Semantic intermediate representation. A structured representation of meaning
that connects natural language to case/task graphs, expected behavior, observed
behavior, and evaluation.

## Semantic Parity

The degree to which meaning survives across language conditions.

## System

The deployed AI product, model, workflow, interface, agent, or platform being
observed or evaluated.

## Task

Work required to resolve a case within the system's permitted boundary.

## Task-Critical Information Preservation

The degree to which information necessary for correct task completion is
preserved through interpretation, decomposition, planning, tool use, and
response.

Abbreviation: TCIP.

## TCIP

Task-Critical Information Preservation. TCIP is a key metric for agentic
systems because fluent answers can still be operationally wrong if quantities,
dates, names, conditions, language variants, policy constraints, or tool
arguments are lost.

## Workflow Correctness

The degree to which a system follows the right process for the user's goal,
including decomposition, ordering, dependency handling, tool choice, authority,
policy, escalation, and confirmation.

## Wild Observation

An observation of a deployed system in a public or real-world context.

## WildBench

A benchmark or case set derived from observed real-world system behavior,
claims, workflows, and failures.

