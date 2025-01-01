'use client';
import GithubProjectCard from '@/components/GithubProjectCard';
import { motion } from 'framer-motion';
import projectList from '@/data/projects';
import { useState, useEffect } from 'react';
import { GithubProjectMetadata, ProjectMetadata } from '@/types/projects';
import matter from 'gray-matter';

const Projects = () => {
  const [projectsMetadata, setProjectsMetadata] = useState<{
    href: string, data: ProjectMetadata
  }[]>([]);

  useEffect(() => {
    (async () => {
      const metadata: { href: string; data: ProjectMetadata }[] = [];
      await Promise.all(projectList.map(async (project) => {
        const href = `/projects/${project}`;
        const res = await fetch(`/projects/${project}.md`);
        if (res.ok) {
          const text = await res.text();
          const data = matter(text).data as unknown as ProjectMetadata;
          metadata.push({ href, data });
        } else {
          console.error('Error fetching project metadata');
        }
      }));
      setProjectsMetadata(metadata);
    })();
  }, []);

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
        {projectsMetadata.map((metadata) => (
          <motion.div key={metadata.data.projectName}
            variants={{
              initial: { opacity: 0, y: 50 },
              animate: {
                opacity: 1, y: 0,
                transition: { duration: 1 },
              },
            }}
          >
            {(metadata.data as GithubProjectMetadata).repoUrl !== undefined ? (
              <GithubProjectCard content={metadata.data as GithubProjectMetadata} />
            ) : (
              <div>{metadata.data.projectName}</div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default Projects;
