'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** Target number to count up to */
  target: number;
  /** Duration of the count-up in milliseconds */
  duration?: number;
  /** Suffix appended after the number (e.g., "+") */
  suffix?: string;
  /** CSS class name for styling */
  className?: string;
}

/**
 * easeOutExpo easing function.
 * Returns 1 when t=1, otherwise exponential decay toward 1.
 */
function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/**
 * Animated number counter using native IntersectionObserver.
 * Triggers when 50% of the element is in the viewport.
 * Disconnects observer after first trigger (fires only once).
 * Respects prefers-reduced-motion by showing final value immediately.
 */
export default function CountUp({
  target,
  duration = 1800,
  suffix = '',
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const displayRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasTriggeredRef = useRef(false);
  const [displayValue, setDisplayValue] = useState(`0${suffix}`);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // If reduced motion or no IntersectionObserver support, show final value immediately
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      const finalValue = target.toLocaleString('en-US') + suffix;
      setDisplayValue(finalValue);
      if (displayRef.current) {
        displayRef.current.textContent = finalValue;
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          observer.disconnect(); // Fire only once (Req 18.5)
          startAnimation();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    function startAnimation() {
      const startTime = performance.now();

      function animate(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const currentValue = Math.round(easedProgress * target);

        if (displayRef.current) {
          displayRef.current.textContent =
            currentValue.toLocaleString('en-US') + suffix;
        }

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          // Ensure final value is exact
          if (displayRef.current) {
            displayRef.current.textContent =
              target.toLocaleString('en-US') + suffix;
          }
          animationFrameRef.current = null;
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      <span ref={displayRef}>{displayValue}</span>
    </span>
  );
}
