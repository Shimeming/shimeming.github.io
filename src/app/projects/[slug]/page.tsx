'use client';
import { useState, useEffect } from 'react';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
// import { ProjectMetadata } from '@/types/projects';

const Page = ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const [title, setTitle] = useState(document.title);
  const [description, setDescription] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { slug } = await params;
      const projectName = decodeURIComponent(slug);
      const res = await fetch(`/projects/${projectName}.md`);
      if (res.ok) {
        const text = await res.text();
        const { content, data } = matter(text);
        setTitle(data.projectName);
        setDescription(data.description);
        setContent(content);
      } else {
        setContent('Article not found');
      }
    })();
  }, [params]);

  useEffect(() => {
    document.title = title + '| Projects';
  }, [title]);
  useEffect(() => {
    if (description)
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [description]);



  return (
    <>
      <div className='w-full'>
        <ReactMarkdown className='prose dark:prose-invert'>
          {content || 'Loading...'}
        </ReactMarkdown>
      </div>
    </>
  );
};

export default Page;
