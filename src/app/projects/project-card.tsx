'use client';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import LinkIcon from '@/components/link-icon';
import { fadeInUp, cardHoverSmall } from '@/lib/animations';
import type { ProjectSummary } from '@/lib/projects';

const ProjectCard = ({
  project,
}: {
  project: ProjectSummary
}) => {
  const { slug, metadata, coverImage } = project;

  return (
    <motion.article
      variants={fadeInUp}
      {...cardHoverSmall}
      className='group relative flex flex-col overflow-hidden rounded-2xl bg-surface shadow-md transition-shadow hover:shadow-xl'
    >
      <div className='relative aspect-video overflow-hidden'>
        <Image
          src={coverImage}
          alt={metadata.projectName}
          fill
          className='object-cover transition-transform duration-300 group-hover:scale-105'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>

      <div className='flex flex-1 flex-col p-6'>
        <h3 className='text-xl font-semibold'>
          {metadata.projectName}
        </h3>
        <p className='mt-2 text-decorative'>
          {metadata.description}
        </p>

        {metadata.tags && metadata.tags.length > 0 && (
          <div className='mt-3 flex flex-wrap gap-2'>
            {metadata.tags.map((tag) => (
              <span
                key={tag}
                className='rounded-full bg-primary/10 px-3 py-1 text-sm text-primary'
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* External links sit above the full-card overlay link (z-10). */}
        {metadata.links && metadata.links.length > 0 && (
          <div className='relative z-10 mt-4 flex flex-wrap gap-3 text-sm'>
            {metadata.links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1.5 text-secondary transition-colors hover:text-primary active:scale-95'
              >
                <LinkIcon iconName={link.icon} />
                <span className='hidden sm:inline'>{link.description}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Full-card click target → detail page; keyboard-focusable. */}
      <Link
        href={`/projects/${slug}`}
        aria-label={`View ${metadata.projectName}`}
        className='absolute inset-0 z-0 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
      />
    </motion.article>
  );
};

export default ProjectCard;
