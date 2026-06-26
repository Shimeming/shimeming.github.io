'use client';
import { motion } from 'motion/react';
import { revealContainer, revealItem, revealViewport } from '@/components/ui/reveal';
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
      className='border-t border-foreground/10'
      variants={revealContainer}
      initial='hidden'
      whileInView='visible'
      viewport={revealViewport}
    >
      {articles.map((article) => (
        <motion.li key={article.slug} variants={revealItem}>
          <ArticleCard article={article} />
        </motion.li>
      ))}
    </motion.ul>
  );
};

export default ArticleList;
