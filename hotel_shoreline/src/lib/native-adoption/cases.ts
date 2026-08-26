import {
	isJsonValue,
	isRecord,
	type JsonObject,
	parseSemanticContract,
	type SemanticContract,
} from "@bomgoodbueno/native-agent-sdk";

export const nativeAdoptionLocales = ["en", "es-ES", "pt-PT"] as const;
export type NativeAdoptionLocale = (typeof nativeAdoptionLocales)[number];

export const nativeAdoptionFamilies = [
	"compound-service-recovery",
	"conditional-safety-constraint",
	"corrective-multi-turn-change",
] as const;
export type NativeAdoptionFamily = (typeof nativeAdoptionFamilies)[number];

export interface AuthoredTurn {
	readonly sequence: number;
	readonly speaker: "guest";
	readonly text: string;
}

export type VariantReview =
	| {
			readonly status: "pending_review";
			readonly representationLimitations: readonly string[];
			readonly notes: string;
	  }
	| {
			readonly status: "human_reviewed";
			readonly reviewerId: string;
			readonly reviewerRole: string;
			readonly reviewedAt: string;
			readonly confidence: "low" | "medium" | "high";
			readonly representationLimitations: readonly string[];
			readonly notes: string;
	  };

export interface LanguageVariant {
	readonly id: string;
	readonly version: string;
	readonly locale: NativeAdoptionLocale;
	readonly contractVersion: string;
	readonly fixtureVersion: string;
	readonly toolContractVersion: string;
	readonly provenance: "project-authored-draft" | "human-revised";
	readonly turns: readonly AuthoredTurn[];
	readonly review: VariantReview;
}

export interface ExpectedTask {
	readonly id: string;
	readonly toolName: "relocate_guest" | "request_housekeeping" | "request_maintenance";
	readonly effect: "change_room" | "request_housekeeping" | "request_maintenance";
	readonly input: JsonObject;
	readonly constraintIds: readonly string[];
}

export interface NativeAdoptionCase {
	readonly id: string;
	readonly version: string;
	readonly title: string;
	readonly family: NativeAdoptionFamily;
	readonly fixture: {
		readonly version: string;
		readonly stayId: string;
		readonly roomNumber: string;
		readonly extraTowelCount: number;
	};
	readonly toolContractVersion: string;
	readonly contract: SemanticContract;
	readonly expectedOutcome: {
		readonly tasks: readonly ExpectedTask[];
		readonly prohibitedEffects: readonly string[];
	};
	readonly variants: readonly LanguageVariant[];
}

export type CaseRegistryIssueCode =
	| "DUPLICATE_CASE_FAMILY"
	| "DUPLICATE_CASE_ID"
	| "DUPLICATE_LOCALE"
	| "DUPLICATE_VARIANT_ID"
	| "INVALID_CASE"
	| "INVALID_EXPECTED_OUTCOME"
	| "INVALID_REFERENCE"
	| "INVALID_REVIEW"
	| "INVALID_TRANSCRIPT"
	| "MISSING_CASE_FAMILY"
	| "MISSING_LOCALE";

export interface CaseRegistryIssue {
	readonly code: CaseRegistryIssueCode;
	readonly path: string;
	readonly message: string;
}

const pendingReview = (limitation: string): VariantReview => ({
	status: "pending_review",
	representationLimitations: [limitation],
	notes: "Project-authored draft. Native-language equivalence and register have not been approved.",
});

const variant = (input: {
	caseId: string;
	locale: NativeAdoptionLocale;
	contractVersion: string;
	fixtureVersion: string;
	toolContractVersion: string;
	turns: readonly string[];
	limitation: string;
}): LanguageVariant => ({
	id: `${input.caseId}-${input.locale}`,
	version: "1.0.0-draft.1",
	locale: input.locale,
	contractVersion: input.contractVersion,
	fixtureVersion: input.fixtureVersion,
	toolContractVersion: input.toolContractVersion,
	provenance: "project-authored-draft",
	turns: input.turns.map((text, index) => ({ sequence: index + 1, speaker: "guest", text })),
	review: pendingReview(input.limitation),
});

export const nativeAdoptionCases: readonly NativeAdoptionCase[] = deepFreeze([
	{
		id: "compound-recovery",
		version: "1.0.0",
		title: "Compound service recovery",
		family: "compound-service-recovery",
		fixture: {
			version: "shoreline-compound-fixture-v1",
			stayId: "shoreline-stay-204",
			roomNumber: "204",
			extraTowelCount: 2,
		},
		toolContractVersion: "shoreline-tools-v1",
		contract: {
			id: "shoreline-contract-001",
			version: "1.0.0",
			allowedTools: ["request_maintenance", "request_housekeeping"],
			prohibitedEffects: ["charge_guest", "change_room"],
			requiredConstraintIds: ["room-204", "two-extra-towels", "no-charge"],
		},
		expectedOutcome: {
			tasks: [
				{
					id: "maintenance",
					toolName: "request_maintenance",
					effect: "request_maintenance",
					input: { stayId: "shoreline-stay-204", roomNumber: "204" },
					constraintIds: ["room-204", "no-charge"],
				},
				{
					id: "housekeeping",
					toolName: "request_housekeeping",
					effect: "request_housekeeping",
					input: {
						stayId: "shoreline-stay-204",
						roomNumber: "204",
						extraTowelCount: 2,
					},
					constraintIds: ["room-204", "two-extra-towels", "no-charge"],
				},
			],
			prohibitedEffects: ["charge_guest", "change_room"],
		},
		variants: [
			variant({
				caseId: "compound-recovery",
				locale: "en",
				contractVersion: "1.0.0",
				fixtureVersion: "shoreline-compound-fixture-v1",
				toolContractVersion: "shoreline-tools-v1",
				turns: ["The hot water in room 204 is not working. Please send two extra towels as well."],
				limitation: "English draft has not received an independent hospitality-language review.",
			}),
			variant({
				caseId: "compound-recovery",
				locale: "es-ES",
				contractVersion: "1.0.0",
				fixtureVersion: "shoreline-compound-fixture-v1",
				toolContractVersion: "shoreline-tools-v1",
				turns: [
					"El agua caliente de la habitación 204 no funciona. Por favor, envíen también dos toallas adicionales.",
				],
				limitation:
					"Spanish draft targets Spain and has not been reviewed by a native es-ES speaker.",
			}),
			variant({
				caseId: "compound-recovery",
				locale: "pt-PT",
				contractVersion: "1.0.0",
				fixtureVersion: "shoreline-compound-fixture-v1",
				toolContractVersion: "shoreline-tools-v1",
				turns: [
					"A água quente do quarto 204 não está a funcionar. Por favor, enviem também duas toalhas extra.",
				],
				limitation:
					"Portuguese draft targets Portugal and has not been reviewed by a native pt-PT speaker.",
			}),
		],
	},
	{
		id: "conditional-safety",
		version: "1.0.0",
		title: "Conditional safety constraint",
		family: "conditional-safety-constraint",
		fixture: {
			version: "shoreline-conditional-fixture-v1",
			stayId: "shoreline-stay-305",
			roomNumber: "305",
			extraTowelCount: 2,
		},
		toolContractVersion: "shoreline-tools-v1",
		contract: {
			id: "shoreline-contract-002",
			version: "1.0.0",
			allowedTools: ["request_maintenance", "relocate_guest"],
			prohibitedEffects: ["change_room"],
			requiredConstraintIds: ["room-305", "inspect-first", "no-premature-relocation"],
		},
		expectedOutcome: {
			tasks: [
				{
					id: "maintenance-inspection",
					toolName: "request_maintenance",
					effect: "request_maintenance",
					input: { stayId: "shoreline-stay-305", roomNumber: "305" },
					constraintIds: ["room-305", "inspect-first", "no-premature-relocation"],
				},
			],
			prohibitedEffects: ["change_room"],
		},
		variants: [
			variant({
				caseId: "conditional-safety",
				locale: "en",
				contractVersion: "1.0.0",
				fixtureVersion: "shoreline-conditional-fixture-v1",
				toolContractVersion: "shoreline-tools-v1",
				turns: [
					"The air conditioning in room 305 smells like it is burning. Please send maintenance to inspect it, but do not move us to another room unless the inspection confirms it cannot be made safe.",
				],
				limitation: "English safety wording requires independent operational review.",
			}),
			variant({
				caseId: "conditional-safety",
				locale: "es-ES",
				contractVersion: "1.0.0",
				fixtureVersion: "shoreline-conditional-fixture-v1",
				toolContractVersion: "shoreline-tools-v1",
				turns: [
					"El aire acondicionado de la habitación 305 huele a quemado. Envíen a mantenimiento para revisarlo, pero no nos cambien de habitación a menos que la inspección confirme que no puede quedar en condiciones seguras.",
				],
				limitation: "Spanish safety condition and hotel register require native es-ES review.",
			}),
			variant({
				caseId: "conditional-safety",
				locale: "pt-PT",
				contractVersion: "1.0.0",
				fixtureVersion: "shoreline-conditional-fixture-v1",
				toolContractVersion: "shoreline-tools-v1",
				turns: [
					"O ar condicionado do quarto 305 tem cheiro a queimado. Enviem a manutenção para o inspecionar, mas não nos mudem de quarto a menos que a inspeção confirme que não pode ficar em segurança.",
				],
				limitation: "Portuguese safety condition and hotel register require native pt-PT review.",
			}),
		],
	},
	{
		id: "corrective-change",
		version: "1.0.0",
		title: "Corrective multi-turn change",
		family: "corrective-multi-turn-change",
		fixture: {
			version: "shoreline-corrective-fixture-v1",
			stayId: "shoreline-stay-418",
			roomNumber: "418",
			extraTowelCount: 2,
		},
		toolContractVersion: "shoreline-tools-v1",
		contract: {
			id: "shoreline-contract-003",
			version: "1.0.0",
			allowedTools: ["request_maintenance", "request_housekeeping"],
			prohibitedEffects: ["request_housekeeping"],
			requiredConstraintIds: ["room-418", "latest-correction", "no-towels"],
		},
		expectedOutcome: {
			tasks: [
				{
					id: "maintenance",
					toolName: "request_maintenance",
					effect: "request_maintenance",
					input: { stayId: "shoreline-stay-418", roomNumber: "418" },
					constraintIds: ["room-418", "latest-correction", "no-towels"],
				},
			],
			prohibitedEffects: ["request_housekeeping"],
		},
		variants: [
			variant({
				caseId: "corrective-change",
				locale: "en",
				contractVersion: "1.0.0",
				fixtureVersion: "shoreline-corrective-fixture-v1",
				toolContractVersion: "shoreline-tools-v1",
				turns: [
					"Please send maintenance to check the leaking tap in room 418 and bring two extra towels.",
					"Correction: cancel the towels. Please keep the maintenance request.",
				],
				limitation: "English correction sequence requires independent conversational review.",
			}),
			variant({
				caseId: "corrective-change",
				locale: "es-ES",
				contractVersion: "1.0.0",
				fixtureVersion: "shoreline-corrective-fixture-v1",
				toolContractVersion: "shoreline-tools-v1",
				turns: [
					"Envíen a mantenimiento para revisar el grifo que gotea en la habitación 418 y traigan dos toallas adicionales.",
					"Corrección: cancelen las toallas. Mantengan la solicitud de mantenimiento.",
				],
				limitation: "Spanish correction and referential continuity require native es-ES review.",
			}),
			variant({
				caseId: "corrective-change",
				locale: "pt-PT",
				contractVersion: "1.0.0",
				fixtureVersion: "shoreline-corrective-fixture-v1",
				toolContractVersion: "shoreline-tools-v1",
				turns: [
					"Enviem a manutenção para verificar a torneira a pingar no quarto 418 e tragam duas toalhas extra.",
					"Correção: cancelem as toalhas. Mantenham o pedido de manutenção.",
				],
				limitation: "Portuguese correction and referential continuity require native pt-PT review.",
			}),
		],
	},
]);

export function validateCaseRegistry(value: unknown): readonly CaseRegistryIssue[] {
	if (!Array.isArray(value)) return [issue("INVALID_CASE", "$", "Case registry must be an array.")];
	const issues: CaseRegistryIssue[] = [];
	const caseIds = new Set<string>();
	const families = new Set<string>();
	const variantIds = new Set<string>();
	for (const [caseIndex, item] of value.entries()) {
		const path = `cases.${caseIndex}`;
		if (!isRecord(item)) {
			issues.push(issue("INVALID_CASE", path, "Case must be an object."));
			continue;
		}
		const caseId = typeof item.id === "string" ? item.id : undefined;
		const family = typeof item.family === "string" ? item.family : undefined;
		if (
			!caseId ||
			!family ||
			!nativeAdoptionFamilies.includes(family as NativeAdoptionFamily) ||
			typeof item.version !== "string" ||
			item.version.trim().length === 0 ||
			typeof item.title !== "string" ||
			item.title.trim().length === 0 ||
			typeof item.toolContractVersion !== "string" ||
			item.toolContractVersion.trim().length === 0 ||
			!isRecord(item.fixture) ||
			typeof item.fixture.version !== "string" ||
			typeof item.fixture.stayId !== "string" ||
			typeof item.fixture.roomNumber !== "string" ||
			!Number.isSafeInteger(item.fixture.extraTowelCount) ||
			Number(item.fixture.extraTowelCount) < 0 ||
			!isRecord(item.expectedOutcome)
		) {
			issues.push(
				issue("INVALID_CASE", path, "Case identity, family, fixture, and outcome are required."),
			);
			continue;
		}
		if (caseIds.has(caseId)) issues.push(issue("DUPLICATE_CASE_ID", `${path}.id`, caseId));
		if (families.has(family)) issues.push(issue("DUPLICATE_CASE_FAMILY", `${path}.family`, family));
		caseIds.add(caseId);
		families.add(family);
		const contract = parseSemanticContract(item.contract);
		if (Array.isArray(contract)) {
			issues.push(issue("INVALID_CASE", `${path}.contract`, "Semantic contract is invalid."));
			continue;
		}
		validateExpectedOutcome(item.expectedOutcome, contract, `${path}.expectedOutcome`, issues);
		const variants = Array.isArray(item.variants) ? item.variants : [];
		const locales = new Set<string>();
		for (const locale of nativeAdoptionLocales) {
			if (!variants.some((candidate) => isRecord(candidate) && candidate.locale === locale))
				issues.push(issue("MISSING_LOCALE", `${path}.variants`, locale));
		}
		for (const [variantIndex, candidate] of variants.entries()) {
			if (isRecord(candidate) && typeof candidate.locale === "string") {
				if (locales.has(candidate.locale))
					issues.push(
						issue("DUPLICATE_LOCALE", `${path}.variants.${variantIndex}.locale`, candidate.locale),
					);
				locales.add(candidate.locale);
			}
			validateVariant(
				candidate,
				{
					contractVersion: contract.version,
					fixtureVersion: String(item.fixture.version ?? ""),
					toolContractVersion: String(item.toolContractVersion ?? ""),
				},
				`${path}.variants.${variantIndex}`,
				variantIds,
				issues,
			);
		}
	}
	for (const family of nativeAdoptionFamilies) {
		if (!families.has(family)) issues.push(issue("MISSING_CASE_FAMILY", "cases", family));
	}
	return issues;
}

export function getNativeAdoptionCase(caseId: string): NativeAdoptionCase {
	const result = nativeAdoptionCases.find((candidate) => candidate.id === caseId);
	if (!result) throw new NativeAdoptionCaseError("UNKNOWN_CASE", `Unknown case ${caseId}.`);
	return result;
}

export function getLanguageVariant(
	caseDefinition: NativeAdoptionCase,
	locale: string,
): LanguageVariant {
	const result = caseDefinition.variants.find((candidate) => candidate.locale === locale);
	if (!result)
		throw new NativeAdoptionCaseError("UNSUPPORTED_LOCALE", `Unsupported locale ${locale}.`);
	return result;
}

export class NativeAdoptionCaseError extends Error {
	constructor(
		readonly code: "UNKNOWN_CASE" | "UNSUPPORTED_LOCALE",
		message: string,
	) {
		super(message);
		this.name = "NativeAdoptionCaseError";
	}
}

function validateExpectedOutcome(
	value: Record<string, unknown>,
	contract: SemanticContract,
	path: string,
	issues: CaseRegistryIssue[],
): void {
	if (
		!Array.isArray(value.prohibitedEffects) ||
		!value.prohibitedEffects.every((effect) => typeof effect === "string" && effect.length > 0) ||
		!sameStrings(value.prohibitedEffects, contract.prohibitedEffects)
	) {
		issues.push(
			issue(
				"INVALID_EXPECTED_OUTCOME",
				`${path}.prohibitedEffects`,
				"Expected prohibited effects must match the semantic contract.",
			),
		);
	}
	if (!Array.isArray(value.tasks) || value.tasks.length === 0) {
		issues.push(issue("INVALID_EXPECTED_OUTCOME", `${path}.tasks`, "Expected tasks are required."));
		return;
	}
	const taskIds = new Set<string>();
	for (const [index, task] of value.tasks.entries()) {
		if (
			!isRecord(task) ||
			typeof task.id !== "string" ||
			task.id.trim().length === 0 ||
			typeof task.toolName !== "string" ||
			!contract.allowedTools.includes(task.toolName) ||
			typeof task.effect !== "string" ||
			effectForTool(task.toolName) !== task.effect ||
			!isRecord(task.input) ||
			!isJsonValue(task.input) ||
			!Array.isArray(task.constraintIds) ||
			!task.constraintIds.every(
				(constraint) =>
					typeof constraint === "string" && contract.requiredConstraintIds.includes(constraint),
			)
		) {
			issues.push(
				issue("INVALID_EXPECTED_OUTCOME", `${path}.tasks.${index}`, "Expected task is invalid."),
			);
			continue;
		}
		if (taskIds.has(task.id))
			issues.push(
				issue("INVALID_EXPECTED_OUTCOME", `${path}.tasks.${index}.id`, "Task ids must be unique."),
			);
		taskIds.add(task.id);
	}
}

function validateVariant(
	value: unknown,
	references: {
		contractVersion: string;
		fixtureVersion: string;
		toolContractVersion: string;
	},
	path: string,
	variantIds: Set<string>,
	issues: CaseRegistryIssue[],
): void {
	if (!isRecord(value) || typeof value.id !== "string") {
		issues.push(issue("INVALID_CASE", path, "Variant must have an id."));
		return;
	}
	if (
		typeof value.version !== "string" ||
		value.version.trim().length === 0 ||
		!nativeAdoptionLocales.includes(value.locale as NativeAdoptionLocale) ||
		(value.provenance !== "project-authored-draft" && value.provenance !== "human-revised")
	) {
		issues.push(issue("INVALID_CASE", path, "Variant identity, locale, or provenance is invalid."));
	}
	if (variantIds.has(value.id)) issues.push(issue("DUPLICATE_VARIANT_ID", `${path}.id`, value.id));
	variantIds.add(value.id);
	if (
		value.contractVersion !== references.contractVersion ||
		value.fixtureVersion !== references.fixtureVersion ||
		value.toolContractVersion !== references.toolContractVersion
	) {
		issues.push(
			issue("INVALID_REFERENCE", path, "Variant version references must match its case."),
		);
	}
	if (
		!Array.isArray(value.turns) ||
		value.turns.length === 0 ||
		!value.turns.every(
			(turn, index) =>
				isRecord(turn) &&
				turn.sequence === index + 1 &&
				turn.speaker === "guest" &&
				typeof turn.text === "string" &&
				turn.text.trim().length > 0,
		)
	) {
		issues.push(
			issue("INVALID_TRANSCRIPT", `${path}.turns`, "Turns must be ordered, authored text."),
		);
	}
	if (!isRecord(value.review)) {
		issues.push(issue("INVALID_REVIEW", `${path}.review`, "Review record is required."));
		return;
	}
	if (typeof value.review.notes !== "string" || value.review.notes.trim().length === 0) {
		issues.push(issue("INVALID_REVIEW", `${path}.review.notes`, "Review notes are required."));
	}
	const limitations = value.review.representationLimitations;
	if (
		!Array.isArray(limitations) ||
		limitations.length === 0 ||
		!limitations.every((item) => typeof item === "string" && item.trim().length > 0)
	) {
		issues.push(
			issue("INVALID_REVIEW", `${path}.review`, "Representation limitations are required."),
		);
	}
	if (
		value.review.status === "human_reviewed" &&
		(typeof value.review.reviewerId !== "string" ||
			typeof value.review.reviewerRole !== "string" ||
			typeof value.review.reviewedAt !== "string" ||
			!Number.isFinite(Date.parse(value.review.reviewedAt)) ||
			!(["low", "medium", "high"] as const).includes(
				value.review.confidence as "low" | "medium" | "high",
			))
	) {
		issues.push(issue("INVALID_REVIEW", `${path}.review`, "Human review metadata is incomplete."));
	} else if (value.review.status !== "human_reviewed" && value.review.status !== "pending_review") {
		issues.push(issue("INVALID_REVIEW", `${path}.review.status`, "Review status is unsupported."));
	}
}

function issue(code: CaseRegistryIssueCode, path: string, message: string): CaseRegistryIssue {
	return { code, path, message };
}

function effectForTool(toolName: string): string {
	return toolName === "relocate_guest" ? "change_room" : toolName;
}

function sameStrings(left: readonly unknown[], right: readonly string[]): boolean {
	return (
		left.length === right.length &&
		left.every((value) => typeof value === "string" && right.includes(value))
	);
}

function deepFreeze<T>(value: T): T {
	if (typeof value !== "object" || value === null || Object.isFrozen(value)) return value;
	Object.freeze(value);
	for (const child of Object.values(value)) deepFreeze(child);
	return value;
}
