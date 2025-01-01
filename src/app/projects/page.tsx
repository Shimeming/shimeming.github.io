'use client';
import ProjectsList from './projects-list';
import ProjectContent from './project-content';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const projectName = searchParams.get('projectName');

  return (
    <>
      <main>
        {projectName ? (
          <ProjectContent projectName={projectName} />
        ) : (
          <ProjectsList />
        )}
      </main>
    </>
  );
};

export default Page;
