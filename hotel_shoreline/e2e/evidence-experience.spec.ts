import { readFile } from "node:fs/promises";

import { expect, test } from "@playwright/test";

test("HSD6-H-001/HSD6-U-003: reopens and downloads the exact saved comparison", async ({
	page,
}) => {
	await page.goto("/");
	const createdResponse = page.waitForResponse(
		(response) =>
			new URL(response.url()).pathname === "/api/native-adoption" &&
			response.request().method() === "POST",
	);
	await page.getByRole("button", { name: "Run matched comparison" }).click();
	const created = (await (await createdResponse).json()) as { comparisonId: string };

	const savedSelect = page.getByRole("combobox", { name: "Saved comparison", exact: true });
	await expect(savedSelect).toBeVisible();
	await expect(savedSelect).toHaveValue(created.comparisonId);
	await page.getByRole("button", { name: "Inspect saved comparison" }).click();
	await expect(
		page.getByRole("region", { name: "Comparison source and eligibility" }),
	).toContainText("Source evidence");

	const downloadPromise = page.waitForEvent("download");
	await page.getByRole("link", { name: "Download JSON evidence" }).click();
	const download = await downloadPromise;
	expect(download.suggestedFilename()).toBe(
		`hotel-shoreline-evidence-${created.comparisonId}.json`,
	);
	const downloadPath = await download.path();
	expect(downloadPath).toBeTruthy();
	const artifact = JSON.parse(await readFile(downloadPath ?? "", "utf8")) as {
		schemaVersion: string;
		comparison: { comparisonId: string; claimBoundary: { findingStatus: string } };
	};
	expect(artifact).toMatchObject({
		schemaVersion: "hotel-shoreline-public-evidence-v1",
		comparison: {
			comparisonId: created.comparisonId,
			claimBoundary: { findingStatus: "illustrative_observation" },
		},
	});
});

test("HSD6-H-001/HSD6-U-003: returns deterministic exports and typed detail errors", async ({
	request,
}) => {
	const createdResponse = await request.post("/api/native-adoption", {
		data: { caseId: "corrective-change", locale: "pt-PT" },
	});
	expect(createdResponse.ok()).toBe(true);
	const created = (await createdResponse.json()) as { comparisonId: string };

	const [first, second] = await Promise.all([
		request.get(`/api/native-adoption/${created.comparisonId}`),
		request.get(`/api/native-adoption/${created.comparisonId}`),
	]);
	expect(first.status()).toBe(200);
	expect(second.status()).toBe(200);
	expect(await first.text()).toBe(await second.text());
	expect(first.headers()["content-type"]).toContain("application/json");
	expect(first.headers()["content-disposition"]).toContain(
		`hotel-shoreline-evidence-${created.comparisonId}.json`,
	);

	const invalid = await request.get("/api/native-adoption/not-a-comparison-id");
	expect(invalid.status()).toBe(400);
	expect(await invalid.json()).toMatchObject({ error: { code: "INVALID_LEDGER_QUERY" } });

	const missing = await request.get("/api/native-adoption/00000000-0000-4000-8000-000000000001");
	expect(missing.status()).toBe(404);
	expect(await missing.json()).toMatchObject({ error: { code: "EVIDENCE_NOT_FOUND" } });

	const serialized = await (
		await request.get(`/api/native-adoption/${created.comparisonId}`)
	).text();
	for (const forbidden of [
		"DATABASE_URL",
		"connectionString",
		"secretKeyRef",
		"systemPrompt",
		"promptText",
		"exception.stack",
	]) {
		expect(serialized).not.toContain(forbidden);
	}
});

test("HSD6-U-001/HSD6-U-002: distinguishes lifecycle, exclusion, and measure evidence", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("button", { name: "Run matched comparison" }).click();

	await expect(page.getByRole("list", { name: "baseline stage status" })).toContainText(
		"Validationfailed",
	);
	await expect(page.getByRole("list", { name: "baseline stage status" })).toContainText(
		"Executionnot_reached",
	);
	await expect(page.getByRole("list", { name: "contract_guided stage status" })).toContainText(
		"Executioncompleted",
	);
	await expect(page.getByText("Pair eligible for reviewer-qualified aggregates:")).toContainText(
		"no",
	);
	const intervention = page.getByRole("region", { name: "contract_guided evidence" });
	await expect(intervention).toContainText("Expected task-input facts preserved");
	await expect(intervention).toContainText("Direction: higher is better");
	await expect(intervention).toContainText("Prompt / planner");
	await expect(intervention).toContainText("Shared / condition hash");
	await expect(
		page.getByText("not a research finding or a claim of language parity"),
	).toBeVisible();
});

test("HSD6-H-001: malformed saved detail preserves the current inspected evidence", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("button", { name: "Run matched comparison" }).click();
	await expect(page.getByRole("combobox", { name: "Saved comparison", exact: true })).toBeVisible();
	await expect(page.getByRole("region", { name: "contract_guided evidence" })).toContainText(
		"Status: succeeded",
	);

	await page.route(/\/api\/native-adoption\/[0-9a-f-]+$/, (route) =>
		route.fulfill({ json: { malformed: true } }),
	);
	await page.getByRole("button", { name: "Inspect saved comparison" }).click();

	await expect(
		page.getByText("Saved evidence is unavailable. The current comparison is unchanged."),
	).toBeVisible();
	await expect(page.getByRole("region", { name: "contract_guided evidence" })).toContainText(
		"Status: succeeded",
	);
});

test("HSD6-H-001: empty and unavailable history remain truthful and non-destructive", async ({
	page,
}) => {
	await page.route("**/api/native-adoption?limit=20", (route) =>
		route.fulfill({ json: { records: [] } }),
	);
	await page.goto("/");
	await page.getByRole("button", { name: "Refresh saved evidence" }).click();
	await expect(page.getByText("No saved comparisons yet.")).toBeVisible();

	await page.unroute("**/api/native-adoption?limit=20");
	await page.getByRole("button", { name: "Run matched comparison" }).click();
	await expect(page.getByRole("region", { name: "contract_guided evidence" })).toContainText(
		"Status: succeeded",
	);
	await page.route("**/api/native-adoption?limit=20", (route) =>
		route.fulfill({ status: 503, json: { error: { code: "LEDGER_UNAVAILABLE" } } }),
	);
	await page.getByRole("button", { name: "Refresh saved evidence" }).click();

	await expect(
		page.getByText("Saved evidence is unavailable. The current comparison is unchanged."),
	).toBeVisible();
	await expect(page.getByRole("region", { name: "contract_guided evidence" })).toContainText(
		"Status: succeeded",
	);
});

test("HSD6-U-004: a malformed rerun reports failure without replacing inspected evidence", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByRole("button", { name: "Run matched comparison" }).click();
	await expect(page.getByRole("region", { name: "contract_guided evidence" })).toContainText(
		"Status: succeeded",
	);
	await page.route("**/api/native-adoption", (route) =>
		route.request().method() === "POST"
			? route.fulfill({ json: { malformed: true } })
			: route.continue(),
	);
	await page.getByRole("button", { name: "Run matched comparison" }).click();

	await expect(
		page.getByText("Comparison evidence is unavailable. No outcome is being claimed."),
	).toBeVisible();
	await expect(page.getByRole("region", { name: "contract_guided evidence" })).toContainText(
		"Status: succeeded",
	);
});

test("HSD6-U-004: keeps the keyboard and 390px evidence flow usable", async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto("/");
	const refresh = page.getByRole("button", { name: "Refresh saved evidence" });
	await refresh.focus();
	await expect(refresh).toBeFocused();
	await page.keyboard.press("Enter");
	await expect(page.getByRole("region", { name: "Saved comparison history" })).toContainText(
		/saved comparison|No saved comparisons yet/,
	);

	await page.getByRole("button", { name: "Run matched comparison" }).click();
	await expect(page.getByRole("link", { name: "Download JSON evidence" })).toBeVisible();
	await expect(
		page.getByText("not affiliated with, endorsed by, or operated by Google"),
	).toBeVisible();
	expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
		true,
	);
});
