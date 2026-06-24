import { type Metadata } from 'next';
import Container from '@/components/layout/container';
import { getProjectSummaries } from '@/lib/projects';
import ProjectsIndex from './projects-index';

export const metadata: Metadata = {
  title: 'Projects',
};

const Page = () => {
  const projects = getProjectSummaries();

  return (
    <main className='mb-20'>
      <Container className='py-10 sm:py-14'>
        <header className='mb-8'>
          <p className='font-mono text-xs uppercase tracking-[0.14em] text-primary'>
            FIG. INDEX · 作品集
          </p>
          <div className='mt-1 flex flex-wrap items-baseline gap-x-3'>
            <h1 className='font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl'>
              Projects
            </h1>
            <span className='font-mono text-sm text-muted'>
              {projects.length} {projects.length === 1 ? 'build' : 'builds'}
            </span>
          </div>
        </header>

        <ProjectsIndex projects={projects} />
      </Container>
    </main>
  );
};

export default Page;
