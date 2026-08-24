"use client";

import { useState } from "react";

import { shorelineContract, shorelineGraph } from "../lib/shoreline";
import type { TaskmasterRun } from "../lib/taskmaster";

export function RunDemo() {
	const [run, setRun] = useState<TaskmasterRun>();
	const [isRunning, setIsRunning] = useState(false);

	const startRun = async () => {
		setIsRunning(true);
		try {
			const response = await fetch("/api/taskmaster", { method: "POST" });
			setRun((await response.json()) as TaskmasterRun);
		} finally {
			setIsRunning(false);
		}
	};

	return (
		<section aria-labelledby="demo-heading" className="demo-panel">
			<div className="section-heading">
				<div>
					<p className="eyebrow">Deterministic vertical slice</p>
					<h2 id="demo-heading">Room 204 recovery request</h2>
				</div>
				<button disabled={isRunning} onClick={startRun} type="button">
					{isRunning ? "Running…" : "Run fixed request"}
				</button>
			</div>
			<p>“The hot water in room 204 is not working. Please send two extra towels as well.”</p>
			<div className="run-grid">
				<section aria-label="Validated task graph">
					<h3>Validated task graph</h3>
					<ul>
						{shorelineGraph.nodes.map((node) => (
							<li key={node.id}>
								<code>{node.toolName}</code> for room 204
							</li>
						))}
					</ul>
					<p>Constraints: {shorelineContract.requiredConstraintIds.join(", ")}</p>
				</section>
				<section aria-live="polite" aria-label="Run outcome">
					<h3>Run outcome</h3>
					{run ? <RunOutcome run={run} /> : <p>Run the fixed request to inspect evidence.</p>}
				</section>
			</div>
		</section>
	);
}

function RunOutcome({ run }: { readonly run: TaskmasterRun }) {
	return (
		<>
			<p>
				Status: <strong>{run.status}</strong> · Planner: <code>{run.planner.framework}</code>
			</p>
			{run.run ? (
				<ul>
					{run.run.nodeResults.map((result) => (
						<li key={result.nodeId}>
							{result.nodeId}: <strong>{result.status}</strong>
						</li>
					))}
				</ul>
			) : (
				<p>Error: {run.errorCode}</p>
			)}
			<p>Operations recorded: {run.operationCount}</p>
			<ol aria-label="Ordered run events">
				{run.lifecycle.map((event) => (
					<li key={event}>{event}</li>
				))}
			</ol>
		</>
	);
}
