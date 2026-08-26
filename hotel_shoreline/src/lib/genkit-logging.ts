import { logger } from "genkit/logging";

const discard = (..._values: unknown[]): void => undefined;

const taskmasterGenkitLogSink = {
	level: "error",
	debug: discard,
	info: discard,
	warn: discard,
	error: discard,
};

/**
 * Prevents provider-owned diagnostics from bypassing the Taskmaster telemetry
 * allowlist. The route emits one request-correlated completion event after
 * Genkit returns or throws, so forwarding Genkit's raw error payload would add
 * an uncorrelated exception message and stack without improving run evidence.
 */
export function configureTaskmasterGenkitLogging(): void {
	logger.init(taskmasterGenkitLogSink);
}
