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
    <main className='mb-20'>
      <Container>
        <h1 className='mb-12 text-center text-3xl font-bold'>
          Articles
        </h1>
        <ArticleList articles={articles} />
      </Container>
    </main>
  );
};

export default Page;
