import { NextResponse } from "next/server";
import { readBoundedJson } from "../../../lib/http-input";
import { NativeAdoptionCaseError } from "../../../lib/native-adoption/cases";
import { ComparisonConditionError } from "../../../lib/native-adoption/conditions";
import { GeminiComparisonPlanner } from "../../../lib/native-adoption/genkit-comparison-planner";
import {
	DeterministicComparisonPlanner,
	executeMatchedComparison,
} from "../../../lib/native-adoption/orchestrator";
import {
	createComparisonTelemetry,
	writeComparisonTelemetry,
} from "../../../lib/native-adoption/telemetry";
import { projectComparisonView } from "../../../lib/native-adoption/view";
import { resolveTaskmasterPlannerMode } from "../../../lib/taskmaster";

export const runtime = "nodejs";

export async function POST(request: Request) {
	const requestId = crypto.randomUUID();
	const startedAt = performance.now();
	const headers = { "Cache-Control": "no-store", "X-Request-Id": requestId };
	try {
		const parsedBody = await readBoundedJson(request);
		if (!parsedBody.ok) {
			return parsedBody.code === "REQUEST_TOO_LARGE"
				? requestTooLarge(requestId, headers)
				: invalidRequest(requestId, headers);
		}
		const body = parsedBody.value;
		if (!isComparisonRequest(body)) {
			return invalidRequest(requestId, headers);
		}
		const mode = resolveTaskmasterPlannerMode(process.env.HSD_PLANNER_MODE);
		const planner =
			mode === "gemini" ? new GeminiComparisonPlanner() : new DeterministicComparisonPlanner();
		const run = await executeMatchedComparison({
			caseId: body.caseId,
			locale: body.locale,
			planner,
		});
		writeComparisonTelemetry(
			createComparisonTelemetry({
				requestId,
				durationMs: performance.now() - startedAt,
				run,
			}),
		);
		return NextResponse.json(projectComparisonView(run), { status: 200, headers });
	} catch (error) {
		if (error instanceof NativeAdoptionCaseError || error instanceof ComparisonConditionError) {
			return NextResponse.json(
				{ error: { code: error.code, requestId } },
				{ status: 400, headers },
			);
		}
		console.error(
			JSON.stringify({
				severity: "ERROR",
				message: "Native-adoption comparison route crashed",
				event: "native_adoption.comparison.crashed",
				requestId,
				errorType: error instanceof Error ? error.name : "NonErrorThrownValue",
				durationMs: Math.max(0, Math.round(performance.now() - startedAt)),
			}),
		);
		return NextResponse.json(
			{ error: { code: "COMPARISON_INTERNAL_ERROR", requestId } },
			{ status: 500, headers },
		);
	}
}

function requestTooLarge(requestId: string, headers: Record<string, string>) {
	return NextResponse.json(
		{ error: { code: "REQUEST_TOO_LARGE", requestId } },
		{ status: 413, headers },
	);
}

function invalidRequest(requestId: string, headers: Record<string, string>) {
	return NextResponse.json(
		{ error: { code: "INVALID_COMPARISON_REQUEST", requestId } },
		{ status: 400, headers },
	);
}

function isComparisonRequest(value: unknown): value is { caseId: string; locale: string } {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	const candidate = value as Record<string, unknown>;
	return (
		Object.keys(candidate).every((key) => key === "caseId" || key === "locale") &&
		typeof candidate.caseId === "string" &&
		candidate.caseId.length > 0 &&
		candidate.caseId.length <= 80 &&
		typeof candidate.locale === "string" &&
		candidate.locale.length > 0 &&
		candidate.locale.length <= 16
	);
}
