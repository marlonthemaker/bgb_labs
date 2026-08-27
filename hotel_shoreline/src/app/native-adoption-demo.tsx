"use client";

import { useState } from "react";

import { deriveLifecycleStages, parsePublicEvidenceExport } from "../lib/evidence-experience";
import {
	type EvidenceHistoryItem,
	parseEvidenceHistoryResponse,
} from "../lib/evidence-ledger/view";
import {
	type ArmView,
	type ComparisonView,
	parseComparisonView,
} from "../lib/native-adoption/view";

const cases = [
	["compound-recovery", "Compound service recovery"],
	["conditional-safety", "Conditional safety constraint"],
	["corrective-change", "Corrective multi-turn change"],
] as const;

export function NativeAdoptionDemo() {
	const [caseId, setCaseId] = useState("compound-recovery");
	const [locale, setLocale] = useState("en");
	const [comparison, setComparison] = useState<ComparisonView>();
	const [history, setHistory] = useState<readonly EvidenceHistoryItem[]>();
	const [selectedComparisonId, setSelectedComparisonId] = useState<string>();
	const [isRunning, setIsRunning] = useState(false);
	const [isHistoryLoading, setIsHistoryLoading] = useState(false);
	const [requestError, setRequestError] = useState<string>();
	const [historyError, setHistoryError] = useState<string>();

	const loadHistory = async (preferredComparisonId?: string) => {
		setIsHistoryLoading(true);
		setHistoryError(undefined);
		try {
			const response = await fetch("/api/native-adoption?limit=20", {
				headers: { "Cache-Control": "no-cache" },
			});
			const parsed = parseEvidenceHistoryResponse(await response.json());
			if (!response.ok || !parsed) throw new Error("Invalid public history evidence.");
			setHistory(parsed.records);
			setSelectedComparisonId((current) => {
				const preferred = preferredComparisonId ?? current;
				return parsed.records.some(({ comparisonId }) => comparisonId === preferred)
					? preferred
					: parsed.records[0]?.comparisonId;
			});
		} catch {
			setHistoryError("Saved evidence is unavailable. The current comparison is unchanged.");
		} finally {
			setIsHistoryLoading(false);
		}
	};

	const runComparison = async () => {
		setIsRunning(true);
		setRequestError(undefined);
		try {
			const response = await fetch("/api/native-adoption", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ caseId, locale }),
			});
			const parsed = parseComparisonView(await response.json());
			if (!response.ok || !parsed) throw new Error("Invalid public comparison evidence.");
			setComparison(parsed);
			await loadHistory(parsed.comparisonId);
		} catch {
			setRequestError("Comparison evidence is unavailable. No outcome is being claimed.");
		} finally {
			setIsRunning(false);
		}
	};

	const inspectSavedComparison = async () => {
		if (!selectedComparisonId) return;
		setIsHistoryLoading(true);
		setHistoryError(undefined);
		try {
			const response = await fetch(`/api/native-adoption/${selectedComparisonId}`, {
				headers: { "Cache-Control": "no-cache" },
			});
			const parsed = parsePublicEvidenceExport(await response.json());
			if (!response.ok || !parsed) throw new Error("Invalid saved evidence export.");
			setComparison(parsed.comparison);
		} catch {
			setHistoryError("Saved evidence is unavailable. The current comparison is unchanged.");
		} finally {
			setIsHistoryLoading(false);
		}
	};

	return (
		<section aria-labelledby="native-adoption-heading" className="demo-panel comparison-panel">
			<div className="section-heading">
				<div>
					<p className="eyebrow">HSD-006 evidence experience</p>
					<h2 id="native-adoption-heading">Native-adoption comparison inspector</h2>
				</div>
				<button disabled={isRunning} onClick={runComparison} type="button">
					{isRunning ? "Comparing…" : "Run matched comparison"}
				</button>
			</div>
			<div className="controls">
				<label>
					Case
					<select value={caseId} onChange={(event) => setCaseId(event.target.value)}>
						{cases.map(([value, label]) => (
							<option key={value} value={value}>
								{label}
							</option>
						))}
					</select>
				</label>
				<label>
					Locale
					<select value={locale} onChange={(event) => setLocale(event.target.value)}>
						<option value="en">English (en)</option>
						<option value="es-ES">Spanish (es-ES)</option>
						<option value="pt-PT">Portuguese (pt-PT)</option>
					</select>
				</label>
			</div>
			<p className="limitation">
				Draft variants may run for engineering evaluation. Pending human review excludes them from
				reviewer-qualified aggregate claims.
			</p>
			<HistoryControls
				history={history}
				historyError={historyError}
				isLoading={isHistoryLoading}
				onInspect={inspectSavedComparison}
				onRefresh={() => loadHistory(comparison?.comparisonId)}
				onSelect={setSelectedComparisonId}
				selectedComparisonId={selectedComparisonId}
			/>
			{requestError ? (
				<p aria-live="polite" className="status-error">
					{requestError}
				</p>
			) : null}
			{comparison ? (
				<ComparisonEvidence comparison={comparison} />
			) : requestError ? null : (
				<p>Choose a case and locale, then run both matched arms.</p>
			)}
		</section>
	);
}

function HistoryControls({
	history,
	historyError,
	isLoading,
	onInspect,
	onRefresh,
	onSelect,
	selectedComparisonId,
}: {
	readonly history: readonly EvidenceHistoryItem[] | undefined;
	readonly historyError: string | undefined;
	readonly isLoading: boolean;
	readonly onInspect: () => Promise<void>;
	readonly onRefresh: () => Promise<void>;
	readonly onSelect: (comparisonId: string) => void;
	readonly selectedComparisonId: string | undefined;
}) {
	return (
		<section aria-label="Saved comparison history" className="history-panel">
			<div className="section-heading compact-heading">
				<div>
					<h3>Saved evidence</h3>
					<p>Reopen the exact immutable record before downloading its public artifact.</p>
				</div>
				<button disabled={isLoading} onClick={onRefresh} type="button">
					{isLoading ? "Loading…" : "Refresh saved evidence"}
				</button>
			</div>
			{history && history.length > 0 ? (
				<div className="history-controls">
					<label>
						Saved comparison
						<select value={selectedComparisonId} onChange={(event) => onSelect(event.target.value)}>
							{history.map((item) => (
								<option key={item.comparisonId} value={item.comparisonId}>
									{item.caseTitle} · {item.locale} · {item.recordedAt}
								</option>
							))}
						</select>
					</label>
					<button disabled={isLoading || !selectedComparisonId} onClick={onInspect} type="button">
						Inspect saved comparison
					</button>
				</div>
			) : null}
			<p aria-live="polite" className={historyError ? "status-error" : undefined}>
				{historyError ??
					(history === undefined
						? "Saved evidence has not been loaded."
						: history.length === 0
							? "No saved comparisons yet."
							: `${history.length} saved comparison${history.length === 1 ? "" : "s"} loaded.`)}
			</p>
		</section>
	);
}

function ComparisonEvidence({ comparison }: { readonly comparison: ComparisonView }) {
	return (
		<div className="comparison-evidence">
			<section aria-label="Comparison source and eligibility">
				<div className="section-heading compact-heading">
					<div>
						<h3>{comparison.case.title}</h3>
						<p>
							Recorded{" "}
							<time dateTime={comparison.evidence.recordedAt}>
								{comparison.evidence.recordedAt}
							</time>
						</p>
					</div>
					<a
						className="button-link"
						download
						href={`/api/native-adoption/${comparison.comparisonId}`}
					>
						Download JSON evidence
					</a>
				</div>
				<p>
					Locale: <code>{comparison.case.locale}</code> · Review:{" "}
					<strong>{comparison.case.reviewStatus}</strong>
				</p>
				<ol aria-label="Authored request turns">
					{comparison.case.turns.map((turn) => (
						<li key={turn.sequence}>{turn.text}</li>
					))}
				</ol>
				<p>
					Contract:{" "}
					<code>
						{comparison.contract.id}@{comparison.contract.version}
					</code>
				</p>
				<p>Required constraints: {comparison.contract.requiredConstraintIds.join(", ")}</p>
				<dl className="provenance-grid">
					<div>
						<dt>Case / variant</dt>
						<dd>
							{comparison.evidence.caseVersion} / {comparison.evidence.variantId}@
							{comparison.evidence.variantVersion}
						</dd>
					</div>
					<div>
						<dt>Fixture / tools</dt>
						<dd>
							{comparison.evidence.fixtureVersion} / {comparison.evidence.toolContractVersion}
						</dd>
					</div>
					<div>
						<dt>Source evidence</dt>
						<dd>
							<code>{comparison.evidence.sourceContentHash.slice(0, 12)}</code>
						</dd>
					</div>
				</dl>
				<p>
					Pair eligible for reviewer-qualified aggregates:{" "}
					<strong>{comparison.pairEligibility.eligible ? "yes" : "no"}</strong>
				</p>
				{comparison.pairEligibility.reasons.length > 0 ? (
					<p>Exclusions: {comparison.pairEligibility.reasons.join(", ")}</p>
				) : null}
				<ul>
					{comparison.case.representationLimitations.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
				<p className="limitation">
					{comparison.claimBoundary.statement} Reviewer-qualified:{" "}
					<strong>{comparison.claimBoundary.reviewerQualified ? "yes" : "no"}</strong>.
				</p>
			</section>
			<div className="arm-grid">
				{comparison.arms.map((arm) => (
					<ArmEvidence arm={arm} key={arm.arm} />
				))}
			</div>
		</div>
	);
}

function ArmEvidence({ arm }: { readonly arm: ArmView }) {
	return (
		<section aria-label={`${arm.arm} evidence`} className="arm-card">
			<h3>{arm.arm === "baseline" ? "Baseline" : "Contract-guided"}</h3>
			<p>
				Status: <strong>{arm.status}</strong> · First loss: <code>{arm.firstLossStage}</code>
			</p>
			{arm.errorCode ? (
				<p>
					Error: <code>{arm.errorCode}</code>
				</p>
			) : null}
			<ol aria-label={`${arm.arm} stage status`} className="stage-list">
				{deriveLifecycleStages(arm).map((stage) => (
					<li key={stage.id}>
						<span>{stage.label}</span>
						<strong>{stage.state}</strong>
					</li>
				))}
			</ol>
			<dl className="configuration-grid">
				<div>
					<dt>Planner</dt>
					<dd>
						{arm.configuration.provider}/{arm.configuration.model}
					</dd>
				</div>
				<div>
					<dt>Prompt / planner</dt>
					<dd>
						{arm.configuration.promptVersion} / {arm.configuration.plannerVersion}
					</dd>
				</div>
				<div>
					<dt>Budget</dt>
					<dd>
						{arm.configuration.budget.maxTurns} turns · {arm.configuration.budget.maxOutputTokens}{" "}
						tokens · {arm.configuration.budget.maxNodes} nodes ·{" "}
						{arm.configuration.budget.timeoutMs} ms
					</dd>
				</div>
				<div>
					<dt>Shared / condition hash</dt>
					<dd>
						{arm.configuration.sharedConfigurationHash.slice(0, 12)} /{" "}
						{arm.configuration.conditionHash.slice(0, 12)}
					</dd>
				</div>
				<div>
					<dt>Intervention</dt>
					<dd>
						{arm.intervention.id}@{arm.intervention.version}
					</dd>
				</div>
			</dl>
			<h4>Candidate graph</h4>
			{arm.candidateNodes.length > 0 ? (
				<ul>
					{arm.candidateNodes.map((node) => (
						<li key={node.id}>
							<code>{node.toolName}</code> {JSON.stringify(node.input)} · constraints:{" "}
							{node.constraintIds.join(", ") || "none"}
						</li>
					))}
				</ul>
			) : (
				<p>No structurally valid candidate.</p>
			)}
			{arm.validationIssues.length > 0 ? (
				<ul aria-label={`${arm.arm} validation issues`}>
					{arm.validationIssues.map(({ code, path }) => (
						<li key={`${code}-${path}`}>
							{code} at <code>{path}</code>
						</li>
					))}
				</ul>
			) : (
				<p>Validation: accepted or not reached.</p>
			)}
			<h4>Recorded operations</h4>
			<p>Operations: {arm.operations.length}</p>
			{arm.operations.length > 0 ? (
				<ul aria-label={`${arm.arm} operations`}>
					{keyedOperations(arm.operations).map(({ operation, key }) => (
						<li key={key}>
							<code>{operation.toolName}</code> → {operation.effect}{" "}
							{JSON.stringify(operation.input)}
						</li>
					))}
				</ul>
			) : null}
			<h4>Ordered lifecycle facts</h4>
			<ol aria-label={`${arm.arm} lifecycle`}>
				{keyedLifecycle(arm.lifecycle).map(({ event, key }) => (
					<li key={key}>{event}</li>
				))}
			</ol>
			<h4>Deterministic measures</h4>
			<dl className="measure-list">
				{arm.measures.map((measure) => (
					<div key={measure.id}>
						<dt>{measure.label}</dt>
						<dd>
							{measure.definition} Direction: {measure.direction.replaceAll("_", " ")}. Result:{" "}
							{measure.numerator}/{measure.denominator}
							{measure.value === undefined
								? " (not defined)"
								: ` = ${(measure.value * 100).toFixed(0)}%`}
						</dd>
					</div>
				))}
			</dl>
		</section>
	);
}

function keyedLifecycle(events: readonly string[]): readonly { event: string; key: string }[] {
	const occurrences = new Map<string, number>();
	return events.map((event) => {
		const occurrence = (occurrences.get(event) ?? 0) + 1;
		occurrences.set(event, occurrence);
		return { event, key: `${event}-${occurrence}` };
	});
}

function keyedOperations(
	operations: ArmView["operations"],
): readonly { operation: ArmView["operations"][number]; key: string }[] {
	const occurrences = new Map<string, number>();
	return operations.map((operation) => {
		const identity = `${operation.toolName}-${operation.effect}-${JSON.stringify(operation.input)}`;
		const occurrence = (occurrences.get(identity) ?? 0) + 1;
		occurrences.set(identity, occurrence);
		return { operation, key: `${identity}-${occurrence}` };
	});
}
