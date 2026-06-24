'use client';
import { motion, type Variants } from 'motion/react';

const AnimatedHeading = ({
  text,
  className = '',
  wordAppearInterval = 0.1,
  wordAnimateDuration = 1,
}: {
  text: string,
  className?: string,
  wordAppearInterval?: number
  wordAnimateDuration?: number
}) => {
  const container: Variants = {
    animate: {
      transition: {
        delayChildren: 0.1,
        staggerChildren: wordAppearInterval,
      },
    },
  };

  const singleWord: Variants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: wordAnimateDuration },
    },
  };

  return (
    <div className='py-2'>
      <motion.h1
        className={`
          inline-block w-full font-display font-semibold text-3xl sm:text-5xl lg:text-6xl leading-tight tracking-tight
          ${className}
        `}
        variants={container}
        initial='initial'
        animate='animate'
      >
        {text.split(' ').map((word, index) => (
          <motion.span
            key={word + '-' + index}
            className='inline-block'
            variants={singleWord}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default AnimatedHeading;
