import Image from 'next/image';
import profilePic from '@public/home-page-pic_softEdge.png';
import AnimatedHeading from '@/components/AnimatedHeading';
import Link from 'next/link';
import { MdOutlineAlternateEmail } from 'react-icons/md';


const Page = () => {
  return (
    <>
      <main className='flex items-center text-dark w-full'>
        <div className="flex items-center justify-between w-full">
          <div className='pl-12 w-2/5'>
            <Image
              src={profilePic}
              alt="Profile Picture"
              className='w-full h-auto'
            />
          </div>
          <div className='w-1/2'>
            <AnimatedHeading
              // text="I think there should be some really awesome text here, but I can't come up with anything."
              text="Imagine some really awesome text here!"
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
