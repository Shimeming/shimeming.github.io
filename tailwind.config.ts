import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)'],
        sanstc: ['var(--font-noto-sans-tc)'],
        mono: ['var(--font-geist-mono)'],
        caveat: ['var(--font-caveat)', 'cursive'],
      },
    },
  },
  plugins: [],
} satisfies Config;
