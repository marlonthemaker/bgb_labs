# SEC-001 — Release Security Baseline

**Status:** Ready for analysis
**Repository:** workspace
**Depends on:** REP-002
**Branch:** `fix/sec-001-release-security-baseline`

## Outcome

Harden the public SDK and Hotel Shoreline trust boundaries, make production
dependency risk explicit, and establish a proportionate public-repository and
web security baseline before durable persistence is added. This issue reduces
concrete release risk; it does not introduce authentication, a generic security
platform, or unsupported claims of complete security.

## Scope

In scope:

- reject non-finite, cyclic, excessively deep, or oversized JSON values at the
  SDK contract boundary;
- require tool-registry keys, declared tool names, and graph tool names to
  agree, and make tool results a coherent discriminated union;
- add response security headers and bounded API request parsing;
- align the supported Node runtime range and Node type definitions;
- review the current Next.js patch and production dependency advisories through
  tested upgrades or documented time-bounded mitigations;
- add `SECURITY.md`, dependency-update automation, SHA-pinned CI actions, and
  repository security-setting guidance; and
- record cost/abuse controls for public quota-bearing provider endpoints.

Out of scope:

- customer authentication, Cloud Armor/load-balancer deployment, penetration
  testing, generic policy infrastructure, or a claim of production compliance;
- changing the repository or SDK license without a separately approved
  licensing decision; and
- HSD-007 persistence behavior.

## Acceptance criteria

| ID | Observable criterion | Test layer | Evidence location |
| --- | --- | --- | --- |
| SEC1-C-001 | Contract/graph parsing rejects non-finite, cyclic, excessively deep, and oversized JSON input with stable issues and no uncaught recursion error. | Unit | SDK contract tests. |
| SEC1-C-002 | Validation rejects a tool registry whose lookup key and declared tool identity differ; coherent registered tools continue to execute. | Unit / integration | SDK validation and executor tests. |
| SEC1-C-003 | Tool execution results are a discriminated success/failure contract that cannot represent contradictory output/error states. | Type / integration | SDK typecheck and executor tests. |
| SEC1-W-001 | Browser responses carry a documented security-header baseline and API inputs exceeding the declared boundary fail with sanitized typed errors. | Integration / E2E | Next configuration and route tests. |
| SEC1-D-001 | Supported runtime/types agree; current production advisories are resolved or documented with applicability, mitigation, owner, and expiry. | QA / docs | Package metadata, audit output, security record. |
| SEC1-CI-001 | Public-repository guidance includes vulnerability reporting and dependency updates; CI actions are immutable and least-privilege settings are documented. | QA / docs | Workflow and repository configuration review. |
| SEC1-Q-001 | Full deterministic verification, production build, repository verifier, and dependency audit disposition pass without secrets or unrelated changes. | Full gate | Completion Record. |

## Test and QA strategy

Write acceptance-ID tests before production changes. Exercise pathological
objects without constructing values that can hang the test process. Verify
security headers in a real browser/API response, exact public error codes, and
zero provider/tool execution for rejected inputs. Treat each dependency
advisory as applicable, mitigated, or not reachable with evidence; do not force
incompatible transitive overrides merely to make an audit command green.

## Design and security constraints

- Fail closed at every untrusted JSON, provider, tool, and HTTP boundary.
- Preserve SDK provider/domain neutrality.
- Do not log request bodies, credentials, provider exceptions, or raw tool
  output.
- Prefer simple platform controls and explicit quotas over security theater.
- Changing licensing remains an owner decision outside this issue.

## Verification

```sh
pnpm check
pnpm typecheck
pnpm test:all
pnpm build
pnpm audit --prod
git diff --check
```

## Completion Record

Complete only after review and QA.

**Completed date:**
**Branch used:**
**Commits:**
**Review / PR:**
**Acceptance evidence:**
**QA commands and results:**
**Docs updated:**
**Known limitations / follow-up:**
**Next issue readiness:**
