# Product Delivery Lifecycle

ID: `DOC-OPS-0006`
Version: v0.1

## Purpose

This lifecycle turns research into usable product capability without losing evidence quality.

## Lifecycle Stages

1. Frame
2. Register
3. Baseline
4. Diagnose
5. Treat
6. Retest
7. Decide
8. Package

## Stage 1: Frame

Define the user, language context, agent system, and adoption problem.

Required artifacts:

- journey candidate
- hypothesis ID
- risk notes
- evaluation need

Exit criteria:

- problem is narrow enough to test
- target languages and agent systems are declared

## Stage 2: Register

Create structured records for the experiment, journey, metrics, and evidence plan.

Required artifacts:

- `EXP-*`
- `JRN-*`
- metric list
- human review plan if needed

Exit criteria:

- baseline and treatment conditions are comparable
- success criteria are defined before runs begin

## Stage 3: Baseline

Run the existing system without Sandbox treatment.

Required artifacts:

- `RUN-*`
- raw evidence
- initial failure mapping
- baseline metric table

Exit criteria:

- failure or adoption gap is observable
- evidence is sufficient for diagnosis or treatment selection

## Stage 4: Diagnose

Use Lab work only where it can change what will be built or tested.

Required artifacts:

- diagnostic experiment or analysis
- linked failure IDs
- candidate mechanism
- treatment recommendation

Exit criteria:

- mechanism is plausible enough to guide a treatment, or the team explicitly chooses a product-only treatment.

## Stage 5: Treat

Implement the smallest black-box adaptation that could address the target failure.

Required artifacts:

- `TRT-*`
- intervention class IDs
- implementation version
- rollback condition

Exit criteria:

- treatment is reproducible
- baseline comparison remains valid

## Stage 6: Retest

Run the same or matched journey with the treatment.

Required artifacts:

- treatment `RUN-*`
- metric comparison
- human review where required
- regression check

Exit criteria:

- target metric improves, stays flat, or regresses clearly enough to support a decision.

## Stage 7: Decide

Record whether to promote, revise, reject, or expand the treatment.

Required artifacts:

- `FIND-*`
- `DEC-*`
- updated assumptions or risks

Exit criteria:

- decision has evidence and known limitations

## Stage 8: Package

Turn validated work into reusable product or research assets.

Possible outputs:

- benchmark item
- treatment module
- evaluation rubric
- report
- demo
- schema update

Exit criteria:

- artifact has an owner, version, and next use case.

## Delivery Rule

Do not expand language coverage, agent coverage, or platform complexity until at least one narrow closed loop has passed through all eight stages.
