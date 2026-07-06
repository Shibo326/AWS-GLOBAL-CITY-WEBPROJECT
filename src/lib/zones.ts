   // =============================================================================
// AWS Cloud Club — Global City: Zone Configuration & Constants
// Rory's World cartoon storybook zone system
// =============================================================================

/** Zone color mapping — single source of truth for all zone backgrounds */
export const ZONE_COLORS = {
  sky: '#87CEEB',
  cloud: '#F0F8FF',
  ground: '#F5EDD0',
  airfield: '#E8F0D8',
  hangar: '#D4E8D4',
  runway: '#2C3E50',
  night: '#1A1A2E',
} as const;

/** Union type of all valid zone names */
export type ZoneName = keyof typeof ZONE_COLORS;

/** Zone sequence for each route — defines the storybook flow order */
export const PAGE_ZONE_FLOWS: Record<string, ZoneName[]> = {
  '/': ['sky', 'cloud', 'cloud', 'ground', 'airfield', 'hangar', 'hangar', 'ground', 'night'],
  '/about': ['sky', 'cloud', 'ground', 'night'],
  '/missions': ['sky', 'ground', 'night'],
  '/crew': ['sky', 'hangar', 'night'],
  '/signals': ['sky', 'cloud', 'night'],
  '/wingman': ['sky', 'hangar', 'night'],
  '/enlist': ['sky', 'ground', 'night'],
};

/** SVG path d-attributes for 4 wave divider variants */
export const WAVE_PATHS: Record<1 | 2 | 3 | 4, string> = {
  1: 'M0,64 C320,120 640,20 960,80 C1120,100 1280,40 1440,64 L1440,160 L0,160 Z',
  2: 'M0,80 C240,40 480,120 720,60 C960,0 1200,100 1440,80 L1440,160 L0,160 Z',
  3: 'M0,40 C360,100 720,20 1080,80 C1260,100 1380,60 1440,40 L1440,160 L0,160 Z',
  4: 'M0,96 C180,60 360,120 540,80 C720,40 900,100 1080,60 C1260,20 1380,80 1440,96 L1440,160 L0,160 Z',
};
