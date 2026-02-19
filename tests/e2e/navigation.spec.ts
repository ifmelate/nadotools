import { test, expect } from "@playwright/test";

test("landing page loads with correct title", async ({ page }) => {
  await page.goto("/en/");
  await expect(page).toHaveTitle(/NadoTools/);
});

test("navigation links work", async ({ page }) => {
  await page.goto("/en/");
  await page.click('a[href="/en/convert/"]');
  await expect(page.locator("h1")).toContainText("Convert");
});

test("conversion page loads", async ({ page }) => {
  await page.goto("/en/convert/mp4-to-mp3/");
  await expect(page.locator("h1")).toContainText("MP4");
});

test("PDF tool page loads", async ({ page }) => {
  await page.goto("/en/pdf/merge/");
  await expect(page.locator("h1")).toContainText("Merge");
});

test("image tool page loads", async ({ page }) => {
  await page.goto("/en/image/resize/");
  await expect(page.locator("h1")).toContainText("Resize");
});

test("all locales load correctly", async ({ page }) => {
  const locales = ["en", "es", "de", "fr", "pt", "zh", "ja", "ru"];
  for (const locale of locales) {
    await page.goto(`/${locale}/`);
    await expect(page.locator("h1")).toBeVisible();
  }
});

test("landing page has navigation header with brand", async ({ page }) => {
  await page.goto("/en/");
  await expect(page.locator("header").getByText("NadoTools")).toBeVisible();
  await expect(page.locator("header").getByText("Convert")).toBeVisible();
  await expect(page.locator("header").getByText("PDF")).toBeVisible();
  await expect(page.locator("header").getByText("Image")).toBeVisible();
});

test("404 page for non-existent route", async ({ page }) => {
  const response = await page.goto("/en/nonexistent/");
  expect(response?.status()).toBe(404);
});
