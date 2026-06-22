'use client';
import { motion } from 'motion/react';
import type { ArticleSummary } from '@/lib/articles';
import ArticleCard from './article-card';

const ArticleList = ({
  articles,
}: {
  articles: ArticleSummary[]
}) => {
  return (
    <motion.ul
      role='list'
      className='grid grid-cols-1 gap-4'
      variants={{
        animate: { transition: { staggerChildren: 0.15 } },
      }}
      initial='initial'
      animate='animate'
    >
      {articles.map((article) => (
        <motion.li
          key={article.slug}
          variants={{
            initial: { opacity: 0, y: 50 },
            animate: { opacity: 1, y: 0, transition: { duration: 1 } },
          }}
        >
          <ArticleCard article={article} />
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default ArticleList;
