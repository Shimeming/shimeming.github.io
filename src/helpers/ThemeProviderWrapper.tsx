'use client';
import { ThemeProvider } from 'next-themes';

const ThemeProviderWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
