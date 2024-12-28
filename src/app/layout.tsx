import type { Metadata } from "next";
import { Geist_Mono, Narnoor, Noto_Sans, Noto_Sans_TC } from "next/font/google";
import NavBar from "@/components/NavBar";
import "./globals.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | CSIE Council',
    default: "Shimeming's Blog",
  },
  description: "Shimeming's Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en">
      <body
        className={`
          ${notoSans.variable} ${notoSansTC.variable} ${geistMono.variable} font-sans antialiased
          bg-light dark:bg-dark text-primary dark:text-primaryDark
          w-full min-h-screen
        `}
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
