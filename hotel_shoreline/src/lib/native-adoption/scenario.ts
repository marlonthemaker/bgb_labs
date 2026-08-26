import {
	isRecord,
	type JsonObject,
	type ToolExecutionResult,
	type ToolRegistry,
} from "@bomgoodbueno/native-agent-sdk";

import type { NativeAdoptionCase } from "./cases";

export interface NativeAdoptionOperation {
	readonly effect: string;
	readonly input: JsonObject;
	readonly toolName: string;
}

export function createNativeAdoptionScenario(caseDefinition: NativeAdoptionCase): {
	readonly tools: ToolRegistry;
	readonly getOperations: () => readonly NativeAdoptionOperation[];
} {
	const operations: NativeAdoptionOperation[] = [];
	const results = new Map<string, ToolExecutionResult>();
	const execute = (
		idempotencyKey: string,
		toolName: NativeAdoptionOperation["toolName"],
		effect: NativeAdoptionOperation["effect"],
		input: JsonObject,
		validate: () => string | undefined,
	): ToolExecutionResult => {
		const replay = results.get(idempotencyKey);
		if (replay) return replay;
		const errorCode = validate();
		const result: ToolExecutionResult = errorCode
			? { ok: false, errorCode }
			: { ok: true, output: { status: `${toolName}-recorded` } };
		if (result.ok) operations.push({ toolName, effect, input: { ...input } });
		results.set(idempotencyKey, result);
		return result;
	};
	const validStayAndRoom = (input: JsonObject): boolean =>
		isRecord(input) &&
		input.stayId === caseDefinition.fixture.stayId &&
		input.roomNumber === caseDefinition.fixture.roomNumber;
	const tools: ToolRegistry = {
		request_maintenance: {
			name: "request_maintenance",
			effect: "request_maintenance",
			execute: async ({ idempotencyKey, input }) =>
				execute(idempotencyKey, "request_maintenance", "request_maintenance", input, () =>
					validStayAndRoom(input) ? undefined : "INVALID_STAY_OR_ROOM",
				),
		},
		request_housekeeping: {
			name: "request_housekeeping",
			effect: "request_housekeeping",
			execute: async ({ idempotencyKey, input }) =>
				execute(idempotencyKey, "request_housekeeping", "request_housekeeping", input, () => {
					if (!validStayAndRoom(input)) return "INVALID_STAY_OR_ROOM";
					return input.extraTowelCount === caseDefinition.fixture.extraTowelCount
						? undefined
						: "INVALID_TOWEL_QUANTITY";
				}),
		},
		relocate_guest: {
			name: "relocate_guest",
			effect: "change_room",
			execute: async ({ idempotencyKey, input }) =>
				execute(idempotencyKey, "relocate_guest", "change_room", input, () =>
					validStayAndRoom(input) ? undefined : "INVALID_STAY_OR_ROOM",
				),
		},
	};
	return {
		tools,
		getOperations: () =>
			operations.map((operation) => ({ ...operation, input: { ...operation.input } })),
	};
}
