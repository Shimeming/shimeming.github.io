import Link from 'next/link';
import type { ArticleSummary } from '@/lib/articles';

const ArticleCard = ({
  article,
}: {
  article: ArticleSummary
}) => {
  const { slug, metadata } = article;

  return (
    <Link
      href={`/articles/${slug}`}
      className='relative block rounded-2xl border border-decorative/30 bg-surface px-6 py-4 shadow-sm transition-colors hover:bg-hovered focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
    >
      <div className='flex w-full items-end justify-between gap-4'>
        <h2 className='text-xl font-bold tracking-tight'>
          {metadata.title}
        </h2>
        {metadata.date && (
          <span className='shrink-0 text-sm text-decorative'>
            {metadata.date}
          </span>
        )}
      </div>
    </Link>
  );
};

export default ArticleCard;
