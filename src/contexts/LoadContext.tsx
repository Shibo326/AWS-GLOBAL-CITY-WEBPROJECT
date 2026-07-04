'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface LoadContextValue {
  loadComplete: boolean;
  setLoadComplete: (complete: boolean) => void;
}

const LoadContext = createContext<LoadContextValue | undefined>(undefined);

export function LoadProvider({ children }: { children: ReactNode }) {
  const [loadComplete, setLoadCompleteInternal] = useState(false);

  const setLoadComplete = useCallback((complete: boolean) => {
    setLoadCompleteInternal(complete);
  }, []);

  return (
    <LoadContext.Provider value={{ loadComplete, setLoadComplete }}>
      {children}
    </LoadContext.Provider>
  );
}

export function useLoad(): LoadContextValue {
  const context = useContext(LoadContext);
  if (context === undefined) {
    throw new Error('useLoad must be used within a LoadProvider');
  }
  return context;
}
