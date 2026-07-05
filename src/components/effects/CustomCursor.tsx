'use client';

import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/useMediaQuery';

/**
 * CustomCursor — Cloud Pilot targeting reticle cursor.
 *
 * Design aligned to the Cloud Pilot / Aviation HUD theme:
 * - Orange dot (Rory Orange) as the precision pointer
 * - Sky-blue trailing ring that follows with a smooth lerp
 * - Orange glow on CTA hover, amber dashed ring on Tiger hover
 * - Dot disappears on interactive elements so the ring takes over
 *
 * Performance: requestAnimationFrame + translate3d for GPU compositing.
 * Accessibility: hidden on mobile, touch, and prefers-reduced-motion.
 */
export default function CustomCursor() {
  const isMobile = useIsMobile();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;

    // Respect reduced motion at runtime
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0; // mouse position
    let rx = 0, ry = 0; // ring position (lerped)
    let rafId: number;
    let isVisible = false;

    // Hide default cursor
    document.body.classList.add('custom-cursor-active');

    const showCursor = () => {
      if (!isVisible) {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        isVisible = true;
      }
    };

    const hideCursor = () => {
      if (isVisible) {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
        isVisible = false;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot follows pointer instantly (centered on the 8px dot)
      dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      showCursor();
    };

    const animate = () => {
      // Ring lerps toward mouse — 0.12 gives a smooth trailing lag
      // that feels like a cockpit instrument tracking a target
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [tabindex]');

      // Reset all states
      ring.classList.remove('cursor-ring--hover-cta', 'cursor-ring--hover-tiger', 'cursor-ring--hover-link');
      dot.classList.remove('cursor-dot--hidden');

      if (cursorAttr === 'cta') {
        ring.classList.add('cursor-ring--hover-cta');
        dot.classList.add('cursor-dot--hidden');
      } else if (cursorAttr === 'tiger') {
        ring.classList.add('cursor-ring--hover-tiger');
        dot.classList.add('cursor-dot--hidden');
      } else if (isInteractive) {
        ring.classList.add('cursor-ring--hover-link');
        dot.classList.add('cursor-dot--hidden');
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest('[data-cursor], a, button, [role="button"], input, textarea, select, [tabindex]')) {
        ring.classList.remove('cursor-ring--hover-cta', 'cursor-ring--hover-tiger', 'cursor-ring--hover-link');
        dot.classList.remove('cursor-dot--hidden');
      }
    };

    const onMouseLeave = () => hideCursor();
    const onMouseEnter = () => showCursor();

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
    </div>
  );
}
