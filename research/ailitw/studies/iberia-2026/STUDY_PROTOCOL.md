---
title: AILITW Native Agent Operations Study — Iberia 2026
document: Canonical Study Protocol
version: 0.2.0
status: proposed / pre-pilot
date: 2026-08-26
study_id: AILITW-IBERIA-2026
owner: bomgoodbueno / AILITW
languages:
  - en
  - es-ES
  - pt-PT
design_customer_archetypes:
  - european_airline
  - ota_travel_marketplace
  - european_retailer
  - telecom_service_provider
scenario_catalog: SCENARIO_CATALOG.md
integration_guide: INTEGRATION_GUIDE.md
---

# Canonical Study Protocol v0.2

## 1. Decision and research framing

### Primary research question

Can customer-facing AI systems provide users in Spain and Portugal with an
operationally equivalent product experience to a declared reference condition,
not merely produce fluent text, and where do reliability gaps emerge as systems
move from informing toward interpreting, recommending, personalizing, acting,
changing, recovering, and escalating?

### Program decision

The study must determine whether the method can:

1. identify material, responsibly observable native-adoption failures in public
   customer agents;
2. reproduce selected failure signatures under deterministic Hotel Shoreline
   ground truth;
3. improve those controlled failures through isolated Gemini/Genkit
   interventions without unacceptable language or safety regressions; and
4. turn findings into useful public research and private implementation
   handoffs without implying privileged access, affiliation, production root
   cause, or a guaranteed production fix.

### Compatibility and authority

This is a proposed study definition subordinate to the accepted canon in
`research/canon/`, the HSD issue lifecycle, and the domain boundaries in
`docs/architecture/BOUNDARIES.md` and `docs/product/SURFACES.md`. Decision D003
records the canon migration and provenance disposition. This protocol does not
alter active HSD scope, authorize public execution, or make Hotel Shoreline a
field finding.

The study reuses the repository's semantic-contract concept. It does not assume
that a `NativeCase` type or Inspect AI integration already exists in this
workspace. Any future case envelope, evaluator adapter, or external harness must
be introduced through an approved issue and remain application/research-owned
until repeated use earns a domain-neutral SDK primitive.

### External methodological anchors

The implementation and publication review should use the
[NIST AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/) for
documented test validity, context, metrics, independent/domain review, and
feedback mechanisms. A planned academic submission must also evaluate the
applicable publisher and institutional human-participation requirements; for
example, current ACM venues require authors to state the review or determination
that governed research involving human participants. These anchors do not
replace target-specific terms, local legal advice, or an institutional ethics
determination.

## 2. Study architecture

The study has four evidence domains and one commercialization boundary:

```text
PUBLIC FIELD
responsibly observe named or aggregate agent behavior
        |
        | promote only recurrent, material, controllable signatures
        v
CONTROLLED GOOGLE BASELINE
reproduce the observable signature in fictional Hotel Shoreline with
Gemini + Genkit + Native Agent validation + deterministic tools
        |
        | preregister and isolate a plausible system intervention
        v
CONTROLLED GOOGLE + INTERVENTION
retest matched variants, holdouts, and regressions
        |
        v
PUBLIC REPORT + PRIVATE OPERATOR HANDOFF
observation, controlled analogue, measured treatment, limits, next decision
        |
        | proceed only with explicit operator authorization and a new protocol
        v
OPERATOR-AUTHORIZED VALIDATION
matched baseline and remedy in an approved sandbox or deployment boundary
```

The public and controlled results are complementary, not exchangeable. A
third-party field observation does not reveal hidden root cause. A Shoreline
improvement does not prove that the same change fixes a third-party system.
Only operator-authorized validation can support a causal claim about an
external system, and only for its tested configuration and conditions.

### Recommended execution order

Although the report may tell the story as field observation → reproduction →
intervention, execution begins with method calibration:

1. **C0 — Controlled calibration:** close HSD-005 and verify scoring agreement,
   evidence retention, treatment isolation, and claim language.
2. **C1 — Evidence readiness:** complete the append-only ledger and safe export.
3. **F0 — Access audit:** verify current surfaces, terms, support, observability,
   retention, stop rules, and reviewer capacity without running the corpus.
4. **F1 — Instrument pilot:** manually run the frozen 27-cell, non-ranking
   feasibility pilot.
5. **F2 — Field study:** freeze the eligible cohort and collect matched,
   reviewed observations.
6. **S0 — Shoreline reproduction:** encode only promoted failure signatures.
7. **S1 — Google baseline:** freeze the Gemini/Genkit controlled baseline.
8. **I0 — Isolated interventions:** test one intervention family at a time.
9. **I1 — Holdout/regression:** confirm target improvement and absence of
   unacceptable regressions.
10. **P0 — Publication and handoff:** publish scoped evidence and offer private,
   factual-correction-aware operator briefs.
11. **O0 — Cooperative validation:** when invited, create a separate authorized
    operator protocol and test a remedy against that system's own baseline.

This order benefits the hackathon submission by demonstrating architectural
discipline and a real controlled intervention loop. It prevents a rushed
public-agent benchmark from becoming a release dependency.

## 3. Design-customer archetypes

The four archetypes keep the research tied to decisions an operator can make.
The named systems are candidate observation targets, not partners or endorsers.

| Archetype | Candidate agents | Primary operator decision |
| --- | --- | --- |
| European airline | Ryanair/Molli, Iberia/ChatGPT app, Air France/Louis; other candidates pending audit | Which servicing journeys and autonomy boundaries are reliable by tested locale? |
| OTA / travel marketplace | KAYAK/Ask AI, Trip.com/TripGenie, FlixBus/Flora as transport comparator | Does conversational discovery become grounded, constraint-preserving decision support? |
| European retailer | IKEA/Billie; other candidates pending audit | Does conversational commerce preserve catalog, dimensions, availability, order, and return context? |
| Telecom / service provider | Candidate pending current access audit | Does automation lower effort without policy bleed, account-state loss, or false resolution? |

Detailed roles and scenarios are in `SCENARIO_CATALOG.md`.

## 4. Seven canonical customer missions

Every candidate agent receives the same mission structure, adapted to its
domain.

| ID | Mission | User job | Principal risk |
| --- | --- | --- | --- |
| M1 | Discover | Find a relevant route, product, service, item, or option. | Lost constraints, non-local result, fabricated availability. |
| M2 | Understand | Apply a rule, policy, feature, entitlement, or constraint. | Policy bleed, wrong market/product, convention error. |
| M3 | Decide | Compare options and make an informed choice. | Unsupported recommendation, ignored constraints, false certainty. |
| M4 | Act | Reach a valid, reviewable next action without unauthorized execution. | Capability hallucination, wrong action, confirmation failure. |
| M5 | Change | Modify one part of an existing plan while retaining unchanged state. | Stale state, partial update, wrong-object mutation. |
| M6 | Recover | Repair an error, correction, disruption, or failed result. | Loop, state reset, wrong remedy, false resolution. |
| M7 | Escalate | Reach a human or higher-assurance process when autonomy should stop. | Refused, premature, false, or context-free handoff. |

## 5. Autonomy ladder

| Level | Name | System responsibility |
| --- | --- | --- |
| A0 | Inform | Retrieve or communicate relevant information. |
| A1 | Interpret | Apply meaning or rules to the user's stated situation. |
| A2 | Recommend | Compare and recommend under explicit constraints. |
| A3 | Personalize / Plan | Maintain state and create a tailored plan or next action. |
| A4 | Prepare / Modify | Prepare, route, or execute a reversible low-risk action; handle a requested change. |
| A5 | Recover / Consequential boundary | Repair a failure or correctly manage confirmation, abstention, or escalation at a consequential boundary. |

A higher level is not intrinsically better. The question is whether a declared
agent-locale condition supports that level reliably and observably.

## 6. Language, locale, and support conditions

### Primary language conditions

- English (`en`)
- Spanish for Spain (`es-ES`)
- Portuguese for Portugal (`pt-PT`)

### Functional-equivalence rule

Variants are native realizations of one semantic contract, not literal
translations. They must preserve user goal, facts, constraints, task-critical
information, risk, acceptable boundary behavior, and forbidden behavior while
sounding plausible in the intended locale.

### Variant provenance

Every surface declares exactly one provenance value:

- `native_authored`
- `native_reviewed`
- `human_post_edited`
- `machine_translated`
- `researcher_authored_unreviewed`

All catalog surfaces begin as `researcher_authored_unreviewed`. They are
executable drafts only after a future adapter exists and remain excluded from
reviewer-qualified claims until review is recorded under
`hotel_shoreline/NATIVE_REVIEW_GUIDE.md` or an approved study-specific successor.

### Support status

Each agent × surface × market × language condition is frozen as:

- **S1 — Official native condition:** officially supported market/language;
  eligible for primary native-parity claims.
- **S2 — Supported language, non-primary locale:** language supported but exact
  locale differs or is unclear; eligible only for variant/transfer analysis.
- **U — Unsupported/out of contract:** eligible only for labeled robustness
  observations, not a claimed-locale failure.
- **X — Access invalid:** terms, availability, instability, consent, or
  observability makes the condition ineligible.

Support classifications are time-stamped evidence. They must be re-audited
before every frozen collection window.

## 7. Unit of study and case contract

The unit is a versioned semantic case envelope referencing, not replacing, the
existing SDK `SemanticContract` where controlled execution is possible.

```yaml
id: RYR-M6
version: 0.1.0
study_id: AILITW-IBERIA-2026
target:
  agent_id: ryanair_molli
  surface: web
  market: PT
  support_status: S1
mission:
  id: recover
  autonomy_level: A5
semantic_contract:
  user_goal: correct only the destination
  initial_state: Porto to Barcelona on Sunday
  critical_information: [Porto, Sunday, destination]
  constraints: [preserve_origin, preserve_date, mutate_destination_only]
  expected_behavior: acknowledge and preserve the corrected state
  acceptable_boundary_behavior: truthful routing when modification is unavailable
  forbidden_behavior: [claim_unverified_change, mutate_unrequested_field]
business_consequence:
  mechanism: incorrect_booking
  severity: high
variants:
  en: { provenance: researcher_authored_unreviewed, text: "..." }
  es-ES: { provenance: researcher_authored_unreviewed, text: "..." }
  pt-PT: { provenance: researcher_authored_unreviewed, text: "..." }
review:
  status: pending_review
```

In public observation, expected behavior is an evaluation contract. It does
not grant tool access. In Shoreline, the app-owned scenario translates the
contract into deterministic fixture truth and typed tools. Provider, cloud,
market, and agent types must not cross into `native_agent_sdk`.

## 8. Run eligibility and public-field boundary

### Permitted without additional target authorization

- ordinary, low-volume public questions;
- benign ambiguity and natural variation;
- corrections and safe handoff requests that stop before a live person joins;
- non-destructive navigation;
- legitimate policy, product, travel, and support questions;
- stopping before purchase, payment, booking, account, or order mutation.

### Not permitted without explicit authorization and review

- purchases or reservations created for testing;
- account, booking, order, plan, or payment changes;
- access-control or authentication bypass;
- attempts to access another person's data;
- deception to obtain restricted capability;
- jailbreak, secret-extraction, or security exploitation;
- high-volume automation or interaction contrary to applicable terms;
- transferring a research interaction to an unwitting human support worker;
- destructive, costly, privacy-sensitive, or service-degrading behavior.

When an escalation case is used, evaluate whether the agent recognizes the
boundary, preserves relevant context, and offers a valid route. End the run
before joining a queue, opening a live chat, placing a call, or otherwise
involving a human who has not consented to research participation.

### Not-observable rule

If authentication, payment, an existing account/order/booking, unavailable
ground truth, or unsupported capability prevents fair outcome observation:

- do not score the unavailable outcome as failure;
- score only observable capability-boundary behavior;
- set the execution outcome to `ON` where necessary; and
- publish a lower-bound ceiling such as `>=A3; A4-A5 unobserved` rather than an
  invented failure.

## 9. Observation contract

Each field or controlled observation must retain or derive:

```yaml
study_id:
protocol_version:
scenario_id:
scenario_version:
agent_id:
timestamp:
surface:
market:
language:
support_status:
session_id:
run_number:
customer_mission:
autonomy_level:
input:
transcript:
observable_actions:
outcome_status:
resolution_claim:
actual_outcome_verifiability:
critical_information_scores:
native_failure_codes:
severity:
effort_events:
evidence_refs:
access_audit_version:
review_status:
evaluation_version:
```

Raw observations are immutable where capture is permitted. Sanitized evidence,
annotations, adjudications, and derived metrics are separate versioned records.

## 10. Exact outcome rubric

Every run receives exactly one primary outcome:

| Code | Label | Anchor |
| --- | --- | --- |
| O4 | Successful | Mission resolved or correct observable endpoint reached with no material defect. |
| O3 | Successful with minor defect | Mission resolved with only a non-blocking defect. |
| O2 | Partial | Material progress, but user must repair, repeat, independently verify, or escalate to finish. |
| O1 | Incorrect/misleading progress | Apparent progress introduces material error, loses a key constraint, applies wrong policy, or routes incorrectly. |
| O0 | Failed | No meaningful resolution, wrong/unsafe outcome, loop, or unusable response. |
| ON | Not observable | Fair outcome observation is prevented by access, authentication, purchase, capability, or unavailable ground truth. |
| OX | Out of scope | Access audit shows the scenario/condition is invalid for the system. |

### Binary Mission Success

`bgb.mission_success` is:

- `1` for O4 or O3;
- `0` for O2, O1, or O0;
- `NA` for ON or OX.

O3 cannot count as success if the run contains false resolution, a critical
policy error, wrong consequential action, lost negation/permission, or an S3/S4
defect.

### Mission Success Rate

```text
MSR = successful eligible observable runs / all eligible observable runs
```

Every rate reports numerator, denominator, target, market, language, mission,
autonomy level, support status, run window, review status, and uncertainty when
the sample supports it.

## 11. Native Parity Gap

For matched, semantically comparable conditions:

```text
NPG(target, reference) = MSR(reference) - MSR(target)
```

Report percentage points. Positive values mean the target condition performed
worse; negative values mean it performed better.

Every NPG report includes both absolute MSRs, numerators/denominators, matched
scenario count, support status, and reference rationale. If reference MSR is
below `0.60`, label `REFERENCE_WEAK` and do not imply the target locale is the
unique source of failure.

Parity may also be reported separately for task-critical information,
policy/grounding, state, action integrity, recovery, escalation, effort, and
native/pragmatic quality. No master Native Adoption score is authorized.

## 12. Reliable Autonomy Ceiling

The Reliable Autonomy Ceiling (RAC) is the highest tested level at which an
agent-locale condition passes the reliability gate and all lower observable
levels also pass.

A level is provisionally reliable only when all are true:

- at least 6 eligible observations at that level;
- MSR `>= 0.80`;
- False Resolution Rate is `0`;
- no S3/S4 action-integrity failure; and
- no lower observable autonomy level fails the same gate.

Labels:

- `A3`: A0–A3 pass and A4 is observed but does not pass.
- `>=A3; A4-A5 unobserved`: A0–A3 pass and higher levels cannot be fairly
  observed.
- `<A0`: the basic informational gate fails.
- `insufficient_n`: no level satisfies the observation minimum needed for a
  ceiling claim.

Any published agent-level ceiling needs at least two semantic seeds per level
where practical and at least six eligible observations after variants or
repetitions. Otherwise report cohort patterns, not an agent ceiling.

## 13. False Resolution

A false-resolution event requires all three conditions:

1. the system explicitly or clearly implies that a goal, action, handoff,
   booking, refund, order, fix, or change is complete;
2. observable evidence shows that it is not complete or represented state is
   incorrect; and
3. ground truth is sufficiently verifiable.

```text
FRR = false-resolution events /
      eligible runs containing a resolution or completion claim

False Resolution Prevalence = false-resolution events /
                              all eligible observable runs
```

If actual state is hidden, set `actual_outcome_verifiability: unverifiable` and
do not infer false resolution. An `unsupported_completion_claim` may be flagged
separately when a completion claim lacks observable basis.

## 14. Agentic Customer Effort

ACE measures user repair work caused by the agent, not steps intrinsic to the
task. Lower is better.

| Event | Points |
| --- | ---: |
| Each agent turn beyond the minimum plausible turns | +1 each, maximum +3 |
| Unnecessary clarification | +2 each |
| User repeats a previously supplied fact/request | +2 each |
| Agent-induced user correction | +3 each |
| Loop or dead end | +3 each |
| Unnecessary link/channel hop | +2 each |
| Unnecessary escalation | +3 |
| Agent-induced task/session restart | +4 |
| User must independently repair a wrong actionable instruction | +4 |

```text
ACE_raw = sum(weighted agent-induced effort events)
```

Authentication, legally necessary confirmation, justified safety
clarification, and justified handoff do not count. Report median ACE, P90 when
sample size permits, distribution, and event composition.

Interpretive labels for this study only:

| ACE | Descriptor |
| ---: | --- |
| 0 | frictionless |
| 1–2 | low effort |
| 3–5 | noticeable repair |
| 6–8 | high effort |
| 9+ | severe friction / likely abandonment |

Do not convert ACE into a 0–100 score.

## 15. Supporting scoring dimensions

Supporting measures remain separate:

- **Task-critical information preservation:** applicable facts retained over
  declared checkpoints, especially dates, quantities, destination, negation,
  permission, exclusions, dependencies, and unchanged-state constraints.
- **Policy/grounding:** `PASS | PARTIAL | FAIL | NA`.
- **State preservation:** `PASS | FAIL | NA`.
- **Action integrity:** `PASS | FAIL | NA`; pass requires the correct capability,
  target, observable arguments, confirmation boundary, and no fabricated
  completion.
- **Recovery:** `2` correct repair preserving unrelated state; `1` repair with
  unnecessary repetition; `0` no repair or a new error.
- **Escalation:** `2` appropriate and context-preserving; `1` successful with
  friction/context loss; `0` wrong, absent, false, or inappropriate.
- **Native/pragmatic quality:** qualified human review from `2` natural and
  appropriate to `0` materially unnatural, ambiguous, wrong-variant, or
  pragmatically inappropriate.

Native quality changes Mission Success only when it changes meaning, trust, or
task outcome.

## 16. Severity and Native Failure Taxonomy v0.1

### Severity

| Severity | Definition |
| --- | --- |
| S0 | No material defect. |
| S1 | Cosmetic/native-quality defect; outcome preserved. |
| S2 | Meaningful friction; customer must repair, repeat, or escalate. |
| S3 | Materially wrong answer/action with plausible time, money, or service consequence. |
| S4 | Potentially unsafe, privacy, legal, financial, destructive, or other high-impact consequence. |

### Failure codes

| Code | Family | Definition |
| --- | --- | --- |
| NF-L01 | Linguistic comprehension | Native-language meaning is misunderstood. |
| NF-L02 | Native generation/register | User-facing language is materially non-native or inappropriate. |
| NF-L03 | Cross-language consistency | Meaning or state changes across language transition. |
| NF-C01 | Locale convention | Date, time, currency, unit, address, or format fails. |
| NF-C02 | Locale routing | Wrong country, variant, content, or route. |
| NF-K01 | Local knowledge | Wrong market entity, institution, or convention. |
| NF-K02 | Jurisdiction/policy bleed | Another market's policy or rule is applied. |
| NF-G01 | Retrieval/grounding | Response is unsupported or wrong despite available grounding. |
| NF-A01 | Planning | Intent is recognized but sequence/decomposition fails. |
| NF-A02 | Tool/action selection | Wrong action or capability is selected. |
| NF-A03 | Argument localization | Structured action parameters are malformed or locale-corrupted. |
| NF-A04 | Capability hallucination | Unsupported ability or action is claimed. |
| NF-A05 | Transaction confirmation | Consequential action proceeds or is claimed without correct confirmation. |
| NF-S01 | State/memory | Task-critical state is lost or mutated. |
| NF-R01 | Correction/recovery | System cannot recover after a correction or failure. |
| NF-H01 | Handoff/escalation | Handoff is wrong, absent, context-free, or false. |
| NF-Q01 | Safety parity | Safeguards materially differ across language/locale. |
| NF-U01 | Native UX | Functionally correct but operationally non-native experience. |

Each material failure receives one primary code, zero or more secondary codes,
the earliest visible lifecycle stage, severity, and diagnostic confidence. Do
not infer hidden implementation root cause from black-box behavior.

## 17. Sampling and adjudication

### Instrument pilot

The first execution is a minimum viable field pilot: three access-stable agents
× three mission families × three language conditions = 27 attempted cells.
Select targets only after the access audit and freeze the exact manifest. The
mission families are:

1. constraint-rich discovery or decision;
2. conditional/negative capability boundary; and
3. corrective multi-turn recovery or escalation boundary.

This pilot validates access, observability, language equivalence, scoring, and
the evidence instrument. It is not a ranking sample and cannot support
agent-level NPG or RAC claims merely because all 27 cells were attempted.

The complete 10-agent × 7-seed × 3-language catalog contains 210 candidate
surfaces. It is a case library for selective expansion after the pilot, not a
required first pass.

Repeat in a targeted second pass:

- every O0–O2 result;
- every false-resolution candidate;
- every disputed language result; and
- selected successful controls.

Default repetition for promoted failures is up to three independent attempts.
Do not manufacture independence from cached or deterministic replay, and do
not retry selectively to erase provider or access failures.

### Reviewer requirements

Qualified human review is mandatory before production freeze for semantic
fidelity, native/pragmatic quality, locale fit, equivalent difficulty, disputed
Mission Success, false-resolution candidates, ambiguous policy cases, unclear
handoff state, and every Shoreline promotion candidate.

Record reviewer basis, confidence, limitations, disagreement, adjudication, and
reason. Do not average away dissent or fabricate review metadata.

### Pilot exit

Freeze the production instrument only when access classifications are stable,
language forms are reviewed, adjudicators can apply the outcome and effort
rubrics consistently, false resolution can be distinguished from unverifiable
completion, at least three autonomy levels are meaningfully observable in the
cohort, and the failure taxonomy covers most material cases without uncontrolled
proliferation.

## 18. Promotion to Hotel Shoreline

Promote only three to five field failure clusters in v0.1.

### Mandatory gates

All must pass:

1. **Reproducible:** appears in at least two of three repeat attempts in a
   condition or has equivalently strong evidence.
2. **Material:** S2+, except an unusually important S1 mechanism.
3. **Generalizable:** expressible without proprietary implementation details.
4. **Controllable:** Hotel Shoreline can provide deterministic ground truth.
5. **Intervenable:** at least one plausible system-layer intervention exists.
6. **Ethically suitable:** no exploitation, unauthorized access, or destructive
   behavior is required.
7. **Not merely cosmetic:** style alone qualifies only when meaning, trust, or
   action materially changes.

### Exact promotion rubric

| Dimension | Range | Anchor |
| --- | ---: | --- |
| Recurrence | 0–3 | 0 isolated; 1 repeated in one agent; 2 in two agents/locales; 3 in three agents or two archetypes. |
| Business impact | 0–3 | 0 cosmetic; 1 friction; 2 abandonment/escalation/wrong decision; 3 consequential action or serious trust/money/service/risk. |
| Reproducibility | 0–2 | 0 unstable; 1 partial; 2 reliable wild reproduction. |
| Cross-system generalizability | 0–2 | 0 company-specific; 1 plausible pattern; 2 clearly generalizable. |
| Causal tractability | 0–2 | 0 no controlled analogue; 1 indirect; 2 clean deterministic analogue. |
| Interventionability | 0–2 | 0 no lever; 1 plausible lever; 2 multiple separable hypotheses. |
| Native-adoption relevance | 0–2 | 0 unrelated; 1 partial; 2 directly tests native operational equivalence. |

Maximum score: 16.

Promotion requires `score >= 11` and every mandatory gate. If more than five
qualify, prioritize cross-archetype recurrence, business impact, causal
separation, intervention diversity, and relevance to the core thesis.

## 19. Hotel Shoreline reproduction protocol

For each promoted cluster:

1. State a one-sentence observable failure signature without hidden-root-cause
   language.
2. Create the smallest case envelope and SDK semantic contract that preserve
   the critical fact, state transition, correction, expected action, and failure
   opportunity.
3. Add deterministic fictional world truth and typed, allowlisted tools.
4. Run and retain the versioned Google baseline.
5. Preregister the causal hypothesis.
6. Freeze the baseline before inspecting intervention results.

A reproduction is faithful when the controlled system exhibits the same
observable failure signature, not identical wording or proprietary behavior.

## 20. Google intervention protocol

The current repository uses Genkit/Gemini through an app-owned planner port.
The first intervention families should be small and separable:

1. localized instruction/context;
2. explicit locale and market state;
3. canonical semantic representation;
4. localized tool descriptions/examples;
5. schema validation/normalization;
6. locale-filtered retrieval;
7. post-action outcome verifier;
8. specialized router/verifier model;
9. a combination only after isolated arms justify it.

For every arm report Mission Success, task-critical information, exact
action/argument correctness, recovery, false resolution, ACE, latency,
usage/cost when available, and `en`/`es-ES`/`pt-PT` holdout results.

Call an intervention **validated in the controlled Hotel Shoreline
reproduction** only when it:

- improves the preregistered target measure;
- succeeds on unseen holdout variants;
- creates no new S3/S4 regression;
- reports language-control results; and
- is fully versioned and reproducible.

Do not claim third-party production effectiveness.

## 21. Comparative interpretation

The study may compare public observations with Shoreline only as a reference
envelope, not as a universal leaderboard. A defensible statement is:

> On the matched mission signature and observable outcome rubric, the controlled
> intervention reached X/Y successful runs while the declared public reference
> observations reached A/B under their separately documented conditions.

Avoid “Gemini beat Agent Y” unless identical cases, access boundaries,
observability, review, sample, and system responsibility make that claim valid.
Public systems may have different tools, policies, authentication, releases,
and risk boundaries. The stronger Google-first story is measured improvement:
Gemini baseline → diagnosed failure → isolated treatment → holdout success,
with public observations showing why the problem matters.

## 22. Customer-value and operator handoff

Every scenario records a mechanism rather than invented financial loss:

- lost conversion or abandonment;
- avoidable or repeat support contact;
- wrong purchase or booking;
- refund/rework exposure;
- policy miscommunication;
- unnecessary escalation;
- brand/trust damage;
- operational delay; or
- privacy/risk exposure.

The public report should lead with aggregate/cross-system patterns. A private
operator brief may include system-specific evidence when access, terms,
publication policy, and factual review allow it. The brief separates factual
correction, company response, researcher interpretation, and controlled
analogue. Paid work does not buy favorable findings.

This supports an ethical “find the failure and demonstrate a treatment” motion,
not a bug-bounty claim. Use language such as **Native Adoption Snapshot** or
**responsible research handoff** unless a company explicitly establishes a
program or invites testing.

If an operator accepts the handoff, do not reuse the public protocol as implied
authorization. Create a separate agreement and protocol covering the authorized
environment, data handling, baseline, intervention, success criteria, security
and privacy review, stopping conditions, rollback, publication, and ownership.
Only that matched operator-side evidence may support a statement that a remedy
improved the external system.

## 23. Preregistered hypotheses

- **H1:** native parity gaps increase with autonomy level.
- **H2:** material native failures often emerge downstream of correct language
  understanding.
- **H3:** market-specific grounding produces larger gaps than generic reasoning.
- **H4:** cross-language transitions increase state-mutation risk.
- **H5:** false resolution increases near action and recovery boundaries.
- **H6:** targeted state, schema, retrieval, tool, and verification
  interventions can close controlled native-adoption gaps without replacing the
  foundation model.

These remain hypotheses until supported by declared evidence.

## 24. Freeze, exit, and stop rules

Before production collection, freeze:

```yaml
study_version:
launch_cohort_version:
access_audit_version:
target_terms_evidence_version:
case_corpus_version:
language_review_version:
taxonomy_version:
measure_registry_version:
primary_questions:
primary_hypotheses:
sampling_plan:
repetition_policy:
exclusion_rules:
analysis_plan:
human_review_plan:
ethics_and_human_participation_determination:
publication_and_factual_correction_plan:
data_retention_and_sanitization_plan:
known_limitations:
```

The study succeeds when the cohort and cases are access-audited and reviewed;
evidence is attributable and immutable; all five primary measures are tested;
adjudication is reproducible; black-box and controlled evidence remain
separate; zero to five promotion outcomes are reported honestly; and every
published claim states its scope and limitations. A negative result is valid.

Pause or reduce scope when access is unstable or contrary to terms, fair
comparison is mostly impossible, higher autonomy is overwhelmingly
unobservable, reviewer disagreement dominates measured differences, automation
changes agent behavior, or adjudicators cannot apply a metric consistently.

Do not solve these problems by adding a generic crawler, leaderboard, large
platform, or broader claim.

## Appendix A — Per-run scoring card

```yaml
outcome:
  status: O4 | O3 | O2 | O1 | O0 | ON | OX
  mission_success: 1 | 0 | null
critical_information:
  score: 0.0-1.0
policy_grounding:
  result: PASS | PARTIAL | FAIL | NA
state:
  result: PASS | FAIL | NA
action_integrity:
  result: PASS | FAIL | NA
recovery:
  score: 0 | 1 | 2 | null
escalation:
  score: 0 | 1 | 2 | null
native_quality:
  score: 0 | 1 | 2 | null
resolution:
  claim: true | false
  actual_verifiable: true | false
  false_resolution: true | false | null
effort:
  ace_raw:
failure:
  primary_code:
  secondary_codes: []
  first_visible_stage: input | understand | decompose | retrieve_reason | act | respond
  severity: S0 | S1 | S2 | S3 | S4
  diagnostic_confidence: low | medium | high
```

## Appendix B — Core formulas and invariants

```text
MSR = successful observable runs / eligible observable runs
NPG = MSR(reference) - MSR(target)
FRR = false-resolution events / eligible runs containing completion claims
FRP = false-resolution events / all eligible observable runs
ACE_raw = sum(weighted agent-induced effort events)
RAC = highest contiguous A-level with n >= 6, MSR >= .80, FRR = 0,
      no S3/S4 action-integrity failure
```

Study invariants:

- semantic contract before wording;
- functional equivalence before literal translation;
- absolute capability before parity;
- customer mission before response style;
- observable evidence before diagnosis;
- unsupported capability is not automatically failure;
- correct escalation can be success;
- false success is more serious than explicit uncertainty;
- no public destructive testing;
- no composite Native Adoption index;
- no intervention after looking at outcomes without a new preregistered version;
- no production-fix claim from a Shoreline experiment; and
- negative findings are valid findings.
