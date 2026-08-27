import { NextResponse } from "next/server";

import { GeminiTaskPlanner } from "../../../lib/genkit-planner";
import { readEmptyBody } from "../../../lib/http-input";
import {
	DeterministicTaskPlanner,
	executeGuestRequest,
	geminiTaskmasterPlanningBudget,
	resolveTaskmasterPlannerMode,
} from "../../../lib/taskmaster";
import {
	createTaskmasterCrashTelemetry,
	createTaskmasterRunTelemetry,
	resolveCloudTrace,
	writeTaskmasterTelemetry,
} from "../../../lib/taskmaster-telemetry";
import { projectRunView } from "../../../lib/taskmaster-view";

export const runtime = "nodejs";

export async function POST(request: Request) {
	const requestId = crypto.randomUUID();
	const startedAt = performance.now();
	const cloudTrace = resolveCloudTrace(
		request.headers.get("x-cloud-trace-context"),
		process.env.GOOGLE_CLOUD_PROJECT,
	);
	const telemetryContext = (durationMs: number) => ({
		requestId,
		durationMs,
		...(cloudTrace === undefined ? {} : { cloudTrace }),
	});
	const responseHeaders = {
		"Cache-Control": "no-store",
		"X-Request-Id": requestId,
	};

	try {
		const body = await readEmptyBody(request);
		if (!body.ok) {
			return NextResponse.json(
				{ error: { code: "REQUEST_TOO_LARGE", requestId } },
				{ status: 413, headers: responseHeaders },
			);
		}
		const mode = resolveTaskmasterPlannerMode(process.env.HSD_PLANNER_MODE);
		const isGemini = mode === "gemini";
		const planner = isGemini ? new GeminiTaskPlanner() : new DeterministicTaskPlanner();
		const run = await executeGuestRequest({
			planner,
			...(isGemini ? { budget: geminiTaskmasterPlanningBudget } : {}),
		});
		writeTaskmasterTelemetry(
			createTaskmasterRunTelemetry(telemetryContext(performance.now() - startedAt), run),
		);
		return NextResponse.json(projectRunView(run), {
			status: run.status === "planning_failed" ? 503 : 200,
			headers: responseHeaders,
		});
	} catch (error) {
		writeTaskmasterTelemetry(
			createTaskmasterCrashTelemetry(telemetryContext(performance.now() - startedAt), error),
		);
		return NextResponse.json(
			{ error: { code: "TASKMASTER_INTERNAL_ERROR", requestId } },
			{ status: 500, headers: responseHeaders },
		);
	}
}
