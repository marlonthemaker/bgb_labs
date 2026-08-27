import { type ArmView, type ComparisonView, parseComparisonView } from "./native-adoption/view";

export const publicEvidenceExportSchemaVersion = "hotel-shoreline-public-evidence-v1";

export interface PublicEvidenceExport {
	readonly schemaVersion: typeof publicEvidenceExportSchemaVersion;
	readonly comparison: ComparisonView;
}

export type LifecycleStageState =
	| "not_reached"
	| "in_progress"
	| "failed"
	| "partial"
	| "completed";

export interface LifecycleStageView {
	readonly id: "receipt" | "planning" | "validation" | "execution";
	readonly label: string;
	readonly state: LifecycleStageState;
}

export function parsePublicEvidenceExport(value: unknown): PublicEvidenceExport | undefined {
	if (!isRecord(value) || value.schemaVersion !== publicEvidenceExportSchemaVersion)
		return undefined;
	const comparison = parseComparisonView(value.comparison);
	if (!comparison) return undefined;
	return { schemaVersion: publicEvidenceExportSchemaVersion, comparison };
}

export function deriveLifecycleStages(arm: ArmView): readonly LifecycleStageView[] {
	const events = new Set(arm.lifecycle);
	return [
		{
			id: "receipt",
			label: "Request received",
			state: events.has("event.received") ? "completed" : "not_reached",
		},
		{
			id: "planning",
			label: "Planning",
			state: stageState(events, "planning.started", "planning.finished", "planning.failed"),
		},
		{
			id: "validation",
			label: "Validation",
			state: stageState(events, "validation.started", "validation.finished", "validation.failed"),
		},
		{
			id: "execution",
			label: "Execution",
			state: executionState(arm, events),
		},
	];
}

function stageState(
	events: ReadonlySet<string>,
	started: string,
	completed: string,
	failed: string,
): LifecycleStageState {
	if (events.has(failed)) return "failed";
	if (events.has(completed)) return "completed";
	if (events.has(started)) return "in_progress";
	return "not_reached";
}

function executionState(arm: ArmView, events: ReadonlySet<string>): LifecycleStageState {
	if (!events.has("execution.finished")) return "not_reached";
	if (arm.status === "partial_failure") return "partial";
	if (arm.status === "failed") return "failed";
	return "completed";
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
