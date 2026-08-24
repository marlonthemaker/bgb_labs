---
title: AILITW Protocol
version: 0.1
status: canonical-draft
owner: bomgoodbueno research
last_updated: 2026-08-20
dependencies:
  - ../../INDEX.md
  - AILITW_CHARTER.md
  - RESEARCH_CHARTER.md
  - NATIVE_ADOPTION_FRAMEWORK.md
  - EVALUATION_FRAMEWORK.md
  - CASE_TASK_DECOMPOSITION.md
  - HUMAN_EVALUATION.md
---

# AILITW Protocol

## Purpose

This protocol turns the AILITW charter into operating procedure. It governs how
bomgoodbueno discovers systems, records claims, tests behavior, preserves
evidence, handles human evaluation, and publishes findings.

## Protocol Status

This v0.1 protocol is suitable for small controlled studies, exploratory public
observations, and AILITW-001 preparation. It must be revised before high-volume
testing, sensitive sectors, or certification-like public claims.

## Step 1: System Discovery

For each candidate system, record:

- system name;
- vendor or operator;
- URL or access surface;
- date found;
- language claims;
- market claims;
- agentic capability claims;
- pricing/access restrictions if relevant;
- public documentation;
- risk notes;
- reason for inclusion.

## Step 2: Eligibility Review

A system is eligible only if:

- access is public or permissioned;
- testing can be performed without deception beyond ordinary user interaction;
- test volume is low enough to avoid burdening the system;
- cases do not attempt to extract private data;
- cases do not trigger real-world harmful actions;
- evidence can be preserved ethically.

If eligibility is uncertain, classify the system as "hold" until reviewed.

## Step 3: Claim Snapshotting

Before testing, capture claims relevant to the study:

- supported languages;
- supported markets;
- advertised workflows;
- tool or action capabilities;
- limitations;
- date and source;
- screenshot or archive where allowed.

Claims receive E0 status until tested.

## Step 4: Case Design

Cases must specify:

- language and locale;
- PNM class: Parallel, Native, or Market;
- user prompt;
- capability;
- expected Semantic IR;
- expected case/task decomposition;
- expected TCIP fields;
- expected workflow;
- permitted outcome;
- invalid outcomes;
- evaluation rubric;
- human review requirement.

## Step 5: Risk Review

Before execution, classify case risk:

- low: informational or simulated interaction;
- moderate: may affect account state if performed, but can be constrained;
- high: could trigger financial, legal, medical, security, or operational harm.

AILITW v0.1 should avoid high-risk live actions unless explicit permission and
safeguards exist.

## Step 6: Execution

Each run must record:

- run ID;
- system ID;
- surface;
- date/time;
- language/locale;
- case ID;
- prompt/message;
- visible system response;
- interaction steps;
- screenshots or transcripts where allowed;
- errors or refusals;
- rate limit or access changes.

For public systems, keep interaction volume minimal. Prefer controlled small
samples over broad scraping.

## Step 7: Trace Capture

When permissioned access or internal instrumentation exists, capture:

- model/provider;
- prompt/configuration;
- retrieved sources;
- tool calls;
- tool arguments;
- tool results;
- internal state transitions;
- latency;
- fallback behavior.

When only public access exists, document the trace as visible behavior and mark
unobservable internals explicitly.

## Step 8: Evaluation

Evaluation applies the framework in
[EVALUATION_FRAMEWORK.md](EVALUATION_FRAMEWORK.md).

Each run should be evaluated for:

- semantic accuracy;
- case/task decomposition;
- TCIP;
- workflow correctness;
- policy correctness;
- native quality where relevant;
- parity relative to baseline where relevant;
- failure classes;
- evidence class.

## Step 9: Human Review

Human review is required when:

- native quality is scored;
- pragmatic intent is ambiguous;
- semantic equivalence is contested;
- market context requires local judgment;
- evaluator confidence is low;
- a public claim would name a system.

Human evaluation procedure is defined in
[HUMAN_EVALUATION.md](HUMAN_EVALUATION.md).

## Step 10: Reruns and Drift

Reruns should be used when:

- a result is surprising;
- a failure may be transient;
- a system changes version;
- a public claim requires stronger evidence;
- a parity gap needs confirmation.

Record rerun timing and whether the original prompt was reused, adapted, or
re-authored.

## Step 11: Analysis

Analysis should separate:

- per-case findings;
- per-capability findings;
- per-language findings;
- per-market findings;
- system-level findings;
- cross-system findings;
- method limitations.

Do not collapse all results into one generic language score if capability-level
variation matters.

## Step 12: Notification and Publication

Before publishing named findings, consider:

- severity;
- evidence class;
- potential harm;
- whether the issue appears reproducible;
- whether the vendor should receive notice;
- whether redaction is appropriate;
- whether publication serves a public-good purpose.

Publication must identify:

- protocol version;
- date range;
- systems;
- cases;
- evidence class;
- limitations;
- conflicts;
- known evaluator constraints.

## Data Retention

Retain:

- protocol;
- case definitions;
- run artifacts;
- evaluator records;
- scoring outputs;
- analysis files;
- publication outputs.

Redact or avoid collecting:

- personal data not needed for evaluation;
- credentials;
- private user data;
- sensitive operational details;
- unnecessary screenshots containing third-party identifiers.

## Unresolved Questions

- What should the default notification window be for named-system reports?
- What archive method should be used for public claims when pages change?
- How should AILITW handle systems whose terms forbid benchmarking?
- Which public findings should be anonymized in v0.1?
- What tooling is required before the protocol can scale beyond manual runs?

