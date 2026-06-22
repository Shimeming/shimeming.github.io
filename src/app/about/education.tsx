'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronDown, FaLink, FaGithub } from 'react-icons/fa';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { IoSchool } from 'react-icons/io5';
import { PiNotePencilBold } from 'react-icons/pi';
import { Collapsible } from '@/components/ui/collapsible';
import { Tag } from '@/components/ui/tag';
import { CourseData, EducationData } from '@/types/about';


const Education = ({
  education,
}: {
  education: EducationData[]
}) => {
  return (
    <section>
      <h2 className='mb-2 text-xl font-bold opacity-75'>
        Education
      </h2>
      <ul className='relative border-s-2 pt-2 pb-1 ml-6'>
        {education.map((school, index) => (
          <School education={school} key={index} />
        ))}
      </ul>
    </section>
  );
};

const School = ({
  education,
}: {
  education: EducationData
}) => {
  const [isOpen, setIsOpen] = useState(education.defaultDisplay ?? false);

  return (
    <li className='group flex flex-col mb-4 ms-6 -translate-x-12 rounded-lg overflow-hidden'>
      <button
        className='relative flex gap-4 group-hover:bg-hovered hover:bg-hovered p-3 rounded-lg'
        onClick={() => setIsOpen(!isOpen)}
        disabled={education.courses === undefined}
      >
        <span className='w-6 h-6 rounded-full bg-primary flex justify-center items-center -translate-x-[1px]'>
          <IoSchool className='text-background' />
        </span>
        <div className='flex flex-col items-start'>
          <h3 className='mb-1 text-lg font-semibold'>
            {education.school}
          </h3>
          <p className='block mb-2 text-sm font-normal leading-none text-decorative'>
            {education.years}
          </p>
          <p className='text-base font-normal'>
            {education.degree}
          </p>
        </div>
        {education.courses && (
          <motion.span
            animate={{ rotate: isOpen ? 180 : 360 }}
            transition={{ duration: 0.5 }}
            className='absolute right-6 bottom-2 transform -translate-y-1/2'
          >
            <FaChevronDown />
          </motion.span>
        )}
      </button>
      {education.courses && (
        <Collapsible isOpen={isOpen} className='pl-10 pt-3'>
          {education.courses.map((course, index) => (
            <div key={index} className=''>
              <Course course={course} />
            </div>
          ))}
        </Collapsible>
      )}
    </li>
  );
};

const Course = ({
  course: {
    // Pulled out only to exclude them from `additionalInformation`.
    courseNumber: _courseNumber,
    credits: _credits,
    semester: _semester,
    chineseName,
    englishName,
    grade,
    skills,
    ...additionalInformation
  },
}: {
  course: CourseData;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasAdditionalInformation = Object.keys(additionalInformation).length > 0;

  return (
    <div>
      <button
        className='relative w-full hover:bg-hovered px-3 pt-1 pb-1.5 rounded-lg items-center pr-5'
        disabled={!hasAdditionalInformation}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='flex justify-between items-baseline'>
          <div className='flex gap-4 items-baseline'>
            <h3 className='text-lg font-semibold'>
              {englishName}
            </h3>
            <h3>
              {chineseName}
            </h3>
            <p className='text-decorative'>
              {grade}
            </p>
          </div>
          {hasAdditionalInformation && (
            <motion.span
              // initial={false}
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {isOpen ? <FaMinus className="text-xl" /> : <FaPlus className="text-xl" />}
            </motion.span>
          )}
        </div>
        <div className='flex'>
          {skills ? (
            <div className='flex gap-2 ml-auto mt-1'>
              {skills.map((skill, index) => (
                <Tag key={index}>
                  {skill}
                </Tag>
              ))}
            </div>
          ) :
            <div className='ml-auto mt-1 invisible'>
              <Tag>Placeholder</Tag>
            </div>
          }
        </div>
      </button>
      {hasAdditionalInformation && (
        <Collapsible isOpen={isOpen} className='pl-10 pb-2 pt-1'>
          <div className='flex flex-col gap-2'>
            {additionalInformation.link && (
              <Link
                href={additionalInformation.link}
                target='_blank'
                rel='noopener noreferrer'
                className='transition-colors hover:text-primary'
              >
                <span className='flex gap-2 items-baseline'>
                  <FaLink />
                  {additionalInformation.link}
                </span>
              </Link>
            )}
            {additionalInformation.repoLink && (
              <Link
                href={additionalInformation.repoLink}
                target='_blank'
                rel='noopener noreferrer'
                className='transition-colors hover:text-primary'
              >
                <span className='flex gap-2 items-baseline'>
                  <FaGithub />
                  {additionalInformation.repoLink}
                </span>
              </Link>
            )}
            {additionalInformation.projectPageLink && (
              <Link href={additionalInformation.projectPageLink}>
                <span className='flex gap-2 items-baseline'>
                  <PiNotePencilBold />
                  Note
                </span>
              </Link>
            )}
          </div>
        </Collapsible>
      )}
    </div>
  );
};

export default Education;
