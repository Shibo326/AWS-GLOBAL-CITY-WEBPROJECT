'use client';

import { useEffect, useState } from 'react';
import { breakpoints } from '@/lib/constants';

/**
 * Custom hook for responsive media query detection.
 * Listens for window resize/media query changes and returns a boolean match state.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // Set initial value (handles SSR hydration mismatch)
    setMatches(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    // Fallback for older browsers
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [query]);

  return matches;
}

/**
 * Convenience hook: returns true when viewport is below the tablet breakpoint (< 768px).
 */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${breakpoints.tablet - 1}px)`);
}

/**
 * Convenience hook: returns true when viewport is between tablet and desktop breakpoints (768px–1023px).
 */
export function useIsTablet(): boolean {
  return useMediaQuery(
    `(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`
  );
}

/**
 * Convenience hook: returns true when viewport is at or above the desktop breakpoint (≥ 1024px).
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(`(min-width: ${breakpoints.desktop}px)`);
}
