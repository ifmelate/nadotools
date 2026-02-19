import { describe, it, expect } from "vitest";
import { conversions, getConversion, getAllConversionSlugs, getConversionsByType } from "@/config/conversions";
import { pdfTools, getPdfTool, getAllPdfToolIds } from "@/config/pdf-tools";
import { imageTools, getImageTool, getAllImageToolIds } from "@/config/image-tools";

const LOCALES = ["en", "es", "de", "fr", "pt", "zh", "ja", "ru"] as const;

describe("conversions registry", () => {
  it("should contain mp4-to-mp3", () => {
    const conv = getConversion("mp4-to-mp3");
    expect(conv).toBeDefined();
    expect(conv!.from.format).toBe("mp4");
    expect(conv!.to.format).toBe("mp3");
    expect(conv!.engine).toBe("ffmpeg");
  });

  it("should have SEO data for all 8 locales", () => {
    const conv = getConversion("mp4-to-mp3");
    LOCALES.forEach((locale) => {
      expect(conv!.seo[locale]).toBeDefined();
      expect(conv!.seo[locale].title).toBeTruthy();
      expect(conv!.seo[locale].description).toBeTruthy();
      expect(conv!.seo[locale].h1).toBeTruthy();
      expect(conv!.seo[locale].howItWorks.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("should have at least 18 conversions", () => {
    expect(Object.keys(conversions).length).toBeGreaterThanOrEqual(18);
  });

  it("should return all slugs", () => {
    const slugs = getAllConversionSlugs();
    expect(slugs.length).toBeGreaterThanOrEqual(18);
    expect(slugs).toContain("mp4-to-mp3");
    expect(slugs).toContain("heic-to-jpg");
    expect(slugs).toContain("pdf-to-word");
  });

  it("should filter by type", () => {
    const videoConversions = getConversionsByType("video");
    expect(videoConversions.length).toBeGreaterThanOrEqual(5);

    const audioConversions = getConversionsByType("audio");
    expect(audioConversions.length).toBeGreaterThanOrEqual(5);

    const imageConversions = getConversionsByType("image");
    expect(imageConversions.length).toBeGreaterThanOrEqual(5);

    const documentConversions = getConversionsByType("document");
    expect(documentConversions.length).toBeGreaterThanOrEqual(3);
  });

  it("should return undefined for non-existent slug", () => {
    expect(getConversion("nonexistent")).toBeUndefined();
  });

  it("every conversion should have SEO for all 8 locales", () => {
    for (const [slug, config] of Object.entries(conversions)) {
      LOCALES.forEach((locale) => {
        expect(config.seo[locale], `${slug} missing SEO for ${locale}`).toBeDefined();
        expect(config.seo[locale].title, `${slug} missing title for ${locale}`).toBeTruthy();
      });
    }
  });
});

describe("pdf tools registry", () => {
  it("should contain merge", () => {
    expect(getPdfTool("merge")).toBeDefined();
  });

  it("should have at least 5 tools", () => {
    expect(Object.keys(pdfTools).length).toBeGreaterThanOrEqual(5);
  });

  it("should return all tool IDs", () => {
    const ids = getAllPdfToolIds();
    expect(ids.length).toBeGreaterThanOrEqual(5);
    expect(ids).toContain("merge");
    expect(ids).toContain("split");
    expect(ids).toContain("compress");
    expect(ids).toContain("to-image");
    expect(ids).toContain("extract-text");
  });

  it("every PDF tool should have SEO for all 8 locales", () => {
    for (const [id, config] of Object.entries(pdfTools)) {
      LOCALES.forEach((locale) => {
        expect(config.seo[locale], `${id} missing SEO for ${locale}`).toBeDefined();
        expect(config.seo[locale].title, `${id} missing title for ${locale}`).toBeTruthy();
      });
    }
  });

  it("should return undefined for non-existent tool", () => {
    expect(getPdfTool("nonexistent")).toBeUndefined();
  });
});

describe("image tools registry", () => {
  it("should contain remove-bg", () => {
    expect(getImageTool("remove-bg")).toBeDefined();
  });

  it("should have at least 4 tools", () => {
    expect(Object.keys(imageTools).length).toBeGreaterThanOrEqual(4);
  });

  it("should return all tool IDs", () => {
    const ids = getAllImageToolIds();
    expect(ids.length).toBeGreaterThanOrEqual(4);
    expect(ids).toContain("remove-bg");
    expect(ids).toContain("resize");
    expect(ids).toContain("compress");
    expect(ids).toContain("strip-metadata");
  });

  it("remove-bg should have maxFileSize of 50MB", () => {
    const removeBg = getImageTool("remove-bg");
    expect(removeBg!.maxFileSize).toBe(50 * 1024 * 1024);
  });

  it("every image tool should have SEO for all 8 locales", () => {
    for (const [id, config] of Object.entries(imageTools)) {
      LOCALES.forEach((locale) => {
        expect(config.seo[locale], `${id} missing SEO for ${locale}`).toBeDefined();
        expect(config.seo[locale].title, `${id} missing title for ${locale}`).toBeTruthy();
      });
    }
  });

  it("should return undefined for non-existent tool", () => {
    expect(getImageTool("nonexistent")).toBeUndefined();
  });
});
