/**
 * CartoonSun — Illustrated cartoon sun with triangular rays.
 * Positioned in the hero's top-right corner.
 * Pure CSS rotation animation (60s full cycle). Respects prefers-reduced-motion.
 */

export default function CartoonSun() {
  // Generate 12 evenly-spaced ray angles
  const rayCount = 12;
  const rays = Array.from({ length: rayCount }, (_, i) => (360 / rayCount) * i);

  return (
    <div
      aria-hidden="true"
      className="cartoon-sun"
      style={{
        position: 'absolute',
        top: '5%',
        right: '5%',
        width: 'clamp(80px, 12vw, 140px)',
        height: 'clamp(80px, 12vw, 140px)',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="sun-rotate"
      >
        {/* Rays — triangular points */}
        {rays.map((angle, i) => (
          <polygon
            key={i}
            points="100,15 94,40 106,40"
            fill="#FFB300"
            stroke="#1A1A2A"
            strokeWidth="1.5"
            strokeLinejoin="round"
            transform={`rotate(${angle}, 100, 100)`}
          />
        ))}

        {/* Main circle — orange/yellow gradient */}
        <circle
          cx="100"
          cy="100"
          r="45"
          fill="url(#sunGradient)"
          stroke="#1A1A2A"
          strokeWidth="2.5"
        />

        {/* Inner highlight */}
        <circle
          cx="90"
          cy="88"
          r="15"
          fill="rgba(255, 255, 255, 0.35)"
        />

        {/* Gradient definition */}
        <defs>
          <radialGradient id="sunGradient" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFD54F" />
            <stop offset="70%" stopColor="#FFA726" />
            <stop offset="100%" stopColor="#FF8C00" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
