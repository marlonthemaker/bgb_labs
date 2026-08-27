import { expect, test } from "@playwright/test";

test("SEC1-W-001: serves the browser security-header baseline", async ({ request }) => {
	const response = await request.get("/");

	expect(response.status()).toBe(200);
	expect(response.headers()["content-security-policy"]).toContain("default-src 'self'");
	expect(response.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
	expect(response.headers()["permissions-policy"]).toBe(
		"camera=(), microphone=(), geolocation=(), browsing-topics=()",
	);
	expect(response.headers()["referrer-policy"]).toBe("no-referrer");
	expect(response.headers()["x-content-type-options"]).toBe("nosniff");
});

test("SEC1-W-001: rejects oversized public API input with sanitized 413 errors", async ({
	request,
}) => {
	const comparison = await request.post("/api/native-adoption", {
		data: { caseId: "x".repeat(5_000), locale: "en" },
	});
	const taskmaster = await request.post("/api/taskmaster", { data: { unexpected: true } });

	expect(comparison.status()).toBe(413);
	expect(await comparison.json()).toMatchObject({ error: { code: "REQUEST_TOO_LARGE" } });
	expect(await comparison.json()).not.toHaveProperty("run");
	expect(taskmaster.status()).toBe(413);
	expect(await taskmaster.json()).toMatchObject({ error: { code: "REQUEST_TOO_LARGE" } });
});

test("SEC1-W-001: rejects malformed comparison JSON with the existing public error", async ({
	request,
}) => {
	const response = await request.post("/api/native-adoption", {
		headers: { "Content-Type": "application/json" },
		data: "{",
	});

	expect(response.status()).toBe(400);
	expect(await response.json()).toMatchObject({
		error: { code: "INVALID_COMPARISON_REQUEST" },
	});
});
