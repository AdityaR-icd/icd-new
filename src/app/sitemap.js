import { getAllPostsSlug, getAllProjectsWithSlug, getAllProjectsTypes } from "../lib/api";

const BASE = "https://www.icdindia.com";

export default async function sitemap() {
  const [posts, projects, projectTypes] = await Promise.all([
    getAllPostsSlug(),
    getAllProjectsWithSlug(),
    getAllProjectsTypes(),
  ]);

  const now = new Date();

  const staticRoutes = [
    { url: BASE, priority: 1.0, changeFrequency: "daily" },
    { url: `${BASE}/services`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/clients`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE}/our-team`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/careers`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${BASE}/contact`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE}/kabir`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${BASE}/yellow-envelope`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${BASE}/posts`, priority: 0.9, changeFrequency: "daily" },
    { url: `${BASE}/projects/type/all`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE}/privacy-policy`, priority: 0.3, changeFrequency: "yearly" },
  ].map((r) => ({ ...r, lastModified: now }));

  const postRoutes = (posts?.edges || []).map(({ node }) => ({
    url: `${BASE}/posts/${node.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const projectRoutes = (projects?.edges || []).map(({ node }) => ({
    url: `${BASE}/projects/${node.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const typeRoutes = (projectTypes?.edges || []).map(({ node }) => ({
    url: `${BASE}/projects/category/${node.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...postRoutes, ...projectRoutes, ...typeRoutes];
}
