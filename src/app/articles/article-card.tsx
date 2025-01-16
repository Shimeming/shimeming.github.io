'use client';
import path from 'path';
import clsx from 'clsx';
// import { motion } from 'framer-motion';
import matter from 'gray-matter';
// import { AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import { ArticleMetadata } from '@/types/article';
// import { MdLibraryBooks } from "react-icons/md";

const ArticleCard = ({
  article,
}: {
  article: string
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  }, [searchParams]);

  // const [isOpen, setIsOpen] = useState<boolean>(false);
  const [articleData, setArticleData] = useState<{
    href: string, metadata: ArticleMetadata, content: string,
  }>();

  useEffect(() => {
    (async () => {
      const href = path.join(pathname, 'article-page') + '?' + createQueryString('articleName', article);
      const res = await fetch(`/articles/${article}.md`);
      if (res.ok) {
        const text = await res.text();
        const parsed = matter(text); // Parse without generics
        const content = parsed.content;
        const metadata = parsed.data as ArticleMetadata;
        setArticleData({ href, metadata, content });
      } else {
        console.error('Error fetching project metadata');
      }
    })();
  }, [createQueryString, article, pathname]);

  if (!articleData) return <Skeleton count={3} />;
  return (
    <Link
      href={articleData.href}
      className={clsx(`
        relative block border rounded-lg shadow-lg overflow-hidden
      dark:bg-gray-800
      border-gray-200 dark:border-gray-700
        px-6 py-3
        hover:bg-gray-100 dark:hover:bg-gray-700
      `)}
    >
      <div className='flex w-full justify-between items-end'>
        <div className='flex gap-2 items-end'>
          <h5 className="text-xl font-bold tracking-tight text-black dark:text-white">
            {articleData.metadata.title}
          </h5>
        </div>
        {articleData.metadata.date && (
          <div className='text-sm opacity-70'>
            {articleData.metadata.date}
          </div>
        )}
      </div>
    </Link >
  );
};

export default ArticleCard;
