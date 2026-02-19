import { test, expect } from "@playwright/test";

test.describe("PDF tool pages", () => {
  test("merge page has correct h1 and metadata", async ({ page }) => {
    await page.goto("/en/pdf/merge/");
    await expect(page.locator("h1")).toContainText("Merge PDF");
    await expect(page).toHaveTitle(/Merge PDF/);
  });

  test("split page loads correctly", async ({ page }) => {
    await page.goto("/en/pdf/split/");
    await expect(page.locator("h1")).toContainText("Split PDF");
  });

  test("compress page loads correctly", async ({ page }) => {
    await page.goto("/en/pdf/compress/");
    await expect(page.locator("h1")).toContainText("Compress PDF");
  });

  test("pdf-to-image page loads correctly", async ({ page }) => {
    await page.goto("/en/pdf/to-image/");
    await expect(page.locator("h1")).toContainText("PDF to Image");
  });

  test("extract-text page loads correctly", async ({ page }) => {
    await page.goto("/en/pdf/extract-text/");
    await expect(page.locator("h1")).toContainText("Extract Text");
  });

  test("PDF tool page shows How It Works section", async ({ page }) => {
    await page.goto("/en/pdf/merge/");
    await expect(page.getByText("How It Works")).toBeVisible();
  });

  test("PDF hub page lists all tools", async ({ page }) => {
    await page.goto("/en/pdf/");
    await expect(page.locator("h1")).toBeVisible();
    // Should have links to individual tools
    const links = page.locator('a[href*="/pdf/"]');
    await expect(links.first()).toBeVisible();
  });

  test("PDF pages work in non-English locale", async ({ page }) => {
    await page.goto("/ru/pdf/merge/");
    await expect(page.locator("h1")).toContainText("PDF");
  });
});
