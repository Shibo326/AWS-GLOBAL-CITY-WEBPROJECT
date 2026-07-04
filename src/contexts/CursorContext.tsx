'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type CursorState = 'default' | 'hover-cta' | 'hover-tiger' | 'hover-interactive';

interface CursorContextValue {
  cursorState: CursorState;
  setCursorState: (state: CursorState) => void;
}

const CursorContext = createContext<CursorContextValue | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorState, setCursorStateInternal] = useState<CursorState>('default');

  const setCursorState = useCallback((state: CursorState) => {
    setCursorStateInternal(state);
  }, []);

  return (
    <CursorContext.Provider value={{ cursorState, setCursorState }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor(): CursorContextValue {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}
