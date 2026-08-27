# Production Dependency Risk Register

**Snapshot date:** 2026-08-27  
**Owner:** repository maintainers  
**Next mandatory review:** 2026-09-30

`pnpm audit --prod` currently reports seven vulnerable dependency instances
across five advisory records and four GHSA families: three high and four
moderate instances, with no critical findings. Genkit and its Google adapter
are already at the latest compatible release (`1.41.0`). The repository does
not force incompatible transitive overrides; `pnpm audit:prod` fails for a new
family or when this disposition expires.

| Advisory | Installed path / applicability | Current mitigation | Exit condition |
| --- | --- | --- | --- |
| [GHSA-w5hq-g745-h8pq](https://github.com/advisories/GHSA-w5hq-g745-h8pq) (`uuid`, moderate) | Transitive through Genkit and Google auth. The vulnerable API requires a caller-provided output buffer; application input is not passed to `uuid`, but the package remains installed. | Bounded HTTP input and no direct `uuid` use. Treat as constrained, not resolved. | Upgrade when Genkit/Google auth accepts `uuid >=11.1.1`, or remove the path. |
| [GHSA-q7rr-3cgh-j5r3](https://github.com/advisories/GHSA-q7rr-3cgh-j5r3) (OpenTelemetry Prometheus, high; two instances) | Transitive through Genkit telemetry. Hotel Shoreline does not configure or expose a Prometheus exporter endpoint. | No Prometheus exporter configuration; Cloud Run instance caps limit blast radius. | Upgrade through a compatible Genkit release using fixed OpenTelemetry packages, or verify removal from the production bundle. |
| [GHSA-45rx-2jwx-cxfr](https://github.com/advisories/GHSA-45rx-2jwx-cxfr) (Jaeger propagator, high) | Transitive through Genkit. No Jaeger propagator is configured; application trace correlation accepts only Google Cloud trace syntax. | Jaeger propagation remains disabled and request errors are sanitized. | Upgrade through compatible Genkit/OpenTelemetry or remove the transitive propagator. |
| [GHSA-8988-4f7v-96qf](https://github.com/advisories/GHSA-8988-4f7v-96qf) (W3C baggage, moderate; two instances) | Transitive OpenTelemetry core may parse public propagation headers. This is the most plausibly reachable residual family. | Node's bounded HTTP headers, Cloud Run request limits, application body limits, two-instance cap, and sanitized failure handling constrain exposure. | Upgrade through compatible Genkit/OpenTelemetry; reassess immediately if propagation configuration changes. |

## Review procedure

1. Run `pnpm outdated` and `pnpm audit --prod`.
2. Upgrade supported direct dependencies and rerun the full gate.
3. For remaining findings, verify actual production paths and configuration;
   do not label an installed dependency “not affected” solely because no exploit
   has been observed.
4. Update this record and the allowlist/expiry in
   `scripts/verify-production-audit.mjs` together.
5. Escalate any critical finding, new reachable high finding, or expired
   mitigation before deployment.
