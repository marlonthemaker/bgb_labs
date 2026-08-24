# HSD Issue Index

An issue is the reviewable unit of delivery: one bounded outcome, one branch,
and normally one pull request. Specifications define acceptance IDs before
implementation; [`TESTING.md`](../TESTING.md) links those IDs to executable
evidence once tests exist.

## Status

| Issue | Status | Outcome |
| --- | --- | --- |
| HSD-001 | Complete | Workspace, package boundary, application shell, and visible demo disclosure. |
| HSD-002 | Complete | Validated, deterministic, evidence-producing task runtime with quality gates. |
| HSD-003 | Ready for analysis | Deterministic Hotel Shoreline fixture, tool adapters, and one English vertical slice. |
| HSD-004 | Planned | Application-owned structured planning adapter; no provider work begins before HSD-003. |

## Starting HSD-003

Use the issue specification as the analysis gate. First inspect the repository
and report the exact files, risks, and verification commands. Do not edit files
or start HSD-004 until the analysis is approved.

- [HSD-003 — Deterministic Hotel Shoreline vertical slice](HSD-003-deterministic-hotel-shoreline-vertical-slice.md)
