import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getPostSlugs } from "@/lib/content";

const SITE_URL = "https://plasticluv.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getPostSlugs("en");
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const lang of locales) {
    entries.push({
      url: `${SITE_URL}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}`])),
      },
    });
  }

  // About pages
  for (const lang of locales) {
    entries.push({
      url: `${SITE_URL}/${lang}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/about`])),
      },
    });
  }

  // Blog posts
  for (const slug of slugs) {
    for (const lang of locales) {
      entries.push({
        url: `${SITE_URL}/${lang}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}/blog/${slug}`])),
        },
      });
    }
  }

  return entries;
}
