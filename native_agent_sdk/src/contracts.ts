export type JsonPrimitive = boolean | null | number | string;
export type JsonValue = JsonObject | JsonPrimitive | JsonValue[];
export type JsonObject = { readonly [key: string]: JsonValue };

export interface SemanticContract {
	readonly id: string;
	readonly version: string;
	readonly allowedTools: readonly string[];
	readonly prohibitedEffects: readonly string[];
	readonly requiredConstraintIds: readonly string[];
}

export interface TaskNode {
	readonly id: string;
	readonly toolName: string;
	readonly input: JsonObject;
	readonly dependsOn: readonly string[];
	readonly constraintIds: readonly string[];
	readonly idempotencyKey: string;
}

export interface TaskGraph {
	readonly id: string;
	readonly contractId: string;
	readonly preservedConstraintIds: readonly string[];
	readonly nodes: readonly TaskNode[];
}

export interface ToolExecutionResult {
	readonly ok: boolean;
	readonly output?: JsonValue;
	readonly errorCode?: string;
}

export interface TaskTool {
	readonly name: string;
	readonly effect: string;
	readonly execute: (input: {
		readonly runId: string;
		readonly nodeId: string;
		readonly idempotencyKey: string;
		readonly input: JsonObject;
	}) => Promise<ToolExecutionResult>;
}

export type ToolRegistry = Readonly<Record<string, TaskTool>>;
export type ValidationErrorCode =
	| "CYCLE_DETECTED"
	| "DUPLICATE_IDEMPOTENCY_KEY"
	| "DUPLICATE_NODE_ID"
	| "INVALID_CONTRACT"
	| "INVALID_GRAPH"
	| "MISSING_REQUIRED_CONSTRAINT"
	| "PROHIBITED_EFFECT"
	| "TOOL_NOT_ALLOWED"
	| "UNKNOWN_DEPENDENCY"
	| "UNKNOWN_TOOL";

export interface ValidationIssue {
	readonly code: ValidationErrorCode;
	readonly path: string;
	readonly message: string;
}

export type ValidationResult =
	| { readonly ok: true; readonly issues: readonly [] }
	| { readonly ok: false; readonly issues: readonly ValidationIssue[] };

export function isRecord(value: unknown): value is Record<string, unknown> {
	if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
	const prototype = Object.getPrototypeOf(value);
	return prototype === Object.prototype || prototype === null;
}

export function isJsonValue(value: unknown): value is JsonValue {
	if (
		value === null ||
		typeof value === "boolean" ||
		typeof value === "number" ||
		typeof value === "string"
	) {
		return true;
	}
	if (Array.isArray(value)) return value.every(isJsonValue);
	return isRecord(value) && Object.values(value).every(isJsonValue);
}

export function parseSemanticContract(value: unknown): SemanticContract | ValidationIssue[] {
	if (!isRecord(value)) return [invalid("INVALID_CONTRACT", "$", "Contract must be an object.")];
	const fields = [
		"id",
		"version",
		"allowedTools",
		"prohibitedEffects",
		"requiredConstraintIds",
	] as const;
	const issues = fields.flatMap((field) => validateField(value, field, "INVALID_CONTRACT"));
	return issues.length > 0 ? issues : (value as unknown as SemanticContract);
}

export function parseTaskGraph(value: unknown): TaskGraph | ValidationIssue[] {
	if (!isRecord(value)) return [invalid("INVALID_GRAPH", "$", "Task graph must be an object.")];
	const issues = ["id", "contractId", "preservedConstraintIds", "nodes"].flatMap((field) =>
		validateField(value, field, "INVALID_GRAPH"),
	);
	if (Array.isArray(value.nodes)) {
		value.nodes.forEach((node, index) => {
			if (!isRecord(node)) {
				issues.push(invalid("INVALID_GRAPH", `nodes.${index}`, "Node must be an object."));
				return;
			}
			for (const field of [
				"id",
				"toolName",
				"idempotencyKey",
				"dependsOn",
				"constraintIds",
				"input",
			] as const) {
				issues.push(...validateField(node, field, "INVALID_GRAPH", `nodes.${index}`));
			}
		});
	}
	return issues.length > 0 ? issues : (value as unknown as TaskGraph);
}

function validateField(
	value: Record<string, unknown>,
	field: string,
	code: ValidationErrorCode,
	prefix = "",
): ValidationIssue[] {
	const current = value[field];
	const path = prefix ? `${prefix}.${field}` : field;
	const isStringArray = [
		"allowedTools",
		"prohibitedEffects",
		"requiredConstraintIds",
		"preservedConstraintIds",
		"dependsOn",
		"constraintIds",
	].includes(field);
	if (field === "input")
		return isRecord(current) && isJsonValue(current)
			? []
			: [invalid(code, path, "Input must be a JSON-safe object.")];
	if (field === "nodes")
		return Array.isArray(current) && current.length > 0
			? []
			: [invalid(code, path, "Nodes must be a non-empty array.")];
	if (isStringArray)
		return Array.isArray(current) &&
			current.every((item) => typeof item === "string" && item.length > 0)
			? []
			: [invalid(code, path, "Must be an array of non-empty strings.")];
	return typeof current === "string" && current.length > 0
		? []
		: [invalid(code, path, "Must be a non-empty string.")];
}

function invalid(code: ValidationErrorCode, path: string, message: string): ValidationIssue {
	return { code, path, message };
}
