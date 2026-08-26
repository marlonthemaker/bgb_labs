# AILITW Native Agent Operations Study — Iberia 2026

This is the proposed follow-up study to Hotel Shoreline. It evaluates whether
customer-facing agents provide operationally equivalent service across English
(`en`), Spanish for Spain (`es-ES`), and Portuguese for Portugal (`pt-PT`).

The study is `proposed / pre-pilot`. It does not authorize testing, assert a
finding about a named company, or imply affiliation with any candidate system.

## Program role

Hotel Shoreline and the Iberia study answer different questions:

| Evidence domain | Question it can answer | Claim it cannot support |
| --- | --- | --- |
| Hotel Shoreline | Does a declared intervention improve a controlled Gemini/Genkit workflow against deterministic truth? | That the intervention fixes a named production agent. |
| Public-agent observation | What behavior is externally observable under a documented public access boundary? | Why the behavior occurred or how the system is implemented. |
| Operator-authorized validation | Does a proposed remedy improve the operator's system in an approved sandbox or deployment? | General effectiveness beyond the tested system and conditions. |

This claim ladder is the program's central guardrail. The research may connect
the three domains with versioned analogue links, but it must not collapse them
into one benchmark or causal claim.

## Approved strategic progression

```text
1. Finish and release Hotel Shoreline
   controlled baseline -> intervention -> evidence ledger -> export -> release

2. Build the minimum viable field suite
   target audit -> case registry -> manual capture -> evaluation -> evidence

3. Run a non-ranking feasibility pilot
   3 access-stable systems x 3 mission families x 3 language conditions

4. Promote qualifying failure signatures
   repeated + material + generalizable + controllable + ethically suitable

5. Test controlled analogues in Hotel Shoreline
   frozen baseline -> isolated treatments -> holdouts -> regression checks

6. Publish and engage cooperatively
   aggregate report -> reproducibility package -> operator brief -> correction

7. Validate externally only with operator authorization
   operator sandbox/baseline -> agreed remedy -> matched retest -> case study
```

If operators do not participate, the program stops at scoped observational
findings, controlled Shoreline evidence, and proposed remedies. That is still a
valid research contribution; it is not described as a production intervention.

## Immediate scope

The public study is not on the hackathon critical path. The active repository
sequence remains:

```text
HSD-007 -> HSD-006 -> HSD-008
```

After HSD-008, the first field milestone is a 27-cell feasibility pilot, not
the complete 70-seed candidate library. Production collection, rankings, broad
agent-level statistics, automation, and operator outreach require later gates.

## Documents

- [`STUDY_PROTOCOL.md`](STUDY_PROTOCOL.md) is the scientific authority for
  evidence modes, eligibility, measures, scoring, sampling, promotion, claims,
  and stop rules.
- [`SCENARIO_CATALOG.md`](SCENARIO_CATALOG.md) is an unreviewed candidate case
  library. Candidate targets must pass a current access and terms audit.
- [`INTEGRATION_GUIDE.md`](INTEGRATION_GUIDE.md) is the delivery,
  commercialization, and repository-consolidation plan.

## Next decision

Do not execute public cases yet. First close the remaining HSD release train.
Then open
`AILITW-001` to verify target access, applicable terms, supported language
conditions, observability, retention permissions, human-review capacity, and
the 27-cell pilot manifest.
