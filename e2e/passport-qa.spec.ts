import { mkdirSync } from "node:fs";
import path from "node:path";
import { test, expect, type Page } from "@playwright/test";
import {
  PASSPORT_SVG_SELECTOR,
  PREVIEW_SELECTOR,
  reportFailedCase,
  runDomChecks,
  testSvgExport,
} from "../scripts/qa-checks";
import {
  QA_STORAGE_KEY,
  QA_TEST_CASES,
  type QaTestCase,
} from "../scripts/test-passport-data";

const SCREENSHOT_DIR = path.join(process.cwd(), "qa-screenshots");

mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function injectStoragePayload(page: Page, payload: Record<string, unknown>) {
  await page.addInitScript(
    ({ key, data }) => {
      localStorage.setItem(key, JSON.stringify(data));
      (window as Window & { __qaXssTriggered?: boolean }).__qaXssTriggered = false;
      window.alert = () => {
        (window as Window & { __qaXssTriggered?: boolean }).__qaXssTriggered = true;
      };
    },
    { key: QA_STORAGE_KEY, data: payload },
  );
}

async function fillPassportForm(page: Page, payload: Record<string, unknown>) {
  const read = (key: string) =>
    typeof payload[key] === "string" ? (payload[key] as string) : "";

  await page.getByLabel("Pet Name").fill(read("name") || "Luma");
  await page.getByLabel("Species").selectOption(read("species") || "Dog");
  await page.getByLabel("Breed").fill(read("breed"));
  await page.getByLabel("Gender").selectOption(read("gender") || "Female");

  const birthdate = read("birthdate");
  if (birthdate) {
    await page.locator('input[type="date"]').fill(birthdate);
  }

  await page.getByLabel("Country").selectOption(read("countryCode") || "AU");
}

async function runCase(page: Page, testCase: QaTestCase) {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  let collectDiagnostics = false;

  page.on("console", (message) => {
    if (!collectDiagnostics || message.type() !== "error") {
      return;
    }
    consoleErrors.push(message.text());
  });

  page.on("pageerror", (error) => {
    if (!collectDiagnostics) {
      return;
    }
    pageErrors.push(error.message);
  });

  await page.setViewportSize({
    width: testCase.width,
    height: testCase.height,
  });

  if (testCase.method === "storage") {
    await injectStoragePayload(page, testCase.payload);
    await page.goto(testCase.route, { waitUntil: "networkidle" });
  } else {
    await page.goto(testCase.route, { waitUntil: "networkidle" });
    await fillPassportForm(page, testCase.payload);
  }

  if (testCase.route === "/result") {
    await page.locator(PASSPORT_SVG_SELECTOR).waitFor({ state: "visible", timeout: 15000 });
    await page.waitForTimeout(800);
  } else {
    await page.locator(PREVIEW_SELECTOR).waitFor({ state: "visible", timeout: 15000 });
    await page.waitForTimeout(300);
  }

  collectDiagnostics = true;

  const screenshotPath = path.join(SCREENSHOT_DIR, testCase.screenshot);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  const domResult = await page.evaluate(runDomChecks, {
    passportSelector: PASSPORT_SVG_SELECTOR,
    previewSelector: PREVIEW_SELECTOR,
    expectPhoto: testCase.expectPhoto,
    isResultPage: testCase.route === "/result",
  });

  const failures = [...domResult.failures];

  if (testCase.testExport) {
    const exportResult = await page.evaluate(testSvgExport, PASSPORT_SVG_SELECTOR);
    if (exportResult.exportFailed) {
      failures.push(exportResult.failure ?? "Export failed");
    }
  }

  const relevantConsoleErrors = [...consoleErrors, ...pageErrors].filter(
    (message) =>
      !message.includes("favicon") &&
      !message.includes("404") &&
      !message.includes("Failed to load resource") &&
      !message.includes("React error #418"),
  );

  if (relevantConsoleErrors.length > 0) {
    failures.push(`Console error: ${relevantConsoleErrors[0]}`);
  }

  if (failures.length > 0) {
    reportFailedCase(testCase.id, failures);
  }

  expect(
    failures,
    failures.length > 0 ? failures.join("; ") : undefined,
  ).toEqual([]);
}

for (const testCase of QA_TEST_CASES) {
  test(`${testCase.id} — ${testCase.label}`, async ({ page }) => {
    await runCase(page, testCase);
  });
}
