'use client';
import { motion } from 'motion/react';
import { staggerContainer } from '@/lib/animations';
import type { ProjectSummary } from '@/lib/projects';
import ProjectCard from './project-card';

const ProjectsList = ({
  projects,
}: {
  projects: ProjectSummary[]
}) => {
  return (
    <motion.div
      className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'
      variants={staggerContainer}
      initial='initial'
      animate='animate'
    >
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </motion.div>
  );
};

export default ProjectsList;
