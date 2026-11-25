import type { MetadataRoute } from "next";
import { experiences } from "@/content/experience";
import { projects } from "@/content/projects";
import { getBaseUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const now = new Date();
  const routes = [
    { path: "", priority: 1 },
    { path: "/experience", priority: 0.9 },
    { path: "/projects", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    ...experiences.map((e) => ({ path: `/experience/${e.slug}`, priority: 0.8 })),
    ...projects.map((p) => ({ path: `/projects/${p.slug}`, priority: 0.8 })),
  ];
  return routes.map((r) => ({ url: `${base}${r.path}`, lastModified: now, changeFrequency: "monthly", priority: r.priority }));
}
