import { execSync, spawnSync } from "node:child_process";
import { mkdirSync } from "node:fs";

mkdirSync("qa-screenshots", { recursive: true });

process.env.NEXT_PUBLIC_SUPABASE_URL = "http://127.0.0.1:54321";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "qa-test-anon-key";

console.log("[qa] Running production build...");
execSync("npm run build", { stdio: "inherit" });

console.log("[qa] Running Playwright passport QA...");
const result = spawnSync("npx", ["playwright", "test"], {
  stdio: "inherit",
  shell: true,
});

if (result.status !== 0) {
  console.error("[qa] One or more cases failed. See FAILED CASE output above.");
  process.exit(result.status ?? 1);
}

console.log("[qa] All cases passed. Screenshots saved to qa-screenshots/");
