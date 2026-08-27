import {
	type PublicEvidenceExport,
	parsePublicEvidenceExport,
	publicEvidenceExportSchemaVersion,
} from "../evidence-experience";
import type { NativeAdoptionLocale } from "../native-adoption/cases";
import { type ArmView, parseComparisonView } from "../native-adoption/view";
import type { ComparisonEvidenceArm, ComparisonEvidenceRecord } from "./records";
import { EvidenceLedgerError } from "./repository";

const claimStatement =
	"Illustrative evidence from frozen fictional conditions; not a research finding or a claim of language parity.";

export function projectPublicEvidenceExport(
	record: ComparisonEvidenceRecord,
): PublicEvidenceExport {
	if (!isNativeAdoptionLocale(record.case.locale)) invalidRecord();
	if (record.arms[0]?.arm !== "baseline" || record.arms[1]?.arm !== "contract_guided") {
		invalidRecord();
	}
	const comparison = {
		comparisonId: record.comparisonId,
		case: {
			id: record.case.id,
			title: record.case.title,
			version: record.case.version,
			locale: record.case.locale,
			turns: record.case.turns.map(({ sequence, text }) => ({ sequence, text })),
			reviewStatus: record.case.review.status,
			representationLimitations: [...record.case.review.representationLimitations],
		},
		contract: {
			id: record.contract.id,
			version: record.contract.version,
			allowedTools: [...record.contract.allowedTools],
			requiredConstraintIds: [...record.contract.requiredConstraintIds],
			prohibitedEffects: [...record.contract.prohibitedEffects],
		},
		pairEligibility: {
			eligible: record.pairEligibility.eligible,
			reasons: [...record.pairEligibility.reasons],
		},
		evidence: {
			schemaVersion: record.schemaVersion,
			recordedAt: record.recordedAt,
			sourceContentHash: record.contentHash,
			caseVersion: record.case.version,
			variantId: record.case.variantId,
			variantVersion: record.case.variantVersion,
			fixtureVersion: record.case.fixtureVersion,
			toolContractVersion: record.case.toolContractVersion,
		},
		claimBoundary: {
			environment: "fictional_synthetic_demo" as const,
			findingStatus: "illustrative_observation" as const,
			reviewerQualified:
				record.case.review.status === "human_reviewed" && record.pairEligibility.eligible,
			statement: claimStatement,
		},
		arms: record.arms.map(projectArm),
	};
	const parsedComparison = parseComparisonView(comparison);
	if (!parsedComparison) invalidRecord();
	return {
		schemaVersion: publicEvidenceExportSchemaVersion,
		comparison: parsedComparison,
	};
}

export function serializePublicEvidenceExport(value: PublicEvidenceExport): string {
	const parsed = parsePublicEvidenceExport(value);
	if (!parsed) invalidRecord();
	return `${JSON.stringify(parsed, null, 2)}\n`;
}

export function evidenceExportFilename(comparisonId: string): string {
	if (!isCanonicalComparisonId(comparisonId)) {
		throw new EvidenceLedgerError("INVALID_LEDGER_QUERY", "Comparison identity is invalid.");
	}
	return `hotel-shoreline-evidence-${comparisonId}.json`;
}

export function isCanonicalComparisonId(value: string): boolean {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value);
}

function projectArm(arm: ComparisonEvidenceArm): ArmView {
	return {
		arm: arm.arm,
		status: arm.status,
		...(arm.errorCode === undefined ? {} : { errorCode: arm.errorCode }),
		intervention: { id: arm.intervention.id, version: arm.intervention.version },
		configuration: {
			...arm.condition.planner,
			sharedConfigurationHash: arm.condition.sharedConfigurationHash,
			conditionHash: arm.condition.conditionHash,
		},
		lifecycle: [...arm.lifecycle],
		candidateNodes:
			arm.candidateGraph?.nodes.map(({ id, toolName, input, constraintIds }) => ({
				id,
				toolName,
				input,
				constraintIds,
			})) ?? [],
		operations: arm.operations.map(({ toolName, effect, input }) => ({ toolName, effect, input })),
		validationIssues:
			"ok" in arm.validation && arm.validation.ok === false
				? arm.validation.issues.map(({ code, path }) => ({ code, path }))
				: [],
		measures: arm.evaluation.measures,
		firstLossStage: arm.evaluation.firstLossStage,
	};
}

function isNativeAdoptionLocale(value: string): value is NativeAdoptionLocale {
	return value === "en" || value === "es-ES" || value === "pt-PT";
}

function invalidRecord(): never {
	throw new EvidenceLedgerError(
		"INVALID_EVIDENCE_RECORD",
		"Stored evidence cannot be projected safely.",
	);
}
