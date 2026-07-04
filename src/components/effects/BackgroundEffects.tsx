'use client';

import { usePageVisibility } from '@/hooks/usePageVisibility';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { GradientEllipses } from './GradientEllipses';
import { GridOverlay } from './GridOverlay';
import { Scanlines } from './Scanlines';
import { StarField } from './StarField';

/**
 * BackgroundEffects — Fixed container rendering all decorative background layers.
 * - Covers the entire viewport at z-index 0, behind all content
 * - pointer-events: none so it doesn't block interactions
 * - aria-hidden="true" since all content is purely decorative
 * - Pauses all CSS animations when the tab is hidden (Page Visibility API)
 * - Skips animated elements entirely when reduced motion is preferred
 */
export function BackgroundEffects() {
  const isHidden = usePageVisibility();
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${
        isHidden ? 'animations-paused' : ''
      }`}
    >
      {/* Grid overlay — static, always rendered */}
      <GridOverlay />

      {/* Scanlines — static, always rendered */}
      <Scanlines />

      {/* Animated elements — skip when reduced motion is preferred */}
      {!prefersReducedMotion && (
        <>
          <GradientEllipses />
          <StarField />
        </>
      )}
    </div>
  );
}
