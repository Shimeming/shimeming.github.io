import { type Metadata } from 'next';
import Image from 'next/image';
import CelesteProgressJournal from '@/components/celeste-journal';
import celesteProgress from '@/data/celeste';
import celesteBackgroundImage from '@public/pictures/celeste/celeste-background.jpg';

export const metadata: Metadata = {
  title: 'Celeste',
  description: 'My Celeste 100% completion progress journal — strawberries, deaths, and clear times per chapter.',
  alternates: { canonical: '/celeste' },
};

const Page = () => {
  return (
    <div className='relative flex flex-1 items-center overflow-hidden'>
      <Image
        alt="Celeste background"
        src={celesteBackgroundImage}
        placeholder="blur"
        fill
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        className='-z-10'
      />
      <div className='no-scrollbar w-full overflow-x-auto'>
        <div className='flex min-w-fit justify-center px-4 py-10'>
          <CelesteProgressJournal
            celesteProgress={celesteProgress}
            className='-rotate-1'
          />
        </div>
      </div>
      <div className='absolute bottom-4 right-4 font-mono text-xs text-white/70 bg-black/20 backdrop-blur-xs px-3 py-1.5 rounded-full'>
        Last sync · {celesteProgress.lastUpdate}
      </div>
    </div>
  );
};

export default Page;
