import { expect, test } from "@playwright/test";

test("HSD4-P-001/HSD4-P-002: completes the opt-in real Gemini Taskmaster workflow", async ({
	page,
}) => {
	test.skip(
		process.env.HSD_REAL_GEMINI_SMOKE !== "1",
		"Set HSD_REAL_GEMINI_SMOKE=1 only when the server has approved Gemini credentials.",
	);
	await page.goto("/");
	await page.getByRole("button", { name: "Run fixed request" }).click();

	await expect(page.getByText("Status:")).toContainText("succeeded");
	await expect(page.getByText("Planner:")).toContainText("genkit");
	await expect(page.getByText("Model:")).toContainText("gemini-3.5-flash");
	await expect(page.getByText("Operations recorded: 2")).toBeVisible();
	await expect(page.getByRole("list", { name: "Ordered run events" })).toContainText(
		"execution.finished",
	);
});
