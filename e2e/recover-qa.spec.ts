import { mkdirSync } from "node:fs";
import path from "node:path";
import { test, expect, type Page } from "@playwright/test";
import { reportFailedCase } from "../scripts/qa-checks";
import {
  QA_REGISTRY_KEY,
  QA_SAMPLE_REGISTRY_RECORD,
  toCloudPassportRow,
} from "../scripts/test-passport-data";

const SCREENSHOT_DIR = path.join(process.cwd(), "qa-screenshots");
const QA_OWNER_EMAIL = QA_SAMPLE_REGISTRY_RECORD.ownerEmail;

mkdirSync(SCREENSHOT_DIR, { recursive: true });

async function mockCloudRecover(page: Page) {
  const cloudRow = toCloudPassportRow(QA_SAMPLE_REGISTRY_RECORD);

  await page.route("**/rest/v1/petluma_passports**", async (route) => {
    const request = route.request();

    if (request.method() === "GET") {
      const url = request.url();

      if (
        url.includes("owner_email=eq.qa%40petluma.test") ||
        url.includes("owner_email=eq.qa@petluma.test")
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([cloudRow]),
        });
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: "[]",
      });
      return;
    }

    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ message: "Cloud unavailable in QA" }),
    });
  });
}

async function injectRegistry(page: Page) {
  await page.addInitScript(
    ({ key, record }) => {
      localStorage.setItem(key, JSON.stringify({ records: [record] }));
    },
    { key: QA_REGISTRY_KEY, record: QA_SAMPLE_REGISTRY_RECORD },
  );
}

function checkRecoverOverflow(page: Page) {
  return page.evaluate(() => {
    const overflow =
      document.documentElement.scrollWidth - window.innerWidth > 8;
    return { overflow };
  });
}

test("recover passports — desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await mockCloudRecover(page);
  await injectRegistry(page);

  await page.goto("/recover", { waitUntil: "networkidle" });

  await expect(page.getByRole("heading", { name: "Recover Passport" })).toBeVisible();
  await page.getByLabel("Owner Email").fill(QA_OWNER_EMAIL);
  await page.getByRole("button", { name: "Recover Passports" }).click();

  await expect(
    page.getByText(QA_SAMPLE_REGISTRY_RECORD.petName, { exact: true }),
  ).toBeVisible();
  await expect(page.getByText(QA_SAMPLE_REGISTRY_RECORD.passportNo)).toBeVisible();
  await expect(page.getByRole("button", { name: "View Passport" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Verify Passport" })).toBeVisible();

  const overflow = await checkRecoverOverflow(page);
  if (overflow.overflow) {
    reportFailedCase("recover-desktop", ["Layout overflow on recover page"]);
  }

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "recover-desktop.png"),
    fullPage: true,
  });

  expect(overflow.overflow).toBe(false);
});

test("recover passports — mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockCloudRecover(page);
  await injectRegistry(page);

  await page.goto("/recover", { waitUntil: "networkidle" });
  await page.getByLabel("Owner Email").fill(QA_OWNER_EMAIL);
  await page.getByRole("button", { name: "Recover Passports" }).click();

  await expect(page.getByText(QA_SAMPLE_REGISTRY_RECORD.companionId)).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy Verify Link" })).toBeVisible();

  const overflow = await checkRecoverOverflow(page);
  if (overflow.overflow) {
    reportFailedCase("recover-mobile", ["Layout overflow on mobile recover page"]);
  }

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "recover-mobile.png"),
    fullPage: true,
  });

  expect(overflow.overflow).toBe(false);
});

test("recover passports — empty result", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockCloudRecover(page);
  await page.addInitScript((key) => {
    localStorage.removeItem(key);
  }, QA_REGISTRY_KEY);

  await page.goto("/recover", { waitUntil: "networkidle" });
  await page.getByLabel("Owner Email").fill("missing@petluma.test");
  await page.getByRole("button", { name: "Recover Passports" }).click();

  await expect(
    page.getByText("No passports were found for this owner email"),
  ).toBeVisible();
});
