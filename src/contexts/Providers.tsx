'use client';

import type { ReactNode } from 'react';
import { LoadProvider } from './LoadContext';
import { ThemeProvider } from './ThemeContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LoadProvider>
        {children}
      </LoadProvider>
    </ThemeProvider>
  );
}
