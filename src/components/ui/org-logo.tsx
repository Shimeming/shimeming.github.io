import Image from 'next/image';

interface OrgLogoProps {
  src: string;
  alt: string;
  /** Plate background. Defaults to the soft-grey ground that lets white-assuming marks read in both themes. */
  bg?: string;
  /** Outer plate size in px. */
  size?: number;
}

/**
 * A small framed logo "plate" for timeline nodes. The logo sits on a light
 * ground (so marks that assume a white background stay legible in dark mode),
 * contained within a fixed square via an inner relative wrapper.
 */
const OrgLogo = ({ src, alt, bg = '#eef1f4', size = 44 }: OrgLogoProps) => (
  <span
    className='grid shrink-0 place-items-center rounded-md border border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.08)]'
    style={{ width: size, height: size, background: bg }}
  >
    <span className='relative' style={{ width: size - 14, height: size - 14 }}>
      <Image src={src} alt={alt} fill sizes={`${size}px`} className='object-contain' />
    </span>
  </span>
);

export default OrgLogo;
