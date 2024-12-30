import { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects',
};

const projects = [
  {
    name: 'Hallucination',
    description: 'A single player 2D platformer game made with Unity',
    repoUrl: 'https://github.com/seantsao00/Hallucination',
  },
];

const Page = () => {
  return (
    <>
      <main>
        <ProjectCard content={projects[0]} />
      </main>
    </>
  );
};

export default Page;
