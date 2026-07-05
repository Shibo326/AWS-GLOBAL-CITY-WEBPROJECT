'use client';

import type { ReactNode } from 'react';
import { LoadProvider } from './LoadContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LoadProvider>
      {children}
    </LoadProvider>
  );
}
