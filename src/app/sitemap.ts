import type { MetadataRoute } from "next";
import { work, projectHref } from "@/data/work";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/about",
    "/projects",
    "/work",
    "/contact",
    ...work.map(projectHref),
  ].map((path) => ({
    url: `https://rohitmahar.vercel.app${path}`,
    changeFrequency: "monthly",
    priority: path ? 0.7 : 1,
  }));
}
