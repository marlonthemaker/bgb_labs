import { expect, test } from "@playwright/test";

test("HSD5-UI-001/HSD5-E-001: inspects a matched deterministic comparison without overstating review", async ({
	page,
}) => {
	await page.goto("/");
	const responsePromise = page.waitForResponse("**/api/native-adoption");
	await page.getByRole("button", { name: "Run matched comparison" }).click();
	const response = await responsePromise;
	const evidence: unknown = await response.json();

	await expect(
		page.getByRole("region", { name: "Comparison source and eligibility" }),
	).toContainText("pending_review");
	await expect(page.getByText("Pair eligible for reviewer-qualified aggregates:")).toContainText(
		"no",
	);
	await expect(page.getByRole("region", { name: "baseline evidence" })).toContainText(
		"Status: rejected",
	);
	await expect(page.getByRole("region", { name: "contract_guided evidence" })).toContainText(
		"Status: succeeded",
	);
	await expect(page.getByRole("region", { name: "baseline evidence" })).toContainText(
		"Operations: 0",
	);
	await expect(page.getByRole("region", { name: "contract_guided evidence" })).toContainText(
		"Operations: 2",
	);
	await expect(page.getByRole("region", { name: "contract_guided evidence" })).toContainText(
		"Verified completion",
	);
	expect(response.ok()).toBe(true);
	expect(evidence).not.toHaveProperty("baseline.run");
	expect(evidence).not.toHaveProperty("intervention.run");
});

test("HSD5-D-001/HSD5-UI-001: preserves the corrective pt-PT transcript as two authored turns", async ({
	page,
}) => {
	await page.goto("/");
	await page.getByLabel("Case").selectOption("corrective-change");
	await page.getByLabel("Locale").selectOption("pt-PT");
	await page.getByRole("button", { name: "Run matched comparison" }).click();

	await expect(page.getByText("Locale:")).toContainText("pt-PT");
	await expect(
		page.getByRole("list", { name: "Authored request turns" }).getByRole("listitem"),
	).toHaveCount(2);
	await expect(page.getByRole("region", { name: "contract_guided evidence" })).toContainText(
		"execution.finished",
	);
});

test("HSD5-E-003: rejects malformed comparison input with a sanitized response", async ({
	request,
}) => {
	const response = await request.post("/api/native-adoption", {
		data: { caseId: "compound-recovery", locale: "en", unexpected: true },
	});
	const body = await response.json();
	expect(response.status()).toBe(400);
	expect(body).toMatchObject({ error: { code: "INVALID_COMPARISON_REQUEST" } });
	expect(JSON.stringify(body)).not.toContain("stack");

	const unsupported = await request.post("/api/native-adoption", {
		data: { caseId: "compound-recovery", locale: "fr-FR" },
	});
	expect(unsupported.status()).toBe(400);
	expect(await unsupported.json()).toMatchObject({ error: { code: "UNSUPPORTED_LOCALE" } });

	const invalidJson = await request.post("/api/native-adoption", {
		headers: { "Content-Type": "application/json" },
		data: "{",
	});
	expect(invalidJson.status()).toBe(400);
	expect(await invalidJson.json()).toMatchObject({
		error: { code: "INVALID_COMPARISON_REQUEST" },
	});
});

test("HSD5-E-003/HSD5-UI-001: renders a sanitized quota failure for both retained arms", async ({
	page,
	request,
}) => {
	const sourceResponse = await request.post("/api/native-adoption", {
		data: { caseId: "compound-recovery", locale: "en" },
	});
	expect(sourceResponse.ok()).toBe(true);
	const evidence = (await sourceResponse.json()) as {
		arms: Array<Record<string, unknown>>;
	};
	for (const arm of evidence.arms) {
		Object.assign(arm, {
			status: "planning_failed",
			errorCode: "PLANNER_QUOTA_EXHAUSTED",
			firstLossStage: "understand",
			candidateNodes: [],
			operations: [],
			validationIssues: [],
			lifecycle: ["event.received", "planning.started", "planning.failed"],
		});
	}
	await page.route("**/api/native-adoption", (route) => route.fulfill({ json: evidence }));
	await page.goto("/");
	await page.getByRole("button", { name: "Run matched comparison" }).click();

	for (const name of ["baseline evidence", "contract_guided evidence"]) {
		const region = page.getByRole("region", { name });
		await expect(region).toContainText("Status: planning_failed");
		await expect(region).toContainText("Error: PLANNER_QUOTA_EXHAUSTED");
		await expect(region).toContainText("Operations: 0");
	}
});

test("HSD5-UI-001: keeps disclosure, controls, and comparison action usable at mobile width", async ({
	page,
}) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto("/");
	await expect(page.getByLabel("Case")).toBeVisible();
	await expect(page.getByLabel("Locale")).toBeVisible();
	await expect(page.getByRole("button", { name: "Run matched comparison" })).toBeVisible();
	await expect(
		page.getByText("not affiliated with, endorsed by, or operated by Google"),
	).toBeVisible();
});
