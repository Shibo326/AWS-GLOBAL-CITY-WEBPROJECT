'use client';

import { useMemo } from 'react';

/**
 * GradientEllipses — Cloud-like blurred shapes drifting across the viewport.
 * Uses white/sky-blue colors to reinforce the cloud atmosphere.
 */
export function GradientEllipses() {
  const colors = [
    'rgba(255, 255, 255, 0.5)',     // pure white cloud
    'rgba(224, 242, 254, 0.4)',     // sky pale
    'rgba(186, 230, 253, 0.3)',     // sky blue
    'rgba(255, 255, 255, 0.45)',    // white
    'rgba(240, 249, 255, 0.35)',    // light sky
    'rgba(125, 211, 252, 0.2)',     // medium sky
    'rgba(255, 247, 237, 0.3)',     // sunrise warm
    'rgba(254, 243, 199, 0.2)',     // golden
  ];

  const ellipses = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const size = 200 + Math.round((i * 200) / 7);
      const blur = 20 + Math.round((i * 15) / 7);
      const opacity = 0.25 + (i % 3) * 0.1;
      const top = Math.round((i * 90) / 7);
      const left = -5 + Math.round((i * 110) / 7);
      const duration = 80 + Math.round((i * 60) / 7);
      const delay = -(i * 10);

      return { id: i, size, blur, opacity, top, left, duration, delay, color: colors[i] };
    });
  }, []);

  return (
    <>
      {ellipses.map((e) => (
        <div
          key={e.id}
          className="float-drift absolute"
          style={{
            width: `${e.size}px`,
            height: `${e.size * 0.6}px`,
            borderRadius: '60% 70% 50% 80% / 60% 50% 70% 40%',
            top: `${e.top}%`,
            left: `${e.left}%`,
            filter: `blur(${e.blur}px)`,
            opacity: e.opacity,
            background: `radial-gradient(ellipse, ${e.color} 0%, transparent 70%)`,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
          }}
        />
      ))}
    </>
  );
}
