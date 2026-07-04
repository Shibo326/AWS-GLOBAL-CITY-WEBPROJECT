'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseParallaxOptions {
  speed?: number;
}

export interface UseParallaxReturn {
  ref: React.RefCallback<HTMLElement>;
  style: React.CSSProperties;
}

/**
 * Custom hook for scroll-linked parallax transform.
 * Uses requestAnimationFrame for smooth GPU-accelerated updates.
 * Pauses when tab is not visible to save resources.
 */
export function useParallax(options: UseParallaxOptions = {}): UseParallaxReturn {
  const { speed = 0.1 } = options;

  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'translateY(0px)',
    willChange: 'transform',
  });

  const elementRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);

  const updatePosition = useCallback(() => {
    if (!elementRef.current || !isVisibleRef.current) return;

    const scrollY = window.scrollY || window.pageYOffset;
    const offset = scrollY * speed;

    setStyle({
      transform: `translateY(${offset}px)`,
      willChange: 'transform',
    });
  }, [speed]);

  const onScroll = useCallback(() => {
    if (!isVisibleRef.current) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(updatePosition);
  }, [updatePosition]);

  const onVisibilityChange = useCallback(() => {
    if (typeof document === 'undefined') return;
    isVisibleRef.current = !document.hidden;

    if (isVisibleRef.current) {
      // Resume by recalculating position
      updatePosition();
    }
  }, [updatePosition]);

  const ref = useCallback(
    (node: HTMLElement | null) => {
      elementRef.current = node;
    },
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Initial position calculation
    updatePosition();

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [onScroll, onVisibilityChange, updatePosition]);

  return { ref, style };
}
