import type { Config } from "tailwindcss";
const colors = require('tailwindcss/colors')

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#171717", // neutral-900
        light: "#f5f5f5", // neutral-100
        primary: "#1d4ed8", // blue-700
        primaryDark: "#a78bfa" // violet-400
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)'],
        sanstc: ['var(--font-noto-sans-tc)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
