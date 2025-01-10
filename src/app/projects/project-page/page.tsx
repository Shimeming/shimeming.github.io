'use client';
import { useSearchParams, redirect } from 'next/navigation';
import ProjectContent from './project-content';

const Page = () => {
  const searchParams = useSearchParams();
  const projectName = searchParams.get('projectName');

  if (!projectName) redirect('/projects');

  return (
    <>
      <main className='mb-20'>
        <ProjectContent projectName={projectName} />
      </main>
    </>
  );
};

export default Page;
