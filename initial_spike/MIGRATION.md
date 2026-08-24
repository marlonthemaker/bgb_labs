# Migration To bgb_labs Canon v0.2

Date: 2026-08-21

Status: complete

## Summary

This repository consolidates previous generated bomgoodbueno, AI Native Adoption, Language Mesh, AILITW, and Hospeda materials into a durable root:

`/Users/marlonfrausto/Documents/bgb_labs`

The migration does not delete source artifacts. It imports and preserves them under `archive/`, then installs Canon v0.2 as the active operating layer under `docs/`.

The migration includes the documentation-hardening and selective-promotion work accepted in decision `D002`.

## Imported Sources

- Previous program archive:
  - `archive/previous-canon/ai-native-adoption-program/`
- Previous canonical foundation:
  - `archive/canonical-v0.1/bomgoodbueno-canonical-foundation-v0.1/`
- Related conversation/generated output provenance:
  - `archive/conversations/`
- Market intelligence outputs:
  - `research/ailitw/market-intelligence/`

## Active Canon

Canon v0.2 is installed in:

- `docs/00_INDEX.md`
- `docs/01_ORG_STRATEGY.md`
- `docs/02_NATIVE_ADOPTION.md`
- `docs/03_RESEARCH_METHOD.md`
- `docs/04_AILITW.md`
- `docs/05_MR0.md`
- `docs/06_PRODUCT_ENGINEERING.md`
- `docs/07_APPLIED_LAB.md`
- `docs/08_ROADMAP.md`

## Migration Principle

Old work remains valuable. It is no longer automatically authoritative.

When old materials conflict with Canon v0.2, Canon v0.2 wins unless a new decision record says otherwise.

## Documentation Authority

Decision `D002-documentation-authority-and-selective-promotion.md` establishes the active hierarchy:

1. `docs/` - durable operating canon.
2. `decisions/` - accepted semantic changes.
3. `research/` - active studies, execution state, and research inputs.
4. `README.md` - repository orientation derived from canon.
5. `AGENTS.md` - execution guidance derived from canon.
6. `archive/` - provenance and extraction sources only.

## Archive Promotion Register

| Archived material | Disposition | Active destination or reason |
|---|---|---|
| Mission, vision, principles, strategic position, and research-to-product dependency | Adapted | `docs/01_ORG_STRATEGY.md` |
| Access/support/parity distinction, native-adoption dimensions, and Parallel/Native/Market testing | Adapted | `docs/02_NATIVE_ADOPTION.md` |
| Observation/inference separation, evidence discipline, evaluation reliability, and human review | Adapted and simplified | `docs/03_RESEARCH_METHOD.md` |
| Product states, readiness gates, value claims, and customer integration ladder | Adapted | `docs/06_PRODUCT_ENGINEERING.md` |
| Frame-to-package product delivery lifecycle | Adapted | `docs/07_APPLIED_LAB.md` |
| Service-led commercial model, customer-support wedge, and research-led handoff concept | Retained as bounded hypotheses | `docs/09_GO_TO_MARKET.md`; live-agent activity remains gated by `docs/04_AILITW.md` |
| Document lifecycle, claim readiness, and archive handling rules | Adapted and simplified | `docs/10_GOVERNANCE.md` |
| Stable terminology from prior glossaries | Selected and reconciled | `docs/GLOSSARY.md` |
| Earlier AILITW study definitions and public-system protocols | Deferred | Revisit after MR-0 and the responsible-access gate |
| Intelligence graph, broad registries, generalized schemas, APIs, dashboards, and hosted platform plans | Deferred | Not required for MR-0; promotion requires evidence and a new decision |
| Exact pricing, outreach quotas, target-company lists, and dated market statistics | Research input only | `research/ailitw/market-intelligence/`; revalidate before external use |
| Hospeda-first and hotel-product concepts | Superseded for current execution | Hotel Aurora remains only a controlled MR-0 fixture |

## Source Relationships

The archive intentionally retains duplicate exports because each path records provenance:

- `archive/canonical-v0.1/` matches the canonical-foundation export in the first archived conversation.
- `archive/previous-canon/` matches the program export in the second archived conversation.
- The four reports in `research/ailitw/market-intelligence/` match the generated outputs in the third archived conversation and are labeled as research inputs rather than canon.

These duplicates are not independent evidence for a decision.

## Future Promotion Rule

When extracting additional archived guidance:

1. Identify the exact source document and concept.
2. Compare it with current canon and accepted decisions.
3. Classify it as promote, adapt, defer, reject, or retain as hypothesis.
4. Record any major semantic promotion in a decision record.
5. Update the active canonical owner rather than pointing execution guidance at the archive.
