import { googleAI } from "@genkit-ai/google-genai";
import { genkit, z } from "genkit";

import type { GuestRequestReceived, TaskPlanner } from "./taskmaster";

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

	async plan(event: GuestRequestReceived): Promise<unknown> {
		if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not configured.");
		const response = await ai.generate({
			model: googleAI.model("gemini-3.5-flash"),
			prompt: [
				"Return only a task graph for the approved Hotel Shoreline contract.",
				"Allowed tools: request_maintenance, request_housekeeping.",
				"Required constraints: room-204, two-extra-towels, no-charge.",
				`Guest request: ${event.request}`,
			].join("\n"),
			output: { schema: graphSchema },
		});
		if (!response.output) throw new Error("Gemini returned no structured graph.");
		return response.output;
	}
}
