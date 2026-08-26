import "server-only";

import { googleAI } from "@genkit-ai/google-genai";
import { genkit, z } from "genkit";

import { withSanitizedGeminiError } from "../gemini-error";
import { configureTaskmasterGenkitLogging } from "../genkit-logging";
import { geminiTaskmasterPlanningBudget } from "../taskmaster";
import type { ComparisonPlanner, ComparisonPlanningRequest } from "./orchestrator";

configureTaskmasterGenkitLogging();
const ai = genkit({ plugins: [googleAI()] });

export class GeminiComparisonPlanner implements ComparisonPlanner {
	readonly configuration = {
		provider: "google-genai" as const,
		model: "gemini-3.5-flash",
		plannerVersion: "genkit-google-genai-v1",
		promptVersion: "hsd5-matched-comparison-v1",
		temperature: 0,
		budget: geminiTaskmasterPlanningBudget,
	};

	async plan(request: ComparisonPlanningRequest, context: { readonly signal: AbortSignal }) {
		if (!process.env.GEMINI_API_KEY?.trim()) throw new Error("GEMINI_API_KEY is not configured.");
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
		const sharedPrompt = [
			"Return only one JSON task graph. Propose tasks; do not call tools.",
			"Use the authored transcript exactly as the source of requested operations.",
			`Set contractId to the shared opaque execution key ${JSON.stringify(request.contractKey)}.`,
			"Available operational interfaces:",
			"- request_maintenance({stayId, roomNumber})",
			"- request_housekeeping({stayId, roomNumber, extraTowelCount})",
			"- relocate_guest({stayId, roomNumber})",
			`Shared operational context: ${JSON.stringify(request.operationalContext)}.`,
			`Authored ${request.locale} transcript: ${JSON.stringify(request.turns.map(({ sequence, text }) => ({ sequence, text })))}`,
		];
		const treatmentPrompt = request.contractGuidance
			? [
					`Semantic contract version: ${request.contractGuidance.version}.`,
					`Allowed tools: ${JSON.stringify(request.contractGuidance.allowedTools)}.`,
					`Prohibited effects: ${JSON.stringify(request.contractGuidance.prohibitedEffects)}.`,
					`Preserve and attach every required constraint: ${JSON.stringify(request.contractGuidance.requiredConstraintIds)}.`,
					"Decompose the transcript under this contract; do not invent, repair, or execute operations.",
				]
			: [
					"No semantic-contract guidance is supplied in this baseline condition. Decompose using only the transcript, shared tool interface, and schema.",
				];
		const response = await withSanitizedGeminiError(() =>
			ai.generate({
				model: googleAI.model(this.configuration.model),
				abortSignal: context.signal,
				config: {
					maxOutputTokens: this.configuration.budget.maxOutputTokens,
					temperature: this.configuration.temperature,
					thinkingConfig: { thinkingLevel: "MINIMAL" },
				},
				prompt: [...sharedPrompt, ...treatmentPrompt].join("\n"),
				output: { schema: graphSchema },
			}),
		);
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
