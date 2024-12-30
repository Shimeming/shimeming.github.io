import { Metadata } from 'next';
import Projects from './projects';

export const metadata: Metadata = {
  title: 'Projects',
};

const Page = () => {
  return (
    <>
      <main>
        <Projects />
      </main>
    </>
  );
};

export default Page;
