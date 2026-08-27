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

export type ToolExecutionResult =
	| {
			readonly ok: true;
			readonly output?: JsonValue;
			readonly errorCode?: never;
	  }
	| {
			readonly ok: false;
			readonly output?: never;
			readonly errorCode?: string;
	  };

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
	| "TOOL_IDENTITY_MISMATCH"
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
	try {
		if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
		const prototype = Object.getPrototypeOf(value);
		return prototype === Object.prototype || prototype === null;
	} catch {
		return false;
	}
}

export const jsonValueLimits = Object.freeze({
	maxDepth: 32,
	maxValues: 2_048,
	maxTotalStringLength: 65_536,
});

export function isJsonValue(value: unknown): value is JsonValue {
	let visitedValues = 0;
	let totalStringLength = 0;
	const ancestors = new Set<object>();

	const visit = (current: unknown, depth: number): boolean => {
		visitedValues += 1;
		if (visitedValues > jsonValueLimits.maxValues || depth > jsonValueLimits.maxDepth) {
			return false;
		}
		if (current === null || typeof current === "boolean") return true;
		if (typeof current === "number") return Number.isFinite(current);
		if (typeof current === "string") {
			totalStringLength += current.length;
			return totalStringLength <= jsonValueLimits.maxTotalStringLength;
		}
		if (!Array.isArray(current) && !isRecord(current)) return false;
		if (ancestors.has(current)) return false;

		ancestors.add(current);
		try {
			if (Array.isArray(current)) {
				if (current.length + visitedValues > jsonValueLimits.maxValues) return false;
				for (let index = 0; index < current.length; index += 1) {
					const descriptor = Object.getOwnPropertyDescriptor(current, String(index));
					if (!descriptor || !("value" in descriptor) || !visit(descriptor.value, depth + 1)) {
						return false;
					}
				}
				return true;
			}

			for (const key of Object.keys(current)) {
				totalStringLength += key.length;
				if (totalStringLength > jsonValueLimits.maxTotalStringLength) return false;
				const descriptor = Object.getOwnPropertyDescriptor(current, key);
				if (!descriptor || !("value" in descriptor) || !visit(descriptor.value, depth + 1)) {
					return false;
				}
			}
			return true;
		} catch {
			return false;
		} finally {
			ancestors.delete(current);
		}
	};

	try {
		return visit(value, 0);
	} catch {
		return false;
	}
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
	if (!isJsonValue(value) && issues.length === 0) {
		issues.push(invalid("INVALID_CONTRACT", "$", "Contract must be a bounded JSON-safe object."));
	}
	return issues.length > 0 ? issues : (value as unknown as SemanticContract);
}

export function parseTaskGraph(value: unknown): TaskGraph | ValidationIssue[] {
	if (!isRecord(value)) return [invalid("INVALID_GRAPH", "$", "Task graph must be an object.")];
	const issues = ["id", "contractId", "preservedConstraintIds", "nodes"].flatMap((field) =>
		validateField(value, field, "INVALID_GRAPH"),
	);
	const nodes = readOwnDataProperty(value, "nodes");
	if (isArray(nodes)) {
		nodes.forEach((node, index) => {
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
	if (!isJsonValue(value) && issues.length === 0) {
		issues.push(invalid("INVALID_GRAPH", "$", "Task graph must be bounded JSON-safe data."));
	}
	return issues.length > 0 ? issues : (value as unknown as TaskGraph);
}

function validateField(
	value: Record<string, unknown>,
	field: string,
	code: ValidationErrorCode,
	prefix = "",
): ValidationIssue[] {
	const path = prefix ? `${prefix}.${field}` : field;
	try {
		const current = readOwnDataProperty(value, field);
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
	} catch {
		return [invalid(code, path, "Field cannot be inspected safely.")];
	}
}

function isArray(value: unknown): value is unknown[] {
	try {
		return Array.isArray(value);
	} catch {
		return false;
	}
}

function readOwnDataProperty(value: Record<string, unknown>, field: string): unknown {
	try {
		const descriptor = Object.getOwnPropertyDescriptor(value, field);
		return descriptor && "value" in descriptor ? descriptor.value : undefined;
	} catch {
		return undefined;
	}
}

function invalid(code: ValidationErrorCode, path: string, message: string): ValidationIssue {
	return { code, path, message };
}
