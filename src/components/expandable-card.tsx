'use client';

import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';
import { useOutsideClick } from '@/hooks/use-outside-click';

const ExpandableCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(false));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.05,
              },
            }}
            className={twMerge('fixed inset-0 bg-black/20 h-full w-full z-10', className)}
          >
            <button
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(false)}
            >
              <IoIosCloseCircle />
            </button>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExpandableCard;
