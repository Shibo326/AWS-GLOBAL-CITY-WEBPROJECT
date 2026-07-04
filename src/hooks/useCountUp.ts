'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseCountUpOptions {
  target: number;
  duration?: number;
}

export interface UseCountUpReturn {
  ref: React.RefCallback<Element>;
  count: number;
  hasCompleted: boolean;
}

/**
 * easeOutExpo easing function.
 * Formula: 1 - Math.pow(2, -10 * t)
 */
function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Custom hook for count-up animation triggered when an element enters the viewport.
 * Uses requestAnimationFrame with easeOutExpo curve over 1.8s by default.
 * Only triggers once when element is at least 50% visible.
 */
export function useCountUp(options: UseCountUpOptions): UseCountUpReturn {
  const { target, duration = 1800 } = options;

  const [count, setCount] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  const elementRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const triggeredRef = useRef(false);

  const animate = useCallback(
    (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const currentCount = Math.round(easedProgress * target);

      setCount(currentCount);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setCount(target);
        setHasCompleted(true);
        rafRef.current = null;
      }
    },
    [target, duration]
  );

  const startCountUp = useCallback(() => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const ref = useCallback(
    (node: Element | null) => {
      // Cleanup previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      elementRef.current = node;

      if (!node) return;
      if (triggeredRef.current) return;

      // SSR guard
      if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;

          if (entry.isIntersecting) {
            startCountUp();
            // Disconnect after triggering (once: true behavior)
            if (observerRef.current) {
              observerRef.current.disconnect();
              observerRef.current = null;
            }
          }
        },
        { threshold: 0.5 }
      );

      observerRef.current.observe(node);
    },
    [startCountUp]
  );

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { ref, count, hasCompleted };
}
