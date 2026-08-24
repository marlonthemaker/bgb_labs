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

test("HSD3-UI-001: runs the fixed request and renders truthful execution evidence", async ({
	page,
}) => {
	await page.goto("/");

	await page.getByRole("button", { name: "Run fixed request" }).click();

	await expect(page.getByText("Status:")).toContainText("succeeded");
	await expect(page.getByText("Planner:")).toContainText("deterministic");
	await expect(page.getByText("request-maintenance: ")).toContainText("succeeded");
	await expect(page.getByText("request-housekeeping: ")).toContainText("succeeded");
	await expect(page.getByText("Operations recorded: 2")).toBeVisible();
	await expect(page.getByRole("list", { name: "Ordered run events" })).toContainText(
		"execution.finished",
	);
	await expect(
		page.getByText("not affiliated with, endorsed by, or operated by Google"),
	).toBeVisible();
});

test("HSD4-UI-001: shows event, planning, validation, and execution lifecycle", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("button", { name: "Run fixed request" }).click();

	await expect(page.getByRole("list", { name: "Ordered run events" })).toContainText(
		"event.received",
	);
	await expect(page.getByRole("list", { name: "Ordered run events" })).toContainText(
		"planning.finished",
	);
	await expect(page.getByRole("list", { name: "Ordered run events" })).toContainText(
		"validation.finished",
	);
});
