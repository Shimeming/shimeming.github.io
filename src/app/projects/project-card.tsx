'use client';
import path from 'path';
import { motion } from 'framer-motion';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useId, useState, useEffect, useCallback } from 'react';
import { MdEditNote } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import { fadeInUp, cardHoverSmall } from '@/lib/animations';
import { containsPrintable, iconNameToFaIcon } from '@/lib/utils';
import { ProjectMetadata } from '@/types/project';
import ProjectDetail from './project-detail';

const ProjectCard = ({
  project,
}: {
  project: string
}) => {
  const placeHolderCoverPath = '/projects/_placeholder/cover.avif';

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  }, [searchParams]);

  const [projectData, setProjectData] = useState<{
    href: string, metadata: ProjectMetadata, content: string,
  }>();
  
  const id = useId();

  const [coverImage, setCoverImage] = useState<string>(placeHolderCoverPath);
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const layoutId = Object.fromEntries(
    ['title', 'card', 'image', 'description'].map(key => [key, `${key}-${id}`]),
  );

  useEffect(() => {
    (async () => {
      const dir = path.join('/projects', project);
      const href = path.join(pathname, 'project-page') + '?' + createQueryString('projectName', project);
      const res = await fetch(`${dir}/content.md`);
      if (res.ok) {
        const text = await res.text();
        const parsed = matter(text); // Parse without generics
        const content = parsed.content;
        const metadata = parsed.data as ProjectMetadata;
        setProjectData({ href, metadata, content });
        setCoverImage((metadata.coverImage && path.join(dir, metadata.coverImage)) || placeHolderCoverPath);
      } else {
        console.error('Error fetching project metadata');
      }
    })();
  }, [createQueryString, project, pathname]);

  if (!projectData) return <Skeleton count={3} />;

  return (
    <>
      <ProjectDetail
        projectId={project}
        layoutId={layoutId}
        projectData={projectData}
        openState={[openDetail, setOpenDetail]}
      />
      <motion.article
        key={projectData.metadata.projectName}
        onClick={() => setOpenDetail(true)}
        layoutId={layoutId.card}
        className="bg-surface dark:bg-dark/50 rounded-lg shadow-md p-6 hover:cursor-pointer"
        variants={fadeInUp}
        {...cardHoverSmall}
      >
        <motion.div
          className="relative aspect-video mb-4 rounded-lg overflow-hidden"
          layoutId={layoutId.image}
        >
          <Image
            src={coverImage || placeHolderCoverPath}
            alt={projectData.metadata.projectName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        <motion.h3
          className="text-xl font-semibold mb-2"
          whileHover={{ x: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {projectData.metadata.projectName}
        </motion.h3>
        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {projectData.metadata.description}
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* {project.technologies.map((tech) => (
            <motion.span
              key={tech}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {tech}
            </motion.span>
          ))} */}
        </motion.div>
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className='lg:text-sm flex gap-3'>
            {projectData.metadata.links?.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={'_blank'}
                // className='hover:opacity-80 active:scale-90 duration-300'
                className="flex items-center gap-2 text-secondary hover:text-primary active:scale-90 duration-300"
              >
                {/* {link.icon} */}
                <p className=''>
                  <LinkIcon iconName={link.icon} />
                  <span className='hidden lg:inline-block pl-1'>
                    {link.description}
                  </span>
                </p>
              </Link>
            ))}
          </div>
          {containsPrintable(projectData.content) && (
            <div className='flex justify-end'>
              <Link
                href={projectData.href}
              // className='
              //       block bg-foreground text-background px-1 py-0.5 rounded-md hover:opacity-80
              //       active:scale-90 duration-300
              //     '
              >
                <MdEditNote className='inline' />
                Note
              </Link>
            </div>
          )}
        </motion.div>
      </motion.article>
    </>
  );
};

const LinkIcon = ({
  iconName,
}: {
  iconName: string
}) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType>();
  useEffect(() => {
    (async () => {
      const Icon = await iconNameToFaIcon(iconName);
      setIconComponent(() => Icon);
    })();
  }, [iconName]);
  return (
    <span className='inline-block'>
      {IconComponent ? <IconComponent /> : 'link'}
    </span>
  );
};

export default ProjectCard;
