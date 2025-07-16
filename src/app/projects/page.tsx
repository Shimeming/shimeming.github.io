'use client';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';
import ProjectsList from './projects-list';

const Page = () => {
  return (
    <>
      <main className='mb-20 md:px-32'>
        <div className="container max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            {...fadeInUp}
          >
            Projects
          </motion.h2>
          <ProjectsList />
        </div>
      </main>
    </>
  );
};

export default Page;
