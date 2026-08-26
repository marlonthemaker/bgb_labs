import { expect, test } from "@playwright/test";

const realProviderEnabled = process.env.HSD_REAL_GEMINI_SMOKE === "1";
const cases = ["compound-recovery", "conditional-safety", "corrective-change"] as const;
const locales = ["en", "es-ES", "pt-PT"] as const;
const providerIntervalMs = 30_000;

test("HSD5-E-001: completes one real Gemini comparison pair", async ({ request }) => {
	test.skip(!realProviderEnabled, "Set HSD_REAL_GEMINI_SMOKE=1 to spend provider quota.");
	test.setTimeout(90_000);
	const response = await request.post("/api/native-adoption", {
		data: { caseId: "compound-recovery", locale: "en" },
	});
	const evidence: unknown = await response.json();
	expect(response.status()).toBe(200);
	expect(evidence).toMatchObject({
		case: { id: "compound-recovery", locale: "en" },
		arms: [
			{ arm: "baseline", configuration: { provider: "google-genai" } },
			{
				arm: "contract_guided",
				status: "succeeded",
				configuration: { provider: "google-genai" },
			},
		],
	});
});

test("HSD5-E-001/HSD5-E-003: retains the opt-in real Gemini nine-block comparison matrix", async ({
	request,
}, testInfo) => {
	test.skip(!realProviderEnabled, "Set HSD_REAL_GEMINI_SMOKE=1 to spend provider quota.");
	test.setTimeout(10 * 60 * 1_000);
	const attempts: unknown[] = [];
	for (const caseId of cases) {
		for (const locale of locales) {
			const response = await request.post("/api/native-adoption", { data: { caseId, locale } });
			const evidence: unknown = await response.json();
			expect(response.status()).toBe(200);
			expect(evidence).toMatchObject({
				case: { id: caseId, locale },
				arms: [
					{ arm: "baseline", configuration: { provider: "google-genai" } },
					{ arm: "contract_guided", configuration: { provider: "google-genai" } },
				],
			});
			attempts.push(evidence);
			// This is quota pacing between independent evidence blocks, not an
			// application retry or a wait for UI state. Each arm still gets exactly
			// one provider attempt and every failure remains in the attachment.
			await new Promise((resolve) => setTimeout(resolve, providerIntervalMs));
		}
	}
	await testInfo.attach("native-adoption-gemini-matrix.json", {
		body: JSON.stringify(attempts, null, 2),
		contentType: "application/json",
	});
	expect(attempts).toHaveLength(9);
});
