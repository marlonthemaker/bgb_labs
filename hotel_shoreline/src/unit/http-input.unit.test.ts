import { describe, expect, it } from "vitest";

import { readBoundedJson, readEmptyBody } from "../lib/http-input";

describe("SEC1-W-001: bounded HTTP input", () => {
	it("parses a valid JSON object within its UTF-8 byte budget", async () => {
		const request = new Request("http://localhost/api", {
			method: "POST",
			body: JSON.stringify({ locale: "pt-PT" }),
		});

		await expect(readBoundedJson(request, { maxBytes: 64 })).resolves.toEqual({
			ok: true,
			value: { locale: "pt-PT" },
		});
	});

	it("rejects an excessive declared content length before parsing", async () => {
		const request = new Request("http://localhost/api", {
			method: "POST",
			headers: { "Content-Length": "65" },
			body: "{}",
		});

		await expect(readBoundedJson(request, { maxBytes: 64 })).resolves.toEqual({
			ok: false,
			code: "REQUEST_TOO_LARGE",
		});
	});

	it("counts UTF-8 bytes even when content length is absent", async () => {
		const request = new Request("http://localhost/api", {
			method: "POST",
			body: JSON.stringify({ value: "€€" }),
		});
		request.headers.delete("content-length");

		await expect(readBoundedJson(request, { maxBytes: 8 })).resolves.toEqual({
			ok: false,
			code: "REQUEST_TOO_LARGE",
		});
	});

	it("returns a typed error for empty, malformed, or invalid UTF-8 JSON", async () => {
		const requests = [
			new Request("http://localhost/api", { method: "POST" }),
			new Request("http://localhost/api", { method: "POST", body: "{" }),
			new Request("http://localhost/api", {
				method: "POST",
				body: new Uint8Array([0xc3, 0x28]),
			}),
		];

		for (const request of requests) {
			await expect(readBoundedJson(request, { maxBytes: 64 })).resolves.toEqual({
				ok: false,
				code: "INVALID_JSON",
			});
		}
	});

	it("accepts an empty fixed-request body and rejects any supplied byte", async () => {
		await expect(
			readEmptyBody(new Request("http://localhost/api", { method: "POST" })),
		).resolves.toEqual({ ok: true, value: undefined });
		await expect(
			readEmptyBody(new Request("http://localhost/api", { method: "POST", body: "x" })),
		).resolves.toEqual({ ok: false, code: "REQUEST_TOO_LARGE" });
	});
});
