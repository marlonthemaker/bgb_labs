import { expect, test } from "@playwright/test";

test("HSD1-UI-001: presents the fictional Hotel Shoreline boundary", async ({ page }) => {
	await page.goto("/");

	await expect(page.getByRole("heading", { name: "Hotel Shoreline" })).toBeVisible();
	await expect(page.getByText("Native Agent SDK boundary:")).toBeVisible();
	await expect(
		page.getByText("not affiliated with, endorsed by, or operated by Google"),
	).toBeVisible();
	await expect(page.getByText("not research findings")).toBeVisible();
});
