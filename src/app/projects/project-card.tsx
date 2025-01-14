'use client';
import path from 'path';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import matter from 'gray-matter';
import { AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import { containsPrintable, iconNameToFaIcon } from '@/helpers/utils';
import { ProjectMetadata } from '@/types/projects';
import { FaChevronDown } from "react-icons/fa";

const ProjectCard = ({
  project,
}: {
  project: string
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  }, [searchParams]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<{
    href: string, metadata: ProjectMetadata, content: string,
  }>();

  useEffect(() => {
    (async () => {
      const href = path.join(pathname, 'project-page') + '?' + createQueryString('projectName', project);
      const res = await fetch(`/projects/${project}.md`);
      if (res.ok) {
        const text = await res.text();
        const parsed = matter(text); // Parse without generics
        const content = parsed.content;
        const metadata = parsed.data as ProjectMetadata;
        setProjectData({ href, metadata, content });
      } else {
        console.error('Error fetching project metadata');
      }
    })();
  }, [createQueryString, project, pathname]);

  if (!projectData) return <Skeleton count={3} />;
  return (
    <motion.div
      layout
      transition={{ duration: 0.5 }}
      className={clsx(
        `relative block border rounded-lg shadow-lg overflow-hidden
      dark:bg-gray-800
      border-gray-200 dark:border-gray-700`,
      )}
    >
      <motion.button
        layout='position'
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'relative flex flex-col w-full px-6 py-3',
          {
            'hover:bg-gray-100 dark:hover:bg-gray-700': projectData.href,
          })}
      >
        <div className='flex w-full justify-between items-center'>
          <h5 className="text-xl font-bold tracking-tight">
            {projectData.metadata.projectName}
          </h5>
          <div className='lg:text-sm flex gap-3'>
            {projectData.metadata.links?.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target={'_blank'}
                className='
                  hover:text-black dark:hover:text-white active:scale-90 duration-300
                '
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
        </div>
        <p className="font-normal">
          {projectData.metadata.description}
        </p>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          className='absolute right-6 bottom-2 transform -translate-y-1/2'
        >
          <FaChevronDown />
        </motion.span>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <>
            <motion.div
              layout='position'
              className='dark:bg-gray-900 bg-neutral-200 px-6 py-3'
            >
              <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, y: 0 },
                  collapsed: { opacity: 0, y: -20 },
                }}
                transition={{ duration: 0.5 }}
                key={isOpen ? 'open' : 'closed'}
              >
                <ul className='list-disc list-inside'>
                  {projectData.metadata.overview.map((overview, index) => (
                    <li key={index}>
                      {overview}
                    </li>
                  ))}
                </ul>
                {/* <span className=''></span> */}
              </motion.div>
              {containsPrintable(projectData.content) && (
                <div className='flex justify-end'>
                  <Link
                    href={projectData.href}
                    className='
                          block bg-foreground text-background px-1 py-0.5 rounded-md hover:opacity-80
                          active:scale-90 duration-300
                        '
                  >
                    Note
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div >
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
