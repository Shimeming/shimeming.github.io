'use client';
import ProjectContent from './project-content';
import { useSearchParams, redirect } from 'next/navigation';

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
