# All Things Agentic Hackathon Constraints

**Last verified:** 2026-08-24  
**Authoritative source:** [All Things Agentic Hackathon rules](https://allthingsagentichackathon.devpost.com/rules) and [FAQ](https://allthingsagentichackathon.devpost.com/details/faqs)

Automated re-verification was attempted on 2026-08-26, but Devpost required an
interactive anti-bot check. Manually re-open both authoritative pages before
deployment and again before submission; do not infer a rule change from this
cached planning aid.

This is a planning aid, not legal advice or a replacement for the official
rules. Re-verify it before submission because organizer requirements can change.

## Required delivery gate

The current Taskmaster submission must use Gemini 3.5 or newer, at least one
Google agent framework, and at least one Google Cloud service. HSD uses Genkit
and Cloud Run for this minimum proof. The Taskmaster flow must show a real,
event-driven multi-step workflow that acts without the user guiding each step.

HSD-004 is the required technical proof. A deterministic local-only HSD-003
run is valuable as a safety baseline, but cannot by itself satisfy this gate.
HSD-005 through HSD-007 are the recommended evidence path for the stronger
product story: a matched, inspectable intervention comparison with durable,
sanitized run history. They do not relax the HSD-004 proof requirement.

## Submission gate

- A public or judge-accessible repository with repeatable setup instructions.
- A maximum four-minute English (or English-subtitled) demo video that shows a
  genuine live run, proof that the backend ran on Google Cloud, and the project
  functioning as described.
- A public project description, project link as required, architecture diagram,
  and accurate explanation of Gemini/Genkit and Google Cloud use.
- Original work, authorized third-party dependencies/data, and no unsupported
  affiliation, privacy, performance, or research claim.

## HSD proof of value

The submission’s product claim is narrow: a guest-request event can be turned
into a constrained, validated, evidence-producing workflow rather than a
chatbot answer. Its research/public-good contribution is likewise narrow: the
repo makes a synthetic semantic contract, task graph, trace, validation errors,
and limitations inspectable and reusable for controlled agent-workflow study.
It does not establish cross-language parity, model superiority, or a general
hotel-operations result. Any baseline/intervention comparison must state its
frozen conditions, reviewer status, invalid-run handling, and limitations.
