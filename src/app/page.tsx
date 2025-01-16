import Image from 'next/image';
import Link from 'next/link';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import AnimatedHeading from '@/components/animated-heading';
import profilePic from '@public/pictures/home-page-pic_softEdge.png';


const Page = () => {
  return (
    <>
      <main className='flex items-center w-full'>
        <div className="flex items-center justify-between w-full">
          <div className='md:pl-12 w-2/5 hidden md:block'>
            <Image
              src={profilePic}
              alt="Profile Picture"
              className='w-full h-auto'
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className='md:w-1/2'>
            <AnimatedHeading
              // text="I think there should be some really awesome text here, but I can't come up with anything."
              // text="Imagine some really awesome text here!"
              text="Here's Shimeming"
              wordAppearInterval={0.3}
            />
            <p className='my-4 text-xl font-medium font-caveat'>
              If a thing is worth doing, it is worth doing badly.
            </p>
            <div className='flex items-center mt-2'>
              <Link href='mailto:b11902140@csie.ntu.edu.tw' target={'_blank'}>
                <MdOutlineAlternateEmail className='inline mr-1' />
                b11902140@csie.ntu.edu.tw
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
