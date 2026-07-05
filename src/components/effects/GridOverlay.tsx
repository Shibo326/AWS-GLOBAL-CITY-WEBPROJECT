'use client';

/**
 * GridOverlay — A subtle 1px grid at 40px intervals.
 * Static overlay using repeating-linear-gradient (no animation needed).
 */
export function GridOverlay() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          repeating-linear-gradient(0deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 40px),
          repeating-linear-gradient(90deg, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 40px)
        `,
      }}
    />
  );
}
