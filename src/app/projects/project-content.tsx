'use client';
import { useState, useEffect } from 'react';
import matter from 'gray-matter';
import MarkdownWrapper from '@/helpers/MarkdownWrapper';
// import { ProjectMetadata } from '@/types/projects';

const ProjectContent = ({
  projectName,
}: {
  projectName: string;
}) => {

  const [title, setTitle] = useState(document.title);
  const [description, setDescription] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
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
  }, [projectName]);

  useEffect(() => {
    document.title = title + '| Projects';
  }, [title]);
  useEffect(() => {
    if (description)
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [description]);

  return (
    <>
      <div className='mt-8'>
        {content
          ? <MarkdownWrapper
            content={content}
            className='mx-auto'
          />
          : <></>}
      </div>
    </>
  );
};

export default ProjectContent;
