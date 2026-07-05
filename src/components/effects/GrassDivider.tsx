interface GrassDividerProps {
  /** Additional classes */
  className?: string;
}

/**
 * GrassDivider — Cartoon-style rolling green hills with defined outlines.
 * Vivid, saturated greens with visible strokes — like an illustrated children's book.
 * Layered hills with cartoon grass blades on top.
 */
export function GrassDivider({ className = '' }: GrassDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        height: 'clamp(90px, 14vw, 160px)',
        marginTop: '-1px',
        marginBottom: '-1px',
      }}
    >
      <svg
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        {/* Back hills — lightest green, cartoon outlined */}
        <path
          d="M0,160 L0,80
             C180,65 300,48 480,50
             C660,52 720,72 900,75
             C1080,78 1200,55 1440,60
             L1440,160 Z"
          fill="#A5D6A7"
          stroke="#2E7D32"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Mid hills — medium green */}
        <path
          d="M0,160 L0,95
             C120,86 260,68 420,70
             C580,72 680,92 840,94
             C1000,96 1100,74 1260,72
             C1380,70 1420,84 1440,88
             L1440,160 Z"
          fill="#66BB6A"
          stroke="#2E7D32"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Front hills — richest green */}
        <path
          d="M0,160 L0,112
             C100,105 200,96 340,98
             C480,100 560,115 720,118
             C880,121 960,104 1100,102
             C1240,100 1360,110 1440,114
             L1440,160 Z"
          fill="#43A047"
          stroke="#1B5E20"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Cartoon grass blades on top of front hill */}
        <g stroke="#1B5E20" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M50,112 L48,98 L52,102" />
          <path d="M55,111 L57,100 L53,104" />
          <path d="M150,106 L148,92 L152,96" />
          <path d="M155,105 L157,94 L153,98" />
          <path d="M300,100 L298,86 L302,90" />
          <path d="M305,99 L307,88 L303,92" />
          <path d="M450,103 L448,89 L452,93" />
          <path d="M455,102 L457,91 L453,95" />
          <path d="M600,110 L598,96 L602,100" />
          <path d="M605,109 L607,98 L603,102" />
          <path d="M750,117 L748,103 L752,107" />
          <path d="M755,116 L757,105 L753,109" />
          <path d="M900,112 L898,98 L902,102" />
          <path d="M905,111 L907,100 L903,104" />
          <path d="M1050,105 L1048,91 L1052,95" />
          <path d="M1055,104 L1057,93 L1053,97" />
          <path d="M1200,103 L1198,89 L1202,93" />
          <path d="M1205,102 L1207,91 L1203,95" />
          <path d="M1350,108 L1348,94 L1352,98" />
          <path d="M1355,107 L1357,96 L1353,100" />
        </g>
      </svg>
    </div>
  );
}

export default GrassDivider;
