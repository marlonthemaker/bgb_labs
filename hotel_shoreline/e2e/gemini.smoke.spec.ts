import { expect, test } from "@playwright/test";

const providerResultTimeoutMs = 35_000;

test("HSD4-P-001/HSD4-P-002: completes the opt-in real Gemini Taskmaster workflow", async ({
	page,
}) => {
	test.setTimeout(45_000);
	test.skip(
		process.env.HSD_REAL_GEMINI_SMOKE !== "1",
		"Set HSD_REAL_GEMINI_SMOKE=1 only when the server has approved Gemini credentials.",
	);
	await page.goto("/");
	await page.getByRole("button", { name: "Run fixed request" }).click();

	const outcome = page.getByRole("region", { name: "Run outcome" });
	await expect(outcome).toContainText("Planner: genkit", {
		timeout: providerResultTimeoutMs,
	});
	await expect(outcome).toContainText("Status: succeeded");
	await expect(outcome).toContainText("Model: gemini-3.5-flash");
	await expect(outcome).toContainText("Operations recorded: 2");
	await expect(page.getByRole("list", { name: "Ordered run events" })).toContainText(
		"execution.finished",
	);
});
