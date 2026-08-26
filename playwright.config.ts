import { defineConfig } from "@playwright/test";

const plannerMode = process.env.HSD_REAL_GEMINI_SMOKE === "1" ? "gemini" : "deterministic";
const requestedPort = Number(process.env.HSD_E2E_PORT ?? "3000");
if (!Number.isInteger(requestedPort) || requestedPort < 1_024 || requestedPort > 65_535) {
	throw new Error("HSD_E2E_PORT must be an integer between 1024 and 65535.");
}
const baseURL = `http://127.0.0.1:${requestedPort}`;

export default defineConfig({
	testDir: "./hotel_shoreline/e2e",
	fullyParallel: true,
	reporter: "list",
	use: {
		baseURL,
		trace: "retain-on-failure",
	},
	webServer: {
		command: `HSD_PLANNER_MODE=${plannerMode} pnpm --filter @bomgoodbueno/hotel-shoreline exec next dev --hostname 127.0.0.1 --port ${requestedPort}`,
		url: baseURL,
		reuseExistingServer: false,
	},
});
