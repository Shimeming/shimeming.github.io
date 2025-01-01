import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  darkMode: ['selector', '[data-mode="dark"]'],
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
        foreground: 'var(--foreground)',
        background: 'var(--background)',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)'],
        sanstc: ['var(--font-noto-sans-tc)'],
        mono: ['var(--font-geist-mono)'],
        caveat: ['var(--font-caveat)', 'cursive'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '64rem',
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
} satisfies Config;
