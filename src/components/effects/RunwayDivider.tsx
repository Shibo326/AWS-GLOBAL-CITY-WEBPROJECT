interface RunwayDividerProps {
  /** Additional classes */
  className?: string;
}

/**
 * RunwayDivider — The final descent. Smooth transition from green land to dark asphalt runway.
 * Features a gentle curved top edge and subtle dashed center line markings.
 * Represents Rory touching down at the airport after flying over countryside.
 */
export function RunwayDivider({ className = '' }: RunwayDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        height: 'clamp(60px, 8vw, 100px)',
        marginTop: '-1px',
        marginBottom: '-1px',
      }}
    >
      <svg
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {/* Asphalt gradient — slightly lighter at top for the transition feel */}
          <linearGradient id="runway-asphalt" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1F2937" />
          </linearGradient>

          {/* Edge gradient — blends green land into asphalt */}
          <linearGradient id="runway-edge" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#374151" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
        </defs>

        {/* Soft edge transition — blends green into dark asphalt */}
        <path
          d="M0,100 L0,28
             C180,20 360,12 540,14
             C720,16 900,24 1080,22
             C1260,20 1380,16 1440,18
             L1440,100 Z"
          fill="url(#runway-edge)"
        />

        {/* Main asphalt body — gentle curve at the top */}
        <path
          d="M0,100 L0,38
             C200,32 400,26 600,28
             C800,30 1000,36 1200,34
             C1340,32 1400,30 1440,32
             L1440,100 Z"
          fill="url(#runway-asphalt)"
        />

        {/* Runway center dashes — perspective-adjusted dashes getting wider */}
        <line
          x1="320" y1="68"
          x2="380" y2="68"
          stroke="#9CA3AF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
        <line
          x1="460" y1="68"
          x2="530" y2="68"
          stroke="#9CA3AF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
        <line
          x1="620" y1="68"
          x2="700" y2="68"
          stroke="#D1D5DB"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <line
          x1="800" y1="68"
          x2="890" y2="68"
          stroke="#D1D5DB"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.7"
        />
        <line
          x1="990" y1="68"
          x2="1090" y2="68"
          stroke="#9CA3AF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />
        <line
          x1="1180" y1="68"
          x2="1260" y2="68"
          stroke="#9CA3AF"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Subtle runway edge lines */}
        <line
          x1="200" y1="85"
          x2="1240" y2="85"
          stroke="#6B7280"
          strokeWidth="1"
          strokeDasharray="none"
          opacity="0.2"
        />
        <line
          x1="200" y1="52"
          x2="1240" y2="52"
          stroke="#6B7280"
          strokeWidth="1"
          strokeDasharray="none"
          opacity="0.15"
        />
      </svg>
    </div>
  );
}

export default RunwayDivider;
