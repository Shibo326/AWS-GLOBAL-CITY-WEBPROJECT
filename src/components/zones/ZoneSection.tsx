import { type ZoneName } from '@/lib/zones';

interface ZoneSectionProps {
  /** Zone identifier for background styling */
  zone: 'sky' | 'cloud' | 'ground' | 'airfield' | 'hangar' | 'runway' | 'night';
  /** Section content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** HTML id for skip-nav targets */
  id?: string;
}

/** Maps each valid zone name to its corresponding CSS class */
const ZONE_CLASS_MAP: Record<ZoneName, string> = {
  sky: 'zone-sky',
  cloud: 'zone-cloud',
  ground: 'zone-ground',
  airfield: 'zone-airfield',
  hangar: 'zone-hangar',
  runway: 'zone-runway',
  night: 'zone-night',
};

const VALID_ZONES = new Set<string>(Object.keys(ZONE_CLASS_MAP));

/**
 * ZoneSection — Wrapper component that applies the correct zone background,
 * position: relative, and overflow: visible for WaveDivider children.
 */
export default function ZoneSection({ zone, children, className, id }: ZoneSectionProps) {
  let zoneClass: string;

  if (VALID_ZONES.has(zone)) {
    zoneClass = ZONE_CLASS_MAP[zone as ZoneName];
  } else {
    console.warn('ZoneSection: Invalid zone name, falling back to cloud');
    zoneClass = 'zone-cloud';
  }

  return (
    <section
      id={id}
      className={`zone-section ${zoneClass}${className ? ` ${className}` : ''}`}
    >
      {children}
    </section>
  );
}
