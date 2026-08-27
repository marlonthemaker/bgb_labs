# Security Policy

## Supported version

This repository is a pre-release prototype. Only the current `main` branch is
supported; no published package or compatibility/security maintenance promise
exists for earlier commits.

## Report a vulnerability privately

Use GitHub's **Security → Report a vulnerability** workflow for this
repository. Do not open a public issue, discussion, or pull request containing
an exploit, credential, personal data, or unredacted provider response.

Include the affected commit, reproducible steps, impact, and the smallest safe
proof. Maintainers will make a best-effort acknowledgement within three
business days, validate scope, coordinate remediation, and credit the reporter
when requested and safe. This project does not currently operate a bug bounty.

If a credential may have been exposed, revoke or rotate it first. Never send a
Gemini key, Google access token, service-account key, `.env.local`, or raw guest
data in a report.

## Security boundaries

Hotel Shoreline is a fictional public demo, not a production hotel system. It
accepts no real guest data, has no customer accounts, and exposes only sanitized
run projections. The SDK is private and unlicensed pending an owner decision.
Known dependency risk and mitigations are recorded in
[`docs/operations/DEPENDENCY_RISK.md`](docs/operations/DEPENDENCY_RISK.md).
