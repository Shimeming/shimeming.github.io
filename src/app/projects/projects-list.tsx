'use client';
import ProjectCard from '@/components/project-card';
import { motion } from 'framer-motion';
import projectList from '@/data/projects';

const ProjectsList = () => {

  return (
    <>
      <motion.ul
        role='list'
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
        {projectList.map((name) => (
          <motion.li key={name}
            variants={{
              initial: { opacity: 0, y: 50 },
              animate: {
                opacity: 1, y: 0,
                transition: { duration: 1 },
              },
            }}
          >
            <ProjectCard project={name} />
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
};

export default ProjectsList;
