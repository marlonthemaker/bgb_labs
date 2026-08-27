export const apiRequestLimits = Object.freeze({
	comparisonJsonBytes: 4_096,
});

export type HttpInputErrorCode = "INVALID_JSON" | "REQUEST_TOO_LARGE";

export type HttpInputResult<T> =
	| { readonly ok: true; readonly value: T }
	| { readonly ok: false; readonly code: HttpInputErrorCode };

export async function readBoundedJson(
	request: Request,
	options: { readonly maxBytes: number } = { maxBytes: apiRequestLimits.comparisonJsonBytes },
): Promise<HttpInputResult<unknown>> {
	const body = await readBoundedBytes(request, options.maxBytes);
	if (!body.ok) return body;
	if (body.value.byteLength === 0) return { ok: false, code: "INVALID_JSON" };

	try {
		const text = new TextDecoder("utf-8", { fatal: true }).decode(body.value);
		return { ok: true, value: JSON.parse(text) as unknown };
	} catch {
		return { ok: false, code: "INVALID_JSON" };
	}
}

export async function readEmptyBody(request: Request): Promise<HttpInputResult<undefined>> {
	const body = await readBoundedBytes(request, 0);
	return body.ok ? { ok: true, value: undefined } : body;
}

async function readBoundedBytes(
	request: Request,
	maxBytes: number,
): Promise<HttpInputResult<Uint8Array>> {
	if (!Number.isSafeInteger(maxBytes) || maxBytes < 0) {
		throw new RangeError("maxBytes must be a non-negative safe integer.");
	}

	const declaredLength = request.headers.get("content-length");
	if (declaredLength !== null) {
		if (!/^\d+$/.test(declaredLength)) return { ok: false, code: "INVALID_JSON" };
		if (Number(declaredLength) > maxBytes) return { ok: false, code: "REQUEST_TOO_LARGE" };
	}
	if (request.body === null) return { ok: true, value: new Uint8Array() };

	const reader = request.body.getReader();
	const chunks: Uint8Array[] = [];
	let totalBytes = 0;
	try {
		while (true) {
			const chunk = await reader.read();
			if (chunk.done) break;
			totalBytes += chunk.value.byteLength;
			if (totalBytes > maxBytes) {
				await reader.cancel().catch(() => undefined);
				return { ok: false, code: "REQUEST_TOO_LARGE" };
			}
			chunks.push(chunk.value);
		}
	} catch {
		return { ok: false, code: "INVALID_JSON" };
	} finally {
		reader.releaseLock();
	}

	const body = new Uint8Array(totalBytes);
	let offset = 0;
	for (const chunk of chunks) {
		body.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return { ok: true, value: body };
}
