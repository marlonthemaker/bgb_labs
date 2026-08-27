import { NextResponse } from "next/server";

import { EvidenceLedgerError } from "./repository";

export function evidenceResponseHeaders(requestId: string): Record<string, string> {
	return { "Cache-Control": "no-store", "X-Request-Id": requestId };
}

export function evidenceLedgerErrorResponse(
	error: unknown,
	requestId: string,
	headers: Record<string, string>,
) {
	const ledgerError =
		error instanceof EvidenceLedgerError
			? error
			: new EvidenceLedgerError("LEDGER_UNAVAILABLE", "Evidence ledger is unavailable.");
	const status = statusForLedgerError(ledgerError.code);
	if (status >= 500) {
		console.error(
			JSON.stringify({
				severity: "ERROR",
				message: "Evidence ledger request failed",
				event: "evidence_ledger.request.failed",
				requestId,
				errorCode: ledgerError.code,
			}),
		);
	}
	return NextResponse.json({ error: { code: ledgerError.code, requestId } }, { status, headers });
}

function statusForLedgerError(code: EvidenceLedgerError["code"]): number {
	if (code === "INVALID_LEDGER_QUERY") return 400;
	if (code === "EVIDENCE_NOT_FOUND") return 404;
	if (code === "LEDGER_CONFLICT") return 409;
	return 503;
}
