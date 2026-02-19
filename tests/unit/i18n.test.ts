import { describe, it, expect } from "vitest";
import { routing } from "@/i18n/routing";

describe("i18n routing", () => {
  it("should define all 8 locales", () => {
    expect(routing.locales).toEqual(["en", "es", "de", "fr", "pt", "zh", "ja", "ru"]);
  });

  it("should default to en", () => {
    expect(routing.defaultLocale).toBe("en");
  });
});
