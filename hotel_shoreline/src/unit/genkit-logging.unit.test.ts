import { logger } from "genkit/logging";
import { afterEach, describe, expect, it, vi } from "vitest";

import { configureTaskmasterGenkitLogging } from "../lib/genkit-logging";

describe("HSD-004 Genkit logging boundary", () => {
	afterEach(() => {
		logger.init(logger.defaultLogger);
		vi.restoreAllMocks();
	});

	it("HSD4-P-003/HSD4-C-001: does not forward provider errors outside the telemetry allowlist", () => {
		const consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
		const consoleInfo = vi.spyOn(console, "info").mockImplementation(() => undefined);
		configureTaskmasterGenkitLogging();

		logger.error(new Error("provider URL, response detail, and stack must remain private"));
		logger.info("prompt or provider diagnostic must remain private");

		expect(consoleError).not.toHaveBeenCalled();
		expect(consoleInfo).not.toHaveBeenCalled();
	});
});
