'use client';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import ProjectsList from './projects-list';
import ProjectContent from './project-content';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParams = useSearchParams();
  const projectName = searchParams.get('projectName');

  return (
    <>
      <main>
        <Suspense fallback={<Skeleton count={3} />}>
          {projectName ? (
            <ProjectContent projectName={projectName} />
          ) : (
            <ProjectsList />
          )}
        </Suspense>
      </main>
    </>
  );
};

export default Page;
