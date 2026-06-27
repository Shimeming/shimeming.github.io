'use client';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useState } from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';
import HoverCard from '@/components/ui/hover-card';
import OrgLogo from '@/components/ui/org-logo';
import SectionLabel from '@/components/ui/section-label';
import { CourseData, EducationData, SpecializationData } from '@/types/about';
import { Timeline, TimelineNode } from './timeline';

const VISIBLE_COURSES = 6;

/** "1st Semester 2024/2025" → "Fall 2024"; "2nd Semester 2022/2023" → "Spring 2023". */
const formatTerm = (semester: string): string => {
  const m = semester.match(/(1st|2nd)\s+Semester\s+(\d{4})\/(\d{4})/);
  if (!m) return semester;
  const [, ord, fallYear, springYear] = m;
  return ord === '1st' ? `Fall ${fallYear}` : `Spring ${springYear}`;
};

/* A course chip's role while a specialization is being traced. */
type TraceState = 'normal' | 'active' | 'dimmed';

/* ── course chip + hover card ─────────────────────────────────────── */
const CourseChip = ({
  course,
  state,
  specs,
  onHover,
}: {
  course: CourseData;
  state: TraceState;
  /** Specializations this course counts toward (for the "Counts toward" line). */
  specs: SpecializationData[];
  /** Fires when the chip is hovered, so a parent can light the linked spec chip. */
  onHover: (hovering: boolean) => void;
}) => {
  const hasLinks =
    course.link || course.repoLink || course.projectPageLink;

  // Trace styling. Members glow with an accent halo; non-members fade back but
  // un-dim on direct hover so they stay readable and clickable.
  const stateClass =
    state === 'active'
      ? 'border-primary bg-primary/10 text-foreground shadow-[0_0_14px_-3px_var(--primary)]'
      : state === 'dimmed'
        ? 'border-primary/25 bg-surface text-body opacity-30 hover:opacity-100'
        : 'border-primary/25 bg-surface text-body hover:border-primary/50';

  const trigger = (
    <button
      type='button'
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`flex cursor-default items-center rounded-[5px] border px-2 py-1 font-mono text-[11px] transition-[opacity,border-color,background-color,box-shadow,color] duration-200 ${stateClass}`}
    >
      <span className='max-w-[180px] truncate'>{course.englishName}</span>
    </button>
  );

  return (
    <HoverCard
      trigger={trigger}
      className='relative w-[300px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-md border border-primary/25 bg-surface px-3.5 py-3 shadow-lg'
    >
      {/* Course number — part-number eyebrow */}
      <p className='font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary/80'>
        {course.courseNumber}
      </p>

      {/* Name (leave room for the grade stamp) */}
      <div className='pr-12'>
        <h3 className='mt-1 font-display text-[15px] font-semibold leading-[1.2] text-foreground'>
          {course.englishName}
        </h3>
        <p className='mt-0.5 font-sans text-[12px] leading-snug text-muted'>
          {course.chineseName}
        </p>
      </div>

      {/* Credits · term */}
      <p className='mt-2 font-mono text-[10px] text-muted'>
        {course.credits} credits · {formatTerm(course.semester)}
      </p>

      {/* Specialization linkage — shown for the courses that count toward one */}
      {specs.length > 0 && (
        <p className='mt-2 font-mono text-[10px] leading-snug text-muted'>
          Counts toward{' '}
          <span className='text-primary/80'>
            {specs.map((s) => `${s.englishName} (${s.code})`).join(' · ')}
          </span>
        </p>
      )}

      {course.skills && course.skills.length > 0 && (
        <div className='mt-2.5 flex flex-wrap gap-1'>
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
        <div className='mt-2.5 flex items-center gap-3 border-t border-primary/15 pt-2'>
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

      {/* Grade — hand-marked in red pen, like a graded paper */}
      {course.grade && (
        <span className='pointer-events-none absolute right-2.5 top-1.5 -rotate-[8deg] select-none font-caveat text-[30px] font-bold leading-none text-accent'>
          {course.grade}
        </span>
      )}
    </HoverCard>
  );
};

/* ── school node ─────────────────────────────────────────────────── */
const SchoolNode = ({ school }: { school: EducationData }) => {
  const [expanded, setExpanded] = useState(false);
  // The specialization currently being traced (hover / focus / tap).
  const [activeSpec, setActiveSpec] = useState<string | null>(null);
  // The course currently hovered — lights its parent spec chip (reverse cue).
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);

  const specs = school.specializations ?? [];
  const courses = school.courses ?? [];

  // course number → the specializations it counts toward
  const courseToSpecs = new Map<string, SpecializationData[]>();
  for (const s of specs) {
    for (const cn of s.courses ?? []) {
      courseToSpecs.set(cn, [...(courseToSpecs.get(cn) ?? []), s]);
    }
  }
  const specsOf = (c: CourseData) => courseToSpecs.get(c.courseNumber) ?? [];
  const isMemberOf = (c: CourseData, code: string) =>
    specsOf(c).some((s) => s.code === code);

  const visible = courses.slice(0, VISIBLE_COURSES);
  const hidden = courses.slice(VISIBLE_COURSES);

  // While tracing a collapsed list, surface the member courses (including any
  // hidden behind "show more") to the front so the whole set lights up at once.
  let renderList: CourseData[];
  if (activeSpec && !expanded) {
    const members = courses.filter((c) => isMemberOf(c, activeSpec));
    const restVisible = visible.filter((c) => !isMemberOf(c, activeSpec));
    renderList = [...members, ...restVisible];
  } else {
    renderList = expanded ? courses : visible;
  }

  const stateFor = (c: CourseData): TraceState => {
    if (!activeSpec) return 'normal';
    return isMemberOf(c, activeSpec) ? 'active' : 'dimmed';
  };

  // A spec chip lights when it's the active trace, or when a hovered course
  // counts toward it.
  const specLit = (code: string) =>
    activeSpec === code ||
    (hoveredCourse != null &&
      (courseToSpecs.get(hoveredCourse) ?? []).some((s) => s.code === code));

  return (
    <TimelineNode
      marker={
        school.logo ? (
          <OrgLogo src={school.logo} alt={school.school} bg={school.logoBg} />
        ) : undefined
      }
    >
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

      {/*
        Specializations + courses share one hover region: the trace set by a
        spec chip stays lit while the pointer travels down into the surfaced
        course chips, and only clears when it leaves this whole block.
      */}
      {(specs.length > 0 || courses.length > 0) && (
        <div onMouseLeave={() => setActiveSpec(null)}>
          {/* Specializations (領域專長) — interactive trace triggers */}
          {specs.length > 0 && (
            <>
              <div className='mt-2 flex flex-wrap items-center gap-1.5'>
                <span className='font-mono text-[10px] text-muted'>
                  Specialization
                </span>
                {specs.map((s) => {
                  const lit = specLit(s.code);
                  return (
                    <button
                      key={s.code}
                      type='button'
                      onMouseEnter={() => setActiveSpec(s.code)}
                      onFocus={() => setActiveSpec(s.code)}
                      onBlur={() => setActiveSpec(null)}
                      onClick={() =>
                        setActiveSpec((p) => (p === s.code ? null : s.code))
                      }
                      aria-pressed={activeSpec === s.code}
                      title={`${s.chineseName} 領域專長`}
                      className={`flex items-center gap-1.5 rounded-[5px] border px-2 py-0.5 font-mono text-[10px] font-medium transition-colors ${
                        lit
                          ? 'border-primary bg-primary/12 text-primary'
                          : 'border-primary/25 bg-primary/[0.04] text-primary/80 hover:border-primary/50 hover:bg-primary/[0.07]'
                      }`}
                    >
                      {s.englishName}
                      <span className='text-primary/50'>{s.code}</span>
                    </button>
                  );
                })}
              </div>
              {courses.length > 0 && (
                <p className='mt-1 font-mono text-[10px] text-muted/70'>
                  hover a specialization to trace its courses
                </p>
              )}
            </>
          )}

          {/* Course chips */}
          {courses.length > 0 && (
            <div className='mt-3'>
              <motion.div layout className='flex flex-wrap gap-1.5'>
                <AnimatePresence initial={false} mode='popLayout'>
                  {renderList.map((c) => (
                    <motion.div
                      layout
                      key={`${c.courseNumber}-${c.semester}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                    >
                      <CourseChip
                        course={c}
                        state={stateFor(c)}
                        specs={specsOf(c)}
                        onHover={(h) =>
                          setHoveredCourse(h ? c.courseNumber : null)
                        }
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {hidden.length > 0 && (
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className='mt-2 font-mono text-[11px] font-semibold text-primary hover:underline'
                >
                  {expanded ? '▴ show less' : `+ ${hidden.length} more ▾`}
                </button>
              )}
            </div>
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
