import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["src/**/*.test.ts"],
		coverage: {
			provider: "v8",
			include: [
				"src/lib/shoreline.ts",
				"src/lib/taskmaster.ts",
				"src/lib/taskmaster-telemetry.ts",
				"src/lib/taskmaster-view.ts",
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
