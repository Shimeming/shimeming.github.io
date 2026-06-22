import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import articleOrder from '@/data/articles';
import { ArticleMetadata } from '@/types/article';

const ARTICLES_DIR = path.join(process.cwd(), 'public', 'articles');

export interface Article {
  slug: string;
  metadata: ArticleMetadata;
  content: string;
}

export type ArticleSummary = Omit<Article, 'content'>;

function readArticle(slug: string): Article {
  const file = fs.readFileSync(path.join(ARTICLES_DIR, `${slug}.md`), 'utf8');
  const { data, content } = matter(file);
  return { slug, metadata: data as ArticleMetadata, content };
}

export function getArticleSlugs(): string[] {
  return articleOrder;
}

export function getAllArticles(): Article[] {
  return articleOrder.map(readArticle);
}

export function getArticleSummaries(): ArticleSummary[] {
  return getAllArticles().map(({ content: _content, ...rest }) => rest);
}

export function getArticle(slug: string): Article | null {
  if (!articleOrder.includes(slug)) return null;
  try {
    return readArticle(slug);
  } catch {
    return null;
  }
}
