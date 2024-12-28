'use client';
import { motion } from 'framer-motion';

const quote = {
  animate: {
    transition: {
      delay: 0.1,
      staggerChildren: 0.1,
    }
  }
};

const singleWord = {
  initial: {
    opacity: 0,
    y: 50
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1
    }
  }
};

const AnimatedHeading = ({
  text,
  className = ''
}: {
  text: string,
  className?: string
}) => {
  return (
    <div
      className='w-full mx-auto py-2 flex items-center justify-center'
    >
      <motion.h1
        className={`
          inline-block w-full text-dark font-bold capitalize text-6xl leading-tight
          ${className}
        `}
        variants={quote}
        initial='initial'
        animate='animate'
      >
        {text.split(' ').map((word, index) => (
          <motion.span
            key={word+'-'+index}
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