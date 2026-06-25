'use client';
import { MotionConfig } from 'motion/react';
import { ThemeProvider } from 'next-themes';

const ThemeProviderWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element => {
  return (
    <ThemeProvider attribute='data-mode' enableSystem={true}>
      <MotionConfig reducedMotion='user'>
        {children}
      </MotionConfig>
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
