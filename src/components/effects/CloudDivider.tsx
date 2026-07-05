interface CloudDividerProps {
  /** Flip vertically — use at top of a section */
  flip?: boolean;
  /** @deprecated — variant is ignored; kept for backwards compatibility */
  variant?: 'white' | 'soft' | 'warm';
  /** Additional classes */
  className?: string;
}

/**
 * CloudDivider — Smooth transition from sky blue to warm cream.
 * Soft, fluffy cloud shapes without outlines — feels like descending
 * through clouds into the warm cream zone below.
 * Only used ONCE at the sky-to-cloud zone boundary.
 */
export function CloudDivider({ flip = false, className = '' }: CloudDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        height: 'clamp(80px, 14vw, 150px)',
        marginTop: '-1px',
        marginBottom: '-1px',
        transform: flip ? 'scaleY(-1)' : undefined,
      }}
    >
      {/* Sky gradient background that matches what's above */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #B3E5FC 0%, #D4EDFC 100%)' }}
      />

      <svg
        viewBox="0 0 1440 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {/* Soft fade from sky to cream */}
          <linearGradient id="cloud-fade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFDE7" stopOpacity="0" />
            <stop offset="40%" stopColor="#FFFDE7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFDE7" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Base cream fill at the bottom */}
        <rect x="0" y="80" width="1440" height="70" fill="#FFFDE7" />

        {/* Back cloud layer — softer, higher */}
        <path
          d="M0,150 L0,70
             C60,65 120,50 200,48
             C280,46 340,58 420,60
             C500,62 560,46 660,42
             C760,38 840,54 940,56
             C1040,58 1100,44 1200,40
             C1300,36 1380,52 1440,55
             L1440,150 Z"
          fill="#FFFDE7"
          opacity="0.7"
        />

        {/* Front cloud layer — cream, fully opaque, lower */}
        <path
          d="M0,150 L0,85
             C100,78 180,64 280,60
             C380,56 460,72 560,74
             C660,76 740,58 860,54
             C980,50 1060,68 1160,72
             C1260,76 1340,62 1440,66
             L1440,150 Z"
          fill="#FFFDE7"
        />

        {/* Subtle white wisps for cloud texture */}
        <path
          d="M200,72 C240,66 280,62 320,64 C360,66 380,72 400,70"
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M700,60 C740,54 780,52 820,55 C860,58 880,62 920,60"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M1100,56 C1130,50 1160,48 1190,51 C1220,54 1240,58 1260,56"
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default CloudDivider;
