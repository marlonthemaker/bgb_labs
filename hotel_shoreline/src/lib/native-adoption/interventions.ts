import { isJsonValue, isRecord, type JsonObject } from "@bomgoodbueno/native-agent-sdk";

export type TreatmentArm = "baseline" | "contract_guided";

export interface InterventionSpecification {
	readonly id: string;
	readonly version: string;
	readonly arm: TreatmentArm;
	readonly targetFailureStage: "decompose";
	readonly proposedMechanism: string;
	readonly parameters: JsonObject;
	readonly activationCondition: string;
	readonly regressionCheck: string;
	readonly rollbackCondition: string;
}

export interface InterventionIssue {
	readonly code: "DUPLICATE_ARM" | "DUPLICATE_INTERVENTION_ID" | "INVALID_INTERVENTION";
	readonly path: string;
	readonly message: string;
}

export const interventionSpecifications: readonly InterventionSpecification[] = deepFreeze([
	{
		id: "shoreline-baseline-schema-only",
		version: "1.0.0",
		arm: "baseline",
		targetFailureStage: "decompose",
		proposedMechanism: "Schema-only planning establishes the matched control condition.",
		parameters: { contractGuidance: false, silentRepair: false, retries: 0 },
		activationCondition: "Always active for the baseline arm.",
		regressionCheck: "No semantic-contract content may appear in the baseline planning request.",
		rollbackCondition:
			"Reject the pair if contract guidance or a configuration difference leaks in.",
	},
	{
		id: "shoreline-semantic-contract-guidance",
		version: "1.0.0",
		arm: "contract_guided",
		targetFailureStage: "decompose",
		proposedMechanism:
			"Versioned semantic-contract guidance makes critical tasks, constraints, and prohibited effects explicit during decomposition.",
		parameters: { contractGuidance: true, silentRepair: false, retries: 0 },
		activationCondition: "Activate only for the declared contract-guided arm.",
		regressionCheck:
			"Model, transcript, schema, budget, fixture, tools, validator, and executor must match baseline.",
		rollbackCondition:
			"Reject or roll back the treatment version if it changes shared settings or weakens validation.",
	},
]);

export function validateInterventionRegistry(value: unknown): readonly InterventionIssue[] {
	if (!Array.isArray(value))
		return [invalid("INVALID_INTERVENTION", "$", "Intervention registry must be an array.")];
	const issues: InterventionIssue[] = [];
	const ids = new Set<string>();
	const arms = new Set<string>();
	for (const [index, item] of value.entries()) {
		const path = `interventions.${index}`;
		if (
			!isRecord(item) ||
			typeof item.id !== "string" ||
			typeof item.version !== "string" ||
			(item.arm !== "baseline" && item.arm !== "contract_guided") ||
			item.targetFailureStage !== "decompose" ||
			!nonEmptyStrings(item, [
				"proposedMechanism",
				"activationCondition",
				"regressionCheck",
				"rollbackCondition",
			]) ||
			!isRecord(item.parameters) ||
			!isJsonValue(item.parameters)
		) {
			issues.push(invalid("INVALID_INTERVENTION", path, "Intervention specification is invalid."));
			continue;
		}
		if (ids.has(item.id)) issues.push(invalid("DUPLICATE_INTERVENTION_ID", `${path}.id`, item.id));
		if (arms.has(item.arm)) issues.push(invalid("DUPLICATE_ARM", `${path}.arm`, item.arm));
		ids.add(item.id);
		arms.add(item.arm);
	}
	for (const arm of ["baseline", "contract_guided"]) {
		if (!arms.has(arm)) issues.push(invalid("INVALID_INTERVENTION", "interventions", arm));
	}
	return issues;
}

export function getIntervention(arm: TreatmentArm): InterventionSpecification {
	const result = interventionSpecifications.find((candidate) => candidate.arm === arm);
	if (!result) throw new Error(`Missing intervention specification for ${arm}.`);
	return result;
}

function nonEmptyStrings(value: Record<string, unknown>, fields: readonly string[]): boolean {
	return fields.every(
		(field) => typeof value[field] === "string" && (value[field] as string).trim().length > 0,
	);
}

function invalid(
	code: InterventionIssue["code"],
	path: string,
	message: string,
): InterventionIssue {
	return { code, path, message };
}

function deepFreeze<T>(value: T): T {
	if (typeof value !== "object" || value === null || Object.isFrozen(value)) return value;
	Object.freeze(value);
	for (const child of Object.values(value)) deepFreeze(child);
	return value;
}
