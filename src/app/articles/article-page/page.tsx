'use client';
import { useSearchParams, redirect } from 'next/navigation';
import ArticleContent from './article-content';

const Page = () => {
  const searchParams = useSearchParams();
  const articleName = searchParams.get('articleName');

  if (!articleName) redirect('/articles');

  return (
    <>
      <main className='mb-20'>
        <ArticleContent articleName={articleName} />
      </main>
    </>
  );
};

export default Page;
