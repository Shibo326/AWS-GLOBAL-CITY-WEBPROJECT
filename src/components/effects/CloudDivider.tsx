interface CloudDividerProps {
  /** Flip vertically — use at top of a section */
  flip?: boolean;
  /** Color variant matching the section below */
  variant?: 'white' | 'soft' | 'warm';
  /** Additional classes */
  className?: string;
}

/**
 * CloudDivider — Smooth rolling cumulus cloud wave between sections.
 * Multi-layered soft bumps with subtle shadow for depth.
 * Think "looking down at cloud cover from an airplane" — gentle, organic, rounded.
 */
export function CloudDivider({ flip = false, variant = 'white', className = '' }: CloudDividerProps) {
  const fills = {
    white: '#FFFFFF',
    soft: '#F8FAFB',
    warm: '#FFFCF7',
  };

  const fill = fills[variant];

  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        height: 'clamp(60px, 10vw, 120px)',
        marginTop: '-1px',
        marginBottom: '-1px',
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* Shadow layer — slightly offset, very subtle depth */}
        <path
          d="M0,120 L0,78
             C80,72 160,58 280,54
             C400,50 440,66 560,68
             C680,70 720,52 840,48
             C960,44 1040,62 1160,66
             C1280,70 1360,56 1440,52
             L1440,120 Z"
          fill="#E2E8F0"
          opacity="0.35"
        />

        {/* Main cloud shape — soft rounded bumps */}
        <path
          d="M0,120 L0,72
             C100,68 180,50 300,46
             C420,42 480,62 600,64
             C720,66 760,44 880,40
             C1000,36 1080,58 1200,62
             C1320,66 1380,50 1440,46
             L1440,120 Z"
          fill={fill}
        />

        {/* Foreground bump — adds a closer cloud layer for depth */}
        <path
          d="M0,120 L0,88
             C140,84 220,70 380,68
             C540,66 620,82 780,84
             C940,86 1020,72 1140,68
             C1260,64 1360,78 1440,82
             L1440,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

export default CloudDivider;
