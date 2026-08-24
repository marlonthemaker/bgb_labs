import {
	isRecord,
	parseSemanticContract,
	parseTaskGraph,
	type SemanticContract,
	type TaskGraph,
	type ToolRegistry,
	type ValidationIssue,
	type ValidationResult,
} from "./contracts.js";

export function validateTaskGraph(input: {
	readonly contract: SemanticContract | unknown;
	readonly graph: TaskGraph | unknown;
	readonly tools: ToolRegistry;
}): ValidationResult {
	if (!isRecord(input.tools)) {
		return {
			ok: false,
			issues: [
				{ code: "INVALID_GRAPH", path: "tools", message: "Tool registry must be an object." },
			],
		};
	}
	const contract = parseSemanticContract(input.contract);
	const graph = parseTaskGraph(input.graph);
	const issues: ValidationIssue[] = [];
	if (Array.isArray(contract) || Array.isArray(graph)) {
		if (Array.isArray(contract)) issues.push(...contract);
		if (Array.isArray(graph)) issues.push(...graph);
		return { ok: false, issues };
	}
	if (graph.contractId !== contract.id)
		issues.push({
			code: "INVALID_GRAPH",
			path: "contractId",
			message: "Graph contractId must match the contract.",
		});
	const ids = new Set<string>();
	const keys = new Set<string>();
	for (const node of graph.nodes) {
		if (ids.has(node.id))
			issues.push({
				code: "DUPLICATE_NODE_ID",
				path: `nodes.${node.id}`,
				message: "Node ids must be unique.",
			});
		ids.add(node.id);
		if (keys.has(node.idempotencyKey))
			issues.push({
				code: "DUPLICATE_IDEMPOTENCY_KEY",
				path: `nodes.${node.id}.idempotencyKey`,
				message: "Idempotency keys must be unique.",
			});
		keys.add(node.idempotencyKey);
		for (const dependency of node.dependsOn)
			if (!graph.nodes.some((candidate) => candidate.id === dependency))
				issues.push({
					code: "UNKNOWN_DEPENDENCY",
					path: `nodes.${node.id}.dependsOn`,
					message: `Unknown dependency ${dependency}.`,
				});
		const tool = input.tools[node.toolName];
		if (!isTaskTool(tool))
			issues.push({
				code: "UNKNOWN_TOOL",
				path: `nodes.${node.id}.toolName`,
				message: `Unknown tool ${node.toolName}.`,
			});
		else {
			if (!contract.allowedTools.includes(tool.name))
				issues.push({
					code: "TOOL_NOT_ALLOWED",
					path: `nodes.${node.id}.toolName`,
					message: `Tool ${tool.name} is not allowed.`,
				});
			if (contract.prohibitedEffects.includes(tool.effect))
				issues.push({
					code: "PROHIBITED_EFFECT",
					path: `nodes.${node.id}.toolName`,
					message: `Effect ${tool.effect} is prohibited.`,
				});
		}
	}
	for (const constraint of contract.requiredConstraintIds)
		if (!graph.preservedConstraintIds.includes(constraint))
			issues.push({
				code: "MISSING_REQUIRED_CONSTRAINT",
				path: "preservedConstraintIds",
				message: `Required constraint ${constraint} is missing.`,
			});
		else if (!graph.nodes.some((node) => node.constraintIds.includes(constraint)))
			issues.push({
				code: "MISSING_REQUIRED_CONSTRAINT",
				path: "nodes",
				message: `Required constraint ${constraint} is not attached to an executable task.`,
			});
	if (hasCycle(graph))
		issues.push({
			code: "CYCLE_DETECTED",
			path: "nodes",
			message: "Graph contains a dependency cycle.",
		});
	return issues.length === 0 ? { ok: true, issues: [] } : { ok: false, issues };
}

function isTaskTool(value: unknown): value is ToolRegistry[string] {
	return (
		isRecord(value) &&
		typeof value.name === "string" &&
		typeof value.effect === "string" &&
		typeof value.execute === "function"
	);
}

function hasCycle(graph: TaskGraph): boolean {
	const dependencies = new Map(graph.nodes.map((node) => [node.id, node.dependsOn]));
	const visiting = new Set<string>();
	const visited = new Set<string>();
	const visit = (id: string): boolean => {
		if (visiting.has(id)) return true;
		if (visited.has(id)) return false;
		visiting.add(id);
		for (const dependency of dependencies.get(id) ?? [])
			if (dependencies.has(dependency) && visit(dependency)) return true;
		visiting.delete(id);
		visited.add(id);
		return false;
	};
	return graph.nodes.some((node) => visit(node.id));
}
