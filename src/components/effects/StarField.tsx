'use client';

import { useMemo } from 'react';

/**
 * StarField — 70 absolutely positioned dots (1-2px) with random twinkle keyframes.
 * Uses the .star-twinkle class from animations.css which provides varied durations
 * via nth-child selectors.
 */
export function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 70 }, (_, i) => {
      const size = 1 + (i % 2); // alternates between 1px and 2px
      const top = Math.round((i * 100) / 70 + ((i * 7) % 10)); // pseudo-random spread
      const left = Math.round(((i * 137) % 100)); // golden-ratio-ish spread for randomness
      const delay = (i * 0.3) % 5; // 0-5s stagger

      return { id: i, size, top: top % 100, left, delay };
    });
  }, []);

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-twinkle absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </>
  );
}
