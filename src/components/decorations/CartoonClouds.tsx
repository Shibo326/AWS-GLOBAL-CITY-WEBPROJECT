'use client';

/**
 * CartoonClouds — Puffy illustrated cartoon clouds with dark outlines.
 * FIXED: Clouds are STATICALLY POSITIONED across the full viewport width
 * using left/top percentages, with a gentle vertical bob animation.
 * No horizontal drift — clouds are always visible scattered across the sky.
 * Pure CSS animations — no JS runtime. Respects prefers-reduced-motion.
 */

interface CloudConfig {
  /** SVG path for the cloud shape */
  path: string;
  /** Width of the SVG viewBox */
  width: number;
  /** Height of the SVG viewBox */
  height: number;
}

/** Hand-drawn puffy cloud SVG paths (varied shapes) */
const CLOUD_SHAPES: CloudConfig[] = [
  {
    // Wide fluffy cloud
    path: 'M20,60 Q20,40 35,35 Q30,15 55,15 Q70,5 90,20 Q110,10 120,25 Q140,20 145,35 Q160,35 160,55 Q160,70 140,70 L30,70 Q20,70 20,60 Z',
    width: 180,
    height: 80,
  },
  {
    // Tall puffy cloud
    path: 'M15,55 Q15,40 30,35 Q25,20 45,15 Q55,5 70,12 Q85,5 95,18 Q110,15 115,30 Q130,30 130,50 Q130,65 110,65 L25,65 Q15,65 15,55 Z',
    width: 145,
    height: 75,
  },
  {
    // Small round cloud
    path: 'M12,40 Q12,28 25,25 Q22,12 40,10 Q52,5 62,15 Q75,10 80,25 Q90,25 90,38 Q90,50 75,50 L20,50 Q12,50 12,40 Z',
    width: 100,
    height: 58,
  },
  {
    // Long stretched cloud
    path: 'M15,45 Q15,32 30,28 Q28,15 50,12 Q65,5 80,15 Q95,8 110,18 Q125,12 135,25 Q150,22 155,35 Q165,35 165,48 Q165,58 145,58 L25,58 Q15,58 15,45 Z',
    width: 180,
    height: 65,
  },
  {
    // Compact bumpy cloud
    path: 'M10,38 Q10,26 22,22 Q20,10 38,8 Q50,2 60,12 Q72,6 80,18 Q92,16 95,30 Q100,30 100,40 Q100,50 85,50 L18,50 Q10,50 10,38 Z',
    width: 110,
    height: 55,
  },
];

/**
 * Static cloud positions — spread evenly across 5% to 95% of viewport width.
 * Each cloud has a unique left%, top%, size, bob duration, bob distance, and delay.
 */
const CLOUD_POSITIONS: Array<{
  left: number;
  top: number;
  size: number;
  bobDuration: number;
  bobDistance: number;
  bobDelay: number;
  opacity: number;
}> = [
  { left: 5, top: 15, size: 120, bobDuration: 14, bobDistance: -8, bobDelay: 0, opacity: 0.8 },
  { left: 20, top: 55, size: 90, bobDuration: 10, bobDistance: -6, bobDelay: -3, opacity: 0.75 },
  { left: 35, top: 25, size: 140, bobDuration: 16, bobDistance: -10, bobDelay: -7, opacity: 0.85 },
  { left: 50, top: 70, size: 100, bobDuration: 12, bobDistance: -7, bobDelay: -2, opacity: 0.7 },
  { left: 65, top: 20, size: 130, bobDuration: 18, bobDistance: -12, bobDelay: -5, opacity: 0.9 },
  { left: 80, top: 50, size: 110, bobDuration: 11, bobDistance: -9, bobDelay: -8, opacity: 0.78 },
  { left: 92, top: 35, size: 95, bobDuration: 15, bobDistance: -5, bobDelay: -4, opacity: 0.82 },
  { left: 12, top: 42, size: 85, bobDuration: 13, bobDistance: -7, bobDelay: -6, opacity: 0.72 },
  { left: 45, top: 10, size: 115, bobDuration: 20, bobDistance: -11, bobDelay: -1, opacity: 0.88 },
  { left: 72, top: 65, size: 100, bobDuration: 9, bobDistance: -6, bobDelay: -9, opacity: 0.74 },
];

interface CartoonCloudsProps {
  /** Number of clouds to render (default 7, max 10) */
  count?: number;
  /** Additional wrapper class */
  className?: string;
}

export default function CartoonClouds({ count = 7, className }: CartoonCloudsProps) {
  // Use the first `count` positions from our pre-defined array
  const cloudCount = Math.min(count, CLOUD_POSITIONS.length);

  return (
    <div
      aria-hidden="true"
      className={`cartoon-clouds-container ${className ?? ''}`}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {Array.from({ length: cloudCount }, (_, i) => {
        const pos = CLOUD_POSITIONS[i];
        const shape = CLOUD_SHAPES[i % CLOUD_SHAPES.length];

        return (
          <div
            key={i}
            className="cartoon-cloud-bob"
            style={{
              position: 'absolute',
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              width: `${pos.size}px`,
              opacity: pos.opacity,
              ['--cloud-bob-duration' as string]: `${pos.bobDuration}s`,
              ['--cloud-bob-distance' as string]: `${pos.bobDistance}px`,
              ['--cloud-bob-delay' as string]: `${pos.bobDelay}s`,
            }}
          >
            <svg
              viewBox={`0 0 ${shape.width} ${shape.height}`}
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Shadow layer — offset slightly */}
              <path
                d={shape.path}
                fill="rgba(0, 0, 0, 0.06)"
                transform="translate(2, 3)"
              />
              {/* White cloud body */}
              <path
                d={shape.path}
                fill="#FFFFFF"
                stroke="#1A1A2A"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
