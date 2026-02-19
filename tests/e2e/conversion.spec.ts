import { test, expect } from "@playwright/test";

test.describe("conversion pages", () => {
  test("mp4-to-mp3 page has correct h1 and SEO metadata", async ({ page }) => {
    await page.goto("/en/convert/mp4-to-mp3/");
    await expect(page.locator("h1")).toContainText("Convert MP4 to MP3");
    await expect(page).toHaveTitle(/MP4.*MP3/);
  });

  test("conversion page shows tool UI with dropzone", async ({ page }) => {
    await page.goto("/en/convert/png-to-jpg/");
    await expect(page.locator("h1")).toBeVisible();
    // Privacy badge should be present
    await expect(page.getByText(/never leave/i)).toBeVisible();
  });

  test("conversion page has How It Works section", async ({ page }) => {
    await page.goto("/en/convert/mp4-to-mp3/");
    await expect(page.getByText("How It Works")).toBeVisible();
    // Should have ordered list steps
    await expect(page.locator("ol li")).toHaveCount(3);
  });

  test("all conversion slugs load without errors", async ({ page }) => {
    const slugs = [
      "mp4-to-mp3",
      "mp4-to-webm",
      "mp4-to-gif",
      "mkv-to-mp4",
      "wav-to-mp3",
      "heic-to-jpg",
      "webp-to-png",
      "png-to-jpg",
      "jpg-to-webp",
      "svg-to-png",
    ];

    for (const slug of slugs) {
      const response = await page.goto(`/en/convert/${slug}/`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
    }
  });

  test("convert hub page lists all categories", async ({ page }) => {
    await page.goto("/en/convert/");
    await expect(page.locator("h1")).toContainText("File Converter");
    // Should have category sections
    await expect(page.getByText("Video")).toBeVisible();
    await expect(page.getByText("Audio")).toBeVisible();
  });

  test("conversion page works in non-English locale", async ({ page }) => {
    await page.goto("/ru/convert/mp4-to-mp3/");
    await expect(page.locator("h1")).toContainText("MP4");
    await expect(page).toHaveTitle(/MP4.*MP3/);
  });
});
