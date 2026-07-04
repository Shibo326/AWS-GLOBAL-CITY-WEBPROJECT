'use client';

import type { ReactNode } from 'react';
import { CursorProvider } from './CursorContext';
import { LoadProvider } from './LoadContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LoadProvider>
      <CursorProvider>
        {children}
      </CursorProvider>
    </LoadProvider>
  );
}
