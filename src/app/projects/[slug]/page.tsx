'use client';
import { useState, useEffect } from 'react';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';

const Page = ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { slug } = await params;
      const res = await fetch(`/projects/${slug}.md`);
      if (res.ok) {
        const text = await res.text();
        const { content, data } = matter(text);
        setContent(content);
      } else {
        setContent('Article not found');
      }
    })();
  }, [params]);

  return (
    <div>
      <ReactMarkdown>{content || 'Loading...'}</ReactMarkdown>
    </div>
  );
};

export default Page;
