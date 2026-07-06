'use client';

import { useEffect } from 'react';

/**
 * PageVisibilityHandler — Toggles `.animations-paused` on <html> when
 * the browser tab becomes hidden. This allows CSS to pause all running
 * keyframe animations to conserve CPU/battery on inactive tabs.
 *
 * Validates: Requirements 14.4, 18.7
 */
export function PageVisibilityHandler() {
  useEffect(() => {
    const handler = () => {
      document.documentElement.classList.toggle(
        'animations-paused',
        document.hidden
      );
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  return null;
}
