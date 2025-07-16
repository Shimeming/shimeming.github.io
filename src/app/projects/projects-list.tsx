'use client';
import { motion } from 'framer-motion';
import ProjectCard from '@/app/projects/project-card';
import projectList from '@/data/projects';
import { staggerContainer } from '@/lib/animations';

const ProjectsList = () => {
  return (
    <>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {projectList.map((name) => (
          <ProjectCard key={name} project={name} />
        ))}
      </motion.div>
    </>
  );
};

export default ProjectsList;
