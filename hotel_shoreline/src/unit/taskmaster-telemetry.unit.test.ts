import { afterEach, describe, expect, it, vi } from "vitest";
import { DeterministicTaskPlanner, executeGuestRequest } from "../lib/taskmaster";
import {
	createTaskmasterCrashTelemetry,
	createTaskmasterRunTelemetry,
	resolveCloudTrace,
	writeTaskmasterTelemetry,
} from "../lib/taskmaster-telemetry";

describe("HSD-004 Taskmaster telemetry", () => {
	afterEach(() => vi.restoreAllMocks());

	it("HSD4-P-001/HSD4-UI-001: emits only allowlisted run metadata", async () => {
		const run = await executeGuestRequest({ planner: new DeterministicTaskPlanner() });
		const event = createTaskmasterRunTelemetry({ requestId: "request-1", durationMs: 12.6 }, run);

		expect(event).toEqual({
			severity: "INFO",
			message: "Taskmaster run completed",
			event: "taskmaster.run.completed",
			requestId: "request-1",
			durationMs: 13,
			eventId: "shoreline-guest-request-204-v1",
			fixtureVersion: "shoreline-fixture-v1",
			plannerFramework: "deterministic",
			plannerModel: "frozen-hsd-003-graph",
			status: "succeeded",
			operationCount: 2,
			candidateNodeCount: 2,
			planningTurns: 1,
			terminalLifecycleEvent: "execution.finished",
			validationOutcome: "accepted",
		});
		expect(JSON.stringify(event)).not.toContain("roomNumber");
		expect(JSON.stringify(event)).not.toContain("preservedConstraintIds");
	});

	it("HSD4-P-003: records only the exception type for an unexpected crash", () => {
		const event = createTaskmasterCrashTelemetry(
			{ requestId: "request-2", durationMs: Number.NaN },
			new Error("provider detail must not be logged"),
		);

		expect(event).toEqual({
			severity: "ERROR",
			message: "Taskmaster route crashed",
			event: "taskmaster.run.crashed",
			requestId: "request-2",
			durationMs: 0,
			errorType: "Error",
		});
		expect(JSON.stringify(event)).not.toContain("provider detail");
	});

	it("HSD4-P-003: records handled provider unavailability as a warning without provider detail", async () => {
		const run = await executeGuestRequest({
			planner: {
				metadata: { framework: "genkit", model: "gemini-3.5-flash" },
				plan: async () => Promise.reject(new Error("private provider response")),
			},
		});
		const event = createTaskmasterRunTelemetry(
			{ requestId: "request-provider-unavailable", durationMs: 503 },
			run,
		);

		expect(event).toMatchObject({
			severity: "WARNING",
			event: "taskmaster.run.completed",
			status: "planning_failed",
			errorCode: "PLANNER_UNAVAILABLE",
			operationCount: 0,
			candidateNodeCount: 0,
			terminalLifecycleEvent: "planning.failed",
		});
		expect(JSON.stringify(event)).not.toContain("private provider response");
	});

	it("HSD4-C-001: accepts only valid Cloud Trace and project identifiers", () => {
		expect(
			resolveCloudTrace("0123456789abcdef0123456789abcdef/123;o=1", "hotel-shoreline-123"),
		).toBe("projects/hotel-shoreline-123/traces/0123456789abcdef0123456789abcdef");
		expect(resolveCloudTrace("not-a-trace", "hotel-shoreline-123")).toBeUndefined();
		expect(
			resolveCloudTrace("0123456789abcdef0123456789abcdef/123;o=1", "INVALID"),
		).toBeUndefined();
	});

	it("HSD4-C-001: writes structured completion and crash events to the matching stream", async () => {
		const info = vi.spyOn(console, "info").mockImplementation(() => undefined);
		const warning = vi.spyOn(console, "warn").mockImplementation(() => undefined);
		const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
		const run = await executeGuestRequest({ planner: new DeterministicTaskPlanner() });
		writeTaskmasterTelemetry(
			createTaskmasterRunTelemetry(
				{
					requestId: "request-3",
					durationMs: 1,
					cloudTrace: "projects/hotel-shoreline-123/traces/0123456789abcdef0123456789abcdef",
				},
				run,
			),
		);
		writeTaskmasterTelemetry(
			createTaskmasterCrashTelemetry({ requestId: "request-4", durationMs: 1 }, "failure"),
		);
		const unavailable = await executeGuestRequest({
			planner: {
				metadata: { framework: "genkit", model: "unavailable-test" },
				plan: async () => Promise.reject(new Error("unavailable")),
			},
		});
		writeTaskmasterTelemetry(
			createTaskmasterRunTelemetry({ requestId: "request-5", durationMs: 1 }, unavailable),
		);

		expect(error).toHaveBeenCalledOnce();
		expect(info).toHaveBeenCalledOnce();
		expect(warning).toHaveBeenCalledOnce();
		expect(info).toHaveBeenCalledWith(expect.stringContaining("logging.googleapis.com/trace"));
	});
});
