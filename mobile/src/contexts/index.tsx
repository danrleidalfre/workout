import { ThemeProvider } from '@/contexts/theme';
import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};
