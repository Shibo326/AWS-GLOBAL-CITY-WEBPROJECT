import { WAVE_PATHS } from '@/lib/zones';

interface WaveDividerProps {
  /** Wave path shape variant (1–4) */
  type?: 1 | 2 | 3 | 4;
  /** Fill color — should match the DESTINATION zone color */
  fillColor: string;
  /** Flip vertically for inverted placement */
  flip?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export default function WaveDivider({
  type = 1,
  fillColor,
  flip = false,
  className = '',
}: WaveDividerProps) {
  // Default to type 1 if invalid type provided
  const validType = ([1, 2, 3, 4] as const).includes(type as 1 | 2 | 3 | 4)
    ? (type as 1 | 2 | 3 | 4)
    : 1;

  const pathD = WAVE_PATHS[validType];

  return (
    <div
      className={`absolute bottom-[-1px] left-0 z-10 w-full h-[40px] md:h-[60px] lg:h-[80px] ${className}`}
      style={flip ? { transform: 'scaleY(-1)' } : undefined}
    >
      <svg
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="w-full h-full"
      >
        <path d={pathD} fill={fillColor} />
      </svg>
    </div>
  );
}
