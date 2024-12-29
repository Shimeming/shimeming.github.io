'use client';
import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';

const AnimatedLi = ({
  className = '',
  children = <></>,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['center end', 'center center'],
  });

  return (
    <li ref={ref} className='flex gap-2'>
      <figure>
        <svg width='25' height='25' viewBox='0 0 100 100'
          className={`-rotate-90 ${className} stroke-dark z-10`}
        >
          <circle cx='50' cy='50' r='40' className='stroke-primary stroke-1 fill-none' />
          <motion.circle cx='50' cy='50' r='40' className='stroke-[4px] fill-light'
            style={{
              pathLength: scrollYProgress,
            }}
          />
          <circle cx='50' cy='50' r='20' className='animate-pulse stroke-1 fill-primary' />
        </svg>
      </figure>
      <div>
        {children}
      </div>
    </li>
  );
};

export default AnimatedLi;