import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
};

const Layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <section>{children}</section>;
};

export default Layout;
