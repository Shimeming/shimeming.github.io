'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionLink = motion.create(Link);

const Logo = (): React.JSX.Element => {
  return (
    <div className='flex items-center justify-center mt-2'>
      <MotionLink
        href='/'
        className='
          w-16 h-16 bg-dark text-light flex items-center justify-center
          rounded-full font-bold text-2xl
        '
        whileHover={{
          backgroundColor:[
            '#ef4444', // red-500
            '#facc15', // yellow-400
            '#65a30d', // lime-600
            '#06b6d4', // cyan-500
            '#3b82f6', // blue-500
            '#a855f7', // purple-500
            '#ec4899', // pink-500
          ],
          transition:{duration:3, repeat: Infinity}
        }}
      >
        銘
      </MotionLink>
    </div>
  );
};

export default Logo;
