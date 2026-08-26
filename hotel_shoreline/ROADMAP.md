# Hotel Shoreline Roadmap

Hotel Shoreline is a narrow, fictional demonstration—not a hotel product and
not the MR-0 research fixture. It makes one constrained workflow inspectable.

## Complete

### HSD-001 — Application foundation

- Next.js shell with strict TypeScript.
- Visible fictional, non-affiliation, and non-research disclosure.
- Browser E2E test for that public boundary.

### HSD-003 — Deterministic environment and vertical slice

Create an app-owned fictional fixture and a small deterministic tool set.
Demonstrate one manually planned English compound request through the SDK.

Completed and merged through PR #1: versioned, synthetic, run-isolated fixture;
idempotent tools; visible plan, validation, tool events, and outcome;
acceptance-traceable unit, integration, and browser tests. Local and GitHub
Actions gates passed. The implementation/review record is
[`HSD-003-deterministic-hotel-shoreline-vertical-slice`](../issues/HSD-003-deterministic-hotel-shoreline-vertical-slice.md).

### HSD-004 — Taskmaster agent and controlled planning boundary

Introduce a server-side, provider-neutral planning port backed by Genkit and
Gemini 3.5+, then deploy the event-to-outcome Taskmaster flow to Cloud Run.
Malformed, timed-out, unsafe, or unavailable planning output must fail closed
through the SDK without tool execution.

The deterministic local gate now covers the planner port, Genkit/Gemini adapter,
fixed event route, timeout, malformed output/envelopes, unavailable planning,
unsafe candidates, turn/token/node limits, actual candidate evidence, sanitized
server response and browser projection, structured run telemetry, and visible
success/failure lifecycles. The authorized real-Gemini smoke,
standalone/non-root image, Cloud Build, least-privilege identities, bounded
Cloud Run revision, deployed success and zero-operation failure evidence,
sanitized logs, responsive UI, and PR #2 CI passed; PR #2 merged as `36d02f6`.

### HSD-005 — Controlled native-adoption comparison

Engineering implementation, full-repository QA, a focused real-provider success,
and nine-block attempt retention are complete. Git delivery remains. Human review is
non-blocking for execution: all nine authored variants are explicitly pending
and excluded from reviewer-qualified claims until reviewers update them.

Run a small, pre-specified, paired baseline/intervention study across reviewed
`en`, `es-ES`, and `pt-PT` variants. Both arms use the same model condition,
Native Agent validation, and typed execution boundary; the intervention adds
only versioned, reviewed semantic-contract guidance during planning. This
isolates the treatment without giving the baseline unsafe execution authority.

Expose the request, reviewed semantic contract, candidate graph, validation,
tool calls, terminal outcome, model/configuration, and scoped limitations. The
demo may illustrate task-level preservation; it must not claim broad language
or cultural parity.

See [the controlled comparison protocol](EVALUATION_PROTOCOL.md).
The intervention boundary, reviewer edit surface, disagreement handling, and
verification steps are in [the native-language review guide](NATIVE_REVIEW_GUIDE.md).

## Next

### HSD-007 — Evidence ledger and bounded background delivery

Persist sanitized, versioned run records so the demo can compare historical
runs across model, locale, prompt/configuration, baseline/intervention arm, and
fixture/contract version. Use an append-only repository boundary with a local
test implementation and a PostgreSQL/Cloud SQL implementation. Add Cloud Tasks only if a
genuine delayed/background execution is needed for the demonstrable workflow;
it is not a substitute for a correct synchronous flow.

### HSD-006 — Evidence experience

Add the presentation-ready operational run and matched-comparison view,
privacy-safe evidence export, accessible failure states, and responsive flow.
The presentation layer reads sanitized historical evidence; it does not own
planning, evaluation, or tool authority.

### HSD-008 — Submission release

Add the architecture narrative, setup guide, limitations, third-party inventory,
video script, screenshot checklist, deployment proof, and clean-install
verification. No release claim may exceed demonstrated behavior.

## Deferred until earned

- generic benchmark platforms, live hotel data, or scoreboards that imply
  claims beyond the frozen controlled study;
- authentication, real integrations, or live hotel data;
- dashboards, customer accounts, billing, or a generic hotel platform;
- broad model, language, market, or research claims.
