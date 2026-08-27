import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["src/**/*.test.ts"],
		coverage: {
			provider: "v8",
			include: [
				"src/lib/gemini-error.ts",
				"src/lib/http-input.ts",
				"src/lib/shoreline.ts",
				"src/lib/taskmaster.ts",
				"src/lib/taskmaster-telemetry.ts",
				"src/lib/taskmaster-view.ts",
				"src/lib/native-adoption/cases.ts",
				"src/lib/native-adoption/conditions.ts",
				"src/lib/native-adoption/evaluation.ts",
				"src/lib/native-adoption/interventions.ts",
				"src/lib/native-adoption/orchestrator.ts",
				"src/lib/native-adoption/scenario.ts",
				"src/lib/native-adoption/telemetry.ts",
				"src/lib/native-adoption/view.ts",
			],
			thresholds: {
				branches: 80,
				functions: 90,
				lines: 90,
				statements: 90,
			},
		},
	},
});
