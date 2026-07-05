'use client';

/**
 * Scanlines — Faint horizontal lines using a repeating linear gradient.
 * 2px repeating pattern at very low opacity. Static overlay, no animation.
 */
export function Scanlines() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(0,0,0,0.012) 1px, rgba(0,0,0,0.012) 2px)',
        backgroundSize: '100% 2px',
      }}
    />
  );
}
