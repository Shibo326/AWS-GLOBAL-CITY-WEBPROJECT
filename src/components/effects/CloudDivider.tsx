interface CloudDividerProps {
  /** Flip vertically — use at top of a section */
  flip?: boolean;
  /** Color variant matching the section below */
  variant?: 'white' | 'soft' | 'warm';
  /** Additional classes */
  className?: string;
}

/**
 * CloudDivider — Cartoon-style fluffy cloud wave between sections.
 * Solid fill with visible outline strokes — illustrated storybook feel.
 * Bumpy, chunky cloud shapes that look hand-drawn.
 */
export function CloudDivider({ flip = false, variant = 'white', className = '' }: CloudDividerProps) {
  const fills = {
    white: '#FFFDE7',
    soft: '#FFF8E1',
    warm: '#FFE0B2',
  };

  const fill = fills[variant];

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        height: 'clamp(70px, 12vw, 130px)',
        marginTop: '-1px',
        marginBottom: '-1px',
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* Back cloud bumps — chunky cartoon shapes */}
        <path
          d="M0,130 L0,75
             C60,70 100,50 160,48
             C220,46 260,60 320,62
             C380,64 420,45 500,42
             C580,39 640,55 720,58
             C800,61 860,40 940,38
             C1020,36 1080,52 1160,55
             C1240,58 1300,42 1380,40
             L1440,38 L1440,130 Z"
          fill={fill}
          stroke="#2D2D44"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Front cloud bumps — closer, rounder, more defined */}
        <path
          d="M0,130 L0,88
             C80,82 140,65 220,62
             C300,59 360,76 440,78
             C520,80 580,62 680,58
             C780,54 840,72 940,75
             C1040,78 1100,60 1200,57
             C1300,54 1380,70 1440,74
             L1440,130 Z"
          fill={fill}
          stroke="#2D2D44"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default CloudDivider;
