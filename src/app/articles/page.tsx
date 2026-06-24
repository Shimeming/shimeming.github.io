import { type Metadata } from 'next';
import Container from '@/components/layout/container';
import { getArticleSummaries } from '@/lib/articles';
import ArticleList from './article-list';

export const metadata: Metadata = {
  title: 'Articles',
};

const Page = () => {
  const articles = getArticleSummaries();

  return (
    <main className='pb-20'>
      <Container>
        {/* Blueprint header */}
        <div className='mb-6 border-b border-primary/25 pb-4 pt-6'>
          <p className='font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary'>
            FIG. 03 · 札記
          </p>
          <h1 className='mt-2 font-display text-[34px] font-semibold leading-tight tracking-[-0.02em] text-foreground'>
            Articles &amp; Notes
          </h1>
        </div>

        <ArticleList articles={articles} />
      </Container>
    </main>
  );
};

export default Page;
