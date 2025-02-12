import { motion } from 'framer-motion';
import { AnimatePresence } from 'motion/react';
import React from 'react';

export const Tag = ({
  className,
  children,
}: {
  className?: string;
  children: string;
}) => {
  return (
    <span className={`rounded-sm py-0.5 px-2.5 border font-medium text-xs border-foreground ${className}`}>
      {children}
    </span>
  );
};

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={className}
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, y: 0 },
            collapsed: { opacity: 0, y: -20 },
          }}
          transition={{ duration: 0.5 }}
        // key={isOpen ? 'open' : 'closed'}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

