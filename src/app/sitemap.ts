import type { MetadataRoute } from "next";
import { getAllConversionSlugs } from "@/config/conversions";
import { getAllPdfToolIds } from "@/config/pdf-tools";
import { getAllImageToolIds } from "@/config/image-tools";
import { BASE_URL, LOCALES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of LOCALES) {
    urls.push({
      url: `${BASE_URL}/${locale}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    });

    urls.push({
      url: `${BASE_URL}/${locale}/convert/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const slug of getAllConversionSlugs()) {
      urls.push({
        url: `${BASE_URL}/${locale}/convert/${slug}/`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    urls.push({
      url: `${BASE_URL}/${locale}/pdf/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const id of getAllPdfToolIds()) {
      urls.push({
        url: `${BASE_URL}/${locale}/pdf/${id}/`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    urls.push({
      url: `${BASE_URL}/${locale}/image/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });

    for (const id of getAllImageToolIds()) {
      urls.push({
        url: `${BASE_URL}/${locale}/image/${id}/`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return urls;
}
