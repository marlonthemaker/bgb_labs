# All Things Agentic Hackathon Constraints

**Last verified:** 2026-08-27
**Authoritative source:** [All Things Agentic Hackathon rules](https://allthingsagentichackathon.devpost.com/rules) and [FAQ](https://allthingsagentichackathon.devpost.com/details/faqs)

Both official pages were accessible and re-read on 2026-08-27. Re-open them
immediately before submission; do not infer a future rule change from this
dated planning aid. This file is not legal advice or a replacement for the
official rules.

## Required delivery gate

The Taskmaster submission must use Gemini 3.5 or newer, at least one listed
Google agent framework, and at least one Google Cloud infrastructure service.
HSD uses Gemini 3.5 Flash through Genkit plus Cloud Run and Cloud SQL.

The flow must be a real multi-step workflow that takes action without the user
guiding each step. Hotel Shoreline begins from one synthetic guest-request
event and then plans, validates, and executes autonomously. It must not be
described as a queue-backed or long-running asynchronous worker.

HSD-004 owns the required live Gemini/Genkit/Cloud Run technical proof. A
deterministic local HSD-003 run is a safety baseline, not sufficient by itself.
HSD-005 through HSD-006 are the completed evidence path for the stronger story:
a matched inspectable intervention comparison with durable sanitized history
and exact export. They do not relax the HSD-004 proof requirement.

## Submission gate

- Deadline: August 31, 2026 at 5:00 PM Pacific Time.
- Select exactly one category: Taskmaster.
- Provide a public or judge-accessible Git repository with step-by-step root
  README spin-up instructions. A private repository must grant the two official
  judge accounts named in the rules.
- Provide a hosted-project URL when available and strict visual proof that the
  backend ran on Google Cloud. A live `.run.app` address or Cloud Console view
  is acceptable proof. The app need not remain live during judging if proof is
  retained, but submitted surfaces should remain unchanged.
- Provide a publicly visible YouTube/Vimeo video no longer than four minutes in
  English or with English subtitles. It must show the problem/value,
  application in action, and Google Cloud backend; the judging guidance rewards
  an unedited live proof-of-action segment.
- Provide a text description covering features/functionality, technologies,
  data sources, and findings/learnings; a repository URL; and an architecture
  diagram.
- Submit a project newly built during the submission period. Standard
  frameworks, libraries, templates, and AI coding assistants are allowed;
  disclose other pre-existing work incorporated into the project.
- Use only original or authorized code, dependencies, integrations, and data.
  Do not make unsupported sponsorship, affiliation, privacy, performance, or
  research claims.
- Do not change submitted materials after the deadline except for a narrow
  organizer-permitted correction. The FAQ advises leaving the video,
  repository, and live surface unchanged through winner announcement.

## Judging alignment

- **Innovation and operational utility — 40%:** show the specific hotel-service
  friction and an autonomous multi-step action, not a chat response.
- **Architectural discipline and stack — 30%:** show the domain-neutral SDK,
  scenario adapters, Genkit/Gemini planning, fail-closed validation, append-only
  state, scoped identities, and typed failure recovery.
- **Demo and production readiness — 30%:** show an unedited live proof of action,
  `.run.app`/Cloud proof, clean architecture diagram, reproducible README,
  history/export evidence, and truthful limitations within four minutes.

Optional public build content, a qualifying social post, or additional Google
AI model integrations can add bonus points. They are not release prerequisites
and must not displace the required Taskmaster proof.

## HSD proof of value

The product claim is narrow: a fictional guest-request event can become a
constrained, validated, evidence-producing workflow rather than a chatbot
answer. The research/public-good contribution is also narrow: the public repo
makes a synthetic semantic contract, task graph, lifecycle trace, validation
errors, matched intervention, exact evidence artifact, and limitations
inspectable and reusable for controlled agent-workflow study.

HSD does not establish real hotel capability, cross-language parity, native
language quality, model superiority, statistical significance, or a general
operational result. Every comparison must show its frozen conditions, reviewer
status, invalid-run handling, and limitations. Structured planning evidence is
not hidden model chain-of-thought.
