/**
 * NightSky — Twinkling stars and crescent moon for the night zone.
 * Pure CSS animations (opacity twinkle, staggered).
 * Respects prefers-reduced-motion.
 */

interface Star {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export default function NightSky() {
  // Generate 20 scattered stars
  const stars: Star[] = Array.from({ length: 20 }, (_, i) => ({
    x: ((i * 53 + 17) % 95) + 2, // 2–97%
    y: ((i * 37 + 7) % 85) + 5,  // 5–90%
    size: 2 + ((i * 11) % 3),     // 2–4px
    delay: ((i * 19) % 40) / 10,  // 0–4s stagger
    duration: 2 + ((i * 7) % 3),  // 2–4s cycle
  }));

  return (
    <div
      aria-hidden="true"
      className="night-sky-decorations"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Crescent Moon */}
      <div
        className="cartoon-moon"
        style={{
          position: 'absolute',
          top: '8%',
          right: '8%',
          width: 'clamp(50px, 8vw, 90px)',
          height: 'clamp(50px, 8vw, 90px)',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Moon body */}
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="#FFF9C4"
            stroke="#1A1A2A"
            strokeWidth="2"
          />
          {/* Crescent shadow overlay */}
          <circle
            cx="62"
            cy="45"
            r="28"
            fill="#1A1A2E"
          />
          {/* Small crater details */}
          <circle cx="38" cy="55" r="4" fill="rgba(255,224,130,0.5)" />
          <circle cx="45" cy="68" r="2.5" fill="rgba(255,224,130,0.4)" />
          <circle cx="34" cy="42" r="3" fill="rgba(255,224,130,0.3)" />
        </svg>
      </div>

      {/* Twinkling Stars */}
      {stars.map((star, i) => (
        <div
          key={i}
          className="twinkle-star"
          style={{
            position: 'absolute',
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size * 4}px`,
            height: `${star.size * 4}px`,
            ['--twinkle-delay' as string]: `${star.delay}s`,
            ['--twinkle-duration' as string]: `${star.duration}s`,
          }}
        >
          <svg
            viewBox="0 0 20 20"
            width="100%"
            height="100%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 4-point star shape */}
            <path
              d="M10,2 L11.5,8 L18,10 L11.5,12 L10,18 L8.5,12 L2,10 L8.5,8 Z"
              fill="#FFF9C4"
              stroke="#FFFFFF"
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
