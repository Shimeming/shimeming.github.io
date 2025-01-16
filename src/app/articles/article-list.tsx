'use client';
import { motion } from 'framer-motion';
import articleList from '@/data/articles';
import ArticleCard from './article-card';

const ArticleList = () => {

  return (
    <>
      <motion.ul
        role='list'
        className='grid grid-cols-1 gap-4'
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        initial='initial'
        animate='animate'
      >
        {articleList.map((name) => (
          <motion.li key={name}
            variants={{
              initial: { opacity: 0, y: 50 },
              animate: {
                opacity: 1, y: 0,
                transition: { duration: 1 },
              },
            }}
          >
            <ArticleCard article={name} />
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
};

export default ArticleList;
