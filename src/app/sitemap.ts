import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/content";
import { absolute } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: absolute("/"), lastModified: now, priority: 1 },
    { url: absolute("/projects"), lastModified: now, priority: 0.9 },
    { url: absolute("/film"), lastModified: now, priority: 0.7 },
    { url: absolute("/credentials"), lastModified: now, priority: 0.6 },
  ];

  // The writing route stays out of the sitemap until it has something in it,
  // for the same reason the nav link hides.
  if (posts.length) {
    routes.push({ url: absolute("/writing"), lastModified: now, priority: 0.7 });
  }

  for (const project of projects) {
    routes.push({
      url: absolute(`/projects/${project.slug}`),
      lastModified: now,
      priority: project.featured ? 0.8 : 0.6,
    });
  }

  for (const post of posts) {
    routes.push({
      url: absolute(`/writing/${post.slug}`),
      lastModified: new Date(post.date),
      priority: 0.5,
    });
  }

  return routes;
}
