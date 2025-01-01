import { Metadata } from 'next';
import { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';

export const metadata: Metadata = {
  title: 'Projects',
};

const Layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <Suspense fallback={<Skeleton count={3} />}>
      {children}
    </Suspense>
  );
};

export default Layout;
