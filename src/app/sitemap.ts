import type { MetadataRoute } from "next";
import { buildSiteUrl } from "@/lib/site-url";

const PUBLIC_ROUTES = [
  { path: "/", changeFrequency: "daily" as const, priority: 1 },
  { path: "/passport", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/hall", changeFrequency: "daily" as const, priority: 0.9 },
  { path: "/recover", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/founding", changeFrequency: "monthly" as const, priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/contact", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PUBLIC_ROUTES.map((route) => ({
    url: buildSiteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
