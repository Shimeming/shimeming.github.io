import Image, { StaticImageData } from 'next/image';
import bird from '@public/pictures/celeste/bird.png';
import blueHeart from '@public/pictures/celeste/blue-heart.png';
import clock from '@public/pictures/celeste/clock.png';
import flag from '@public/pictures/celeste/flag.png';
import redHeart from '@public/pictures/celeste/red-heart.png';
import skullA from '@public/pictures/celeste/skull-A.png';
import skullB from '@public/pictures/celeste/skull-B.png';
import skullC from '@public/pictures/celeste/skull-C.png';
import strawberry from '@public/pictures/celeste/strawberry.png';
import tape from '@public/pictures/celeste/tape.png';
import yellowHeart from '@public/pictures/celeste/yellow-heart.png';

type HeartColor = 'blue' | 'red' | 'yellow';

interface ChapterData {
  name: string;
  strawberries: string;
  aSideDeaths: number;
  bSideDeaths: number;
  cSideDeaths: number;
  time: string;
  flag?: boolean;
  tape?: boolean;
  bird?: boolean;
  hearts?: HeartColor[];
}

export interface CelesteProgressData {
  lastUpdate: string;
  chapterData: ChapterData[];
}

const heartImages: Record<HeartColor, StaticImageData> = {
  blue: blueHeart,
  red: redHeart,
  yellow: yellowHeart,
};

const pad2 = (value: number) => String(value).padStart(2, '0');

const CategoryImage = ({
  src, alt, className,
}: {
  src: StaticImageData; alt: string; className?: string;
}) => {
  return (
    <th className="justify-center items-center w-auto">
      <Image
        src={src}
        alt={alt}
        className={`max-h-10 w-auto object-contain m-auto block ${className}`}
      />
    </th>
  );
};

const CelesteProgressJournal = ({
  celesteProgress,
  className,
}: {
  celesteProgress: CelesteProgressData;
  className?: string;
}) => {
  const totalStrawberries = celesteProgress.chapterData.reduce((total, chapter) => {
    const [collected] = chapter.strawberries.split('/').map(Number);
    return total + (isNaN(collected) ? 0 : collected);
  }, 0);
  const totalDeaths = celesteProgress.chapterData.reduce((total, chapter) => {
    const aSideDeaths = chapter.aSideDeaths >= 0 ? chapter.aSideDeaths : 0;
    const bSideDeaths = chapter.bSideDeaths >= 0 ? chapter.bSideDeaths : 0;
    const cSideDeaths = chapter.cSideDeaths >= 0 ? chapter.cSideDeaths : 0;
    return total + aSideDeaths + bSideDeaths + cSideDeaths;
  }, 0);
  const totalTime = celesteProgress.chapterData.reduce((total, chapter) => {
    const [hours, minutes, seconds] = chapter.time.split(':').map(Number);
    return total + hours * 3600 + minutes * 60 + seconds;
  }, 0);
  // Mirror the per-row format (e.g. 6:55:02.637): hours unpadded, mm and ss
  // zero-padded so the totals row stays consistent regardless of the values.
  const totalTimeFormatted = [
    Math.floor(totalTime / 3600),
    pad2(Math.floor(totalTime / 60) % 60),
    (totalTime % 60).toFixed(3).padStart(6, '0'),
  ].join(':');

  return (
    <div className={`
      rounded-2xl shadow-lg overflow-hidden flex font-poppins w-fit ${className}
    `}>
      <div className="bg-[#a8524c] w-56" />
      <div className="relative bg-white text-[#364C58]/80 pl-8 pr-32 pb-32">
        <hr className="absolute w-full h-1 border-t-4 left-0 top-[70px]" />
        <table className="w-full border-collapse">
          <thead>
            <tr className="[&>th]:px-3 [&>th]:py-5">
              <th className="text-3xl font-bold uppercase">Progress</th>
              <th></th>
              <CategoryImage src={strawberry} alt="strawberries collected" className='mx-4' />
              <CategoryImage src={skullA} alt="A-side deaths" className='mx-2' />
              <CategoryImage src={skullB} alt="B-side deaths" className='mx-2' />
              <CategoryImage src={skullC} alt="C-side deaths" className='mx-2' />
              <CategoryImage src={clock} alt="time spent" className='mx-16' />
            </tr>
          </thead>
          <tbody
            className="from-blue-300/50 bg-linear-to-br to-rose-300/35 [&_td]:p-1.5 [&_td]:text-center"
          >
            {celesteProgress.chapterData.map((chapter) => (
              <tr key={chapter.name} className="odd:bg-white">
                <td className="font-semibold text-right!">{chapter.name}</td>
                <td>
                  <div className="flex gap-3 mx-8 justify-center items-center">
                    {chapter.flag && (
                      <Image
                        src={flag}
                        alt="flag"
                        className="max-h-8 w-auto"
                      />
                    )}
                    {chapter.tape && (
                      <Image
                        src={tape}
                        alt="tape"
                        className="max-h-8 w-auto"
                      />
                    )}
                    <div className='flex'>
                      {chapter.hearts?.map((heart, index) => (
                        <Image
                          key={heart}
                          src={heartImages[heart]}
                          alt={heart}
                          className={`max-h-8 w-auto -rotate-6 ${index !== 0 ? '-ml-6' : ''}`}
                        />
                      ))}
                    </div>
                    {chapter.bird && (
                      <Image
                        src={bird}
                        alt="bird"
                        className="max-h-8 w-auto"
                      />
                    )}
                  </div>
                </td>
                <td>{chapter.strawberries}</td>
                <td>{(chapter.aSideDeaths >= 0) ? chapter.aSideDeaths : ''}</td>
                <td>{(chapter.bSideDeaths >= 0) ? chapter.bSideDeaths : ''}</td>
                <td>{(chapter.cSideDeaths >= 0) ? chapter.cSideDeaths : ''}</td>
                <td>{chapter.time}</td>
              </tr>
            ))}
            <tr
              className="
                font-bold relative border-y-8 border-neutral-400
                after:content-[''] after:absolute after:top-1/2 after:left-0 after:w-full after:-translate-y-1/2 after:h-[52px] after:border-white after:border-y-[6px]
              "
            >
              <td className="text-right! uppercase text-2xl">Totals</td>
              <td></td>
              <td>{totalStrawberries}</td>
              <td></td>
              <td>{totalDeaths}</td>
              <td></td>
              <td>{totalTimeFormatted}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CelesteProgressJournal;
