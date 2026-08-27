# HSD-008 — Submission Release

**Status:** In review
**Repository:** both
**Depends on:** HSD-006 and HSD-007
**Branch:** `docs/hsd-008-submission-release`

## Outcome

Produce one reproducible, honest, judge-ready Taskmaster submission package for
Hotel Shoreline. A judge should be able to understand the friction, architecture,
Google stack, autonomous action, evidence, limitations, and public-good value
from the first four minutes and reproduce the committed application from the
root README.

The continuous story is narrow: a fictional guest-request event becomes a
Gemini/Genkit candidate plan; Native Agent validates it; allowlisted synthetic
tools act; an append-only PostgreSQL ledger retains the result; and the saved
comparison view exposes the declared baseline/intervention difference and
qualification limits. The release does not establish real hotel capability,
native-language quality, causal effect, broad model superiority, or access to
hidden chain-of-thought.

## Official release constraints

The official rules and FAQ were re-read on 2026-08-27. Submission closes August
31, 2026 at 5:00 PM PT. The project selects exactly one category: Taskmaster.
The mandatory stack is Gemini 3.5 or newer, at least one listed Google agent
framework (Genkit here), and at least one Google Cloud infrastructure service
(Cloud Run and Cloud SQL here).

The submission must include a repository URL, root README spin-up instructions,
architecture diagram, text description, hosted-project link when available, and
a public YouTube/Vimeo video no longer than four minutes in English or with
English subtitles. The video must show the application in action and strict
proof of the Google Cloud backend. Judges specifically reward an unedited live
proof-of-action segment. Projects must be new during the submission period;
non-standard pre-existing work must be disclosed. The submitted repository,
video, and app should remain unchanged through judging/winner announcement.

[`HACKATHON-CONSTRAINTS.md`](HACKATHON-CONSTRAINTS.md) is the dated planning
record; the official external pages remain authoritative.

## Scope

In scope:

- one canonical submission document containing copy-ready Devpost fields,
  architecture, claims, disclosures, third-party inventory, video storyboard,
  screenshot/recording checklist, and final operator checklist;
- a root README that independently satisfies judge spin-up, architecture, live
  link, stack, disclosure, and evidence-navigation needs;
- deterministic release verification for required artifacts, tracked-file
  hygiene, high-confidence secret patterns, and submission/README invariants;
- clean-clone installation, full deterministic QA, production build, public
  repository/live-service checks, and recorded current deployment proof;
- one deliberate provider proof attempt when quota/cost are approved, retaining
  a typed failure as truthful evidence rather than retrying; and
- preparation for a final repository tag/freeze after the owner supplies and
  approves the public video URL and Devpost submission.

Out of scope:

- new runtime features, Cloud Tasks/background queues, new models, bonus-model
  integrations, generic dashboards, reviewer mutations, or research execution;
- publishing a video, social post, blog, or Devpost entry on the owner's behalf;
- fabricating native review, uptime, recovery, performance, causal, language,
  hotel, or affiliation claims; and
- deleting cloud resources, changing billing, or freezing post-submission
  development before the owner confirms the actual submission.

## Acceptance criteria

| ID | Observable criterion | Test layer | Evidence location |
| --- | --- | --- | --- |
| HSD8-C-001 | The dated constraint record matches the current official rules for deadline, Taskmaster selection, mandatory stack, repository/spin-up/architecture fields, public ≤4-minute English video, Cloud proof, new-project/pre-existing-work disclosure, judging weights, and post-deadline freeze. | Documentation QA | `issues/HACKATHON-CONSTRAINTS.md`; official rules/FAQ links |
| HSD8-R-001 | A clean Git clone of the exact release commit installs with the pinned Node/pnpm contract and passes repository, audit, strict type, unit, integration, real PostgreSQL CI, coverage, deterministic browser, and production-build gates without local secrets or generated state. | Clean-room QA / CI | HSD-008 Completion Record; `TESTING.md` |
| HSD8-D-001 | The root README exposes the live demo/repository, fictional boundary, product value, exact Google stack, Mermaid architecture, clean local spin-up, optional provider setup, deployment path, evidence tour, and authoritative limitations without requiring another document to understand the project. | Release verification / review | `README.md`; `scripts/verify-release.mjs` |
| HSD8-D-002 | One canonical submission package contains copy-ready description/features/technology/data/findings fields, accurate third-party and pre-existing-work disclosures, scoped claim language, known limitations, public-good contribution, and links that match the release commit and deployment. | Release verification / review | `docs/submission/README.md`; `scripts/verify-release.mjs` |
| HSD8-V-001 | A timed storyboard stays within 4:00, is English-ready, opens with real friction/value, includes an unedited live autonomous action and visible `.run.app`/Cloud proof, shows architecture/evidence/failure limits, contains no secret or hidden-reasoning capture, and ends with a precise claim. | Manual rehearsal / review | `docs/submission/README.md`; HSD-008 Completion Record |
| HSD8-Q-001 | The tracked release contains no local environment, credential, key material, generated test/build noise, duplicate artifact, broken internal link, unresolved factual placeholder outside explicitly owner-supplied URLs, or unrelated study mutation; dependency risk and licence status are disclosed. | Automated QA / review | `scripts/verify-release.mjs`; `pnpm check`; `pnpm audit:prod` |
| HSD8-O-001 | The public repository and Cloud Run URL are accessible; the production merged-main revision serves the disclosure, sanitized history, exact deterministic export, typed boundary failures, responsive saved-evidence flow, bounded resources, pinned secret references, and zero unexpected error-severity logs at signoff. | External API/browser/cloud QA | HSD-008 Completion Record |
| HSD8-F-001 | The final operator checklist clearly separates repository-complete work from owner actions: record/upload public video, add final URL, complete Devpost fields/team/category, submit before deadline, create the approved release tag, and freeze submitted surfaces through judging. | Manual release review | `docs/submission/README.md`; HSD-008 Completion Record |

## Current acceptance status

| Acceptance ID | State | Evidence or remaining gap |
| --- | --- | --- |
| HSD8-C-001 | Locally verified | Official rules and FAQ were accessible and re-read on 2026-08-27; the dated constraint record now matches the verified release requirements. |
| HSD8-R-001 | Locally and CI verified | Exact merged commit `b7fd869` passed frozen install and the full deterministic gate/build in a secret-free clean clone; PR #17 passed the PostgreSQL 17 CI gate in 2m12s. |
| HSD8-D-001 | Locally and CI verified | The judge-complete root README passes repository and release invariant verification. |
| HSD8-D-002 | Locally and CI verified | `docs/submission/README.md` is the canonical copy-ready submission, architecture, claims, disclosure, recording, and operator package. |
| HSD8-V-001 | Locally verified, owner recording pending | The English-ready storyboard totals 3:55, requires one unedited live action/Cloud proof segment, and includes an explicit recording-safety checklist. |
| HSD8-Q-001 | Locally and CI verified | Release verification checked 11 required artifacts, 158 release-visible paths, high-confidence secret patterns, required claims, direct production dependencies, and unresolved placeholders; repository/audit gates passed. |
| HSD8-O-001 | Externally verified | Public `main` and revision `hotel-shoreline-hsd008-b7fd869` passed merged-commit, Cloud configuration/traffic/log, persisted API/export, and desktop/390 px browser gates. |
| HSD8-F-001 | Implemented | The final operator checklist separates repository-complete gates from owner-only video, Devpost, tag, and freeze actions. |

## Test and QA strategy

- **Release unit:** a dependency-free Node script validates required files,
  exact URLs/labels, README/submission invariants, allowed explicit owner
  placeholders, tracked-path exclusions, and high-confidence secret patterns.
- **Clean-room integration:** create a temporary local clone of the exact
  commit, enable pinned pnpm, install with `--frozen-lockfile`, and run the full
  deterministic gate/build without copying `.env.local`, `.next`, coverage, or
  untracked files. The clone retains Git metadata required by repository and
  release integrity checks.
- **Existing executable specifications:** rerun all unit/integration/E2E and
  coverage gates; do not add duplicated application tests for documentation-only
  behavior. CI supplies PostgreSQL 17 and the least-privilege adapter contract.
- **External:** verify repository visibility/default branch, live home/history/
  exact export/400/404, Cloud Run revision/config/traffic/logs, desktop/390 px,
  disclosure, and one provider attempt if explicitly safe.
- **Manual:** rehearse the storyboard with a stopwatch and verify every spoken
  claim against immutable evidence or a documented implementation fact. The
  owner supplies the final public video URL and performs Devpost submission.

Boundary cases include clean clone without environment files, unavailable
provider, no saved history, mixed/failed arm, pending human review, long mobile
evidence, missing exact UUID, dependency advisory, private repository, stale
deployment identity, video over 4:00, hidden/unresolved placeholder, and a
tracked credential-shaped value.

Failure behavior is release-blocking for a missing mandatory artifact, broken
reproduction, secret/noise finding, unsupported claim, inaccessible required
surface, failed deterministic/CI gate, or video longer than four minutes. A
typed external provider failure is retained and explained; it does not authorize
automatic retries or a false success claim. Missing owner-supplied video/Devpost
fields prevent final submission signoff but do not invalidate verified code.

## Design, security, and claim constraints

- Submission materials describe inspectable structured plans, validation,
  tool/effect evidence, lifecycle, and annotations—not hidden reasoning.
- Hotel Shoreline remains fictional/synthetic and separate from Native Agent's
  reusable product boundary and the research canon.
- The submission may cite an illustrative controlled comparison, but every
  variant remains `pending_review`; no native-language, parity, causal, or
  statistical finding is claimed.
- Pre-existing research inspiration is disclosed as non-runtime method/canon;
  the submitted application and implementation timeline remain truthful.
- Direct dependencies and accepted transitive advisory families are linked to
  their licence/risk owners; no lockfile inventory is hand-maintained as if it
  were a complete software bill of materials.
- Secrets stay in ignored local files and pinned Google Secret Manager versions.
  Video/screenshots must not capture environment files, key values, database
  URLs, access tokens, private logs, or personal browser/account details.
- The release commit and deployed image are immutable evidence. The final tag is
  created only after owner approval and must point to the submitted commit.

## Analysis record

**Initial state at issue start:** HSD-001 through HSD-007 and SEC/REP gates are complete. PR
#15 and #16 passed; merged-main revision `hotel-shoreline-hsd006-388f840` serves
100% of Cloud Run traffic and reads the append-only Cloud SQL ledger. The
repository is public. There is no submission package, root architecture diagram,
timed video plan, release verifier, video URL, or Devpost record.

**Implementation order:** freeze this spec and test traceability; reconcile the
official constraint record; add the release verifier; create one canonical
submission package; make the root README judge-complete; run focused verifier
and full local gate; inspect a clean clone; run external repository/cloud/
browser/provider proof; reconcile docs and PR/CI; then hand off only the video,
Devpost, approved tag, and freeze actions that require the owner.

**Likely files:** this issue, `issues/HACKATHON-CONSTRAINTS.md`, issue index,
`TESTING.md`, root/package READMEs/roadmaps, `docs/README.md`, one
`docs/submission/README.md`, root `package.json`, and
`scripts/verify-release.mjs`. Runtime, SDK, authored variants, evaluation,
intervention, schema, migrations, and research canon should not change.

**Primary risk:** the strongest recorded fixed-request Gemini proof exists in
HSD-004, while provider availability can vary during recording. The video must
show a genuine unedited live attempt and must not splice a failure into a false
success. The current synchronous HTTP request still autonomously decomposes,
validates, and performs a multi-step workflow after one event; the submission
must not call it a queue-backed or long-running asynchronous worker.

## Verification

```sh
pnpm verify:release
pnpm check
pnpm audit:prod
pnpm typecheck
pnpm test:all
pnpm build
git diff --check
```

Additional signoff: clean Git-clone gate, PR CI, official-rule recheck, public
repository/live-service/API/browser/cloud/log proof, timed storyboard rehearsal,
and one deliberate provider attempt when approved.

## Completion Record

**Completed date:** Pending owner submission signoff; repository-complete and
deployed on 2026-08-27.
**Implementation summary:** Added a judge-complete root README, canonical
submission/architecture/video/operator package, current official constraint
record, and dependency-free release integrity verifier. No runtime, authored
variant, evaluator, intervention, SDK contract, schema, or research-canon
behavior changed.
**Acceptance evidence:** HSD8-C-001, HSD8-R-001, HSD8-D-001, HSD8-D-002,
HSD8-Q-001, and HSD8-O-001 are locally/CI/externally verified as applicable;
HSD8-V-001 has a verified 3:55 storyboard but awaits owner recording.
HSD8-F-001 is implemented and makes the remaining owner authority explicit.
**QA commands and results:** `pnpm check`, `pnpm audit:prod`, `pnpm typecheck`,
`HSD_E2E_PORT=3117 pnpm test:all`, `pnpm build`, and `git diff --check` passed.
The gate recorded 81 unit tests, 27 ordinary integration tests, 22 deterministic
E2E passes, and 3 intentionally skipped opt-in provider tests. SDK coverage was
92.17% statements / 88.26% branches / 97.14% functions / 92.11% lines; Hotel
Shoreline coverage was 91.80% / 87.94% / 99.45% / 93.80%.
`pnpm test:e2e:gemini` passed 1/1 on the single deliberate live-provider attempt
(4.2 seconds). The closeout gate initially found four duplicate ignored
Next.js type artifacts ending in ` 2.ts`; only those generated files were
removed, and the complete gate then passed.
**Clean-clone result:** Exact merged commit
`b7fd8691ffc05bea02d59e608643c444a1a41c7f` installed with the frozen lockfile
and passed check, audit, strict types, 81 unit, 27 ordinary integration, 22 E2E,
coverage, and production build without local secrets or generated state in
`/tmp/hsd008-merged.QBVnYG/repo`. PR #17 passed its required PostgreSQL-backed
`verify` check in 2m12s and was rebased into `main`.
**External release evidence:** Public repository
`https://github.com/marlonthemaker/bgb_labs` is visible with default branch
`main`. Build `3befd474-9e8b-4e41-bb71-6c70b30cfabd` produced digest
`sha256:6bc41c3d379c1653f2dbf8b638b3f217539aa6da0bf544390c85d05f6bceae4c`.
Revision `hotel-shoreline-hsd008-b7fd869` passed zero-traffic candidate checks
and now serves 100% at `https://hotel-shoreline-7larmcl4aa-ew.a.run.app` with
numeric secret versions 1/2, Cloud SQL, runtime identity, 60-second timeout,
concurrency 4, 1 CPU/512 MiB, zero minimum/default and two maximum instances.
Home, history, and two detail requests returned 200; malformed/missing identity
returned typed 400/404. Preserved comparison
`c076d46e-1043-4073-a25f-66086d8a01d1`
reopened and exported byte-identically with SHA-256
`38eceb2cde7d0b32c4fedf06ad5a72fcbc3be75725b289e768f68a02132750c5`.
Desktop and 390×844 browser checks retained disclosure, history, download, no
horizontal overflow, and an empty console. Final error-severity revision logs:
zero.
**Provider proof:** One deliberate `gemini-3.5-flash` Genkit Taskmaster smoke
attempt passed on its first run; 1 test passed in 4.2 seconds. No retry was made.
**Known limitations / follow-up:** Provider availability remains external; the
saved proof is fictional and mixed-status, all authored variants remain
`pending_review`, and no native-language, causal, statistical, real-hotel,
recovery, or hidden-reasoning claim is authorized. Execution remains a bounded
synchronous HTTP workflow, not a queue-backed long-running worker.
**Owner-required final actions:** Record/upload the public ≤4:00 video, add its
URL in an approved release commit, complete/submit Devpost, approve the final
annotated tag, and freeze the submitted surfaces through judging.
**Docs updated:** Root/package READMEs and roadmaps, `TESTING.md`, `docs/README.md`,
`docs/submission/README.md`, official constraint record, issue index, and this
issue record.
**Branch / commits / PR:** `docs/hsd-008-submission-release`; rebased main
commits `4b7cdd0`, `f8161ae`, `0e2bb2f`, and `b7fd869`; PR #17 passed and merged.
Closeout branch: `docs/hsd-008-release-evidence`.
**Release tag and submitted commit:** Tag and final submitted commit remain
owner-approved actions. Deployed source commit: `b7fd8691ffc05bea02d59e608643c444a1a41c7f`.
