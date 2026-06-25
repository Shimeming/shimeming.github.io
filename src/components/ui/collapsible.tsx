'use client';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

export const Collapsible = ({
  isOpen,
  className,
  children,
}: {
  isOpen: boolean,
  className?: string,
  children: React.ReactNode,
}) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key='content'
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          {/* Padding lives on the inner element so the outer height can reach 0. */}
          <div className={className}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Collapsible;
