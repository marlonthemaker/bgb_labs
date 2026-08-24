import type {
	JsonValue,
	SemanticContract,
	TaskGraph,
	ToolExecutionResult,
	ToolRegistry,
	ValidationResult,
} from "./contracts.js";
import { validateTaskGraph } from "./validation.js";

export type NodeStatus = "blocked" | "failed" | "skipped" | "succeeded";
export interface NodeResult {
	readonly nodeId: string;
	readonly status: NodeStatus;
	readonly output?: JsonValue;
	readonly errorCode?: string;
}
export interface RunEvent {
	readonly sequence: number;
	readonly type:
		| "run.accepted"
		| "run.failed"
		| "run.rejected"
		| "run.finished"
		| "node.started"
		| "node.blocked"
		| "node.finished"
		| "node.skipped"
		| "node.replayed";
	readonly nodeId?: string;
	readonly status?: NodeStatus;
}
export interface RunResult {
	readonly runId: string;
	readonly status: "failed" | "partial_failure" | "succeeded";
	readonly validation: ValidationResult;
	readonly nodeResults: readonly NodeResult[];
	readonly events: readonly RunEvent[];
}
export interface ExecutionLedger {
	readonly resultsByIdempotencyKey: Map<string, ToolExecutionResult>;
}

export function createExecutionLedger(): ExecutionLedger {
	return { resultsByIdempotencyKey: new Map() };
}

export async function executeTaskGraph(input: {
	readonly contract: SemanticContract | unknown;
	readonly graph: TaskGraph | unknown;
	readonly tools: ToolRegistry;
	readonly runId: string;
	readonly ledger?: ExecutionLedger;
}): Promise<RunResult> {
	const validation = validateTaskGraph(input);
	const events: RunEvent[] = [];
	const event = (value: Omit<RunEvent, "sequence">) =>
		events.push({ ...value, sequence: events.length + 1 });
	if (!validation.ok) {
		event({ type: "run.rejected" });
		return {
			runId: input.runId,
			status: "failed",
			validation,
			nodeResults: [],
			events,
		};
	}
	const graph = input.graph as TaskGraph;
	const ledger = input.ledger ?? createExecutionLedger();
	const results = new Map<string, NodeResult>();
	event({ type: "run.accepted" });
	while (results.size < graph.nodes.length) {
		const node = graph.nodes.find(
			(candidate) =>
				!results.has(candidate.id) && candidate.dependsOn.every((id) => results.has(id)),
		);
		if (!node) {
			event({ type: "run.failed" });
			return {
				runId: input.runId,
				status: "failed",
				validation,
				nodeResults: graph.nodes.flatMap((candidate) => {
					const result = results.get(candidate.id);
					return result ? [result] : [];
				}),
				events,
			};
		}
		const dependencyResults = node.dependsOn.map((id) => results.get(id));
		if (dependencyResults.some((result) => result?.status === "failed")) {
			results.set(node.id, { nodeId: node.id, status: "blocked" });
			event({ type: "node.blocked", nodeId: node.id, status: "blocked" });
			continue;
		}
		if (dependencyResults.some((result) => result?.status !== "succeeded")) {
			results.set(node.id, { nodeId: node.id, status: "skipped" });
			event({ type: "node.skipped", nodeId: node.id, status: "skipped" });
			continue;
		}
		const replay = ledger.resultsByIdempotencyKey.get(node.idempotencyKey);
		if (replay) {
			const result = toNodeResult(node.id, replay);
			results.set(node.id, result);
			event({ type: "node.replayed", nodeId: node.id, status: result.status });
			continue;
		}
		event({ type: "node.started", nodeId: node.id });
		const tool = input.tools[node.toolName];
		if (!tool) {
			const result: NodeResult = {
				nodeId: node.id,
				status: "failed",
				errorCode: "TOOL_UNAVAILABLE",
			};
			results.set(node.id, result);
			event({ type: "node.finished", nodeId: node.id, status: result.status });
			continue;
		}
		let toolResult: ToolExecutionResult;
		try {
			toolResult = await tool.execute({
				runId: input.runId,
				nodeId: node.id,
				idempotencyKey: node.idempotencyKey,
				input: node.input,
			});
		} catch {
			toolResult = { ok: false, errorCode: "TOOL_EXECUTION_ERROR" };
		}
		ledger.resultsByIdempotencyKey.set(node.idempotencyKey, toolResult);
		const result = toNodeResult(node.id, toolResult);
		results.set(node.id, result);
		event({ type: "node.finished", nodeId: node.id, status: result.status });
	}
	const nodeResults = graph.nodes.map((node) => results.get(node.id) as NodeResult);
	const status = nodeResults.every((result) => result.status === "succeeded")
		? "succeeded"
		: nodeResults.some((result) => result.status === "succeeded")
			? "partial_failure"
			: "failed";
	event({ type: "run.finished" });
	return { runId: input.runId, status, validation, nodeResults, events };
}

function toNodeResult(nodeId: string, result: ToolExecutionResult): NodeResult {
	if (result.ok) {
		return result.output === undefined
			? { nodeId, status: "succeeded" }
			: { nodeId, status: "succeeded", output: result.output };
	}
	return {
		nodeId,
		status: "failed",
		errorCode: result.errorCode ?? "TOOL_EXECUTION_FAILED",
	};
}
