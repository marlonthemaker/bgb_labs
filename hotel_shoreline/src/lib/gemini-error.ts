export type GeminiPlannerErrorCode = "PLANNER_QUOTA_EXHAUSTED" | "PLANNER_UNAVAILABLE";

export class GeminiPlannerError extends Error {
	constructor(readonly code: GeminiPlannerErrorCode) {
		super(
			code === "PLANNER_QUOTA_EXHAUSTED"
				? "Gemini provider quota is exhausted."
				: "Gemini provider is unavailable.",
		);
		this.name = "GeminiPlannerError";
	}
}

export function sanitizeGeminiPlannerError(error: unknown): GeminiPlannerError {
	if (error instanceof GeminiPlannerError) return error;
	let providerText = "";
	try {
		providerText = error instanceof Error ? `${error.name} ${error.message}` : String(error);
	} catch {
		// Treat even pathological provider values as unavailable without retaining them.
	}
	return /\b429\b|RESOURCE_EXHAUSTED|quota exceeded/i.test(providerText)
		? new GeminiPlannerError("PLANNER_QUOTA_EXHAUSTED")
		: new GeminiPlannerError("PLANNER_UNAVAILABLE");
}

export async function withSanitizedGeminiError<T>(operation: () => Promise<T>): Promise<T> {
	try {
		return await operation();
	} catch (error) {
		throw sanitizeGeminiPlannerError(error);
	}
}
