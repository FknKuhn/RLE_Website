import { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.sitePages.map((page) => ({
    url: new URL(page.href, siteConfig.url).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: page.href === "/" ? 1 : 0.7,
  }));
}
