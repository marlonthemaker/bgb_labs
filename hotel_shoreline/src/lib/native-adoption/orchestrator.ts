import {
	createExecutionLedger,
	executeTaskGraph,
	isRecord,
	parseTaskGraph,
	type RunResult,
	type TaskGraph,
} from "@bomgoodbueno/native-agent-sdk";

import { GeminiPlannerError } from "../gemini-error";
import {
	type PlanningBudget,
	type PlanningUsage,
	type TaskmasterErrorCode,
	type TaskmasterLifecycleEvent,
	taskmasterPlanningBudget,
} from "../taskmaster";
import { type AuthoredTurn, getLanguageVariant, getNativeAdoptionCase } from "./cases";
import {
	buildMatchedConditions,
	type ComparisonCondition,
	evaluatePairEligibility,
	type PlannerConfiguration,
} from "./conditions";
import { type EvaluationResult, evaluateRunEvidence } from "./evaluation";
import type { TreatmentArm } from "./interventions";
import { createNativeAdoptionScenario, type NativeAdoptionOperation } from "./scenario";

export interface ComparisonPlanningRequest {
	readonly arm: TreatmentArm;
	readonly caseId: string;
	readonly locale: string;
	readonly contractKey: string;
	readonly turns: readonly AuthoredTurn[];
	readonly operationalContext: {
		readonly stayId: string;
		readonly roomNumber: string;
		readonly extraTowelCount: number;
	};
	readonly contractGuidance?: {
		readonly id: string;
		readonly version: string;
		readonly allowedTools: readonly string[];
		readonly prohibitedEffects: readonly string[];
		readonly requiredConstraintIds: readonly string[];
	};
}

export interface ComparisonPlanner {
	readonly configuration: PlannerConfiguration;
	plan(
		request: ComparisonPlanningRequest,
		context: { readonly signal: AbortSignal },
	): Promise<{ readonly graph: unknown; readonly usage: PlanningUsage }>;
}

export interface ComparisonArmRun {
	readonly id: string;
	readonly condition: ComparisonCondition;
	readonly sourceHash: string;
	readonly lifecycle: readonly TaskmasterLifecycleEvent[];
	readonly status: "planning_failed" | "rejected" | RunResult["status"];
	readonly errorCode?: TaskmasterErrorCode;
	readonly candidateGraph?: TaskGraph;
	readonly run?: RunResult;
	readonly operations: readonly NativeAdoptionOperation[];
	readonly evaluation: EvaluationResult;
}

export interface MatchedComparisonRun {
	readonly id: string;
	readonly caseId: string;
	readonly locale: string;
	readonly pairEligibility: ReturnType<typeof evaluatePairEligibility>;
	readonly baseline: ComparisonArmRun;
	readonly intervention: ComparisonArmRun;
}

export class DeterministicComparisonPlanner implements ComparisonPlanner {
	readonly configuration: PlannerConfiguration = {
		provider: "deterministic",
		model: "frozen-hsd-005-candidates",
		plannerVersion: "hsd5-deterministic-v1",
		promptVersion: "hsd5-matched-comparison-v1",
		temperature: 0,
		budget: taskmasterPlanningBudget,
	};

	async plan(request: ComparisonPlanningRequest): Promise<{
		readonly graph: TaskGraph;
		readonly usage: PlanningUsage;
	}> {
		const caseDefinition = getNativeAdoptionCase(request.caseId);
		return {
			graph:
				request.arm === "contract_guided"
					? exactGraph(caseDefinition)
					: frozenBaselineGraph(caseDefinition),
			usage: { turns: 1 },
		};
	}
}

export async function executeMatchedComparison(input: {
	readonly caseId: string;
	readonly locale: string;
	readonly planner: ComparisonPlanner;
	readonly idFactory?: () => string;
}): Promise<MatchedComparisonRun> {
	const id = input.idFactory?.() ?? crypto.randomUUID();
	const conditions = buildMatchedConditions({
		caseId: input.caseId,
		locale: input.locale,
		planner: input.planner.configuration,
	});
	const caseDefinition = getNativeAdoptionCase(input.caseId);
	const variant = getLanguageVariant(caseDefinition, input.locale);
	const execute = (condition: ComparisonCondition) =>
		executeArm({
			comparisonId: id,
			condition,
			planner: input.planner,
			request: {
				arm: condition.arm,
				caseId: caseDefinition.id,
				locale: variant.locale,
				contractKey: caseDefinition.contract.id,
				turns: variant.turns,
				operationalContext: {
					stayId: caseDefinition.fixture.stayId,
					roomNumber: caseDefinition.fixture.roomNumber,
					extraTowelCount: caseDefinition.fixture.extraTowelCount,
				},
				...(condition.arm === "contract_guided"
					? { contractGuidance: { ...caseDefinition.contract } }
					: {}),
			},
		});
	const baseline = await execute(conditions.baseline);
	const intervention = await execute(conditions.intervention);
	return {
		id,
		caseId: caseDefinition.id,
		locale: variant.locale,
		pairEligibility: evaluatePairEligibility(conditions),
		baseline,
		intervention,
	};
}

async function executeArm(input: {
	readonly comparisonId: string;
	readonly condition: ComparisonCondition;
	readonly planner: ComparisonPlanner;
	readonly request: ComparisonPlanningRequest;
}): Promise<ComparisonArmRun> {
	const lifecycle: TaskmasterLifecycleEvent[] = ["event.received", "planning.started"];
	const scenario = createNativeAdoptionScenario(getNativeAdoptionCase(input.condition.caseId));
	let rawOutput: unknown;
	const controller = new AbortController();
	try {
		rawOutput = await withinTimeout(
			input.planner.plan(input.request, { signal: controller.signal }),
			input.condition.planner.budget.timeoutMs,
			controller,
		);
	} catch (error) {
		lifecycle.push("planning.failed");
		return failedArm(
			input,
			lifecycle,
			error instanceof ComparisonPlannerTimeout
				? "PLANNER_TIMEOUT"
				: error instanceof GeminiPlannerError
					? error.code
					: "PLANNER_UNAVAILABLE",
		);
	}
	if (!isPlanningOutput(rawOutput)) {
		lifecycle.push("planning.failed");
		return failedArm(input, lifecycle, "PLANNER_INVALID_OUTPUT");
	}
	const parsed = parseTaskGraph(rawOutput.graph);
	if (Array.isArray(parsed)) {
		lifecycle.push("planning.failed");
		return failedArm(input, lifecycle, "PLANNER_INVALID_OUTPUT");
	}
	if (budgetExceeded(input.condition.planner.budget, rawOutput.usage, parsed)) {
		lifecycle.push("planning.failed");
		return failedArm(input, lifecycle, "PLANNER_BUDGET_EXCEEDED");
	}
	lifecycle.push("planning.finished", "validation.started");
	const run = await executeTaskGraph({
		contract: getNativeAdoptionCase(input.condition.caseId).contract,
		graph: parsed,
		tools: scenario.tools,
		runId: `${input.comparisonId}-${input.condition.arm}`,
		ledger: createExecutionLedger(),
	});
	lifecycle.push(run.validation.ok ? "validation.finished" : "validation.failed");
	if (run.validation.ok) lifecycle.push("execution.finished");
	const operations = scenario.getOperations();
	const evaluation = evaluateRunEvidence({
		condition: input.condition,
		sourceHash: input.condition.conditionHash,
		caseDefinition: getNativeAdoptionCase(input.condition.caseId),
		graph: parsed,
		run,
		operations,
	});
	return {
		id: run.runId,
		condition: input.condition,
		sourceHash: input.condition.conditionHash,
		lifecycle,
		status: run.validation.ok ? run.status : "rejected",
		candidateGraph: parsed,
		run,
		operations,
		evaluation,
	};
}

function failedArm(
	input: { comparisonId: string; condition: ComparisonCondition },
	lifecycle: readonly TaskmasterLifecycleEvent[],
	errorCode: TaskmasterErrorCode,
): ComparisonArmRun {
	const caseDefinition = getNativeAdoptionCase(input.condition.caseId);
	const evaluation = evaluateRunEvidence({
		condition: input.condition,
		sourceHash: input.condition.conditionHash,
		caseDefinition,
		operations: [],
	});
	return {
		id: `${input.comparisonId}-${input.condition.arm}`,
		condition: input.condition,
		sourceHash: input.condition.conditionHash,
		lifecycle,
		status: "planning_failed",
		errorCode,
		operations: [],
		evaluation,
	};
}

function isPlanningOutput(value: unknown): value is { graph: unknown; usage: PlanningUsage } {
	return (
		isRecord(value) &&
		"graph" in value &&
		isRecord(value.usage) &&
		typeof value.usage.turns === "number" &&
		Number.isSafeInteger(value.usage.turns) &&
		value.usage.turns > 0 &&
		(value.usage.outputTokens === undefined ||
			(typeof value.usage.outputTokens === "number" &&
				Number.isSafeInteger(value.usage.outputTokens) &&
				value.usage.outputTokens >= 0))
	);
}

function budgetExceeded(budget: PlanningBudget, usage: PlanningUsage, graph: TaskGraph): boolean {
	return (
		usage.turns > budget.maxTurns ||
		(usage.outputTokens !== undefined && usage.outputTokens > budget.maxOutputTokens) ||
		graph.nodes.length > budget.maxNodes
	);
}

async function withinTimeout<T>(
	promise: Promise<T>,
	timeoutMs: number,
	controller: AbortController,
): Promise<T> {
	let timeout: ReturnType<typeof setTimeout> | undefined;
	try {
		return await Promise.race([
			promise,
			new Promise<T>((_resolve, reject) => {
				timeout = setTimeout(() => {
					reject(new ComparisonPlannerTimeout());
					controller.abort();
				}, timeoutMs);
			}),
		]);
	} finally {
		if (timeout) clearTimeout(timeout);
	}
}

class ComparisonPlannerTimeout extends Error {}

function exactGraph(caseDefinition: ReturnType<typeof getNativeAdoptionCase>): TaskGraph {
	return {
		id: `${caseDefinition.id}-contract-guided-graph`,
		contractId: caseDefinition.contract.id,
		preservedConstraintIds: caseDefinition.contract.requiredConstraintIds,
		nodes: caseDefinition.expectedOutcome.tasks.map((task) => ({
			id: task.id,
			toolName: task.toolName,
			input: task.input,
			dependsOn: [],
			constraintIds: task.constraintIds,
			idempotencyKey: `${caseDefinition.id}-${task.id}`,
		})),
	};
}

function frozenBaselineGraph(caseDefinition: ReturnType<typeof getNativeAdoptionCase>): TaskGraph {
	const exact = exactGraph(caseDefinition);
	if (caseDefinition.id === "compound-recovery") {
		return {
			...exact,
			id: `${caseDefinition.id}-baseline-graph`,
			preservedConstraintIds: exact.preservedConstraintIds.filter(
				(id) => id !== "two-extra-towels",
			),
			nodes: exact.nodes.filter((node) => node.toolName !== "request_housekeeping"),
		};
	}
	if (caseDefinition.id === "conditional-safety") {
		return {
			...exact,
			id: `${caseDefinition.id}-baseline-graph`,
			nodes: [
				...exact.nodes,
				{
					id: "premature-relocation",
					toolName: "relocate_guest",
					input: {
						stayId: caseDefinition.fixture.stayId,
						roomNumber: caseDefinition.fixture.roomNumber,
					},
					dependsOn: [],
					constraintIds: ["room-305"],
					idempotencyKey: `${caseDefinition.id}-premature-relocation`,
				},
			],
		};
	}
	return {
		...exact,
		id: `${caseDefinition.id}-baseline-graph`,
		nodes: [
			...exact.nodes,
			{
				id: "superseded-housekeeping",
				toolName: "request_housekeeping",
				input: {
					stayId: caseDefinition.fixture.stayId,
					roomNumber: caseDefinition.fixture.roomNumber,
					extraTowelCount: caseDefinition.fixture.extraTowelCount,
				},
				dependsOn: [],
				constraintIds: ["room-418"],
				idempotencyKey: `${caseDefinition.id}-superseded-housekeeping`,
			},
		],
	};
}
