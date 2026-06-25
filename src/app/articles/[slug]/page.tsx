import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/layout/container';
import MarkdownWrapper from '@/components/markdown';
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

  return { title: article.metadata.title };
}

const ArticlePage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { metadata, content } = article;
  const isoDate = metadata.date ? formatIsoDate(metadata.date) : undefined;

  return (
    <main className='pb-20'>
      <Container className='pt-8'>
        {/* Back link */}
        <Link
          href='/articles'
          className='mb-6 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-primary transition-colors hover:text-primary/70'
        >
          ← All articles
        </Link>

        {/* Blueprint header */}
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

        <MarkdownWrapper content={content} />
      </Container>
    </main>
  );
};

export default ArticlePage;
