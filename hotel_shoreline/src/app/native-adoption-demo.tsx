"use client";

import { useState } from "react";

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
	const [isRunning, setIsRunning] = useState(false);
	const [requestError, setRequestError] = useState<string>();
	const runComparison = async () => {
		setIsRunning(true);
		setComparison(undefined);
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
		} catch {
			setRequestError("Comparison evidence is unavailable. No outcome is being claimed.");
		} finally {
			setIsRunning(false);
		}
	};
	return (
		<section aria-labelledby="native-adoption-heading" className="demo-panel comparison-panel">
			<div className="section-heading">
				<div>
					<p className="eyebrow">HSD-005 controlled comparison</p>
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
			{comparison ? (
				<ComparisonEvidence comparison={comparison} />
			) : (
				<p aria-live="polite">
					{requestError ?? "Choose a case and locale, then run both matched arms."}
				</p>
			)}
		</section>
	);
}

function ComparisonEvidence({ comparison }: { readonly comparison: ComparisonView }) {
	return (
		<div className="comparison-evidence">
			<section aria-label="Comparison source and eligibility">
				<h3>{comparison.case.title}</h3>
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
			<p>
				Planner:{" "}
				<code>
					{arm.configuration.provider}/{arm.configuration.model}
				</code>
			</p>
			<p>
				Intervention:{" "}
				<code>
					{arm.intervention.id}@{arm.intervention.version}
				</code>
			</p>
			<p>
				Shared configuration: <code>{arm.configuration.sharedConfigurationHash.slice(0, 12)}</code>
			</p>
			<h4>Candidate graph</h4>
			{arm.candidateNodes.length > 0 ? (
				<ul>
					{arm.candidateNodes.map((node) => (
						<li key={node.id}>
							<code>{node.toolName}</code> {JSON.stringify(node.input)}
						</li>
					))}
				</ul>
			) : (
				<p>No structurally valid candidate.</p>
			)}
			{arm.validationIssues.length > 0 ? (
				<p>Validation: {arm.validationIssues.map(({ code }) => code).join(", ")}</p>
			) : (
				<p>Validation: accepted or not reached.</p>
			)}
			<p>Operations: {arm.operations.length}</p>
			<h4>Lifecycle</h4>
			<ol aria-label={`${arm.arm} lifecycle`}>
				{keyedLifecycle(arm.lifecycle).map(({ event, key }) => (
					<li key={key}>{event}</li>
				))}
			</ol>
			<h4>Deterministic measures</h4>
			<dl>
				{arm.measures.map((measure) => (
					<div key={measure.id}>
						<dt>{measure.label}</dt>
						<dd>
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
