import { type Metadata } from 'next';
import Container from '@/components/layout/container';
import PageHeader from '@/components/ui/page-header';
import Reveal from '@/components/ui/reveal';
import { getArticleSummaries } from '@/lib/articles';
import ArticleList from './article-list';

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Articles and notes by Shimeming — write-ups on projects, learning, and things figured out along the way.',
  alternates: { canonical: '/articles' },
};

const Page = () => {
  const articles = getArticleSummaries();

  return (
    <main className='pb-20'>
      <Container>
        <Reveal>
          <PageHeader fig="FIG. 03" zh="札記" title="Articles & Notes" />
        </Reveal>

        <ArticleList articles={articles} />
      </Container>
    </main>
  );
};

export default Page;
