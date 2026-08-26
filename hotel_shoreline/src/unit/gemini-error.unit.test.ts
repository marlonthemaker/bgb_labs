import { describe, expect, it } from "vitest";

import {
	GeminiPlannerError,
	sanitizeGeminiPlannerError,
	withSanitizedGeminiError,
} from "../lib/gemini-error";

describe("HSD-004/HSD-005 Gemini provider error boundary", () => {
	it("HSD4-P-003/HSD5-E-003: classifies quota exhaustion without retaining provider detail", () => {
		const result = sanitizeGeminiPlannerError(
			new Error("429 RESOURCE_EXHAUSTED quota exceeded; secret provider detail"),
		);
		expect(result).toMatchObject({
			name: "GeminiPlannerError",
			code: "PLANNER_QUOTA_EXHAUSTED",
			message: "Gemini provider quota is exhausted.",
		});
		expect(JSON.stringify(result)).not.toContain("secret provider detail");
	});

	it("HSD4-P-003/HSD5-E-003: maps unknown failures to unavailable and preserves typed errors", () => {
		expect(sanitizeGeminiPlannerError(new Error("socket closed"))).toMatchObject({
			code: "PLANNER_UNAVAILABLE",
		});
		expect(
			sanitizeGeminiPlannerError({
				toString: () => {
					throw new Error("unsafe coercion");
				},
			}),
		).toMatchObject({ code: "PLANNER_UNAVAILABLE" });
		const typed = new GeminiPlannerError("PLANNER_QUOTA_EXHAUSTED");
		expect(sanitizeGeminiPlannerError(typed)).toBe(typed);
	});

	it("HSD4-P-003/HSD5-E-003: sanitizes rejected provider operations", async () => {
		await expect(
			withSanitizedGeminiError(() => Promise.reject(new Error("429 quota exceeded private"))),
		).rejects.toMatchObject({ code: "PLANNER_QUOTA_EXHAUSTED" });
		await expect(withSanitizedGeminiError(() => Promise.resolve("ok"))).resolves.toBe("ok");
	});
});
