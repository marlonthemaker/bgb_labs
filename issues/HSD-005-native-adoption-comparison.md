# HSD-005 — Controlled Native-Adoption Comparison

**Status:** Ready for delivery — local and real-provider gates recorded
**Repository:** `hotel_shoreline`
**Depends on:** HSD-004
**Branch:** `feat/hsd-005-native-adoption-comparison`

## Entry gate

Do not create the HSD-005 branch until HSD-004 has deployed success and
zero-operation failure evidence, PR #2 is merged, and `main` is green. Locale
content may be drafted earlier, but it cannot be marked reviewed without an
identified qualified human reviewer and a representation-limitation record.

Entry gate satisfied on 2026-08-26: PR #2 merged as `36d02f6`, the branch was
created from that merge, and the HSD-004 completion record contains deployed
success, zero-operation failure, IAM, logging, and responsive evidence.

## Analysis checkpoint — 2026-08-26

### Current implementation state

- `shoreline.ts` owns one English fixture, semantic contract, manually frozen
  graph, and two typed adapters. It has no case, locale, review, expected-outcome,
  or representation-limitation registry.
- `taskmaster.ts` owns a safe single-event planner → parse/budget → SDK
  validation/execution boundary. It is intentionally coupled to the one
  Shoreline contract and tool factory and should remain the HSD-004 reference
  path while HSD-005 introduces a case-parameterized orchestration boundary.
- `genkit-planner.ts` currently places the exact contract ID, constraints,
  tools, and tool arguments in every prompt. Reusing it unchanged for both arms
  would leak the intervention into the baseline and invalidate `HSD5-E-001`.
- `taskmaster-view.ts` and `run-demo.tsx` expose a privacy-safe single-run
  projection only. They do not expose case/locale/review/treatment,
  configuration equivalence, deterministic measures, exclusions, or a paired
  comparison.
- No `native-adoption/` code or tests exist. Persistence remains HSD-007 scope;
  HSD-005 should keep one comparison session in memory and return a sanitized
  projection without inventing a database abstraction.

### Planned files and dependency direction

Create app-owned modules under `hotel_shoreline/src/lib/native-adoption/`:

- `cases.ts`: immutable case/variant/review/expected-outcome registry and typed
  validation;
- `interventions.ts`: immutable baseline and contract-guidance specifications;
- `conditions.ts`: paired-condition construction, canonical configuration
  hashing, and typed ineligibility/exclusion reasons;
- `evaluation.ts`: named measure numerators/denominators and first-loss stage;
- `orchestrator.ts`: fresh-arm execution against injected planning and scenario
  ports, preserving candidate and terminal evidence;
- `view.ts`: allowlisted comparison projection/parser for the API and browser.

Add direct tests at the paths already registered in `TESTING.md`, plus a narrow
comparison API/UI and `e2e/native-adoption.spec.ts`. Refactor the provider
adapter only enough to accept an explicit app-owned planning specification:
baseline receives the authored request/transcript and generic graph schema;
intervention receives that identical input plus versioned contract guidance.
The SDK remains unchanged and neither provider nor locale types may cross into
it.

### Risks and decisions

- Human language review cannot be completed by automated checks or model-authored
  text. All variants therefore remain `pending_review` until identified qualified
  humans approve equivalence, register, and limitations. This is non-blocking for
  engineering execution but excludes those attempts from reviewer-qualified
  aggregate claims. Do not fabricate reviewer identity or lower the claim gate.
- The corrective family needs an immutable authored transcript, not a flattened
  sentence that hides the correction. Model it as ordered turns in the case
  registry and render those turns without adding an interactive chat product.
- Configuration hashing must use a deterministic canonical representation and
  must exclude timestamps/run IDs while including every comparison-critical
  model, prompt, budget, fixture, tool, case, locale, contract, and treatment
  version.
- Provider failure, validation rejection, and partial execution are outcomes,
  not reasons to delete an attempt. Eligibility and comparison inclusion are
  separate typed decisions.
- The 18-run external gate can demonstrate the workflow but not an effect. The
  USD 20 project budget and provider quota must be observed before choosing the
  optional 54-run descriptive sample.

### Verification plan

Run `pnpm test:unit` after slices 1–4, `pnpm test:integration` after the
condition/orchestration slice, and `pnpm test:e2e` after the comparison
inspector. Before review, run `pnpm check`, `pnpm typecheck`, `pnpm test:all`,
`pnpm build`, and `git diff --check`; run the real-provider matrix separately
and retain every attempt with its eligibility reason.

## Outcome

Demonstrate a small, pre-specified, paired comparison of baseline planning and
semantic-contract-guided task assurance across versioned `en`, `es-ES`, and
`pt-PT` variants with explicit review state. A run must make the request, semantic contract, candidate
graph, validation decision, tool calls, terminal state, and configuration
inspectable. This is a controlled demonstration of a diagnostic/intervention
method, not evidence of broad language, cultural, model, or hotel-operations
parity.

The intervention is deliberately narrow: the planner may propose a graph, but
the assurance runtime rejects plans that lose declared critical facts, violate
constraints, select undeclared tools, or produce prohibited effects. It must
not silently translate, repair, or overwrite the authored language variant.

Read `hotel_shoreline/EVALUATION_PROTOCOL.md` before implementation.

## Frozen treatment contract

The comparison isolates one planning intervention while keeping execution
safety constant.

| Condition | Planner receives | Shared after planning |
| --- | --- | --- |
| Baseline | Authored locale transcript, shared tool signatures and synthetic operational context, generic graph schema with a shared opaque contract key, declared planning budget, and no semantic-contract guidance. | Candidate captured unchanged; full Native Agent validation against the frozen contract; rejected candidates remain evidence and execute no tool; valid candidates use the same typed adapters. |
| Intervention | The identical transcript, operational context, schema, model/configuration, and budget plus the semantic contract and its versioned contract-guidance instructions. | The identical Native Agent validation, typed adapters, fresh fixture, evidence projection, and measure derivation. |

The intervention is therefore contract guidance during decomposition, not a
permission to repair output, change decoding settings, retry selectively, or
bypass validation. Both arms are safe to demonstrate: a baseline candidate may
be rejected more often or reach an operational adapter failure when its
arguments lose a critical fact, while an unsafe or contract-invalid candidate
is preserved and rejected rather than executed. Evaluation compares the
original candidates and truthful terminal outcomes; it never mutates either arm
into a pass.

## Acceptance criteria

| ID | Observable criterion | Test layer |
| --- | --- | --- |
| HSD5-D-001 | Three authored case families—compound, conditional/negative, and corrective/multi-turn—have versioned semantic contracts, expected operational outcomes, and explicit review-ready `en`, `es-ES`, and `pt-PT` variants. Pending variants execute but remain ineligible for reviewer-qualified aggregate claims. | Unit / review |
| HSD5-D-002 | Every locale variant links to exactly one semantic-contract version, fixture/tool version, review record, and representation limitation. | Unit |
| HSD5-I-001 | Each treatment arm references a versioned intervention specification with target lifecycle failure, proposed mechanism, parameters, activation condition, regression check, and rollback/rejection condition. | Unit / review |
| HSD5-E-001 | A matched baseline and intervention run record the same case, locale, fixture, model/version, decoding/budget settings, and run mode; only declared treatment differences may vary. | Integration |
| HSD5-E-002 | The evidence projection calculates descriptive task-completion, critical-information-retention, constraint-preservation, task-graph-validity, tool/argument-correctness, verified-completion, and prohibited-action measures from versioned run facts. | Unit / integration |
| HSD5-E-003 | Invalid, interrupted, pending-review, unsupported-locale, or non-comparable runs are retained with a reason and excluded from aggregate comparison by default. | Unit / integration |
| HSD5-UI-001 | Users can inspect the locale, source request, contract, mode, configuration, lifecycle diagnosis, outcome, measure definitions, and stated limitation for each run. | E2E |

## Test and error strategy

Predefine expected operational outcomes and measurement rules before executing
the compared runs. Treat case and locale as blocking factors: baseline and
intervention observations are paired within the same case/locale/fixture/model
condition, with fresh state for every run. Preserve raw run records and invalid
runs; derived measures may reference them but may not mutate them.

Test contract-to-fixture references, review gating, intervention-version
immutability, fresh-state isolation,
configuration equivalence, measure calculations, and invalid-run exclusion. Do
not use runtime translation as a hidden fallback. Human review is required for
pragmatics, register, idiomaticity, or cultural interpretation; automated
checks only establish deterministic properties.

Boundary cases must include duplicate case/variant/version identifiers,
unknown locale, missing or pending review, mismatched fixture/tool/contract
versions, changed model or planning budget, malformed candidate, provider
failure, validation rejection, partial tool failure, zero-denominator measure,
prohibited effect, and a derived record whose source hash does not match the
run. Every attempted run remains visible with an eligibility or exclusion
reason.

## Implementation slices inside HSD-005

These slices are ordered and non-overlapping. They remain one issue/PR because
the value gate is the matched comparison, but each slice should be a separate
reviewable commit.

1. **Case and review registry (`HSD5-D-*`).** Define immutable case families,
   authored locale variants, expected outcomes, provenance, review state, and
   representation limitations. No planner or scoring code belongs here.
2. **Intervention registry (`HSD5-I-001`).** Define immutable treatment
   versions and activation/regression/rollback rules. It may describe a
   treatment but cannot execute or score one.
3. **Run-condition builder (`HSD5-E-001`, `HSD5-E-003`).** Construct paired
   baseline/intervention specifications, hash comparison-critical
   configuration, and return typed exclusion reasons before orchestration.
4. **Evaluation (`HSD5-E-002`).** Derive individually named measures,
   numerators, denominators, and first-loss stage from immutable evidence. No
   aggregate “native score” and no model self-grading.
5. **Controlled orchestrator (`HSD5-E-*`).** Execute fresh, independent arms;
   preserve original candidates and all terminal states; never silently retry,
   translate, repair, or discard.
6. **Minimal comparison inspector (`HSD5-UI-001`).** Show one selected pair,
   its source facts, measures, exclusions, and limitations. HSD-006—not this
   issue—owns historical navigation, polished dashboards, export, and the
   submission-grade responsive experience.

Planned application paths are `src/lib/native-adoption/cases.ts`,
`interventions.ts`, `conditions.ts`, `evaluation.ts`, and `orchestrator.ts`,
with a narrow presentation projection. If implementation reveals a genuinely
domain-neutral SDK primitive, record a follow-up instead of expanding the SDK
during this issue.

## External evidence gate

Engineering completion requires at least one real-provider paired attempt for
each of the nine case-locale blocks (18 attempted runs), with invalid/provider
failed attempts retained. This supports an illustrative workflow observation
only. Three repetitions per arm (54 attempted runs) are required before
reporting a scoped descriptive difference under the protocol. If reviewer,
time, quota, or cost constraints prevent that sample, reduce the claim rather
than omitting attempts or weakening provenance.

## Domain, traceability, and delivery

The Scenario context owns authored variants, review status, and expected
outcomes. The Intervention context owns the versioned treatment definition; it
does not judge the result. The Assurance Runtime evaluates graphs, not language
quality. The Evaluation context owns only deterministic measure derivation and
comparison eligibility; it may not infer native quality or activate a
treatment. `HSD5-D-001` maps to case and variant validation, `HSD5-D-002` to
provenance validation, `HSD5-I-001` to intervention validation,
`HSD5-E-001` to matched-run integration tests, `HSD5-E-002` to measure
calculation tests, `HSD5-E-003` to invalid-state tests, and `HSD5-UI-001` to a
browser comparison flow. QA records fixture, contract, model, planner, prompt,
locale, reviewer, budget, intervention version, and invalid-run reason. Add
actual paths to `TESTING.md`; never substitute model-generated translations for
review.

Update the root/package roadmaps, contract provenance, limitations, and this
Completion Record. Branch/commits/review use `TEMPLATE.md`; comments may only
explain review, representation, or comparison invariants.

## Scope boundaries

Exactly three case families and three declared locale variants; no broad
benchmark, real guests, hidden translation, or research claim. Measures are
descriptive controlled evidence only. Any aggregate difference is an
exploratory observation unless the protocol's review and repetition conditions
are met.

## Implementation checkpoint — 2026-08-26

- `src/lib/native-adoption/cases.ts` defines three immutable case families,
  nine authored variants, version links, expected outcomes, provenance, pending
  review state, and representation limitations. The tests assert structural and
  operational invariants without freezing reviewer-editable prose.
- `interventions.ts` and `conditions.ts` define immutable treatment versions,
  canonical SHA-256 condition hashes, matched shared configuration, and typed
  aggregate exclusions. Pending review does not block a run.
- `orchestrator.ts` gives every arm fresh adapter state, preserves provider,
  budget, parse, validation, and execution failures, and never retries or repairs
  a candidate. A timeout-classification race found by the suite was corrected.
- `evaluation.ts` derives seven named descriptive measures with explicit
  numerators and denominators plus first-loss stage from hash-linked evidence.
  Zero denominators remain undefined and stale source hashes fail closed.
- The deterministic planner supplies transparent frozen candidates for reliable
  engineering demonstration. The Genkit adapter uses the same transcript, tool
  interface, operational context, model settings, schema, and budget in both
  arms; only the contract-guided arm receives semantic-contract guidance.
- `/api/native-adoption` returns a parsed, sanitized comparison projection. The
  browser inspector exposes source turns, review state, contract, condition,
  graph, lifecycle, validation, operations, measures, exclusions, and limitations.
- `hotel_shoreline/NATIVE_REVIEW_GUIDE.md` tells future native-language and
  construct-validity reviewers exactly what to edit, what not to mutate, how to
  record disagreement, and which QA gates to rerun.

Human review is a future evidence-qualification improvement and is not an
engineering blocker; no reviewer-backed result may be claimed until it is
recorded. Git commit, PR CI, merge, and the post-merge status update remain
delivery work requiring approval.

The first unpaced matrix attempt on 2026-08-26 retained all 18 arms but all
ended `planning_failed` with zero operations; the immediately following HSD-004
smoke also received `PLANNER_UNAVAILABLE`. One isolated post-cooldown HSD-004
smoke then passed in 10.3 seconds. A focused HSD-005 check exposed an additional
provider incompatibility with a literal structured-output field; replacing it
with a shared opaque string field preserved treatment isolation, and the focused
real-Gemini pair then passed in 18.8 seconds: baseline rejected safely with zero
operations and the contract-guided arm succeeded with two.

The corrected paced nine-block matrix completed in 4.6 minutes and retained all
18 arm attempts, all of which were provider-unavailable with zero operations
after the focused run. A later isolated, secret-safe diagnostic request received
HTTP 429 / `RESOURCE_EXHAUSTED` for the model's free-tier daily request quota
(limit 20), confirming that this failure sequence exhausted provider quota.
Read-only Cloud checks confirmed that `native-agent-poc` has billing and the
Generative Language API enabled, but that does not establish the local key's
paid Gemini API tier.
The shared adapter now maps that response to `PLANNER_QUOTA_EXHAUSTED` without
retaining raw provider detail; it never retries either arm. The gate establishes
attempt retention across all nine blocks plus one successful real-provider
comparison; it is not effect evidence. Future Gemini runs emit an ignored HTML
report so successful test attachments remain inspectable without entering Git.

## Completion Record

**Branch used:** `feat/hsd-005-native-adoption-comparison`

**Commits:** Proposed below; not created without delivery approval.

**Review / PR:** Pending commit and PR. Local strict review found and fixed a
timeout-classification race, unsupported provider literal schema, invalid-JSON
500 response, unsupported-locale 500 response, generated `next-env.d.ts` drift,
and loss of the provider's quota classification at the sanitized planning
boundary.

**Acceptance evidence:** `HSD5-D-*` has three families, nine structurally
review-ready draft variants, fresh/replay-safe adapters, and explicit pending
review exclusions. `HSD5-I-001` has two immutable treatment specifications.
`HSD5-E-*` has canonical matched conditions, seven numerator/denominator
measures, stale-hash rejection, fresh-arm orchestration, safe failure retention,
one successful real Gemini pair, and 18 retained corrected-matrix arm attempts.
`HSD5-UI-001` has a sanitized responsive comparison inspector and browser/API
failure evidence.

**QA commands and results:**

- `pnpm check` — passed, 60 files.
- `pnpm typecheck` — passed for both packages.
- `pnpm test:all` — passed: 54 unit tests, 25 integration tests, and 10
  deterministic browser tests; 3 quota-bearing provider tests skipped by design.
- SDK coverage — statements 94.47%, branches 87.69%, functions 96.77%, lines
  94.40%.
- Hotel Shoreline coverage — statements 91.16%, branches 86.36%, functions
  100%, lines 93.36%.
- `pnpm build` — passed; `/`, `/api/taskmaster`, and
  `/api/native-adoption` built successfully.
- Focused real Gemini comparison — passed in 18.8 seconds; baseline rejected
  with zero operations and contract-guided succeeded with two.
- Paced real Gemini matrix — passed the attempt-retention test in 4.6 minutes;
  all 18 arms failed planning with zero operations; a later isolated diagnostic
  confirmed exhausted free-tier daily request quota. These attempts remain
  unsuitable for an effect claim.
- `git diff --check` — passed. Secret-pattern diff scan returned no findings.

**Docs updated:** Root/package capability and roadmaps, testing traceability,
comparison protocol, issue index, agent rules, cloud status, and the new
`NATIVE_REVIEW_GUIDE.md`. Obsolete untracked `GOOGLE_CLOUD_SETUP 2.md` was
removed. Next.js 16.3.2's generated `next-env.d.ts` is removed from tracking and
ignored per installed framework documentation.

**Known limitations / follow-up:** All language surfaces are project-authored
drafts and excluded from reviewer-qualified aggregates. The matrix exhausted
the free-tier daily request quota and shows no effect; a 54-attempt reviewed
descriptive sample still requires deliberate quota/cost capacity before a
scoped difference. Runs are in memory/test artifacts only until HSD-007.
HSD-006 owns presentation polish and export.

**Next issue readiness:** HSD-007 analysis may begin after this branch is
committed, CI passes, and the PR merges. Do not start persistence on this branch.

**Proposed commits:**

```text
feat(demo): add controlled native-adoption comparison [HSD-005]
test(demo): verify matched comparison evidence [HSD-005]
docs(hsd): document comparison and native review workflow [HSD-005]
```
