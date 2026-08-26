# D003 — Repository and Research Consolidation

Date: 2026-08-26

Status: accepted

## Decision

Replace the standalone `initial_spike/` tree with one active monorepo authority:

- `research/canon/` owns durable native-adoption strategy, method, governance,
  productization, and commercial sequence;
- `research/ailitw/studies/` owns versioned field-study definitions;
- `docs/` owns cross-project architecture, product-surface, operations, and
  decision records;
- `issues/README.md` owns mutable HSD delivery status;
- package READMEs and roadmaps own package behavior and sequencing; and
- Git history owns superseded source artifacts and duplicate provenance.

Hotel Shoreline replaces Hotel Aurora as the active fictional controlled proof.
The former MR-0 plan and artifacts are retired, not silently treated as HSD
evidence. The Iberia study is the proposed post-HSD field program and remains
pre-pilot until its access and research gates pass.

## Rationale

The old tree contained 171 tracked files, including multiple exact copies,
generated conversation exports, a superseded fixture, and competing status
owners. Preserving all of it in the active worktree made current authority hard
to discover and increased the chance of executing stale plans.

The retained canon is small enough to review, while Git preserves every removed
artifact and its history. Research remains separate from both the reusable SDK
and the hackathon demonstration.

## Migration register

| Source | Disposition | Destination or reason |
| --- | --- | --- |
| Canon strategy, method, AILITW, engineering, applied-lab, commercial, governance, and glossary documents | Moved and reconciled | `research/canon/` |
| D001 and D002 | Retained as accepted historical decisions | `docs/decisions/` |
| Organization architecture and product-surface boundaries | Moved | `docs/architecture/` and `docs/product/` |
| Google Cloud bootstrap | Moved | `docs/operations/` |
| Hotel Aurora / MR-0 execution artifacts | Retired | Superseded by HSD; recoverable in Git history. |
| Duplicate canon exports, conversation outputs, ZIP export, and market-intelligence snapshots | Removed from active tree | Superseded/unverified provenance; recoverable in Git history. |
| Canon v0.2 MR-0 status and roadmap | Superseded | Root HSD roadmap and Iberia integration guide own current sequence. |
| Iberia 2026 study package | Retained and revised | `research/ailitw/studies/iberia-2026/` |

## Consequences

- `initial_spike/` is no longer an active path or documentation authority.
- No runtime package may import `research/`.
- Cloud build and container contexts exclude `research/`.
- Major changes to the research canon require a new decision record.
- Historical claims and artifacts must be recovered from Git rather than linked
  as active instructions.
- D003 supersedes the path and current-task consequences of D001 and D002; it
  does not rewrite their historical rationale.
