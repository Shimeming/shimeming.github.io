'use client';
import { useRef } from 'react';
import AnimatedLi from '@/components/animated-li';
import { motion, useScroll } from 'framer-motion';

const educationList = [
  {
    Degree: 'High School (Science Class)',
    years: '2019-2022',
    school: 'The Affiliated Senior High School of National Taiwan Normal University',
    description: '',
  },
  {
    Degree: 'Bachelor of Science in Computer Science',
    years: '2022 - 2026',
    school: 'National Taiwan University',
    description: '',
  },
];

const Education = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  });

  return (
    <>
      <h3 className='text-xl font-bold opacity-75 mb-2'>Education</h3>
      <div ref={ref} className='w-full mx-auto relative flex'>
        <motion.div className='absolute left-[2.5px] w-1 h-full bg-foreground origin-top mx-2 my-1'
          style={{ scaleY: scrollYProgress }}
        />
        <ul className='list-none p-0 m-0'>
          {educationList.map((education, index) => (
            <AnimatedLi key={'education' + index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: 'spring' }}
              >
                <h4 className='text-lg font-bold capitalize'>{education.Degree}</h4>
                <p>{education.years}</p>
                <p>{education.school}</p>
                <p>{education.description}</p>
              </motion.div>
            </AnimatedLi>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Education;