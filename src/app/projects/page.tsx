import { type Metadata } from 'next';
import Container from '@/components/layout/container';
import PageHeader from '@/components/ui/page-header';
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
        <PageHeader
          fig="FIG. INDEX"
          zh="作品集"
          title="Projects"
          aside={
            <span className='font-mono text-sm text-muted'>
              {projects.length} {projects.length === 1 ? 'build' : 'builds'}
            </span>
          }
        />

        <ProjectsIndex projects={projects} />
      </Container>
    </main>
  );
};

export default Page;
