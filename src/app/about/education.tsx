'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';
import { Collapsible } from '@/components/ui/collapsible';
import HoverCard from '@/components/ui/hover-card';
import SectionLabel from '@/components/ui/section-label';
import { CourseData, EducationData } from '@/types/about';
import { Timeline, TimelineNode } from './timeline';

const VISIBLE_COURSES = 6;

/* ── course chip + hover card ─────────────────────────────────────── */
const CourseChip = ({ course }: { course: CourseData }) => {
  const hasLinks =
    course.link || course.repoLink || course.projectPageLink;

  const trigger = (
    <button
      type='button'
      className='flex items-center rounded-[5px] border border-primary/25 bg-surface px-2 py-1 font-mono text-[11px] text-body transition-colors hover:border-primary/50 cursor-default'
    >
      <span className='truncate max-w-[180px]'>{course.englishName}</span>
    </button>
  );

  return (
    <HoverCard
      trigger={trigger}
      className='w-[280px] max-w-[calc(100vw-2rem)] rounded-md border border-primary/25 bg-surface p-3 shadow-lg'
    >
      <p className='font-sans text-[13px] font-semibold leading-snug text-foreground'>
        {course.englishName}
      </p>
      <p className='font-sans text-[12px] leading-snug text-muted'>
        {course.chineseName}
      </p>

      <p className='mt-1.5 font-mono text-[10px] text-muted'>
        {course.courseNumber} · {course.credits} cr · {course.semester}
        {course.grade && (
          <>
            {' · '}
            <span className='font-bold text-grade'>{course.grade}</span>
          </>
        )}
      </p>

      {course.skills && course.skills.length > 0 && (
        <div className='mt-2 flex flex-wrap gap-1'>
          {course.skills.map((skill) => (
            <span
              key={skill}
              className='rounded-xs border border-foreground/20 px-1.5 py-px font-mono text-[9px] text-muted'
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {hasLinks && (
        <div className='mt-2 flex items-center gap-3 border-t border-primary/15 pt-2'>
          {course.link && (
            <Link
              href={course.link}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1 font-mono text-[10px] text-muted transition-colors hover:text-primary'
              aria-label={`${course.englishName} link`}
            >
              <FaLink className='text-[10px]' /> link
            </Link>
          )}
          {course.repoLink && (
            <Link
              href={course.repoLink}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1 font-mono text-[10px] text-muted transition-colors hover:text-primary'
              aria-label={`${course.englishName} repository`}
            >
              <FaGithub className='text-[10px]' /> repo
            </Link>
          )}
          {course.projectPageLink && (
            <Link
              href={course.projectPageLink}
              className='flex items-center gap-1 font-mono text-[10px] text-muted transition-colors hover:text-primary'
            >
              ↗ project
            </Link>
          )}
        </div>
      )}
    </HoverCard>
  );
};

/* ── school node ─────────────────────────────────────────────────── */
const SchoolNode = ({ school }: { school: EducationData }) => {
  const [expanded, setExpanded] = useState(false);

  const courses = school.courses ?? [];
  const visible = courses.slice(0, VISIBLE_COURSES);
  const hidden  = courses.slice(VISIBLE_COURSES);

  return (
    <TimelineNode>
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

      {/* Research / advisor note */}
      {school.note && (
        <p className='mt-0.5 font-mono text-[11px] leading-snug text-muted'>
          {school.note}
        </p>
      )}

      {/* Course chips */}
      {courses.length > 0 && (
        <div className='mt-3'>
          <div className='flex flex-wrap gap-1.5'>
            {visible.map((c) => (
              <CourseChip key={`${c.courseNumber}-${c.semester}`} course={c} />
            ))}
          </div>

          {hidden.length > 0 && (
            <>
              <Collapsible isOpen={expanded} className='mt-1.5'>
                <div className='flex flex-wrap gap-1.5'>
                  {hidden.map((c) => (
                    <CourseChip key={`${c.courseNumber}-${c.semester}`} course={c} />
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
    </TimelineNode>
  );
};

/* ── section ─────────────────────────────────────────────────────── */
const Education = ({ education }: { education: EducationData[] }) => {
  return (
    <section>
      <SectionLabel en='Education' zh='學歷' />
      <Timeline>
        {education.map((school, i) => (
          <SchoolNode key={i} school={school} />
        ))}
      </Timeline>
    </section>
  );
};

export default Education;
