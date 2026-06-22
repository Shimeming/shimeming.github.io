import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Container from '@/components/layout/container';
import MarkdownWrapper from '@/components/markdown';
import { getAllArticles, getArticle } from '@/lib/articles';

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
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

  return (
    <main className='pb-20'>
      <Container className='pt-8'>
        <Link
          href='/articles'
          className='mb-6 inline-flex items-center gap-2 text-secondary transition-colors hover:text-primary'
        >
          <FaArrowLeftLong /> All articles
        </Link>

        <header className='mb-8'>
          <h1 className='text-3xl font-bold sm:text-4xl'>{metadata.title}</h1>
          {metadata.date && (
            <p className='mt-2 text-sm text-decorative'>{metadata.date}</p>
          )}
        </header>

        <MarkdownWrapper content={content} />
      </Container>
    </main>
  );
};

export default ArticlePage;
