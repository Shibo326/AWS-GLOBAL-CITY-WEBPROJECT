'use client';

import { useMemo } from 'react';

/**
 * StarField — Sparse cloud wisps as subtle dots with twinkle animation.
 * Uses sky whites and blues with occasional gold sun flares.
 */
export function StarField() {
  const colors = ['#FFFFFF', '#F0F9FF', '#E0F2FE', '#BAE6FD', '#FFF7ED', '#FBBF24', '#FFFFFF'];

  const stars = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      const size = 2 + (i % 4); // 2-5px
      const top = Math.round((i * 100) / 40 + ((i * 7) % 10));
      const left = Math.round(((i * 137) % 100));
      const delay = (i * 0.3) % 5;
      const color = colors[i % colors.length];

      return { id: i, size, top: top % 100, left, delay, color };
    });
  }, []);

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-twinkle absolute rounded-full"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            backgroundColor: star.color,
            opacity: 0.3,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </>
  );
}
