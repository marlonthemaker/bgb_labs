# D004 — Active-Tree Authority and Historical Recovery

Date: 2026-08-27

Status: accepted

## Decision

Keep the working tree limited to documentation that governs current behavior,
research, operations, delivery, evidence interpretation, or accepted decision
provenance. Git history—not active duplicate files—owns retired terminology,
generated agent hints, and prior status snapshots.

Specifically:

- D003 and this decision are the active repository-consolidation authority;
- accepted D001 and D002 remain inspectable with explicit `superseded` status;
- root `AGENTS.md` is the only tracked agent instruction file;
- package-generated `AGENTS.md` and `CLAUDE.md` files are ignored, while root
  guidance points directly to the installed Next.js documentation;
- individual issue metadata owns mutable issue status and the issue index is a
  machine-checked derived view; and
- README files describe current capabilities, while roadmaps describe lifecycle
  order and gates without duplicating merge histories.

## Recovery register

| Removed active-tree record | Recovery | Durable replacement |
| --- | --- | --- |
| `hotel_shoreline/AGENTS.md` and `hotel_shoreline/CLAUDE.md` | `git show fdc226f:<path>`; Next.js also regenerates them | Root `AGENTS.md` and installed Next.js documentation. |
| Finder-style `* 2*` duplicates and ignored editor/test duplicates | Exact canonical sibling or reproducible generated output | Canonical file, current test output, or Git-tracked source. |

## Retention rule

Keep a document when it uniquely owns at least one of:

- current behavior or product capability;
- lifecycle sequence or an approved future gate;
- acceptance criteria, QA evidence, deployment proof, or rollback procedure;
- current research method, study definition, review rule, or claim boundary; or
- an operational process that cannot be reconstructed safely from source code.

Remove it from the active tree when every meaningful statement is duplicated,
generated, or recoverable from a named Git point and retaining it would create
a competing authority. Accepted decision records remain with explicit
supersession metadata.

## Consequences

- Completed HSD and repository issue records remain because they uniquely own
  acceptance and delivery evidence.
- The issue index is validated from issue-file metadata rather than becoming a
  second independently edited status authority.
- Current research canon, the Iberia study package, and cloud/deployment
  runbooks remain because they have distinct active responsibilities.
- Historical terminology is not enumerated in the active glossary; recover it
  from Git only when investigating provenance.
- No Git history is rewritten, and no product runtime behavior changes.
