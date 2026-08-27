import {
	evidenceExportFilename,
	isCanonicalComparisonId,
	projectPublicEvidenceExport,
	serializePublicEvidenceExport,
} from "../../../../lib/evidence-ledger/export";
import {
	evidenceLedgerErrorResponse,
	evidenceResponseHeaders,
} from "../../../../lib/evidence-ledger/http";
import { EvidenceLedgerError } from "../../../../lib/evidence-ledger/repository";
import { getEvidenceLedgerRepository } from "../../../../lib/evidence-ledger/server-repository";

export const runtime = "nodejs";

export async function GET(
	_request: Request,
	context: { readonly params: Promise<{ readonly comparisonId: string }> },
) {
	const requestId = crypto.randomUUID();
	const headers = evidenceResponseHeaders(requestId);
	try {
		const { comparisonId } = await context.params;
		if (!isCanonicalComparisonId(comparisonId)) {
			throw new EvidenceLedgerError("INVALID_LEDGER_QUERY", "Comparison identity is invalid.");
		}
		const repository = await getEvidenceLedgerRepository();
		const record = await repository.get(comparisonId);
		if (!record) {
			throw new EvidenceLedgerError("EVIDENCE_NOT_FOUND", "Comparison evidence was not found.");
		}
		const evidence = projectPublicEvidenceExport(record);
		return new Response(serializePublicEvidenceExport(evidence), {
			status: 200,
			headers: {
				...headers,
				"Content-Type": "application/json; charset=utf-8",
				"Content-Disposition": `attachment; filename="${evidenceExportFilename(comparisonId)}"`,
			},
		});
	} catch (error) {
		return evidenceLedgerErrorResponse(error, requestId, headers);
	}
}
