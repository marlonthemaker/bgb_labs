import { defineConfig } from "@playwright/test";

const plannerMode = process.env.HSD_REAL_GEMINI_SMOKE === "1" ? "gemini" : "deterministic";

export default defineConfig({
	testDir: "./hotel_shoreline/e2e",
	fullyParallel: true,
	reporter: "list",
	use: {
		baseURL: "http://127.0.0.1:3000",
		trace: "retain-on-failure",
	},
	webServer: {
		command: `HSD_PLANNER_MODE=${plannerMode} pnpm --filter @bomgoodbueno/hotel-shoreline exec next dev --hostname 127.0.0.1 --port 3000`,
		url: "http://127.0.0.1:3000",
		reuseExistingServer: false,
	},
});
