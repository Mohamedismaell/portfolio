import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mohamedismael.dev";

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects/news-app`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects/tasky`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects/book-reading`,
      lastModified: new Date(),
      priority: 0.9,
    },
  ];
}
