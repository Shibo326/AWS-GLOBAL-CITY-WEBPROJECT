'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

export interface UseIntersectionObserverReturn {
  ref: React.RefCallback<Element>;
  isInView: boolean;
  hasAnimated: boolean;
}

/**
 * Custom hook for detecting when an element enters the viewport.
 * Supports configurable threshold, root margin, and one-shot behavior.
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn {
  const { threshold = 0.15, once = true, rootMargin = '0px' } = options;

  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<Element | null>(null);

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  const ref = useCallback(
    (node: Element | null) => {
      // Cleanup previous observer
      cleanup();
      elementRef.current = node;

      if (!node) return;

      // SSR guard
      if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;

          const inView = entry.isIntersecting;
          setIsInView(inView);

          if (inView && !hasAnimated) {
            setHasAnimated(true);
            if (once) {
              cleanup();
            }
          }
        },
        { threshold, rootMargin }
      );

      observerRef.current.observe(node);
    },
    [threshold, rootMargin, once, hasAnimated, cleanup]
  );

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { ref, isInView, hasAnimated };
}
