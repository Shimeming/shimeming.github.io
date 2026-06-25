import { type Metadata } from 'next';
import Container from '@/components/layout/container';
import PageHeader from '@/components/ui/page-header';
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
        <PageHeader fig="FIG. 03" zh="札記" title="Articles & Notes" />

        <ArticleList articles={articles} />
      </Container>
    </main>
  );
};

export default Page;
