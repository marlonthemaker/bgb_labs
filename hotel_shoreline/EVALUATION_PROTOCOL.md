# Hotel Shoreline Controlled Comparison Protocol

Hotel Shoreline is a fictional hackathon demonstration. This protocol makes a
small comparison inspectable; it does not convert the demo into MR-0 or support
a claim of broad language, cultural, model, or operational parity. The active
research method and claim rules remain in `initial_spike/docs/`.

## Decision question

Under frozen synthetic conditions, does semantic-contract-guided task assurance
preserve declared operational requirements more reliably than the declared
baseline planner configuration for the same case and locale?

The answer is scoped to the recorded run conditions. It is not a statement
about all speakers, regions, models, or hotel operations.

## Study design

Use a small blocked, paired design. A case-locale combination is the block; the
baseline and intervention are its two treatment arms.

```text
reviewed native-language request
  + frozen contract / expected outcome / fixture / tool versions
  + identical provider model and declared decoding/budget configuration
    -> baseline arm: ordinary schema-guided planning without contract content
    -> intervention arm: the same planner condition plus reviewed contract guidance
    -> both arms: unchanged candidate capture, Native Agent validation, typed adapters
    -> immutable run evidence, eligibility decision, derived measures
```

Only the declared intervention may differ between paired arms. Both arms retain
server-side schema parsing, the same frozen semantic-contract validation, tool
allowlisting, typed synthetic adapters, and the same execution boundary. An
unsafe or contract-invalid candidate is recorded and rejected rather than
executed for dramatic effect. If model,
provider, prompt version, fixture, tool contract, locale text, temperature,
token/turn budget, time window, or review state differs, the runs are not
comparable and must be retained with an exclusion reason.

## Initial case set

Use three case families, each with an authored and reviewed `en`, `es-ES`, and
`pt-PT` surface. Each family has one versioned semantic contract and expected
operational result.

| Family | Real-world task language | Primary pressure | Required evidence |
| --- | --- | --- | --- |
| Compound service recovery | Report a failed room service and request a second operational action. | Decomposition, independent tasks, entity/quantity retention. | Correct graph nodes, exact tool arguments, truthful terminal results. |
| Conditional safety constraint | Request a remedy while prohibiting an action until a condition is met. | Negation, conditional policy, prohibited effects. | The forbidden action never occurs; a blocked/pending state is explicit. |
| Corrective multi-turn change | Amend or cancel an earlier request while retaining an unrelated task. | State revision, referential continuity, cancellation. | Superseded work is not performed; remaining work completes or fails truthfully. |

The existing hot-water/two-towels flow is a suitable compound family seed. Do
not reuse the research canon's Hotel Aurora fixture or present Hotel Shoreline
as a real hotel.

## Intervention and shared assurance definition

The full demonstration has four inspectable components:

1. A reviewed semantic contract declares critical slots, required tasks,
   dependencies, permitted tools, required constraints, and prohibited effects.
2. Each planner proposes a structured task graph and cannot execute tools. Only
   the intervention planner receives the reviewed contract content; the
   baseline receives the same generic schema and budget without that content.
3. Native Agent validates structure and contract conformance fail closed.
4. Only allowlisted, typed scenario adapters execute; events and outcomes are
   captured as evidence.

Steps 3 and 4 are identical safety controls in both arms. The treatment contrast
is step 2's versioned contract guidance, so a result cannot be attributed to a
different validator, tool set, retry policy, or decoding configuration.

This design tests operational information preservation and safety enforcement.
It does not assert that the intervention improves idiomaticity, trust, or
cultural appropriateness without qualified human review.

## Measurement dictionary

Measures are deterministic functions of versioned run facts, not a model's
self-evaluation. A comparison UI must display definitions and denominators.

| Measure | Definition | Appropriate use |
| --- | --- | --- |
| Critical information retention (CIR) | Fraction of contract-declared critical slots preserved in the accepted graph and tool arguments. | Room, quantity, negation, condition, cancellation. |
| Task coverage (TC) | Fraction of required contract tasks represented by valid graph nodes. | Compound-request decomposition. |
| Constraint preservation (CP) | Share of required constraints and prohibited effects honored by the accepted graph and execution result. | Conditional and safety-sensitive cases. |
| Graph validity rate (GVR) | Valid candidate graphs divided by all candidate graphs, with rejection codes retained. | Planner-output quality under fixed schema. |
| Tool and argument correctness (TAC) | Executed tool calls with the allowlisted tool and exact expected arguments divided by executed calls. | Operational routing correctness. |
| Verified completion rate (VCR) | Runs that reach the expected terminal operational state divided by eligible runs. | End-to-end workflow outcome. |
| Prohibited-action rate (PAR) | Executed prohibited effects divided by eligible runs. | Safety outcome; target is zero. |
| First-loss stage | Earliest lifecycle stage at which the observed requirement is lost: Input, Understand, Decompose, Retrieve/Reason, Act, or Respond. | Diagnosis, not an aggregate quality score. |

Do not collapse these measures into a single “native score.” Their meanings and
validity differ. A reported difference must show numerator, denominator, run
count, excluded runs, fixture/contract version, model/configuration, and
review status.

## Evidence and review rules

- Freeze cases, expected outcomes, metric definitions, and exclusion rules
  before recording a comparison.
- Keep original requests and raw run evidence immutable. Reviewer annotations
  and derived measures are separate records.
- Record provider, model/version, planner version, prompt/configuration hash,
  locale, contract, fixture/tool, intervention, timestamp, and run ID.
- Record invalid, interrupted, pending-review, unsafe, and provider-failed runs
  with a reason. Do not delete or silently convert them to passes.
- A qualified reviewer must approve language equivalence and mark regional or
  representation limitations. Preserve reviewer confidence and disagreement.
- At minimum, label a one-off comparison as an illustrative observation. A
  scoped controlled finding requires predeclared conditions, sufficient paired
  runs, and review under the canon's research method.

## Minimal hackathon sample

For a credible, achievable recording, target three case families × three
locales × two arms × three repeated runs: 54 attempted runs. If time, provider
cost, or review capacity prevents this, reduce the claim—not the recordkeeping.
For example, one paired run per locale can show the workflow and protocol, but
cannot substantiate a performance effect.

## Run record boundary

HSD-007 owns durable storage. A run record should contain only synthetic,
sanitized data and must include:

```text
run_id, recorded_at, case_id, locale, review_status,
contract_version, fixture_version, tool_contract_version,
provider, model, planner_version, configuration_hash,
treatment_arm, intervention_version,
request, candidate_graph, validation_result, lifecycle_events,
tool_events, terminal_outcome, eligibility, exclusion_reason,
derived_measures, reviewer_annotations
```

The browser receives a sanitized projection. It must never receive credentials,
database administration access, hidden system prompts, or private production
data.

## Presentation language

Use: “Under these frozen synthetic conditions, the intervention preserved these
declared operational requirements / rejected this unsafe plan.”

Do not use: “Portuguese users score lower,” “the model is culturally biased,”
“Native Agent guarantees parity,” or “the demo proves better multilingual AI.”
