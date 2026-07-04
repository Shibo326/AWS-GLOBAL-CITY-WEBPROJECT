'use client';

/**
 * Scanlines — Faint horizontal scanlines using a repeating linear gradient.
 * 2px repeating pattern at opacity 0.015. Static overlay, no animation.
 */
export function Scanlines() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(255,255,255,0.015) 1px, rgba(255,255,255,0.015) 2px)',
        backgroundSize: '100% 2px',
      }}
    />
  );
}
