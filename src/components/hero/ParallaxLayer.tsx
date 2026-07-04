'use client';

import { useParallax } from '@/hooks/useParallax';
import { useIsMobile } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';

interface ParallaxLayerProps {
  speed: number;
  className?: string;
  children: React.ReactNode;
  /** If true, this layer is hidden on mobile (< 768px) */
  mobileHidden?: boolean;
}

/**
 * ParallaxLayer — Wraps children in a scroll-linked translateY container.
 * Uses the useParallax hook for RAF-driven smooth transforms.
 * On mobile, disabled layers are hidden entirely to save performance.
 */
export default function ParallaxLayer({
  speed,
  className,
  children,
  mobileHidden = false,
}: ParallaxLayerProps) {
  const isMobile = useIsMobile();
  const { ref, style } = useParallax({ speed: isMobile ? 0 : speed });

  if (isMobile && mobileHidden) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={cn('absolute inset-0', className)}
      style={isMobile ? undefined : style}
    >
      {children}
    </div>
  );
}
