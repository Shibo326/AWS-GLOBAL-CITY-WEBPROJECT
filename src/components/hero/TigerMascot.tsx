'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useIsMobile } from '@/hooks/useMediaQuery';

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
        className="gpu-accelerated relative"
        aria-hidden="true"
      >
        {/* Cloud pillow — fully opaque white glow to completely mask any transparency artifacts */}
        <div
          className="absolute inset-[-15%] pointer-events-none"
          style={{
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 40%, rgba(186,230,253,0.3) 60%, transparent 75%)',
            filter: 'blur(15px)',
          }}
        />
        {/* Static PNG — proper transparency, no checkered artifacts */}
        <img
          src="/images/rory-waving.png"
          alt=""
          className="relative w-[280px] h-[340px] md:w-[380px] md:h-[460px] object-contain select-none pointer-events-none"
          style={{ filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))' }}
          draggable={false}
        />
      </div>
    </div>
  );
}
