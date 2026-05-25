import { mkdirSync } from "node:fs";
import path from "node:path";
import { test, expect, type Page } from "@playwright/test";
import { reportFailedCase } from "../scripts/qa-checks";
import {
  QA_INVALID_PASSPORT_NO,
  QA_REGISTRY_KEY,
  QA_SAMPLE_REGISTRY_RECORD,
  QA_VALID_PASSPORT_NO,
  toCloudPassportRow,
} from "../scripts/test-passport-data";

const SCREENSHOT_DIR = path.join(process.cwd(), "qa-screenshots");

mkdirSync(SCREENSHOT_DIR, { recursive: true });

function mockCloudRegistrySuccess(page: Page) {
  const cloudRow = toCloudPassportRow(QA_SAMPLE_REGISTRY_RECORD);

  return page.route("**/rest/v1/petluma_passports**", async (route) => {
    const request = route.request();
    const method = request.method();
    const url = request.url();

    if (method === "GET") {
      if (url.includes(`passport_no=eq.${encodeURIComponent(QA_VALID_PASSPORT_NO)}`)) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(cloudRow),
        });
        return;
      }

      if (
        url.includes("owner_email=eq.qa%40petluma.test") ||
        url.includes("owner_email=eq.qa@petluma.test")
      ) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(cloudRow),
        });
        return;
      }

      if (url.includes("passport_no=ilike.") || url.includes("companion_id=ilike.")) {
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
        body: "null",
      });
      return;
    }

    if (method === "POST") {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(cloudRow),
      });
      return;
    }

    if (method === "PATCH") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(cloudRow),
      });
      return;
    }

    await route.continue();
  });
}

function mockCloudRegistryFailure(page: Page) {
  return page.route("**/rest/v1/petluma_passports**", async (route) => {
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ message: "Service unavailable" }),
    });
  });
}

async function clearRegistryStorage(page: Page) {
  await page.addInitScript((key) => {
    localStorage.removeItem(key);
  }, QA_REGISTRY_KEY);
}

async function injectLocalRegistry(page: Page) {
  await page.addInitScript(
    ({ key, record }) => {
      localStorage.setItem(key, JSON.stringify({ records: [record] }));
    },
    { key: QA_REGISTRY_KEY, record: QA_SAMPLE_REGISTRY_RECORD },
  );
}

test("verify cloud registry mock — desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await mockCloudRegistrySuccess(page);
  await clearRegistryStorage(page);

  await page.goto(`/verify/${QA_VALID_PASSPORT_NO}`, {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("Verified in PetLuma Registry")).toBeVisible();
  await expect(page.getByText(QA_VALID_PASSPORT_NO)).toBeVisible();

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "verify-cloud-mock-desktop.png"),
    fullPage: true,
  });
});

test("verify fallback localStorage when cloud fails", async ({ page }) => {
  test.setTimeout(20_000);
  await page.setViewportSize({ width: 1920, height: 1080 });
  await mockCloudRegistryFailure(page);
  await injectLocalRegistry(page);

  await page.goto(`/verify/${QA_VALID_PASSPORT_NO}`, {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("Verified in PetLuma Registry")).toBeVisible({
    timeout: 12_000,
  });
  await expect(
    page.getByText(QA_SAMPLE_REGISTRY_RECORD.petName, { exact: true }),
  ).toBeVisible();
});

test("verify invalid passport with cloud mock empty", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await mockCloudRegistrySuccess(page);
  await clearRegistryStorage(page);

  await page.goto(`/verify/${QA_INVALID_PASSPORT_NO}`, {
    waitUntil: "networkidle",
  });

  await expect(page.getByRole("heading", { name: "Passport Not Found" })).toBeVisible();

  const overflow = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - window.innerWidth > 8,
  }));

  if (overflow.overflow) {
    reportFailedCase("verify-cloud-invalid", ["Layout overflow on verify page"]);
  }

  expect(overflow.overflow).toBe(false);
});

test("verify cloud registry mock — mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockCloudRegistrySuccess(page);
  await clearRegistryStorage(page);

  await page.goto(`/verify/${QA_VALID_PASSPORT_NO}`, {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("Verified in PetLuma Registry")).toBeVisible();
  await expect(
    page.getByText(QA_SAMPLE_REGISTRY_RECORD.companionId),
  ).toBeVisible();

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "verify-cloud-mock-mobile.png"),
    fullPage: true,
  });
});
