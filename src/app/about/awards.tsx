'use client';
import { useEffect, useState } from 'react';
import { FaAward } from 'react-icons/fa';
import { AwardData } from '@/types/about';


const Awards = () => {
  const [awards, setAwards] = useState<AwardData[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch('/about/awards.json');
      if (!res.ok) {
        console.error('Failed to fetch awards data');
        return;
      }
      const data: { awards: AwardData[] } = await res.json();
      setAwards(data.awards);
    })();
  }, []);

  return (
    <section>
      <h2 className='mb-2 text-xl font-bold opacity-75'>
        Awards
      </h2>
      <ul className='relative border-s-2 pt-2 pb-1 ml-6'>
        {awards.map((award, index) => (
          <Award award={award} key={index} />
        ))}
      </ul>
    </section>
  );
};

const Award = ({
  award,
}: {
  award: AwardData
}) => {
  return (
    <li className='group flex flex-col mb-4 ms-6 -translate-x-12 rounded-lg overflow-hidden'>
      <div
        className='relative flex gap-4 group-hover:bg-hovered hover:bg-hovered px-3 py-1 rounded-lg items-baseline'
      >
        <span className='w-6 h-6 rounded-full bg-foreground flex justify-center items-center -translate-x-[1px]'>
          <FaAward className='text-background' />
        </span>
        <div className='flex flex-col items-start'>
          <h3 className='text-lg font-semibold'>
            {award.englishTitle}
          </h3>
          <p className='text-sm font-medium opacity-75'>
            {award.chineseTitle?? <span className='invisible'>Placeholder</span>}
          </p>
        </div>
      </div>
    </li>
  );
};

export default Awards;
