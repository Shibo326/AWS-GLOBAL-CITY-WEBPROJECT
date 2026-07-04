// =============================================================================
// AWS Cloud Club — Global City: Design Tokens & Constants
// =============================================================================

/** Color system tokens */
export const colors = {
  background: '#0A0C10',
  surface: '#111318',
  card: '#161B24',
  primaryText: '#F5F0E8',
  secondaryText: '#8A9BB5',
  accentOrange: '#FF9900',
  accentBlue: '#4DA3FF',
  border: 'rgba(255,255,255,0.06)',
  glow: 'rgba(77,163,255,0.12)',
} as const;

/** Responsive breakpoints in pixels */
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
} as const;

/** Animation timing values in milliseconds */
export const timing = {
  loadSequenceDuration: 2400,
  scrollRevealDuration: 600,
  scrollRevealStagger: 80,
  navTransitionDuration: 300,
  cardFlipDuration: 500,
  countUpDuration: 1800,
  scanLineSweep: 600,
  marqueeLoop: 40000,
  marqueeLoopMobile: 20000,
  hoverLinkUnderline: 250,
  stampIn: 400,
  typewriterCharDelay: 50,
  statusPulseBlue: 2000,
  statusPulseOrange: 1200,
  blinkGreenDot: 1000,
  glowPulseOrange: 3000,
} as const;

/** Navigation links array */
export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Missions', href: '/missions' },
  { label: 'Crew', href: '/crew' },
  { label: 'Announcements', href: '/signals' },
  { label: 'Wingman', href: '/wingman' },
  { label: 'Enlist', href: '/enlist' },
] as const;

/** Social media links for the club */
export const socialLinks = {
  facebook: 'https://www.facebook.com/awslcstiglobal',
  github: '',
  linkedin: '',
  instagram: '',
} as const;

/** Available programs for the enlist form */
export const programs = [
  'BS Information Technology',
  'BS Computer Science',
  'BS Computer Engineering',
  'BS Information Systems',
  'BS Data Science',
  'BS Multimedia Arts',
  'BS Business Administration',
  'Other',
] as const;

/** Intersection observer thresholds */
export const observerThresholds = {
  scrollReveal: 0.15,
  aboutSnippet: 0.2,
  statsStrip: 0.5,
} as const;

/** Parallax speed factors */
export const parallaxSpeeds = {
  starField: 0.1,
  clouds: 0.2,
  tigerMascot: 0.5,
  headline: 1.0,
} as const;
