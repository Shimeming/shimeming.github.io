import Link from 'next/link';
import type { ArticleSummary } from '@/lib/articles';
import { formatIsoDate } from '@/lib/format';

const ArticleCard = ({
  article,
}: {
  article: ArticleSummary
}) => {
  const { slug, metadata, excerpt, readingMinutes } = article;
  const isoDate = metadata.date ? formatIsoDate(metadata.date) : undefined;

  return (
    <Link
      href={`/articles/${slug}`}
      className='group flex gap-[18px] border-b border-foreground/10 px-1.5 py-4 transition-colors hover:bg-surface focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
    >
      {/* Left date rail */}
      <div className='w-[92px] shrink-0 pt-[3px]'>
        {metadata.date ? (
          isoDate ? (
            <time
              dateTime={isoDate}
              className='font-mono text-[11px] font-bold leading-none text-primary'
            >
              {metadata.date}
            </time>
          ) : (
            <span className='font-mono text-[11px] font-bold leading-none text-primary'>
              {metadata.date}
            </span>
          )
        ) : (
          <span className='font-mono text-[11px] font-bold leading-none text-muted'>
            DRAFT
          </span>
        )}
        <span className='mt-1 block font-mono text-[11px] text-muted'>
          {readingMinutes > 0 ? `${readingMinutes} min` : '—'}
        </span>
      </div>

      {/* Body */}
      <div className='min-w-0 flex-1'>
        <div>
          <span className='font-display text-[20px] font-semibold leading-tight tracking-[-0.01em] text-foreground'>
            {metadata.title}
          </span>
        </div>

        {/* Full-width excerpt — NO max-width */}
        {excerpt && (
          <p className='mt-1.5 font-sans text-[13px] leading-[1.55] text-muted'>
            {excerpt}
          </p>
        )}

        {/* Meta chips — only rendered when at least one chip is present */}
        {metadata.lang && (
          <div className='mt-2.5 flex flex-wrap gap-2'>
            <span className='rounded-sm bg-surface px-1.5 py-[3px] font-mono text-[9px] font-bold uppercase tracking-wide text-body'>
              {metadata.lang}
            </span>
          </div>
        )}
      </div>

      {/* Arrow */}
      <span className='ml-auto self-center font-mono text-[13px] font-bold text-foreground/25 transition-colors group-hover:text-primary'>
        →
      </span>
    </Link>
  );
};

export default ArticleCard;
