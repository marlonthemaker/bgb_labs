# D002 - Documentation Authority And Selective Archive Promotion

Date: 2026-08-21

Status: accepted

## Decision

Keep one explicit documentation hierarchy:

1. `docs/` contains durable operating canon.
2. `decisions/` records accepted semantic changes to that canon.
3. `research/` contains active studies, task state, and research inputs.
4. `README.md` is an orientation layer derived from the canon.
5. `AGENTS.md` is an execution contract derived from the canon.
6. `archive/` preserves provenance and extraction sources but has no execution authority.

Promote archived guidance only after reconciling it with current canon. Record the disposition of significant archived concepts in `MIGRATION.md` as promoted, adapted, deferred, rejected, or retained as a hypothesis.

Operational task state must have one owner. During MR-0, `research/mr0/README.md` owns the current-task pointer. Canon and agent guidance may link to that index but must not duplicate a mutable next-task declaration.

## Rationale

Canon v0.2 correctly removed premature platform and product assumptions, but the reset also compressed durable mission, research, product-maturity, commercial, and governance guidance too aggressively.

Restoring all archived documents would recreate the original scope problem. Selective promotion preserves institutional memory while keeping current authority small, reviewable, and internally consistent.

Separating canon, orientation, execution instructions, and task state reduces drift. It also lets a future agent determine whether a statement is a durable decision, a current activity, a research hypothesis, or historical provenance.

## Consequences

- Canon v0.2 is hardened rather than replaced.
- `README.md` may summarize strategy but cannot redefine it.
- `AGENTS.md` may impose repository execution rules but cannot silently add product or research strategy.
- Exact prices, outreach targets, target-company lists, and dated market claims remain research inputs until separately reviewed.
- Earlier platform, graph, registry, API, and dashboard plans remain deferred until current productization gates are met.
- Public-agent growth tactics remain gated by the controlled-method and responsible-access requirements in the active AILITW canon.
- Major future semantic changes require a decision record and an update to affected canonical documents.

## Supersession

This decision complements `D001-canonical-reset-v0.2.md`. It does not restore Canon v0.1 or the previous platform-first program as authority.
