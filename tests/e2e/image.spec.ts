import { test, expect } from "@playwright/test";

test.describe("image tool pages", () => {
  test("resize page loads correctly", async ({ page }) => {
    await page.goto("/en/image/resize/");
    await expect(page.locator("h1")).toContainText("Resize");
    await expect(page).toHaveTitle(/Resize/);
  });

  test("compress page loads correctly", async ({ page }) => {
    await page.goto("/en/image/compress/");
    await expect(page.locator("h1")).toContainText("Compress");
  });

  test("remove-bg page loads correctly", async ({ page }) => {
    await page.goto("/en/image/remove-bg/");
    await expect(page.locator("h1")).toContainText("Remove Image Background");
  });

  test("strip-metadata page loads correctly", async ({ page }) => {
    await page.goto("/en/image/strip-metadata/");
    await expect(page.locator("h1")).toContainText("Metadata");
  });

  test("image hub page lists all tools", async ({ page }) => {
    await page.goto("/en/image/");
    await expect(page.locator("h1")).toBeVisible();
    const links = page.locator('a[href*="/image/"]');
    await expect(links.first()).toBeVisible();
  });

  test("image pages work in non-English locale", async ({ page }) => {
    await page.goto("/ru/image/resize/");
    await expect(page.locator("h1")).toBeVisible();
  });
});
