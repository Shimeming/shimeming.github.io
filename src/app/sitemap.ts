import { type MetadataRoute } from 'next';
import { getArticleSlugs } from '@/lib/articles';
import { getProjectSlugs } from '@/lib/projects';

const BASE_URL = 'https://shimeming.github.io';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/projects', '/articles', '/celeste'];
  const projectRoutes = getProjectSlugs().map((slug) => `/projects/${slug}`);
  const articleRoutes = getArticleSlugs().map((slug) => `/articles/${slug}`);

  return [...staticRoutes, ...projectRoutes, ...articleRoutes].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));
}
