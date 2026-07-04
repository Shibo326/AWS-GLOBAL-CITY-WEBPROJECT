'use client';

import { useMemo } from 'react';

/**
 * GradientEllipses — Subtle blurred blue-tinted ellipses drifting across the viewport.
 * Uses CSS animation (float-drift class from animations.css) for GPU-accelerated movement.
 * Kept at very low opacity to avoid overwhelming white blotches.
 */
export function GradientEllipses() {
  const ellipses = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const size = 120 + Math.round((i * 160) / 7); // 120-280px spread
      const blur = 60 + Math.round((i * 30) / 7); // 60-90px
      const opacity = 0.012 + (i % 3) * 0.006; // 0.012-0.024 (much subtler)
      const top = Math.round((i * 90) / 7); // 0-90% spread
      const left = -5 + Math.round((i * 110) / 7); // spread across viewport
      const duration = 80 + Math.round((i * 60) / 7); // 80-140s (slower drift)
      const delay = -(i * 10); // stagger starts

      return { id: i, size, blur, opacity, top, left, duration, delay };
    });
  }, []);

  return (
    <>
      {ellipses.map((e) => (
        <div
          key={e.id}
          className="float-drift absolute rounded-full"
          style={{
            width: `${e.size}px`,
            height: `${e.size}px`,
            top: `${e.top}%`,
            left: `${e.left}%`,
            filter: `blur(${e.blur}px)`,
            opacity: e.opacity,
            background: 'radial-gradient(circle, rgba(77, 163, 255, 0.4) 0%, rgba(255,255,255,0.2) 60%, transparent 100%)',
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
          }}
        />
      ))}
    </>
  );
}
