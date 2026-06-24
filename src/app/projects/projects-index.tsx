'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import LinkIcon from '@/components/link-icon';
import type { ProjectSummary } from '@/lib/projects';

/** Image shown in both the thumbnail and the preview surface. */
const projectImage = (project: ProjectSummary): string => {
  const { slug, metadata, coverImage } = project;
  return metadata.preview ? `/projects/${slug}/${metadata.preview}` : coverImage;
};

/** Mono meta line for a list row, assembled from whichever fields exist. */
const rowMeta = (metadata: ProjectSummary['metadata']): string => {
  const primary = [metadata.year, (metadata.stack ?? []).join(' · ')]
    .filter(Boolean)
    .join(' · ');
  if (primary) return primary;
  return (metadata.tags ?? []).slice(0, 2).join(' · ');
};

const chipClass =
  'rounded border border-primary/25 bg-primary/10 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-primary';

const Preview = ({ project }: { project: ProjectSummary }) => {
  const { slug, metadata } = project;
  const specs = [
    metadata.year ? String(metadata.year) : null,
    metadata.role,
    ...(metadata.stack ?? []),
    metadata.category,
  ].filter((v): v is string => Boolean(v));

  return (
    <div className='flex h-full flex-col'>
      {/* Preview image */}
      <div className='relative aspect-[16/8] flex-shrink-0 overflow-hidden rounded-lg bg-surface'>
        <Image
          src={projectImage(project)}
          alt={metadata.projectName}
          fill
          className='object-cover'
          sizes='(max-width: 1024px) 55vw, 640px'
        />
        {metadata.featured && (
          <span className='-rotate-3 absolute right-2.5 top-2.5 rounded bg-accent px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-wide text-white shadow-[0_2px_0_rgba(0,0,0,0.25)]'>
            ★ Featured
          </span>
        )}
        <span className='absolute bottom-2 left-2.5 font-mono text-[8px] font-bold uppercase tracking-[0.08em] text-white/70'>
          Preview
        </span>
      </div>

      {/* Title */}
      <h2 className='mt-3 font-display text-2xl font-semibold tracking-tight text-foreground'>
        {metadata.projectName}
      </h2>

      {/* Mono spec chips */}
      {specs.length > 0 && (
        <div className='mt-3 flex flex-wrap gap-1.5'>
          {specs.map((spec, i) => (
            <span key={`${spec}-${i}`} className={chipClass}>
              {spec}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <p className='mt-3 text-sm leading-relaxed text-body'>
        {metadata.description}
      </p>

      {/* "What I did" bullets */}
      {metadata.overview && metadata.overview.length > 0 && (
        <ul className='mt-2.5 list-disc space-y-1 pl-4 text-[13px] leading-relaxed text-body'>
          {metadata.overview.slice(0, 3).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}

      {/* Tags */}
      {metadata.tags && metadata.tags.length > 0 && (
        <div className='mt-3 flex flex-wrap gap-1.5'>
          {metadata.tags.map((tag) => (
            <span
              key={tag}
              className='rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] text-primary'
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Links + read more, pinned to bottom */}
      <div className='mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4'>
        {metadata.links?.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-primary active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
          >
            <LinkIcon iconName={link.icon} />
            {link.description && <span>{link.description}</span>}
          </Link>
        ))}
        <Link
          href={`/projects/${slug}`}
          className='ml-auto inline-flex items-center font-mono text-xs font-bold uppercase tracking-wide text-primary transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

const ProjectsIndex = ({ projects }: { projects: ProjectSummary[] }) => {
  const featuredIndex = projects.findIndex((p) => p.metadata.featured);
  const defaultIndex = featuredIndex === -1 ? 0 : featuredIndex;
  const [active, setActive] = useState(defaultIndex);

  if (projects.length === 0) return null;

  const activeProject = projects[active] ?? projects[defaultIndex];

  return (
    <div className='grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]'>
      {/* LEFT — the list (always visible) */}
      <ul className='flex flex-col gap-0.5'>
        {projects.map((project, i) => {
          const { slug, metadata } = project;
          const meta = rowMeta(metadata);
          const isActive = i === active;

          return (
            <li key={slug}>
              <Link
                href={`/projects/${slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={isActive ? 'location' : undefined}
                className={`group flex items-center gap-3 rounded-lg p-2.5 transition-[background-color,box-shadow] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  isActive
                    ? 'bg-surface shadow-[0_0_0_1.5px_var(--primary)]'
                    : 'hover:bg-surface'
                }`}
              >
                {/* Thumbnail */}
                <div className='relative aspect-[74/46] w-[74px] flex-shrink-0 overflow-hidden rounded-md bg-surfaceFlat'>
                  <Image
                    src={projectImage(project)}
                    alt=''
                    fill
                    className='object-cover'
                    sizes='74px'
                  />
                  {metadata.category && (
                    <span className='absolute left-1 top-1 rounded-sm bg-foreground/70 px-1 py-px font-mono text-[7px] font-bold uppercase text-white'>
                      {metadata.category}
                    </span>
                  )}
                </div>

                {/* Name + meta */}
                <div className='min-w-0 flex-1'>
                  <div className='truncate font-display text-base font-semibold tracking-tight text-foreground'>
                    {metadata.projectName}
                  </div>
                  {meta && (
                    <div className='mt-0.5 truncate font-mono text-[10px] font-medium text-muted'>
                      {meta}
                    </div>
                  )}
                </div>

                {/* Index marker */}
                <span
                  className={`ml-auto self-start font-mono text-[10px] font-bold ${
                    isActive ? 'text-primary' : 'text-muted/60'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* RIGHT — flat preview surface (wide-screen enhancement) */}
      <div
        aria-live='polite'
        aria-label='Project preview'
        className='hidden rounded-xl bg-surfaceFlat p-5 md:flex'
      >
        {/* keyed so the subtle fade replays on swap (respects reduced-motion via globals.css) */}
        <div key={activeProject.slug} className='flex w-full flex-col motion-safe:animate-[fadeIn_0.16s_ease]'>
          <Preview project={activeProject} />
        </div>
      </div>
    </div>
  );
};

export default ProjectsIndex;
