# Hotel Shoreline Roadmap

Hotel Shoreline is a narrow, fictional demonstration—not a hotel product or
field-research environment. It makes one constrained workflow and its evidence
inspectable.

Individual issue metadata owns current delivery status; the root
[issue index](../issues/README.md) is its machine-checked derived view.
Individual issues own acceptance, QA, deployment, commit, and PR evidence.
This roadmap owns package sequence and capability gates.

## Lifecycle

| Stage | Issue | Package outcome | Gate |
| --- | --- | --- | --- |
| Foundation | HSD-001 | Strict Next.js shell with visible fictional, non-affiliation, and non-research disclosure. | Browser disclosure evidence. |
| Deterministic world | HSD-003 | Versioned synthetic fixture, typed hotel tools, fixed contract/graph, and ordered evidence. | Fresh state, idempotency, fail-closed inputs, and browser proof. |
| Agent workflow | HSD-004 | Server-side Gemini/Genkit planning through Native Agent validation and typed tools on Cloud Run. | Budget/error boundaries, zero-operation unsafe failure, deployed proof, and sanitized telemetry. |
| Controlled comparison | HSD-005 | Three case families × three authored locales × matched baseline/intervention evidence. | Treatment isolation, review gating, invalid-run retention, deterministic measures, and scoped claims. |
| Release security baseline | SEC-001 | Bounded public inputs, browser headers, supply-chain controls, and explicit dependency risk. | Pathological input, sanitized 413 failures, immutable CI, and audit disposition. |
| Evidence ledger | HSD-007 | Portable append-only PostgreSQL/Cloud SQL run history. | Provenance, sanitization, least privilege, idempotency, retention, and recovery. |
| Evidence experience | HSD-006 | Accessible historical comparison and privacy-safe export. | Truthful states, reproducible source facts, responsive and keyboard E2E. |
| Submission release | HSD-008 | Reproducible hackathon package and presentation. | Clean install, disclosure/claim review, live Cloud proof, and final full gate. |

```text
HSD-001 -> HSD-003 -> HSD-004 -> HSD-005 -> SEC-001 -> HSD-007 -> HSD-006 -> HSD-008
```

The controlled comparison protocol is
[`EVALUATION_PROTOCOL.md`](EVALUATION_PROTOCOL.md); reviewer rules are in
[`NATIVE_REVIEW_GUIDE.md`](NATIVE_REVIEW_GUIDE.md); and the approved persistence
boundary is in [`DATA_ARCHITECTURE.md`](DATA_ARCHITECTURE.md).

HSD-007 is complete: its record, in-memory/PostgreSQL repository, migration,
sanitized API, bounded Cloud SQL instance, append-only runtime role, and
merged-main Cloud Run persistence are locally, CI, and externally verified.
HSD-006 is in review: saved history, exact-record inspection, lifecycle and
provenance presentation, deterministic JSON export, and desktop/390 px failure
flows are locally verified. CI and merged-main deployment proof remain before
HSD-008 can become ready.

## Deferred until earned

- generic benchmark platforms, live hotel data, or scoreboards;
- authentication, real integrations, customer accounts, or billing;
- generic crawler, adapter, dashboard, or hotel-platform abstractions; and
- broad model, language, market, or research claims.
