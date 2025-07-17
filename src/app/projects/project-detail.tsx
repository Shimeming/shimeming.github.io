'use client';

import path from 'path';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { MdEditNote } from 'react-icons/md';
import LinkIcon from '@/components/link-icon';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { fadeDown } from '@/lib/animations';
import { containsPrintable } from '@/lib/utils';
import { ProjectMetadata } from '@/types/project';

const ProjectDetail = ({
  projectId,
  projectData,
  openState,
}: {
  projectId: string
  projectData: { href: string, metadata: ProjectMetadata, content: string, }
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}) => {
  const metadata = projectData.metadata;
  const dir = path.join('/projects', projectId);
  const placeHolderCoverPath = '/projects/_placeholder/cover.avif';
  const [open, setOpen] = openState;
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setOpen(false));

  const coverImage = (metadata.coverImage && path.join(dir, metadata.coverImage)) || placeHolderCoverPath;
  useEffect(() => {
    function handleCloseKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }
    function handleClosePop(event: PopStateEvent) {
      setOpen(false);
      event.preventDefault();
    }
    window.addEventListener('keydown', handleCloseKey);
    window.addEventListener('popstate', handleClosePop);
    return () => {
      window.removeEventListener('keydown', handleCloseKey);
      window.removeEventListener('popstate', handleClosePop);
    };
  }, [open, setOpen]);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black/20 h-full w-full z-10"
            />
            <div className="fixed inset-0 grid place-items-center z-[100]">
              <motion.div
                ref={ref}
                {...fadeDown}
                className="relative w-full md:max-w-7xl h-full md:min-h-3xl md:max-h-[90%] bg-surface md:rounded-lg overflow-x-scroll no-scrollbar grid"
              >
                <div
                  className='absolute inset-0 items-center justify-center overflow-hidden'
                >
                  <div
                    className="relative h-full"
                  >
                    <Image
                      src={coverImage || placeHolderCoverPath}
                      alt={projectData.metadata.projectName}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>

                <div className="bg-white/80 dark:bg-black/80 z-10 py-8 px-12 flex mt-64">
                  <div className="absolute right-12 bottom-8">
                    {containsPrintable(projectData.content) && (
                      <div className='flex justify-end'>
                        <Link
                          href={projectData.href}
                          className="flex items-center gap-2 text-lg font-bold hover:text-primary active:scale-95 duration-100 border-2 border-primary px-2 py-1 rounded-lg"
                        >
                          <MdEditNote className='inline' />
                          Note
                        </Link>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-4">
                    <h2
                      className="font-bold text-primary text-4xl"
                    >
                      {metadata.projectName}
                    </h2>
                    <div>
                      <div
                        className="flex gap-4"
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
                    </div>

                    <p className='text-lg'>
                      {metadata.description}
                    </p>
                    <div className="relative">
                      <div
                        className="flex flex-col items-start gap-4 overflow-auto"
                      >
                        <ul className='list-disc list-inside'>
                          {projectData.metadata.overview.map((overview, index) => (
                            <li key={index}>
                              {overview}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;
