import { Noto_Sans, Noto_Sans_TC, Caveat, Poppins, Space_Grotesk, Space_Mono } from 'next/font/google';
import localFont from 'next/font/local';

export const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

export const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  preload: false,
});

export const spaceGrotesk = Space_Grotesk({ variable: '--font-space-grotesk', subsets: ['latin'], weight: ['400','500','600','700'] });

export const spaceMono = Space_Mono({ variable: '--font-space-mono', subsets: ['latin'], weight: ['400','700'] });

export const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
});

// Handwritten CJK (cjkFonts 手寫4 / The Peak Font Plus, SIL OFL 1.1).
// Subset to only the glyphs we render; see scripts/subset-hand-font.sh.
// Used as a CJK fallback inside the `font-caveat` stack (tailwind.config.ts).
export const handTC = localFont({
  src: './fonts/cjkfonts-handwriting4.woff2',
  variable: '--font-hand-tc',
  display: 'swap',
  weight: '400',
});

export const poppinsSemiBold = Poppins({
  weight: '600',
  variable: '--font-poppins-semi-bold',
  subsets: ['latin'],
});
