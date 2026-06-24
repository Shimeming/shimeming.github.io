import Image from 'next/image';

interface FigurePlateProps {
  src: string;
  alt: string;
  fig?: string;
  caption?: string;
}

const FigurePlate = ({ src, alt, fig, caption }: FigurePlateProps) => {
  const label = [fig, caption?.toUpperCase()].filter(Boolean).join(' — ');

  return (
    <div className='overflow-hidden rounded-xl border border-primary/20 bg-surface'>
      {/* Aspect-ratio cover box */}
      <div className='relative aspect-[21/7] w-full'>
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 72rem'
        />
        {/* Overlay gradient for legibility of caption */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />

        {/* Four corner ticks */}
        <i className='pointer-events-none absolute left-2 top-2 h-3.5 w-3.5 border-l-2 border-t-2 border-white/60 not-italic' />
        <i className='pointer-events-none absolute right-2 top-2 h-3.5 w-3.5 border-r-2 border-t-2 border-white/60 not-italic' />
        <i className='pointer-events-none absolute bottom-2 left-2 h-3.5 w-3.5 border-b-2 border-l-2 border-white/60 not-italic' />
        <i className='pointer-events-none absolute bottom-2 right-2 h-3.5 w-3.5 border-b-2 border-r-2 border-white/60 not-italic' />

        {/* Caption label */}
        {label && (
          <span className='absolute bottom-2.5 left-3 font-mono text-[10px] font-bold tracking-widest text-white/80'>
            {label}
          </span>
        )}
      </div>
    </div>
  );
};

export default FigurePlate;
