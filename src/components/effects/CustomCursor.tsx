'use client';

import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/useMediaQuery';

export default function CustomCursor() {
  const isMobile = useIsMobile();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0; // mouse position
    let rx = 0, ry = 0; // ring position (lerped)
    let rafId: number;

    // Hide the default cursor
    document.body.style.cursor = 'none';

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot follows pointer exactly
      dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
    };

    const animate = () => {
      // Ring lerps toward mouse position
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0)`;
      rafId = requestAnimationFrame(animate);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      const isInteractive = target.closest('a, button, [role="button"]');

      // Reset classes
      ring.classList.remove('cursor-ring--hover-cta', 'cursor-ring--hover-tiger');
      dot.classList.remove('cursor-dot--hidden');

      if (cursorAttr === 'cta') {
        ring.classList.add('cursor-ring--hover-cta');
        dot.classList.add('cursor-dot--hidden');
      } else if (cursorAttr === 'tiger') {
        ring.classList.add('cursor-ring--hover-tiger');
        dot.classList.add('cursor-dot--hidden');
      } else if (isInteractive) {
        dot.classList.add('cursor-dot--hidden');
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest('[data-cursor], a, button, [role="button"]')) {
        ring.classList.remove('cursor-ring--hover-cta', 'cursor-ring--hover-tiger');
        dot.classList.remove('cursor-dot--hidden');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = '';
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </div>
  );
}
