import { expect, test } from "@playwright/test";

test("HSD7-R-003: persists a comparison and returns only sanitized history summaries", async ({
	request,
}) => {
	const created = await request.post("/api/native-adoption", {
		data: { caseId: "compound-recovery", locale: "en" },
	});
	expect(created.status()).toBe(200);
	const comparison = (await created.json()) as { comparisonId: string };

	const response = await request.get("/api/native-adoption?limit=100");
	expect(response.status()).toBe(200);
	const body: unknown = await response.json();
	expect(body).toMatchObject({
		records: expect.arrayContaining([
			expect.objectContaining({
				comparisonId: comparison.comparisonId,
				caseId: "compound-recovery",
				locale: "en",
				reviewStatus: "pending_review",
			}),
		]),
	});
	const serialized = JSON.stringify(body);
	expect(serialized).not.toContain("DATABASE_URL");
	expect(serialized).not.toContain("connectionString");
	expect(serialized).not.toContain("candidateGraph");
	expect(serialized).not.toContain("turns");
});

test("HSD7-R-003: rejects an invalid history query with a typed public error", async ({
	request,
}) => {
	const response = await request.get("/api/native-adoption?limit=1000");

	expect(response.status()).toBe(400);
	expect(await response.json()).toMatchObject({ error: { code: "INVALID_LEDGER_QUERY" } });
});
