import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/layout/container';
import MarkdownWrapper from '@/components/markdown';
import JsonLd from '@/components/seo/json-ld';
import BackLink from '@/components/ui/back-link';
import Reveal from '@/components/ui/reveal';
import site from '@/data/site';
import { getArticle, getArticleSlugs } from '@/lib/articles';
import { formatIsoDate } from '@/lib/format';

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const { metadata, excerpt } = article;
  const published = metadata.date ? formatIsoDate(metadata.date) : undefined;

  return {
    title: metadata.title,
    description: excerpt,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      type: 'article',
      title: metadata.title,
      description: excerpt,
      url: `/articles/${slug}`,
      ...(published ? { publishedTime: published } : {}),
    },
  };
}

const ArticlePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { metadata, content, excerpt } = article;
  const isoDate = metadata.date ? formatIsoDate(metadata.date) : undefined;

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: metadata.title,
    description: excerpt,
    url: `${site.url}/articles/${slug}`,
    author: { '@type': 'Person', name: site.name, url: site.url },
    ...(isoDate ? { datePublished: isoDate } : {}),
    ...(metadata.lang
      ? { inLanguage: metadata.lang === '中文' ? 'zh-TW' : 'en' }
      : {}),
  };

  return (
    <main className='pb-20'>
      <JsonLd data={blogPostingSchema} />
      <Container className='pt-8'>
        <Reveal>
          <BackLink href='/articles'>All articles</BackLink>
        </Reveal>

        {/* Blueprint header */}
        <Reveal delay={0.05}>
          <header className='mb-8 border-b border-primary/25 pb-4'>
            <h1 className='font-display text-[28px] font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-[34px]'>
              {metadata.title}
            </h1>
            {metadata.date && (
              isoDate ? (
                <time
                  dateTime={isoDate}
                  className='mt-2 block font-mono text-[11px] text-muted'
                >
                  {metadata.date}
                </time>
              ) : (
                <p className='mt-2 font-mono text-[11px] text-muted'>
                  {metadata.date}
                </p>
              )
            )}
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <MarkdownWrapper content={content} />
        </Reveal>
      </Container>
    </main>
  );
};

export default ArticlePage;
