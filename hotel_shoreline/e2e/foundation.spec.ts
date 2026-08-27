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

test("HSD3-F-004/HSD3-UI-001/HSD4-UI-001: runs the fixed request and renders sanitized execution evidence", async ({
	page,
}) => {
	await page.goto("/");

	const responsePromise = page.waitForResponse("**/api/taskmaster");
	await page.getByRole("button", { name: "Run fixed request" }).click();
	const publicRun: unknown = await (await responsePromise).json();

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
	expect(publicRun).not.toHaveProperty("run");
	expect(publicRun).not.toHaveProperty("candidateGraph.nodes.0.input");
});

test("HSD4-UI-001: shows event, planning, validation, and execution lifecycle", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("button", { name: "Run fixed request" }).click();

	await expect(page.getByRole("region", { name: "Planner candidate graph" })).toContainText(
		"request_maintenance",
	);
	await expect(page.getByRole("region", { name: "Planner candidate graph" })).toContainText(
		"request_housekeeping",
	);
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

test("HSD4-P-003/HSD4-UI-001: renders a typed planning failure without claiming operations", async ({
	page,
}) => {
	await page.route("**/api/taskmaster", async (route) => {
		await route.fulfill({
			status: 503,
			contentType: "application/json",
			body: JSON.stringify({
				plannerFramework: "genkit",
				plannerModel: "gemini-3.5-flash",
				budget: {
					timeoutMs: 30_000,
					maxTurns: 1,
					maxOutputTokens: 1_024,
					maxNodes: 4,
				},
				lifecycle: ["event.received", "planning.started", "planning.failed"],
				status: "planning_failed",
				errorCode: "PLANNER_TIMEOUT",
				operationCount: 0,
				nodeResults: [],
			}),
		});
	});
	await page.goto("/");
	await page.getByRole("button", { name: "Run fixed request" }).click();

	await expect(page.getByText("Status:")).toContainText("planning_failed");
	await expect(page.getByText("Stopped safely before scenario operations.")).toBeVisible();
	await expect(page.getByText("Error: PLANNER_TIMEOUT")).toBeVisible();
	await expect(page.getByText("Operations recorded: 0")).toBeVisible();
	await expect(page.getByRole("region", { name: "Planner candidate graph" })).toContainText(
		"Planning stopped before a structurally valid candidate was available.",
	);
	await expect(page.getByRole("list", { name: "Ordered run events" })).toContainText(
		"planning.failed",
	);
	await expect(
		page.getByText("not affiliated with, endorsed by, or operated by Google"),
	).toBeVisible();
});

test("HSD4-UI-001: rejects malformed API evidence without claiming completion", async ({
	page,
}) => {
	await page.route("**/api/taskmaster", async (route) => {
		await route.fulfill({
			status: 200,
			contentType: "application/json",
			body: JSON.stringify({ status: "succeeded" }),
		});
	});
	await page.goto("/");
	await page.getByRole("button", { name: "Run fixed request" }).click();

	await expect(
		page.getByText("Run evidence is unavailable. No completion is being claimed."),
	).toBeVisible();
	await expect(page.getByText("Status:")).toHaveCount(0);
});
