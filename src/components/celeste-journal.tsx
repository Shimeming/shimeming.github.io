import { poppinsSemiBold } from "@/helpers/fonts";
import Image, { StaticImageData } from 'next/image';
import skullA from '@public/pictures/celeste/skull-A.png';
import skullB from '@public/pictures/celeste/skull-B.png';
import skullC from '@public/pictures/celeste/skull-C.png';
import clock from '@public/pictures/celeste/clock.png';
import strawberry from '@public/pictures/celeste/strawberry.png';

export interface CelesteProgressData {
  lastUpdate: string;
  chapterData: {
    name: string;
    strawberries: string;
    aSideDeaths: number;
    bSideDeaths: number;
    cSideDeaths: number;
    time: string;
  }[];
}

const CelesteProgressJournal = ({
  celesteProgress,
}: {
  celesteProgress: CelesteProgressData;
}) => {
  const CatogoryImage = ({ src, alt }: { src: StaticImageData; alt: string }) => {
    return (
      <th className="justify-center items-center w-auto">
        <Image
          src={src}
          alt={alt}
          className="max-h-8 object-contain m-auto block"
        />
      </th>
    );
  };

  return (
    <div className={
      `rounded-2xl shadow-lg -rotate-2 overflow-hidden flex ${poppinsSemiBold.variable} w-fit`
    }>
      <div className="bg-[#a8524c] text-white w-36" />
      <div className="bg-white text-[#364C58]/80 pr-32">
        <table className="w-full border-collapse">
          <thead>
            <tr className="[&>th]:p-3">
              <th className="text-2xl font-bold uppercase">Progress</th>
              <CatogoryImage src={strawberry} alt="strawberry" />
              <CatogoryImage src={skullA} alt="skull A" />
              <CatogoryImage src={skullB} alt="skull B" />
              <CatogoryImage src={skullC} alt="skull C" />
              <CatogoryImage src={clock} alt="time spent" />
            </tr>
          </thead>
          <tbody>
            {celesteProgress.chapterData.map((chapter, index) => (
              <tr key={index} className="odd:bg-gray-100 even:bg-white">
                <td className="p-2 font-semibold">{chapter.name}</td>
                <td className="p-2 text-center">{chapter.strawberries}</td>
                <td className="p-2 text-center">{chapter.aSideDeaths}</td>
                <td className="p-2 text-center">{chapter.bSideDeaths}</td>
                <td className="p-2 text-center">{chapter.cSideDeaths}</td>
                <td className="p-2 text-center">{chapter.time}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-300 font-bold">
              <td className="border border-gray-300 p-2">Totals</td>
              <td className="border border-gray-300 p-2 text-center">{0}</td>
              <td className="border border-gray-300 p-2 text-center">{0}</td>
              <td className="border border-gray-300 p-2 text-center">-</td>
              <td className="border border-gray-300 p-2 text-center">-</td>
              <td className="border border-gray-300 p-2 text-center">{0}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CelesteProgressJournal;
