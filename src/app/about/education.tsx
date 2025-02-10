'use client';
import { useEffect, useState } from 'react';
import { IoSchool } from "react-icons/io5";
import Tag from '@/components/tag';
import { CourseData, EducationData } from '@/types/education';

const Education = () => {
  const [educationData, setEducationData] = useState<EducationData[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('/about/education.json');
      if (!res.ok) {
        console.error('Failed to fetch education data');
        return;
      }
      const data: { education: EducationData[] } = await res.json();
      setEducationData(data.education);
    })();
  }, []);

  return (
    <section>
      <h2 className='mb-2 text-xl font-bold opacity-75'>
        Education
      </h2>
      <ul className='relative border-s-2 py-4 ml-6'>
        {educationData.map((education, index) => (
          <li key={index} className='group flex flex-col mb-4 ms-6 -translate-x-12 rounded-lg overflow-hidden'>
            <div className='flex gap-4 group-hover:bg-hovered hover:bg-hovered p-3 rounded-lg'>
              <span className='w-6 h-6 rounded-full bg-foreground flex justify-center items-center -translate-x-[1px]'>
                <IoSchool className='text-background' />
              </span>
              <div className=''>
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
            </div>
            {education.courses && (
              <div className='pl-10 pt-3'>
                {education.courses.map((course, index) => (
                  <div key={index} className=''>
                    <Course course={course} />
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

const Course = ({
  course,
}: {
  course: CourseData;
}) => {
  return (
    <div className='relative hover:bg-hovered px-3 pt-1 pb-1.5 rounded-lg items-center'>
      <div className='flex gap-4'>
        <h3 className='text-lg font-semibold'>
          {course.englishName}
        </h3>
        <h3>
          {course.chineseName}
        </h3>
        <p className='text-decorative'>
          {course.grade}
        </p>
      </div>
      <div className='flex'>
        {course.skills ? (
          <div className='flex gap-2 ml-auto mt-1'>
            {course.skills.map((skill, index) => (
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
    </div>
  );
};

export default Education;
