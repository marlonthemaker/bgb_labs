# Repository Security Controls

The public GitHub repository uses the least privilege needed for a small
hackathon team without making human review an execution blocker.

## Required settings

- private vulnerability reporting, dependency graph, Dependabot alerts, and
  automated security updates enabled;
- secret scanning and push protection enabled for the public repository;
- `main` protected by the `verify` status check and pull-request delivery, with
  no approval count until qualified maintainers join;
- branch deletion after merge enabled;
- workflow token permissions restricted to read-only by default; and
- CI actions pinned to immutable commit SHAs.

`.github/dependabot.yml` opens grouped weekly pnpm and GitHub Actions updates.
The Quality workflow runs the normal gate plus `pnpm audit:prod`; the latter
accepts only the explicitly time-bounded advisory families in
[`DEPENDENCY_RISK.md`](DEPENDENCY_RISK.md).

## Maintainer review

Review repository settings after adding a collaborator, enabling a new GitHub
App, creating an environment secret, or changing deployment automation. Require
at least one approving review before a second maintainer gains write access.
Never store Google credentials in GitHub unless a specific deployment workflow
is approved; prefer workload identity federation over long-lived keys.
