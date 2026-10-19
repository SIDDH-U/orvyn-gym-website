import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.domain}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteConfig.domain}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  if (siteConfig.sections.showMemberships) {
    routes.push({
      url: `${siteConfig.domain}/memberships`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  return routes;
}
