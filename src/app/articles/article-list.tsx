import type { ArticleSummary } from '@/lib/articles';
import ArticleCard from './article-card';

const ArticleList = ({
  articles,
}: {
  articles: ArticleSummary[]
}) => {
  return (
    <ul role='list' className='border-t border-foreground/10'>
      {articles.map((article) => (
        <li key={article.slug}>
          <ArticleCard article={article} />
        </li>
      ))}
    </ul>
  );
};

export default ArticleList;
