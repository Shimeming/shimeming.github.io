'use client';
import { motion } from 'motion/react';
import Link from 'next/link';

const MotionLink = motion.create(Link);

interface SealProps {
  as?: 'link' | 'span';
  size?: number;
  className?: string;
}

const Seal = ({ as = 'link', size = 32, className = '' }: SealProps): React.JSX.Element => {
  const style = {
    width: size,
    height: size,
    fontSize: Math.round(size * 0.53),
    borderRadius: Math.round(size * 0.22),
  };

  const baseClassName = `
    bg-accent text-white font-sanstc font-bold
    grid place-items-center select-none
    shadow-[0_2px_0_rgba(0,0,0,0.25)]
    ${className}
  `;

  if (as === 'link') {
    return (
      <MotionLink
        href='/'
        aria-label='Home'
        style={style}
        className={baseClassName}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        銘
      </MotionLink>
    );
  }

  return (
    <motion.span
      style={style}
      className={baseClassName}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      銘
    </motion.span>
  );
};

export default Seal;
