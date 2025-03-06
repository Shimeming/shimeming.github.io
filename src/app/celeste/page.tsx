import Image from 'next/image';
import CelesteProgressJournal, { CelesteProgressData } from '@/components/celeste-journal';
import celesteBackgroundImage from '@public/pictures/celeste/celeste-background.jpg';

const progressData: CelesteProgressData = {
  lastUpdate: '2025-03-05',
  chapterData: [
    {
      name: 'Forsaken City',
      flag: true, tape: true, hearts: ['blue', 'red', 'yellow'],
      strawberries: '21/20',
      aSideDeaths: 570, bSideDeaths: 344, cSideDeaths: 185,
      time: '4:48:29.247',
    },
    {
      name: 'Old Site',
      flag: true, tape: true, hearts: ['blue', 'red', 'yellow'],
      strawberries: '19/18',
      aSideDeaths: 271, bSideDeaths: 540, cSideDeaths: 75,
      time: '4:30:55.366',
    },
    {
      name: 'Celestial Resort',
      flag: true, tape: true, hearts: ['blue', 'red', 'yellow'],
      strawberries: '25/25',
      aSideDeaths: 745, bSideDeaths: 769, cSideDeaths: 312,
      time: '5:05:59.133',
    },
    {
      name: 'Golden Ridge',
      flag: true, tape: true, hearts: ['blue', 'red', 'yellow'],
      strawberries: '29/29',
      aSideDeaths: 633, bSideDeaths: 725, cSideDeaths: 217,
      time: '4:44:40.053',
    },
    {
      name: 'Mirror Temple',
      flag: true, tape: true, hearts: ['blue', 'red', 'yellow'],
      strawberries: '31/31',
      aSideDeaths: 532, bSideDeaths: 485, cSideDeaths: 221,
      time: '4:45:37.513',
    },
    {
      name: 'Reflection',
      flag: true, tape: true, hearts: ['blue', 'red', 'yellow'],
      strawberries: '-',
      aSideDeaths: 329, bSideDeaths: 976, cSideDeaths: 287,
      time: '4:42:47.292',
    },
    {
      name: 'The Summit',
      flag: true, tape: true, hearts: ['blue', 'red', 'yellow'],
      strawberries: '47/47',
      aSideDeaths: 1793, bSideDeaths: 2012, cSideDeaths: 689,
      time: '12:07:23.454',
    },
    {
      name: 'Core',
      flag: true, tape: true, hearts: ['blue', 'red', 'yellow'],
      strawberries: '5/5',
      aSideDeaths: 694, bSideDeaths: 728, cSideDeaths: 313,
      time: '4:11:44.789',
    },
    {
      name: 'Farewell',
      bird: true,
      strawberries: '-',
      aSideDeaths: -1, bSideDeaths: 8310, cSideDeaths: -1,
      time: '23:45:46.839',
    },
  ],
};

const Page = () => {
  return (
    <>
      <Image
        alt="Celeste background"
        src={celesteBackgroundImage}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
        className='-z-40'
      />
      <div className='relative flex-1 overflow-hidden'>
        <CelesteProgressJournal
          celesteProgress={progressData}
          className='-rotate-2 -translate-x-32 translate-y-16'
        />
      </div>
    </>
  );
};

export default Page;
