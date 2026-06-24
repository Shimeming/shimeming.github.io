import { Noto_Sans, Noto_Sans_TC, Caveat, Poppins, Space_Grotesk, Space_Mono } from 'next/font/google';

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

export const poppinsSemiBold = Poppins({
  weight: '600',
  variable: '--font-poppins-semi-bold',
  subsets: ['latin'],
});
