import path from "node:path";
import { test, expect, type Page } from "@playwright/test";
import {
  PASSPORT_SVG_SELECTOR,
  testSvgExport,
} from "../scripts/qa-checks";

const FIXTURES_DIR = path.join(__dirname, "fixtures");
const LANDSCAPE_PHOTO = path.join(FIXTURES_DIR, "landscape.jpg");
const PORTRAIT_PHOTO = path.join(FIXTURES_DIR, "portrait.jpg");

async function uploadPhoto(page: Page, fixturePath: string) {
  await page.getByTestId("pet-photo-input").setInputFiles(fixturePath);
  await page.getByTestId("photo-crop-modal").waitFor({ state: "visible" });
}

async function fillMinimalPassportForm(page: Page) {
  await page.getByLabel("Owner email").fill("qa@petluma.test");
  await page.getByLabel("Pet Name").fill("Luma");
  await page.getByLabel("Species").selectOption("Dog");
  await page.getByLabel("Breed").fill("Golden Retriever");
  await page.getByLabel("Gender").selectOption("Female");
  await page.locator('input[type="date"]').fill("2020-06-15");
  await page.getByLabel("Country").selectOption("AU");
}

test.describe("Pet photo crop", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/create", { waitUntil: "networkidle" });
  });

  test("upload landscape photo opens crop modal", async ({ page }) => {
    await uploadPhoto(page, LANDSCAPE_PHOTO);
    await expect(page.getByTestId("photo-crop-confirm")).toBeVisible();
    await expect(page.getByTestId("photo-crop-cancel")).toBeVisible();
  });

  test("upload portrait photo opens crop modal", async ({ page }) => {
    await uploadPhoto(page, PORTRAIT_PHOTO);
    await expect(page.getByTestId("photo-crop-confirm")).toBeVisible();
  });

  test("crop confirm saves cropped preview photo", async ({ page }) => {
    await uploadPhoto(page, LANDSCAPE_PHOTO);
    await page.getByTestId("photo-crop-confirm").click();
    await expect(page.getByTestId("photo-crop-modal")).toHaveCount(0);

    const previewPhoto = page.getByTestId("passport-preview-photo");
    await expect(previewPhoto).toBeVisible();

    const src = await previewPhoto.getAttribute("src");
    expect(src).toMatch(/^data:image\/jpeg;base64,/);
  });

  test("crop cancel returns to upload state without photo", async ({ page }) => {
    await uploadPhoto(page, PORTRAIT_PHOTO);
    await page.getByTestId("photo-crop-cancel").click();
    await expect(page.getByTestId("photo-crop-modal")).toHaveCount(0);
    await expect(page.getByTestId("passport-preview-photo")).toHaveCount(0);
    await expect(page.getByText("Will appear here")).toBeVisible();
  });

  test("mobile crop modal fits viewport without horizontal scroll", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await uploadPhoto(page, LANDSCAPE_PHOTO);

    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth - window.innerWidth;
    });

    expect(overflow).toBeLessThanOrEqual(8);
    await expect(page.getByTestId("photo-crop-modal")).toBeVisible();
  });

  test("result passport photo not empty after crop and generate", async ({
    page,
  }) => {
    await uploadPhoto(page, LANDSCAPE_PHOTO);
    await page.getByTestId("photo-crop-confirm").click();
    await fillMinimalPassportForm(page);
    await page.getByRole("button", { name: /Issue Passport/i }).click();
    await page.waitForURL("**/result", { timeout: 20000 });

    const svg = page.locator(PASSPORT_SVG_SELECTOR);
    await expect(svg).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(800);

    const photoHref = await page.waitForFunction(
      (selector) => {
        const root = document.querySelector(selector);
        if (!root) {
          return null;
        }

        const portrait = root.querySelector("#passport-portrait-image");
        const href =
          portrait?.getAttribute("href") ??
          portrait?.getAttributeNS("http://www.w3.org/1999/xlink", "href");

        return href && href.startsWith("data:image/") ? href : null;
      },
      PASSPORT_SVG_SELECTOR,
      { timeout: 15000 },
    );

    expect(String(await photoHref.jsonValue())).toMatch(/^data:image\//);
  });

  test("download PNG includes cropped photo", async ({ page }) => {
    await uploadPhoto(page, PORTRAIT_PHOTO);
    await page.getByTestId("photo-crop-confirm").click();
    await fillMinimalPassportForm(page);
    await page.getByRole("button", { name: /Issue Passport/i }).click();
    await page.waitForURL("**/result", { timeout: 20000 });
    await page.locator(PASSPORT_SVG_SELECTOR).waitFor({ state: "visible" });
    await page.waitForTimeout(800);

    const exportResult = await page.evaluate(testSvgExport, PASSPORT_SVG_SELECTOR);
    expect(exportResult.exportFailed).toBe(false);
  });
});
