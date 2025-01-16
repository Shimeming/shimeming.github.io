'use client';
import matter from 'gray-matter';
import { useState, useEffect } from 'react';
import MarkdownWrapper from '@/helpers/markdown-wrapper';
// import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { ProjectMetadata } from '@/types/projects';

const ArticleContent = ({
  articleName,
}: {
  articleName: string;
}) => {

  const [title, setTitle] = useState(document.title);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/articles/${articleName}.md`);
      if (res.ok) {
        const text = await res.text();
        const { content, data } = matter(text);
        setTitle(data.articleName);
        setContent(content);
      } else {
        setContent('Article not found');
      }
    })();
  }, [articleName]);

  useEffect(() => {
    if (typeof window !== 'undefined' && document) document.title = title + ' | Articles';
  }, [title]);

  return (
    <>
      <div className='mt-8'>
        <MarkdownWrapper content={content || ''} />
      </div>
    </>
  );
};

export default ArticleContent;
