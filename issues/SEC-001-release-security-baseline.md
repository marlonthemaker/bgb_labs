# SEC-001 — Release Security Baseline

**Status:** In review
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
| SEC1-C-001 | Contract/graph parsing rejects non-finite, cyclic, excessively deep, and oversized JSON input with stable issues and no uncaught recursion error. | Unit | `native_agent_sdk/src/unit/contracts.unit.test.ts` |
| SEC1-C-002 | Validation rejects a tool registry whose lookup key and declared tool identity differ; coherent registered tools continue to execute. | Unit / integration | `native_agent_sdk/src/unit/validation.unit.test.ts`; `native_agent_sdk/src/integration/executor.integration.test.ts` |
| SEC1-C-003 | Tool execution results are a discriminated success/failure contract that cannot represent contradictory output/error states. | Type / integration | `native_agent_sdk/src/unit/contracts.unit.test.ts`; SDK typecheck; `native_agent_sdk/src/integration/executor.integration.test.ts` |
| SEC1-W-001 | Browser responses carry a documented security-header baseline and API inputs exceeding the declared boundary fail with sanitized typed errors. | Unit / E2E | `hotel_shoreline/src/unit/http-input.unit.test.ts`; `hotel_shoreline/e2e/security.spec.ts` |
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

The SDK boundary is limited to 32 nested containers, 2,048 visited values, and
65,536 aggregate UTF-16 string/key units. Hotel Shoreline accepts at most 4 KiB
of UTF-8 JSON at its comparison endpoint and no body at its fixed-request
endpoint. Exceeding either HTTP boundary returns `REQUEST_TOO_LARGE` with 413;
malformed JSON returns the existing sanitized request error with 400.

## Design and security constraints

- Fail closed at every untrusted JSON, provider, tool, and HTTP boundary.
- Preserve SDK provider/domain neutrality.
- Do not log request bodies, credentials, provider exceptions, or raw tool
  output.
- Prefer simple platform controls and explicit quotas over security theater.
- Changing licensing remains an owner decision outside this issue.

## Analysis record

**Relevant state:** the SDK currently accepts non-finite numbers, recursively
walks cyclic/unbounded objects, permits mismatched registry identities, and
models contradictory tool results. The comparison route calls
`request.json()` without a byte limit, and the application has no explicit
browser security-header policy. The workspace Node engine is broader than its
pinned runtime and Node type declarations target a different major. CI action
tags are mutable and production audit findings require a time-bounded record.

**Files expected to change:** SDK contracts/validation/tests; one application
HTTP-input helper and its tests; both public route handlers; Next configuration
and E2E security coverage; package metadata/lockfile; CI/Dependabot/security
policy; dependency-risk and deployment guidance; this issue, testing map,
affected READMEs/roadmaps, and issue index.

**Failure behavior:** pathological SDK values return stable validation issues;
registry identity mismatch rejects before tool execution; excessive HTTP input
returns a sanitized 413 envelope; malformed input returns 400; neither path
starts a provider or scenario operation. Security headers must not break local
development or production rendering.

**Risks:** a strict JSON resource boundary is a public prototype-contract
change; CSP must retain the minimal inline/eval allowances required by the
installed Next.js mode; Genkit transitive advisories may not have compatible
upstream fixes and therefore require explicit applicability and expiry rather
than unsafe overrides. Licensing remains deliberately unresolved.

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

Complete only after the required GitHub check and merge.

**Completed date:** Pending merge.

**Branch used:** `fix/sec-001-release-security-baseline`

**Commits:** Pending creation; proposed boundaries are SDK/HTTP behavior,
repository/dependency controls, and documentation/evidence.

**Review / PR:** Pending. Local strict review found no blocking acceptance or
boundary defect after the final full gate. GitHub settings were externally
verified: private vulnerability reporting is enabled; `main` requires a strict
`verify` check and pull-request delivery with zero current approvals; linear
history and conversation resolution are required; force pushes and deletion
are disabled; merged branches are deleted.

**Acceptance evidence:** `SEC1-C-001` has finite/cycle/depth/value/string/proxy
examples; `SEC1-C-002` has validation and zero-invocation execution examples;
`SEC1-C-003` has compile-time contradictory-state rejection and executor
coverage; `SEC1-W-001` has byte-level parser and real Route Handler/browser
evidence; `SEC1-D-001` aligns Node 22.17–22.x types/runtime, upgrades Next to
16.3.3, and time-bounds all current advisory families; `SEC1-CI-001` adds the
security policy, Dependabot, immutable CI actions, least-privilege workflow,
and live repository controls; `SEC1-Q-001` passed locally as recorded below.

**QA commands and results:**

- `pnpm install --frozen-lockfile` — passed.
- `pnpm check` — passed; 65 files checked; repository verifier checked 132
  tracked files, 54 Markdown files, 107 relative links, 11 issues, and 39
  previously completed acceptance IDs.
- `pnpm audit:prod` — passed its disposition gate; five advisory records / seven
  instances remain time-bounded (3 high, 4 moderate, 0 critical).
- `pnpm typecheck` — passed for both packages.
- `HSD_E2E_PORT=3104 pnpm test:all` — passed: 69 unit, 26 integration, and 13
  deterministic E2E tests; 3 explicitly credentialed provider tests skipped.
- SDK coverage — 92.17% statements, 88.26% branches, 97.14% functions, 92.11%
  lines.
- Hotel Shoreline coverage — 91.14% statements, 86.38% branches, 99.37%
  functions, 93.45% lines.
- `pnpm build` — passed SDK and Next 16.3.3 production builds; `/`,
  `/_not-found`, `/api/native-adoption`, and `/api/taskmaster` emitted.
- `git diff --check` and diff secret-pattern scan — passed.

**Docs updated:** root/package READMEs and roadmaps, testing/contribution/cloud
guidance, `SECURITY.md`, dependency risk, repository controls, issue/index.

**Known limitations / follow-up:** current Genkit 1.41.0 transitively retains
four advisory families through 2026-09-30; Prometheus and Jaeger paths are not
configured, UUID is not called directly, and W3C baggage is constrained but
plausibly reachable. Re-review or upgrade before expiry. The USD 20 budget is
an alert rather than a hard stop; durable identity/rate limiting is not claimed.
Licensing remains an owner decision.

**Next issue readiness:** HSD-007 remains Planned until this PR passes CI and
merges; its specification may then move to Ready for analysis.
