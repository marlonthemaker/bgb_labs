# Representation Metrics

ID: `DOC-LAB-0002`
Version: v0.1

## Purpose

Representation metrics help compare multilingual behavior under controlled conditions. They do not replace Wild adoption results.

## Metric Families

- Cross-language consistency: whether semantically matched inputs produce aligned intents, plans, and tool choices.
- Intent separability: whether related task intents remain distinguishable across languages.
- Uncertainty calibration: whether confidence, hedging, and refusal behavior remain appropriate.
- Locale grounding: whether local entities, formats, and norms are selected correctly.
- Repair stability: whether the system recovers similarly after clarification or correction.

## Candidate Metrics

- `MET-LAB-0001`: tool-intent agreement rate across translated and native prompts.
- `MET-LAB-0002`: plan-step semantic alignment across language variants.
- `MET-LAB-0003`: uncertainty expression calibration score.
- `MET-LAB-0004`: locale entity accuracy.
- `MET-LAB-0005`: repair success delta after user correction.

## Caution

High representation alignment does not prove native adoption. Low alignment can suggest a mechanism, but must be tested against observed behavior.

## Output

Each metric report should link to experiments, runs, evidence, and any Wild failure types it helps explain.
