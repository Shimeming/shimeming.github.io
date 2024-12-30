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
          className={`-rotate-90 ${className} stroke-primary z-10`}
        >
          <circle cx='50' cy='50' r='40' className='stroke-primary stroke-1 fill-none transition-colors duration-1000' />
          <motion.circle cx='50' cy='50' r='40' className='stroke-[4px] fill-background transition-colors duration-1000'
            style={{
              pathLength: scrollYProgress,
            }}
          />
          <circle cx='50' cy='50' r='20' className='animate-pulse stroke-1 fill-primary transition-colors duration-1000' />
        </svg>
      </figure>
      <div>
        {children}
      </div>
    </li>
  );
};

export default AnimatedLi;
