import { NextResponse } from "next/server";

import { GeminiTaskPlanner } from "../../../lib/genkit-planner";
import { DeterministicTaskPlanner, executeGuestRequest } from "../../../lib/taskmaster";

export const runtime = "nodejs";

export async function POST() {
	const planner =
		process.env.HSD_PLANNER_MODE === "gemini"
			? new GeminiTaskPlanner()
			: new DeterministicTaskPlanner();
	const run = await executeGuestRequest({ planner });
	return NextResponse.json(run, { status: run.status === "planning_failed" ? 503 : 200 });
}
