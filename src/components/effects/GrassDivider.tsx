interface GrassDividerProps {
  /** Additional classes */
  className?: string;
}

/**
 * GrassDivider — Smooth rolling green hills (Windows XP Bliss style).
 * Multiple overlapping layers create depth — back hills lighter, front hills darker.
 * Rory is flying over lush green countryside toward the runway.
 * All curves use smooth cubic beziers for an organic, gentle undulation.
 */
export function GrassDivider({ className = '' }: GrassDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        height: 'clamp(80px, 12vw, 140px)',
        marginTop: '-1px',
        marginBottom: '-1px',
      }}
    >
      <svg
        viewBox="0 0 1440 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {/* Back hills — lightest green, furthest away */}
          <linearGradient id="grass-back" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BBF7D0" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>

          {/* Mid hills — medium green */}
          <linearGradient id="grass-mid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>

          {/* Front hills — richest green, closest */}
          <linearGradient id="grass-front" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>

        {/* Back layer — distant rolling hills, gentle and wide */}
        <path
          d="M0,140 L0,70
             C180,58 300,42 480,44
             C660,46 720,68 900,70
             C1080,72 1200,50 1440,54
             L1440,140 Z"
          fill="url(#grass-back)"
        />

        {/* Mid layer — medium depth hills with different rhythm */}
        <path
          d="M0,140 L0,86
             C120,78 260,60 420,62
             C580,64 680,84 840,86
             C1000,88 1100,66 1260,64
             C1380,62 1420,76 1440,80
             L1440,140 Z"
          fill="url(#grass-mid)"
        />

        {/* Front layer — closest hills, richest color */}
        <path
          d="M0,140 L0,102
             C100,96 200,88 340,90
             C480,92 560,106 720,108
             C880,110 960,94 1100,92
             C1240,90 1360,100 1440,104
             L1440,140 Z"
          fill="url(#grass-front)"
        />
      </svg>
    </div>
  );
}

export default GrassDivider;
