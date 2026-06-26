import { type Metadata } from 'next';
import Container from '@/components/layout/container';
import PageHeader from '@/components/ui/page-header';
import Reveal from '@/components/ui/reveal';
import { getProjectSummaries } from '@/lib/projects';
import ProjectsIndex from './projects-index';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected projects by Shimeming — games, graphics, web, and systems builds.',
  alternates: { canonical: '/projects' },
};

const Page = () => {
  const projects = getProjectSummaries();

  return (
    <main className='mb-20'>
      <Container className='py-10 sm:py-14'>
        <Reveal>
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
        </Reveal>

        <ProjectsIndex projects={projects} />
      </Container>
    </main>
  );
};

export default Page;
