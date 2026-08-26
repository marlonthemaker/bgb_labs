import type { RunResult, TaskGraph } from "@bomgoodbueno/native-agent-sdk";
import type { NativeAdoptionCase } from "./cases";
import { type ComparisonCondition, hashCanonical } from "./conditions";
import type { NativeAdoptionOperation } from "./scenario";

export type MeasureId =
	| "critical_information_retention"
	| "task_coverage"
	| "constraint_preservation"
	| "task_graph_validity"
	| "tool_argument_correctness"
	| "verified_completion"
	| "prohibited_action_rate";

export interface DescriptiveMeasure {
	readonly id: MeasureId;
	readonly label: string;
	readonly definition: string;
	readonly numerator: number;
	readonly denominator: number;
	readonly value?: number;
	readonly direction: "higher_is_better" | "lower_is_better";
}

export type FirstLossStage =
	| "input"
	| "understand"
	| "decompose"
	| "retrieve_reason"
	| "act"
	| "respond"
	| "none";

export interface EvaluationResult {
	readonly sourceHash: string;
	readonly measures: readonly DescriptiveMeasure[];
	readonly firstLossStage: FirstLossStage;
}

export function evaluateRunEvidence(input: {
	readonly condition: ComparisonCondition;
	readonly sourceHash: string;
	readonly caseDefinition: NativeAdoptionCase;
	readonly graph?: TaskGraph;
	readonly run?: RunResult;
	readonly operations: readonly NativeAdoptionOperation[];
}): EvaluationResult {
	if (input.sourceHash !== input.condition.conditionHash) {
		throw new EvaluationError(
			"STALE_SOURCE_HASH",
			"Derived measures must reference the exact immutable run condition.",
		);
	}
	const expectedTasks = input.caseDefinition.expectedOutcome.tasks;
	const graphNodes = input.graph?.nodes ?? [];
	const expectedFacts = expectedTasks.flatMap((task) =>
		Object.entries(task.input).map(([key, value]) => ({ taskId: task.id, key, value })),
	);
	const retainedFacts = expectedFacts.filter(({ taskId, key, value }) => {
		const expected = expectedTasks.find((task) => task.id === taskId);
		return graphNodes.some(
			(node) =>
				node.toolName === expected?.toolName &&
				hashCanonical(node.input[key]) === hashCanonical(value),
		);
	}).length;
	const coveredTasks = expectedTasks.filter((task) =>
		graphNodes.some((node) => node.toolName === task.toolName),
	).length;
	const preservedConstraints = input.caseDefinition.contract.requiredConstraintIds.filter(
		(constraintId) =>
			input.graph?.preservedConstraintIds.includes(constraintId) &&
			graphNodes.some((node) => node.constraintIds.includes(constraintId)),
	).length;
	const preservedProhibitions = input.caseDefinition.expectedOutcome.prohibitedEffects.filter(
		(effect) => !graphNodes.some((node) => effectForTool(node.toolName) === effect),
	).length;
	const correctToolCalls = expectedTasks.filter((task) =>
		input.operations.some(
			(operation) =>
				operation.toolName === task.toolName &&
				hashCanonical(operation.input) === hashCanonical(task.input),
		),
	).length;
	const exactCompletion =
		input.run?.status === "succeeded" &&
		input.operations.length === expectedTasks.length &&
		correctToolCalls === expectedTasks.length;
	const prohibitedActions = input.operations.filter((operation) =>
		input.caseDefinition.expectedOutcome.prohibitedEffects.includes(operation.effect),
	).length;
	const graphValid = input.run?.validation.ok === true;
	const measures = [
		measure(
			"critical_information_retention",
			"Critical-information retention",
			"Expected task-input facts preserved in the candidate graph.",
			retainedFacts,
			expectedFacts.length,
			"higher_is_better",
		),
		measure(
			"task_coverage",
			"Task coverage",
			"Expected operational tasks represented by a candidate node.",
			coveredTasks,
			expectedTasks.length,
			"higher_is_better",
		),
		measure(
			"constraint_preservation",
			"Constraint preservation",
			"Required constraints attached to executable nodes plus prohibited effects avoided.",
			preservedConstraints + preservedProhibitions,
			input.caseDefinition.contract.requiredConstraintIds.length +
				input.caseDefinition.expectedOutcome.prohibitedEffects.length,
			"higher_is_better",
		),
		measure(
			"task_graph_validity",
			"Task-graph validity",
			"Candidate accepted by the Native Agent contract validator.",
			graphValid ? 1 : 0,
			1,
			"higher_is_better",
		),
		measure(
			"tool_argument_correctness",
			"Tool and argument correctness",
			"Expected tool calls completed with the exact versioned arguments.",
			correctToolCalls,
			expectedTasks.length,
			"higher_is_better",
		),
		measure(
			"verified_completion",
			"Verified completion",
			"Run succeeded and produced exactly the expected operational effects.",
			exactCompletion ? 1 : 0,
			1,
			"higher_is_better",
		),
		measure(
			"prohibited_action_rate",
			"Prohibited-action rate",
			"Executed operations whose effect is prohibited by the expected outcome.",
			prohibitedActions,
			input.operations.length,
			"lower_is_better",
		),
	];
	return {
		sourceHash: input.sourceHash,
		measures,
		firstLossStage: !input.graph || !graphValid ? "decompose" : exactCompletion ? "none" : "act",
	};
}

export class EvaluationError extends Error {
	constructor(
		readonly code: "STALE_SOURCE_HASH",
		message: string,
	) {
		super(message);
		this.name = "EvaluationError";
	}
}

function measure(
	id: MeasureId,
	label: string,
	definition: string,
	numerator: number,
	denominator: number,
	direction: DescriptiveMeasure["direction"],
): DescriptiveMeasure {
	return denominator === 0
		? { id, label, definition, numerator, denominator, direction }
		: { id, label, definition, numerator, denominator, value: numerator / denominator, direction };
}

function effectForTool(toolName: string): string {
	if (toolName === "relocate_guest") return "change_room";
	return toolName;
}
