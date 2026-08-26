import "server-only";

import { googleAI } from "@genkit-ai/google-genai";
import { genkit, z } from "genkit";

import { configureTaskmasterGenkitLogging } from "./genkit-logging";
import { shorelineContract, shorelineFixture } from "./shoreline";
import {
	type GuestRequestReceived,
	geminiTaskmasterPlanningBudget,
	type PlanningContext,
	type PlanningOutput,
	type TaskPlanner,
} from "./taskmaster";

configureTaskmasterGenkitLogging();
const ai = genkit({ plugins: [googleAI()] });
const graphSchema = z.object({
	id: z.string(),
	contractId: z.string(),
	preservedConstraintIds: z.array(z.string()),
	nodes: z.array(
		z.object({
			id: z.string(),
			toolName: z.string(),
			input: z.record(z.string(), z.unknown()),
			dependsOn: z.array(z.string()),
			constraintIds: z.array(z.string()),
			idempotencyKey: z.string(),
		}),
	),
});

export class GeminiTaskPlanner implements TaskPlanner {
	readonly metadata = { framework: "genkit" as const, model: "gemini-3.5-flash" };

	async plan(event: GuestRequestReceived, context: PlanningContext): Promise<PlanningOutput> {
		if (!process.env.GEMINI_API_KEY?.trim()) {
			throw new Error("GEMINI_API_KEY is not configured.");
		}
		const response = await ai.generate({
			model: googleAI.model("gemini-3.5-flash"),
			abortSignal: context.signal,
			config: {
				maxOutputTokens: geminiTaskmasterPlanningBudget.maxOutputTokens,
				thinkingConfig: { thinkingLevel: "MINIMAL" },
			},
			prompt: [
				"Return only one JSON task graph. Propose tasks; do not call tools.",
				`Set contractId to ${JSON.stringify(shorelineContract.id)}.`,
				`Set preservedConstraintIds to ${JSON.stringify(shorelineContract.requiredConstraintIds)}.`,
				"Create exactly two independent nodes with empty dependsOn arrays and unique idempotency keys.",
				`The maintenance node uses request_maintenance with input ${JSON.stringify({ stayId: shorelineFixture.stayId, roomNumber: shorelineFixture.roomNumber })} and constraintIds ["room-204", "no-charge"].`,
				`The housekeeping node uses request_housekeeping with input ${JSON.stringify({ stayId: shorelineFixture.stayId, roomNumber: shorelineFixture.roomNumber, extraTowelCount: shorelineFixture.maxExtraTowels })} and constraintIds ["room-204", "two-extra-towels", "no-charge"].`,
				`Guest request: ${event.request}`,
			].join("\n"),
			output: { schema: graphSchema },
		});
		if (!response.output) throw new Error("Gemini returned no structured graph.");
		return {
			graph: response.output,
			usage:
				response.usage.outputTokens === undefined
					? { turns: 1 }
					: { turns: 1, outputTokens: response.usage.outputTokens },
		};
	}
}
