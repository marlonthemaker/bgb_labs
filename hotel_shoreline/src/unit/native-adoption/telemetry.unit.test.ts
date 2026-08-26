import { afterEach, describe, expect, it, vi } from "vitest";

import { GeminiPlannerError } from "../../lib/gemini-error";
import {
	type ComparisonPlanner,
	DeterministicComparisonPlanner,
	executeMatchedComparison,
} from "../../lib/native-adoption/orchestrator";
import {
	createComparisonTelemetry,
	writeComparisonTelemetry,
} from "../../lib/native-adoption/telemetry";

describe("HSD-005 comparison telemetry", () => {
	afterEach(() => vi.restoreAllMocks());

	it("HSD5-E-003: emits only allowlisted operational metadata", async () => {
		const run = await executeMatchedComparison({
			caseId: "compound-recovery",
			locale: "es-ES",
			planner: new DeterministicComparisonPlanner(),
			idFactory: () => "telemetry",
		});
		const event = createComparisonTelemetry({ requestId: "request", durationMs: 12.6, run });
		expect(event).toMatchObject({
			event: "native_adoption.comparison.completed",
			requestId: "request",
			caseId: "compound-recovery",
			locale: "es-ES",
			baselineStatus: "rejected",
			interventionStatus: "succeeded",
			durationMs: 13,
		});
		const serialized = JSON.stringify(event);
		expect(serialized).not.toContain("agua caliente");
		expect(serialized).not.toContain("stayId");
		expect(serialized).not.toContain("constraintIds");
	});

	it("HSD5-E-003: logs typed arm failures without provider details", async () => {
		const deterministic = new DeterministicComparisonPlanner();
		const planner: ComparisonPlanner = {
			configuration: deterministic.configuration,
			plan: async () => {
				throw new GeminiPlannerError("PLANNER_QUOTA_EXHAUSTED");
			},
		};
		const run = await executeMatchedComparison({
			caseId: "compound-recovery",
			locale: "en",
			planner,
			idFactory: () => "quota-telemetry",
		});
		const event = createComparisonTelemetry({ requestId: "quota", durationMs: 1, run });
		expect(event).toMatchObject({
			baselineErrorCode: "PLANNER_QUOTA_EXHAUSTED",
			interventionErrorCode: "PLANNER_QUOTA_EXHAUSTED",
			baselineOperationCount: 0,
			interventionOperationCount: 0,
		});
		expect(JSON.stringify(event)).not.toContain("RESOURCE_EXHAUSTED");
	});

	it("HSD5-E-003: routes allowlisted structured events by severity", async () => {
		const run = await executeMatchedComparison({
			caseId: "corrective-change",
			locale: "en",
			planner: new DeterministicComparisonPlanner(),
			idFactory: () => "logging",
		});
		const warning = createComparisonTelemetry({
			requestId: "warning",
			durationMs: Number.NaN,
			run,
		});
		const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
		writeComparisonTelemetry(warning);
		expect(warn).toHaveBeenCalledWith(expect.stringContaining('"requestId":"warning"'));

		const info = vi.spyOn(console, "info").mockImplementation(() => undefined);
		writeComparisonTelemetry({ ...warning, severity: "INFO", requestId: "info" });
		expect(info).toHaveBeenCalledWith(expect.stringContaining('"severity":"INFO"'));
		expect(warning.durationMs).toBe(0);
	});
});
