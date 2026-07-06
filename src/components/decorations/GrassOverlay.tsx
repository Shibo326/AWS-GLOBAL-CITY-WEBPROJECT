/**
 * GrassOverlay — Dense, organic cartoon grass blades that sit at the top edge
 * of ground/airfield zones. Multiple blade shapes (curved, split-tip, wispy, chunky),
 * scattered flowers, blade clustering, layered depth, and a solid base strip.
 * Rides the wave divider edge for organic transition between zones.
 * CSS sway animation. Respects prefers-reduced-motion.
 *
 * FIXED: Blades now use pure even distribution across the full SVG width (10–990)
 * with only ±5 units of jitter per slot. Overflow set to hidden for proper rendering.
 */

interface GrassBlade {
  x: number;       // position along width (0–1000 SVG units)
  height: number;  // blade height in SVG units
  width: number;   // blade base width
  lean: number;    // lean offset at tip
  delay: number;   // animation delay (s)
  color: string;   // green shade
  type: 'curved' | 'split' | 'wispy' | 'chunky' | 'straight';
  depth: number;   // 0 = back layer, 1 = front layer
}

interface FlowerDot {
  x: number;
  y: number;
  size: number;
  color: string;
  petalCount: number;
}

const GREENS_FRONT = ['#4CAF50', '#66BB6A', '#43A047', '#5CB85C', '#81C784', '#6ECF6E'];
const GREENS_BACK = ['#2E7D32', '#388E3C', '#1B5E20', '#33691E', '#2E7D32', '#3E8E3E'];
const FLOWER_COLORS = ['#FF9900', '#FFB74D', '#FFF176', '#FF8A65', '#FFCC02', '#FFE082'];

const BLADE_TYPES: GrassBlade['type'][] = ['curved', 'split', 'wispy', 'chunky', 'straight'];

interface GrassOverlayProps {
  /** Number of grass blades (default 65) */
  bladeCount?: number;
  /** Additional classes */
  className?: string;
  /** Variant determines green shade mix */
  variant?: 'ground' | 'airfield';
}

/** Deterministic pseudo-random based on seed */
function seededValue(seed: number, mod: number): number {
  return ((seed * 1103515245 + 12345) & 0x7fffffff) % mod;
}

export default function GrassOverlay({
  bladeCount = 65,
  className,
  variant = 'ground',
}: GrassOverlayProps) {
  // Generate blade data deterministically
  const blades: GrassBlade[] = Array.from({ length: bladeCount }, (_, i) => {
    const seed = i * 31 + 7;

    // FIXED: Pure even distribution across full width (10–990)
    // Each blade gets its own "slot" and only jitters ±5 units within it
    const slotWidth = 980 / bladeCount; // total usable width divided evenly
    const slotCenter = 10 + (i + 0.5) * slotWidth; // center of each slot
    const jitter = (seededValue(seed * 13, 11) - 5); // ±5 SVG units max
    const x = Math.max(10, Math.min(990, slotCenter + jitter));

    // Height varies dramatically: 10–55 SVG units
    const height = 10 + seededValue(seed + 1, 46); // 10–55
    // Width varies: 3–8 for base
    const width = 3 + seededValue(seed + 2, 6); // 3–8
    // Lean: -6 to +6
    const lean = (seededValue(seed + 3, 13)) - 6;
    // Animation delay stagger
    const delay = (seededValue(seed + 4, 35)) / 10; // 0–3.5s
    // Blade type
    const typeIndex = seededValue(seed + 5, BLADE_TYPES.length);
    const type = BLADE_TYPES[typeIndex];
    // Depth layer (roughly 40% back, 60% front)
    const depth = seededValue(seed + 6, 10) < 4 ? 0 : 1;
    // Color selection based on depth and variant
    const colorArr = depth === 0 ? GREENS_BACK : GREENS_FRONT;
    const colorIndex = variant === 'airfield'
      ? seededValue(seed + 7, 3) + 3 // lighter range for airfield
      : seededValue(seed + 7, colorArr.length);
    const color = colorArr[Math.min(colorIndex, colorArr.length - 1)];

    return { x, height, width, lean, delay, color, type, depth };
  });

  // Sort blades by depth so back layer renders first
  const sortedBlades = [...blades].sort((a, b) => a.depth - b.depth);

  // Generate 6–8 tiny flowers scattered among the grass
  const flowerCount = 6 + seededValue(bladeCount, 3); // 6–8 flowers
  const flowers: FlowerDot[] = Array.from({ length: flowerCount }, (_, i) => {
    const seed = (i + 1) * 47 + bladeCount;
    return {
      x: 50 + seededValue(seed, 900), // 50–950
      y: 30 + seededValue(seed + 1, 18), // 30–48 (near base)
      size: 3 + seededValue(seed + 2, 3), // 3–5
      color: FLOWER_COLORS[seededValue(seed + 3, FLOWER_COLORS.length)],
      petalCount: 3 + seededValue(seed + 4, 2), // 3–4 petals
    };
  });

  /** Generate SVG path for a single blade based on its type */
  function bladePath(blade: GrassBlade): string {
    const { x, height, width, lean, type } = blade;
    const halfW = width / 2;
    const tipX = x + lean;
    const baseY = 55; // bottom baseline
    const tipY = baseY - height;

    switch (type) {
      case 'curved': {
        // Quadratic bezier curve — single smooth arc
        const cpX = x + lean * 1.5;
        const cpY = baseY - height * 0.6;
        return `M${x - halfW},${baseY} Q${cpX},${cpY} ${tipX},${tipY} Q${cpX + halfW},${cpY} ${x + halfW},${baseY} Z`;
      }
      case 'split': {
        // Forked tip — two small points at the top
        const forkSpread = 2;
        const forkHeight = height * 0.12;
        const midTipY = tipY + forkHeight;
        return `M${x - halfW},${baseY} L${tipX - forkSpread},${tipY} L${tipX},${midTipY} L${tipX + forkSpread},${tipY} L${x + halfW},${baseY} Z`;
      }
      case 'wispy': {
        // Very thin, tall, slightly curved
        const thinW = Math.max(1.5, halfW * 0.5);
        const cpX = x + lean * 2;
        const cpY = baseY - height * 0.5;
        return `M${x - thinW},${baseY} Q${cpX},${cpY} ${tipX},${tipY} Q${cpX + thinW},${cpY} ${x + thinW},${baseY} Z`;
      }
      case 'chunky': {
        // Wide, shorter, rounded appearance — thicker bezier
        const bigW = halfW * 1.3;
        const cpX = x + lean * 0.8;
        const cpY = baseY - height * 0.55;
        return `M${x - bigW},${baseY} Q${cpX - bigW * 0.3},${cpY} ${tipX},${tipY} Q${cpX + bigW * 0.3},${cpY} ${x + bigW},${baseY} Z`;
      }
      case 'straight':
      default: {
        // Simple triangle (classic)
        return `M${x - halfW},${baseY} L${tipX},${tipY} L${x + halfW},${baseY} Z`;
      }
    }
  }

  /** Generate a small flower SVG group */
  function flowerSvg(flower: FlowerDot, index: number): React.ReactElement {
    const { x, y, size, color, petalCount } = flower;
    const petals: React.ReactElement[] = [];
    const angleStep = 360 / petalCount;

    for (let p = 0; p < petalCount; p++) {
      const angle = (angleStep * p * Math.PI) / 180;
      const px = x + Math.cos(angle) * size * 0.8;
      const py = y + Math.sin(angle) * size * 0.8;
      petals.push(
        <circle
          key={`petal-${index}-${p}`}
          cx={px}
          cy={py}
          r={size * 0.5}
          fill={color}
          opacity={0.9}
        />
      );
    }

    return (
      <g key={`flower-${index}`}>
        {petals}
        {/* Center dot */}
        <circle cx={x} cy={y} r={size * 0.3} fill="#FFFFFF" opacity={0.9} />
      </g>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`grass-overlay ${className ?? ''}`}
      style={{
        position: 'absolute',
        top: '-2px',
        left: 0,
        right: 0,
        height: '60px',
        pointerEvents: 'none',
        zIndex: 11,
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 1000 60"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block' }}
      >
        {/* Solid green base strip at the very bottom — connects all blades */}
        <rect
          x="0"
          y="52"
          width="1000"
          height="8"
          fill={variant === 'airfield' ? '#5CB85C' : '#43A047'}
          rx="0"
        />

        {/* Back layer blades (darker, behind) */}
        {sortedBlades
          .filter((b) => b.depth === 0)
          .map((blade, i) => (
            <path
              key={`back-${i}`}
              d={bladePath(blade)}
              fill={blade.color}
              stroke="#1A1A2A"
              strokeWidth="0.3"
              opacity={0.75}
              className="grass-blade"
              style={{
                transformOrigin: `${blade.x}px 55px`,
                ['--grass-sway-delay' as string]: `${blade.delay}s`,
              }}
            />
          ))}

        {/* Front layer blades (brighter, on top) */}
        {sortedBlades
          .filter((b) => b.depth === 1)
          .map((blade, i) => (
            <path
              key={`front-${i}`}
              d={bladePath(blade)}
              fill={blade.color}
              stroke="#1A1A2A"
              strokeWidth="0.4"
              className="grass-blade"
              style={{
                transformOrigin: `${blade.x}px 55px`,
                ['--grass-sway-delay' as string]: `${blade.delay}s`,
              }}
            />
          ))}

        {/* Small flowers scattered among the grass */}
        {flowers.map((flower, i) => flowerSvg(flower, i))}
      </svg>
    </div>
  );
}
