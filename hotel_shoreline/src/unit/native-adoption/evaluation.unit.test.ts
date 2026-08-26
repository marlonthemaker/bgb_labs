import type { RunResult, TaskGraph } from "@bomgoodbueno/native-agent-sdk";
import { describe, expect, it } from "vitest";

import { getNativeAdoptionCase } from "../../lib/native-adoption/cases";
import { buildMatchedConditions } from "../../lib/native-adoption/conditions";
import { EvaluationError, evaluateRunEvidence } from "../../lib/native-adoption/evaluation";
import { DeterministicComparisonPlanner } from "../../lib/native-adoption/orchestrator";

describe("HSD-005 deterministic evaluation", () => {
	const caseDefinition = getNativeAdoptionCase("compound-recovery");
	const condition = buildMatchedConditions({
		caseId: caseDefinition.id,
		locale: "en",
		planner: new DeterministicComparisonPlanner().configuration,
	}).intervention;
	const graph: TaskGraph = {
		id: "documented-success",
		contractId: caseDefinition.contract.id,
		preservedConstraintIds: caseDefinition.contract.requiredConstraintIds,
		nodes: caseDefinition.expectedOutcome.tasks.map((task) => ({
			id: task.id,
			toolName: task.toolName,
			input: task.input,
			dependsOn: [],
			constraintIds: task.constraintIds,
			idempotencyKey: task.id,
		})),
	};
	const run: RunResult = {
		runId: "documented-success",
		status: "succeeded",
		validation: { ok: true, issues: [] },
		nodeResults: graph.nodes.map(({ id }) => ({ nodeId: id, status: "succeeded" })),
		events: [],
	};

	it("HSD5-E-002: documents perfect evidence using explicit numerators and denominators", () => {
		const result = evaluateRunEvidence({
			condition,
			sourceHash: condition.conditionHash,
			caseDefinition,
			graph,
			run,
			operations: caseDefinition.expectedOutcome.tasks.map(({ effect, input, toolName }) => ({
				effect,
				input,
				toolName,
			})),
		});

		expect(result.firstLossStage).toBe("none");
		expect(result.measures).toHaveLength(7);
		for (const measure of result.measures) {
			expect(measure.definition).not.toBe("");
			expect(measure.denominator).toBeGreaterThan(0);
			expect(measure.value).toBe(measure.direction === "lower_is_better" ? 0 : 1);
		}
	});

	it("HSD5-E-002/HSD5-E-003: preserves zero-denominator and rejected evidence without inventing a rate", () => {
		const rejected: RunResult = {
			...run,
			status: "failed",
			validation: {
				ok: false,
				issues: [
					{ code: "MISSING_REQUIRED_CONSTRAINT", path: "preservedConstraintIds", message: "lost" },
				],
			},
			nodeResults: [],
		};
		const result = evaluateRunEvidence({
			condition,
			sourceHash: condition.conditionHash,
			caseDefinition,
			graph: { ...graph, preservedConstraintIds: [] },
			run: rejected,
			operations: [],
		});
		const prohibitedRate = result.measures.find(({ id }) => id === "prohibited_action_rate");
		expect(prohibitedRate).toMatchObject({ numerator: 0, denominator: 0 });
		expect(prohibitedRate).not.toHaveProperty("value");
		expect(result.firstLossStage).toBe("decompose");
	});

	it("HSD5-E-003: rejects derived evidence whose source hash is stale", () => {
		expect(() =>
			evaluateRunEvidence({
				condition,
				sourceHash: "stale",
				caseDefinition,
				operations: [],
			}),
		).toThrowError(EvaluationError);
	});
});
