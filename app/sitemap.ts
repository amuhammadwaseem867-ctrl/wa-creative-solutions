import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.wacreativesolution.com";

const routes = [
  "",
  "/work/ember-and-oaks",
  "/work/nova",
  "/work/mono",
  "/work/nexus",
  "/work/vanta",
  "/work/noorah",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `${siteUrl}${route}`,

    lastModified: new Date(),

    changeFrequency:
      index === 0
        ? "monthly"
        : "yearly",

    priority:
      index === 0
        ? 1
        : 0.8,
  }));
}