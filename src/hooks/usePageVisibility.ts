'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface UsePageVisibilityOptions {
  onHidden?: () => void;
  onVisible?: () => void;
}

/**
 * Custom hook for detecting page visibility state changes.
 * Pauses/resumes background effects when the tab is hidden/visible.
 */
export function usePageVisibility(options: UsePageVisibilityOptions = {}): boolean {
  const { onHidden, onVisible } = options;

  const [isHidden, setIsHidden] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.hidden;
  });

  const onHiddenRef = useRef(onHidden);
  const onVisibleRef = useRef(onVisible);

  // Keep callback refs updated without re-subscribing to the event
  useEffect(() => {
    onHiddenRef.current = onHidden;
  }, [onHidden]);

  useEffect(() => {
    onVisibleRef.current = onVisible;
  }, [onVisible]);

  const handleVisibilityChange = useCallback(() => {
    if (typeof document === 'undefined') return;

    const hidden = document.hidden;
    setIsHidden(hidden);

    if (hidden) {
      onHiddenRef.current?.();
    } else {
      onVisibleRef.current?.();
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return isHidden;
}
