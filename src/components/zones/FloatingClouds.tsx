interface FloatingCloudsProps {
  count?: number;
  className?: string;
}

/**
 * Pure CSS-animated floating cloud ellipses for sky zone sections.
 * Uses the .cloud-element class from cartoon-keyframes.css which applies:
 *   animation: cloud-float var(--cloud-duration, 20s) linear infinite
 * Reduced motion handled by the .cloud-element media query in cartoon-keyframes.css.
 */
export default function FloatingClouds({ count = 5, className }: FloatingCloudsProps) {
  // Stagger durations evenly between 15s and 30s
  const clouds = Array.from({ length: count }, (_, i) => {
    const duration = count > 1
      ? 15 + (15 * i) / (count - 1)
      : 20;

    // Vary positions, sizes, and opacity for visual variety
    const top = ((i * 37 + 13) % 80) + 5; // pseudo-random 5–85%
    const left = ((i * 53 + 7) % 90); // pseudo-random 0–90%
    const width = 80 + ((i * 43) % 121); // 80–200px
    const height = 30 + ((i * 17) % 31); // 30–60px
    const opacity = 0.4 + ((i * 23) % 31) / 100; // 0.4–0.7

    return { duration, top, left, width, height, opacity };
  });

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {clouds.map((cloud, i) => (
        <div
          key={i}
          className="cloud-element"
          style={{
            position: 'absolute',
            top: `${cloud.top}%`,
            left: `${cloud.left}%`,
            width: `${cloud.width}px`,
            height: `${cloud.height}px`,
            backgroundColor: 'white',
            borderRadius: '50%',
            opacity: cloud.opacity,
            ['--cloud-duration' as string]: `${cloud.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
