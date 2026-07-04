'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * TigerMascot — Rory waving video in the hero with mouse-tracking rotation.
 * Uses the looping MP4 video on desktop, falls back to static PNG on mobile.
 * Follows cursor with +/-8 degree rotation using lerp (0.08) via RAF.
 * Disabled on mobile for performance.
 */
export default function TigerMascot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  const LERP = 0.08;
  const MAX_ROTATION = 8;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normalizedX = (e.clientX - centerX) / (window.innerWidth / 2);
      const normalizedY = (e.clientY - centerY) / (window.innerHeight / 2);

      targetRef.current = {
        x: Math.max(-1, Math.min(1, normalizedY)) * MAX_ROTATION,
        y: Math.max(-1, Math.min(1, normalizedX)) * MAX_ROTATION,
      };
    },
    [],
  );

  const animate = useCallback(() => {
    rotateRef.current.x +=
      (targetRef.current.x - rotateRef.current.x) * LERP;
    rotateRef.current.y +=
      (targetRef.current.y - rotateRef.current.y) * LERP;

    if (containerRef.current) {
      containerRef.current.style.transform = `rotateX(${-rotateRef.current.x}deg) rotateY(${rotateRef.current.y}deg)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isMobile, handleMouseMove, animate]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        ref={containerRef}
        data-cursor="tiger"
        className="gpu-accelerated"
        aria-hidden="true"
      >
        {/* Video version on desktop — looping animated Rory waving */}
        {!isMobile && !prefersReducedMotion ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-[280px] h-[340px] md:w-[380px] md:h-[460px] object-contain drop-shadow-[0_0_40px_rgba(77,163,255,0.15)] select-none pointer-events-none"
            poster="/images/rory-waving.png"
          >
            <source src="/videos/rory-waving.mp4" type="video/mp4" />
          </video>
        ) : (
          /* Static PNG fallback on mobile or reduced motion */
          <img
            src="/images/rory-waving.png"
            alt=""
            className="w-[220px] h-[270px] object-contain drop-shadow-[0_0_30px_rgba(77,163,255,0.12)] select-none pointer-events-none"
            draggable={false}
          />
        )}
      </div>
    </div>
  );
}
