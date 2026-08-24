# MR0-001 - Freeze Hotel Aurora Fixture and Tool Contracts

Status: complete

## Objective

Create the deterministic fictional hotel environment that will serve as the controlled evaluation fixture for MR-0.

Hotel Aurora is not a product simulation. It is a research fixture.

## Context

Hotel profile:

- independent boutique hotel;
- Porto, Portugal;
- about 24 rooms;
- small reception team;
- guest-facing multilingual workflows.

Primary languages:

- English;
- `es-ES`;
- `pt-PT`.

## Required Knowledge Domains

- check-in and checkout;
- breakfast;
- parking;
- Wi-Fi;
- accessibility;
- luggage storage;
- late checkout.

## Required Operational Tools

Freeze deterministic contracts for:

- `lookup_reservation`
- `search_hotel_knowledge`
- `request_housekeeping`
- `request_maintenance`
- `request_late_checkout`
- `escalate_to_reception`

## Constraints

Do not create:

- a generic EvaluationWorld framework;
- a graph database;
- APIs;
- UI;
- persistent storage;
- unnecessary hotel complexity.

## Acceptance Criteria

- [x] Hotel Aurora fixture exists.
- [x] All facts are deterministic.
- [x] All MR-0 cases can reference fixture facts.
- [x] All tools have deterministic behavior.
- [x] Fixture has no unresolved contradictions.
- [x] Tests or validation checks confirm fixture files parse.

## Completion Notes

Frozen artifacts:

- `research/mr0/hotel-aurora/world-contract.yaml`
- `research/mr0/hotel-aurora/tool-contracts.yaml`

Supporting reference update:

- `research/mr0/cases/semantic-contracts-v0.1.yaml`

Validation:

```sh
ruby research/mr0/validate_contracts.rb
```
