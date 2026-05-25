import { mkdirSync } from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";
import { reportFailedCase } from "../scripts/qa-checks";
import {
  QA_INVALID_PASSPORT_NO,
  QA_REGISTRY_KEY,
  QA_SAMPLE_REGISTRY_RECORD,
  QA_VALID_PASSPORT_NO,
} from "../scripts/test-passport-data";

const SCREENSHOT_DIR = path.join(process.cwd(), "qa-screenshots");

mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function injectRegistry(page: import("@playwright/test").Page) {
  await page.addInitScript(
    ({ key, record }) => {
      localStorage.setItem(key, JSON.stringify({ records: [record] }));
    },
    { key: QA_REGISTRY_KEY, record: QA_SAMPLE_REGISTRY_RECORD },
  );
}

function checkVerifyOverflow(page: import("@playwright/test").Page) {
  return page.evaluate(() => {
    const overflow =
      document.documentElement.scrollWidth - window.innerWidth > 8;
    return { overflow };
  });
}

test("verify valid passport — desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await injectRegistry(page);
  await page.goto(`/verify/${QA_VALID_PASSPORT_NO}`, {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("Verified in PetLuma Registry")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Verified Passport" })).toBeVisible();
  await expect(page.getByText(QA_VALID_PASSPORT_NO)).toBeVisible();
  await expect(page.getByText(QA_SAMPLE_REGISTRY_RECORD.companionId)).toBeVisible();

  const overflow = await checkVerifyOverflow(page);
  if (overflow.overflow) {
    reportFailedCase("verify-valid", ["Layout overflow on verify page"]);
  }

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "verify-valid-desktop.png"),
    fullPage: true,
  });

  expect(overflow.overflow).toBe(false);
});

test("verify invalid passport — desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(`/verify/${QA_INVALID_PASSPORT_NO}`, {
    waitUntil: "networkidle",
  });

  await expect(page.getByRole("heading", { name: "Passport Not Found" })).toBeVisible();
  await expect(
    page.getByText("This passport does not exist in the PetLuma Registry."),
  ).toBeVisible();

  const overflow = await checkVerifyOverflow(page);
  if (overflow.overflow) {
    reportFailedCase("verify-invalid", ["Layout overflow on verify page"]);
  }

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "verify-invalid-desktop.png"),
    fullPage: true,
  });

  expect(overflow.overflow).toBe(false);
});

test("verify valid passport — mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await injectRegistry(page);
  await page.goto(`/verify/${QA_VALID_PASSPORT_NO}`, {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("Verified in PetLuma Registry")).toBeVisible();
  await expect(page.getByText(QA_SAMPLE_REGISTRY_RECORD.petName, { exact: true })).toBeVisible();

  const overflow = await checkVerifyOverflow(page);
  if (overflow.overflow) {
    reportFailedCase("verify-mobile", ["Layout overflow on mobile verify page"]);
  }

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "verify-valid-mobile.png"),
    fullPage: true,
  });

  expect(overflow.overflow).toBe(false);
});
