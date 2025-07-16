'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { ProjectMetadata } from '@/types/project';
import { useRef } from 'react';
import Image from 'next/image';
import path from 'path';

export type LayoutId = {
  title?: string;
  card?: string;
  image?: string;
  description?: string;
}

const ProjectDetail = ({
  projectId,
  projectData,
  openState,
  layoutId,
}: {
  projectId: string
  projectData: { href: string, metadata: ProjectMetadata, content: string, }
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  layoutId?: LayoutId
}) => {
  const metadata = projectData.metadata;
  const dir = path.join('/projects', projectId);
  const placeHolderCoverPath = '/projects/_placeholder/cover.avif';
  const [open, setOpen] = openState;
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setOpen(false));

  const coverImage = (metadata.coverImage && path.join(dir, metadata.coverImage)) || placeHolderCoverPath;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.div
              layoutId={layoutId?.card}
              ref={ref}
              className="w-full max-w-2xl h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div
                layoutId={layoutId?.image}
                className="relative aspect-video"
              >
                <Image
                  src={coverImage || placeHolderCoverPath}
                  alt={projectData.metadata.projectName}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={layoutId?.title}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {metadata.projectName}
                    </motion.h3>
                    <motion.p
                      layoutId={layoutId?.description}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {metadata.description}
                    </motion.p>
                  </div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <ul className='list-disc list-inside'>
                      {projectData.metadata.overview.map((overview, index) => (
                        <li key={index}>
                          {overview}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;
