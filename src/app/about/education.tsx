'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';
import { Collapsible } from '@/components/ui/collapsible';
import SectionLabel from '@/components/ui/section-label';
import { CourseData, EducationData } from '@/types/about';

const VISIBLE_COURSES = 6;

/* ── course chip ──────────────────────────────────────────────────── */
const CourseChip = ({ course, showSkills = false }: { course: CourseData; showSkills?: boolean }) => {
  const hasLinks =
    course.link || course.repoLink || course.projectPageLink;

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center gap-1.5 rounded-[5px] border border-primary/25 bg-surface px-2 py-1 font-mono text-[11px] text-body'>
        <span className='truncate max-w-[180px]'>{course.englishName}</span>
        {course.grade && (
          <span className='font-bold text-grade shrink-0'>{course.grade}</span>
        )}
      </div>
      {hasLinks && (
        <div className='flex gap-2 pl-1'>
          {course.link && (
            <Link
              href={course.link}
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted hover:text-primary transition-colors'
              aria-label={`${course.englishName} link`}
            >
              <FaLink className='text-[10px]' />
            </Link>
          )}
          {course.repoLink && (
            <Link
              href={course.repoLink}
              target='_blank'
              rel='noopener noreferrer'
              className='text-muted hover:text-primary transition-colors'
              aria-label={`${course.englishName} repository`}
            >
              <FaGithub className='text-[10px]' />
            </Link>
          )}
          {course.projectPageLink && (
            <Link
              href={course.projectPageLink}
              className='text-muted hover:text-primary transition-colors font-mono text-[9px]'
            >
              ↗ project
            </Link>
          )}
        </div>
      )}
      {showSkills && course.skills && course.skills.length > 0 && (
        <div className='flex flex-wrap gap-1 pl-1'>
          {course.skills.map((skill) => (
            <span
              key={skill}
              className='rounded-sm border border-foreground/20 px-1.5 py-px font-mono text-[9px] text-muted'
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── school node ─────────────────────────────────────────────────── */
const SchoolNode = ({ school }: { school: EducationData }) => {
  const [expanded, setExpanded] = useState(false);

  const courses = school.courses ?? [];
  const visible = courses.slice(0, VISIBLE_COURSES);
  const hidden  = courses.slice(VISIBLE_COURSES);

  return (
    <div className='node relative mb-6 pl-6'>
      {/* Timeline node dot */}
      <span
        className='absolute -left-[17px] top-[5px] h-3 w-3 rounded-full bg-primary ring-4 ring-background'
        aria-hidden='true'
      />

      {/* Years */}
      <p className='font-mono text-[11px] font-bold text-primary'>
        {school.years}
      </p>

      {/* School name + CGPA */}
      <h3 className='mt-0.5 font-display text-[19px] font-semibold leading-snug tracking-[-0.01em] text-foreground'>
        {school.school}
        {school.CGPA != null && (
          <span className='ml-2 font-mono text-[11px] font-bold text-accent'>
            CGPA {school.CGPA}
          </span>
        )}
      </h3>

      {/* Degree */}
      <p className='font-sans text-[13px] text-muted'>{school.degree}</p>

      {/* Course chips */}
      {courses.length > 0 && (
        <div className='mt-3'>
          <div className='flex flex-wrap gap-1.5'>
            {visible.map((c) => (
              <CourseChip key={c.courseNumber} course={c} />
            ))}
          </div>

          {hidden.length > 0 && (
            <>
              <Collapsible isOpen={expanded} className='mt-1.5'>
                <div className='flex flex-wrap gap-1.5'>
                  {hidden.map((c) => (
                    <CourseChip key={c.courseNumber} course={c} showSkills={true} />
                  ))}
                </div>
              </Collapsible>
              <button
                onClick={() => setExpanded((v) => !v)}
                className='mt-2 font-mono text-[11px] font-semibold text-primary hover:underline'
              >
                {expanded
                  ? '▴ show less'
                  : `+ ${hidden.length} more ▾`}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

/* ── section ─────────────────────────────────────────────────────── */
const Education = ({ education }: { education: EducationData[] }) => {
  return (
    <section>
      <SectionLabel en='Education' zh='學歷' />
      {/* Ruler: left border is the vertical rule */}
      <div className='relative border-l-2 border-primary/20 pl-0'>
        {education.map((school, i) => (
          <SchoolNode key={i} school={school} />
        ))}
      </div>
    </section>
  );
};

export default Education;
