import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import articleOrder from '@/data/articles';
import { readingTime } from '@/lib/reading-time';
import { ArticleMetadata } from '@/types/article';

const ARTICLES_DIR = path.join(process.cwd(), 'public', 'articles');

export interface Article {
  slug: string;
  metadata: ArticleMetadata;
  content: string;
  excerpt: string;
  readingMinutes: number;
}

export type ArticleSummary = Omit<Article, 'content'>;

function deriveExcerpt(body: string, max = 120): string {
  const stripped = body
    .split('\n')
    .map((line) => line.replace(/^[>#*-]+\s*/, ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  return stripped.length > max ? stripped.slice(0, max) + '…' : stripped;
}

function readArticle(slug: string): Article {
  const file = fs.readFileSync(path.join(ARTICLES_DIR, `${slug}.md`), 'utf8');
  const { data, content } = matter(file);
  const metadata = data as ArticleMetadata;
  const excerpt = metadata.excerpt ?? deriveExcerpt(content);
  const readingMinutes = readingTime(content);
  return { slug, metadata, content, excerpt, readingMinutes };
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
