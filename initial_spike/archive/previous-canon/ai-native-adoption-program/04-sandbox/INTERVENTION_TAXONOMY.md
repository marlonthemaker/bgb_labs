# Intervention Taxonomy

ID: `DOC-SBOX-0002`
Version: v0.1

## Intervention ID Format

Use `INT-SBOX-####` for intervention classes and `TRT-SBOX-####` for concrete treatment protocols.

## Initial Intervention Classes

- `INT-SBOX-0001`: Prompt guardrail. Add system or developer instructions for language, locale, uncertainty, or tool behavior.
- `INT-SBOX-0002`: Strategy router. Select native prompting, translation, bilingual prompting, or retrieval based on language-task conditions.
- `INT-SBOX-0003`: Clarification layer. Ask targeted questions when intent, locale, or consent is ambiguous.
- `INT-SBOX-0004`: Response repair. Post-process output for terminology, locale, register, formatting, or missing uncertainty.
- `INT-SBOX-0005`: Tool mediator. Validate tool inputs and outputs across languages before execution or presentation.
- `INT-SBOX-0006`: Retrieval grounding. Inject locale-specific references or product documentation.
- `INT-SBOX-0007`: Evaluator gate. Use another model or rubric to approve, revise, or reject responses.
- `INT-SBOX-0008`: User interface copy adaptation. Change labels, onboarding, and permission copy around the agent.

## Measurement

Every intervention must declare:

- target failure IDs
- expected improvement
- possible regressions
- cost and latency impact
- rollback condition

## Rule

An intervention class is not a treatment. A treatment is a specific, versioned, repeatable protocol.
