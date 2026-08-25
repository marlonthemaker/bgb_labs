"use client";

import { useState } from "react";

import { parseRunView, type RunView } from "../lib/taskmaster-view";

export function RunDemo() {
	const [run, setRun] = useState<RunView>();
	const [requestError, setRequestError] = useState<string>();
	const [isRunning, setIsRunning] = useState(false);

	const startRun = async () => {
		setIsRunning(true);
		setRun(undefined);
		setRequestError(undefined);
		try {
			const response = await fetch("/api/taskmaster", { method: "POST" });
			const parsed = parseRunView(await response.json());
			if (!parsed) throw new Error("The run response did not match the public evidence contract.");
			setRun(parsed);
		} catch {
			setRequestError("Run evidence is unavailable. No completion is being claimed.");
		} finally {
			setIsRunning(false);
		}
	};

	return (
		<section aria-labelledby="demo-heading" className="demo-panel">
			<div className="section-heading">
				<div>
					<p className="eyebrow">Controlled Taskmaster workflow</p>
					<h2 id="demo-heading">Room 204 recovery request</h2>
				</div>
				<button disabled={isRunning} onClick={startRun} type="button">
					{isRunning ? "Running…" : "Run fixed request"}
				</button>
			</div>
			<p>“The hot water in room 204 is not working. Please send two extra towels as well.”</p>
			<div className="run-grid">
				<section aria-label="Planner candidate graph">
					<h3>Planner candidate graph</h3>
					{run?.candidateGraph ? (
						<>
							<ul>
								{run.candidateGraph.nodes.map((node) => (
									<li key={node.id}>
										<code>{node.toolName}</code> · {node.id}
									</li>
								))}
							</ul>
							<p>Preserved constraints: {run.candidateGraph.preservedConstraintIds.join(", ")}</p>
						</>
					) : (
						<p>
							{run
								? "Planning stopped before a structurally valid candidate was available."
								: "Run the fixed request to inspect the actual planner candidate."}
						</p>
					)}
				</section>
				<section aria-live="polite" aria-label="Run outcome">
					<h3>Run outcome</h3>
					{run ? (
						<RunOutcome run={run} />
					) : (
						<p>{requestError ?? "Run the fixed request to inspect evidence."}</p>
					)}
				</section>
			</div>
		</section>
	);
}

function RunOutcome({ run }: { readonly run: RunView }) {
	const terminalMessage =
		run.status === "succeeded"
			? "Completed with verified tool outcomes."
			: run.operationCount === 0
				? "Stopped safely before scenario operations."
				: "Stopped with an incomplete or failed operational outcome.";
	return (
		<>
			<p>
				Status: <strong>{run.status}</strong> · Planner: <code>{run.plannerFramework}</code>
			</p>
			<p>{terminalMessage}</p>
			<p>
				Model: <code>{run.plannerModel}</code>
			</p>
			{run.nodeResults.length > 0 ? (
				<ul>
					{run.nodeResults.map((result) => (
						<li key={result.nodeId}>
							{result.nodeId}: <strong>{result.status}</strong>
						</li>
					))}
				</ul>
			) : run.errorCode ? (
				<p>Error: {run.errorCode}</p>
			) : null}
			<p>Operations recorded: {run.operationCount}</p>
			<p>
				Planning budget: {run.budget.maxTurns} turn · {run.budget.maxOutputTokens} output tokens ·{" "}
				{run.budget.maxNodes} nodes · {run.budget.timeoutMs} ms
			</p>
			<ol aria-label="Ordered run events">
				{run.lifecycle.map((event) => (
					<li key={event}>{event}</li>
				))}
			</ol>
		</>
	);
}
