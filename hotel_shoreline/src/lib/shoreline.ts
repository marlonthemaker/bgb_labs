import {
	createExecutionLedger,
	executeTaskGraph,
	isRecord,
	type JsonObject,
	type SemanticContract,
	type TaskGraph,
	type ToolExecutionResult,
	type ToolRegistry,
} from "@bomgoodbueno/native-agent-sdk";

export const shorelineFixture = Object.freeze({
	version: "shoreline-fixture-v1",
	stayId: "shoreline-stay-204",
	roomNumber: "204",
	maxExtraTowels: 2,
});

export const shorelineContract: SemanticContract = {
	id: "shoreline-hot-water-and-towels",
	version: "1.0.0",
	allowedTools: ["request_maintenance", "request_housekeeping"],
	prohibitedEffects: ["charge_guest", "change_reservation"],
	requiredConstraintIds: ["room-204", "two-extra-towels", "no-charge"],
};

export const shorelineGraph: TaskGraph = {
	id: "shoreline-hot-water-and-towels-graph",
	contractId: shorelineContract.id,
	preservedConstraintIds: shorelineContract.requiredConstraintIds,
	nodes: [
		{
			id: "request-maintenance",
			toolName: "request_maintenance",
			input: { stayId: shorelineFixture.stayId, roomNumber: shorelineFixture.roomNumber },
			dependsOn: [],
			constraintIds: ["room-204", "no-charge"],
			idempotencyKey: "shoreline-204-maintenance-v1",
		},
		{
			id: "request-housekeeping",
			toolName: "request_housekeeping",
			input: {
				stayId: shorelineFixture.stayId,
				roomNumber: shorelineFixture.roomNumber,
				extraTowelCount: shorelineFixture.maxExtraTowels,
			},
			dependsOn: [],
			constraintIds: ["room-204", "two-extra-towels", "no-charge"],
			idempotencyKey: "shoreline-204-housekeeping-v1",
		},
	],
};

export interface ShorelineOperation {
	readonly operation: "housekeeping" | "maintenance";
	readonly roomNumber: string;
}

export interface ShorelineState {
	readonly operations: readonly ShorelineOperation[];
}

export interface ShorelineTools {
	readonly tools: ToolRegistry;
	readonly getState: () => ShorelineState;
}

export interface ShorelineDemoRun {
	readonly fixtureVersion: string;
	readonly finalState: ShorelineState;
	readonly run: Awaited<ReturnType<typeof executeTaskGraph>>;
}

export function createShorelineTools(): ShorelineTools {
	const operations: ShorelineOperation[] = [];
	const adapterResults = new Map<string, ToolExecutionResult>();
	const replaySafe = (
		idempotencyKey: string,
		createResult: () => ToolExecutionResult,
	): ToolExecutionResult => {
		const replay = adapterResults.get(idempotencyKey);
		if (replay) return replay;
		const result = createResult();
		adapterResults.set(idempotencyKey, result);
		return result;
	};
	const tools: ToolRegistry = {
		request_maintenance: {
			name: "request_maintenance",
			effect: "request_maintenance",
			execute: async ({ idempotencyKey, input }) =>
				replaySafe(idempotencyKey, () => {
					const roomNumber = validRoomInput(input);
					if (!roomNumber) return { ok: false, errorCode: "INVALID_STAY_OR_ROOM" };
					operations.push({ operation: "maintenance", roomNumber });
					return { ok: true, output: { status: "maintenance-requested", roomNumber } };
				}),
		},
		request_housekeeping: {
			name: "request_housekeeping",
			effect: "request_housekeeping",
			execute: async ({ idempotencyKey, input }) =>
				replaySafe(idempotencyKey, () => {
					const roomNumber = validRoomInput(input);
					if (!roomNumber) return { ok: false, errorCode: "INVALID_STAY_OR_ROOM" };
					if (input.extraTowelCount !== shorelineFixture.maxExtraTowels)
						return { ok: false, errorCode: "INVALID_TOWEL_QUANTITY" };
					operations.push({ operation: "housekeeping", roomNumber });
					return {
						ok: true,
						output: {
							status: "housekeeping-requested",
							roomNumber,
							extraTowelCount: shorelineFixture.maxExtraTowels,
						},
					};
				}),
		},
	};
	return {
		tools,
		getState: () => ({ operations: operations.map((operation) => ({ ...operation })) }),
	};
}

export async function executeShorelineDemo(): Promise<ShorelineDemoRun> {
	const shorelineTools = createShorelineTools();
	const run = await executeTaskGraph({
		contract: shorelineContract,
		graph: shorelineGraph,
		tools: shorelineTools.tools,
		runId: "shoreline-run-204",
		ledger: createExecutionLedger(),
	});
	return {
		fixtureVersion: shorelineFixture.version,
		finalState: shorelineTools.getState(),
		run,
	};
}

function validRoomInput(input: JsonObject): string | undefined {
	if (!isRecord(input)) return undefined;
	return input.stayId === shorelineFixture.stayId &&
		input.roomNumber === shorelineFixture.roomNumber
		? shorelineFixture.roomNumber
		: undefined;
}
