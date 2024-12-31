'use client';
import GithubProjectCard from '@/components/GithubProjectCard';
import { motion } from 'framer-motion';

const projects = [
  {
    projectName: 'Personal Website',
    description: 'My personal website made with Next.js and Tailwind CSS.',
    repoUrl: 'https://github.com/Shimeming/shimeming.github.io',
  },
  {
    projectName: 'Hallucination',
    description: 'A single player 2D platformer game made by Unity.',
    repoUrl: 'https://github.com/seantsao00/Hallucination',
  },
  {
    projectName: 'Phantom Arena - 2024 CSIE Camp Challenge Game',
    description: 'A 2D game made for education purpose.',
    repoUrl: 'https://github.com/seantsao00/Challenge2024',
  },
  {
    projectName: 'Hogwarts Tag - 2023 CSIE Camp Challenge Game',
    description: 'A 2D tag game with various items and abilities for educational purposes.',
    repoUrl: 'https://github.com/Ccucumber12/Challenge2023',
  },
];

const Projects = () => {
  return (
    <>
      <motion.div
        className='grid grid-cols-1 gap-4'
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        initial='initial'
        animate='animate'
      >
        {projects.map((project) => (
          <motion.div key={project.projectName}
            variants={{
              initial: { opacity: 0, y: 50 },
              animate: {
                opacity: 1, y: 0,
                transition: { duration: 1 },
              },
            }}
          >
            <GithubProjectCard content={project} key={project.projectName} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Projects;
