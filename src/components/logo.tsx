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
        transition-colors hover:outline-primary focus-visible:outline-primary
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      銘
    </MotionLink>
  );
};

export default Logo;
