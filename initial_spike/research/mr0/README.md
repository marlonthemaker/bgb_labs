# MR-0 Execution Index

MR-0 is the controlled method proof for bomgoodbueno native-adoption research.

This file is the single owner of current MR-0 task state. Canon documents describe scope and phase order; individual issues define acceptance criteria and completion evidence.

## Current Task

`MR0-002 - Define Case Schema And 12 Semantic Contracts`

Issue: [`issues/MR0-002-define-case-schema-and-semantic-contracts.md`](issues/MR0-002-define-case-schema-and-semantic-contracts.md)

## Task Ledger

| Task | Status | Outcome |
|---|---|---|
| [`MR0-001`](issues/MR0-001-freeze-hotel-aurora-fixture-and-tool-contracts.md) | complete | Frozen Hotel Aurora fixture, deterministic tool contracts, case fixture references, and validator |
| [`MR0-002`](issues/MR0-002-define-case-schema-and-semantic-contracts.md) | ready | Freeze the language-independent case schema and complete 12 semantic contracts |
| MR0-003 | planned | Author English, `es-ES`, and `pt-PT` language variants |
| MR0-004 | planned | Review semantic and native-language equivalence |
| MR0-005 | planned | Run baseline evaluation |
| MR0-006 | planned | Diagnose lifecycle failure points |
| MR0-007 | planned | Test one targeted intervention and regressions |
| MR0-008 | planned | Write MR-0 report and method decisions |

Only create later issue files when their predecessor has clarified the required inputs. Planned names are sequencing aids, not approved implementation scope.

## Active Artifacts

- `hotel-aurora/world-contract.yaml` - frozen fictional hotel facts and state.
- `hotel-aurora/tool-contracts.yaml` - frozen deterministic operational tool contracts.
- `cases/semantic-contracts-v0.1.yaml` - draft language-independent case set.
- `reviews/native-review-template.md` - native-language review template.
- `reports/mr0-report-template.md` - final report template.
- `validate_contracts.rb` - local fixture and contract-reference validation.

## Execution Rules

- Read `../../docs/05_MR0.md` and the current issue before changing artifacts.
- Keep Hotel Aurora deterministic and fictional.
- Do not add platform, persistence, UI, API, or customer-product behavior.
- Lock expected behavior before authoring or evaluating language variants.
- Update this ledger only when an issue status changes or the next task is defined.

## Validation

Run the current contract validation with:

```sh
ruby research/mr0/validate_contracts.rb
```

Each completed issue must record its own additional verification and completion notes.
