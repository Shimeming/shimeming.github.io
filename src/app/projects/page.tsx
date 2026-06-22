import { type Metadata } from 'next';
import Container from '@/components/layout/container';
import { getProjectSummaries } from '@/lib/projects';
import ProjectsList from './projects-list';

export const metadata: Metadata = {
  title: 'Projects',
};

const Page = () => {
  const projects = getProjectSummaries();

  return (
    <main className='mb-20'>
      <Container>
        <h1 className='mb-12 text-center text-3xl font-bold'>
          Projects
        </h1>
        <ProjectsList projects={projects} />
      </Container>
    </main>
  );
};

export default Page;
