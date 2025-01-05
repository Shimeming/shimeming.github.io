'use client';
import { ThemeProvider } from 'next-themes';

const ThemeProviderWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element => {
  return (
    <ThemeProvider attribute='data-mode' enableSystem={true}>
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
