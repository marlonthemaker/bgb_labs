# Native-Language Review Guide

Hotel Shoreline can execute every authored variant before human review so
engineering and provider work are not blocked. Those runs are deliberately
marked `pending_review` and excluded from reviewer-qualified aggregate claims.
Human review upgrades the evidence boundary; it does not unlock execution.

## What reviewers own

Reviewers edit only the authored language surface and its review record in
`src/lib/native-adoption/cases.ts`. For each `en`, `es-ES`, or `pt-PT` variant,
review:

- semantic equivalence to the case's expected operational outcome;
- entity, room, quantity, negation, condition, cancellation, and correction
  retention;
- regional usage, hospitality register, politeness, ambiguity, and idiomaticity;
- whether the ordered corrective turns sound like one coherent interaction;
- safety implications or representation limitations the team must disclose.

Do not edit a translation merely to make it easier for a model. If natural
wording exposes a planner weakness, retain the wording and record the result.
Do not change contracts, expected outcomes, fixtures, tool schemas, evaluation
formulas, or treatment prompts during language review. If the intended meaning
itself is wrong or culturally inappropriate, stop and request a new case and
contract version so earlier evidence remains attributable.

## How to record an approved revision

For the reviewed variant:

1. Edit `turns[].text` without changing turn order or speaker ownership.
2. Increment the variant version; use a stable release such as `1.0.0` after
   approval rather than the draft suffix.
3. Set `provenance` to `human-revised`.
4. Replace `pending_review` with `human_reviewed` and record a non-secret
   reviewer identifier, role/qualification, ISO-8601 review time, confidence,
   notes, and at least one representation-limitation statement.
5. Run the checks below. The tests intentionally validate meaning-bearing
   structure and behavior without asserting exact prose, so legitimate text
   revisions should not require test rewrites.

Example review record:

```ts
review: {
  status: "human_reviewed",
  reviewerId: "reviewer-pt-01",
  reviewerRole: "native pt-PT speaker; hospitality operations reviewer",
  reviewedAt: "2026-09-01T12:00:00Z",
  confidence: "high",
  representationLimitations: [
    "Reviewed for European Portuguese hotel register; not validated for Brazilian Portuguese.",
  ],
  notes: "Preserves the correction and cancellation without adding an operational request.",
}
```

Reviewer identifiers must not contain an email address, credential, or other
unnecessary personal data. If reviewers disagree, keep the variant pending,
record both interpretations in the issue or a review artifact, and version the
accepted resolution. Never erase disagreement to qualify a result.

## Reviewer verification

From the workspace root:

```sh
pnpm check
pnpm typecheck
pnpm test:unit
pnpm test:integration
pnpm test:e2e
```

Then manually run the affected case/locale in the comparison inspector and
confirm the source turns, locale, review status, limitations, contract,
candidate graph, lifecycle, tool calls, and measures are visible. Reviewers do
not need to approve model output as good; they approve the language surface and
document its limitations.

## What future reviewers can improve

- Add a second independent reviewer and explicit adjudication metadata before
  making stronger language-comparison claims.
- Refine representation-limitation language with regional and hospitality
  expertise.
- Review measurement construct validity separately from language equivalence.
- Recommend new versioned cases for ambiguity, honorifics, indirect requests,
  code-switching, or locale-specific hotel practices; do not silently expand
  the frozen HSD-005 cases.
- Audit the baseline/intervention prompts for information leakage and the
  measurement dictionary for denominators, without changing completed-run
  versions in place.

The authoritative claim and sample-size rules remain in
`EVALUATION_PROTOCOL.md`. A `human_reviewed` flag supports scoped evidence; it
does not turn an illustrative demonstration into a general research finding.
