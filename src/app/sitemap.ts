import { type MetadataRoute } from 'next';
import site from '@/data/site';
import { getAllArticles } from '@/lib/articles';
import { getProjectSlugs } from '@/lib/projects';

const BASE_URL = site.url;

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ['', '/about', '/projects', '/articles', '/celeste'].map(
    (route) => ({ url: `${BASE_URL}${route}`, lastModified: now }),
  );

  const projectRoutes = getProjectSlugs().map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: now,
  }));

  // Articles carry a real publish date, so reflect it rather than build time.
  const articleRoutes = getAllArticles().map((article) => {
    const date = article.metadata.date
      ? new Date(article.metadata.date)
      : null;
    return {
      url: `${BASE_URL}/articles/${article.slug}`,
      lastModified: date && !isNaN(date.getTime()) ? date : now,
    };
  });

  return [...staticRoutes, ...projectRoutes, ...articleRoutes];
}
