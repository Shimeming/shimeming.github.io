'use client';
import { motion } from 'motion/react';
import Link from 'next/link';

const MotionLink = motion.create(Link);

const Logo = ({
  className = '',
}: {
  className?: string;
}): React.JSX.Element => {
  return (
    <MotionLink
      href='/'
      aria-label='Home'
      className={`
        flex h-11 w-11 items-center justify-center rounded-full
        bg-background font-sanstc text-xl font-bold text-foreground
        outline outline-2 outline-foreground/70
        transition-colors focus-visible:outline-primary
        ${className}
      `}
      whileHover={{
        backgroundColor: [
          '#ef4444', // red-500
          '#facc15', // yellow-400
          '#65a30d', // lime-600
          '#06b6d4', // cyan-500
          '#3b82f6', // blue-500
          '#a855f7', // purple-500
          '#ec4899', // pink-500
        ],
        transition: { duration: 3, repeat: Infinity },
      }}
      whileTap={{ scale: 0.92 }}
    >
      銘
    </MotionLink>
  );
};

export default Logo;
