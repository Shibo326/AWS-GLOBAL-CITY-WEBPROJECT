// =============================================================================
// AWS Cloud Club — Global City: Design Tokens & Constants
// =============================================================================

/** Color system tokens — Cloud Pilot palette */
export const colors = {
  background: '#E0F2FE',
  surface: '#F8FAFC',
  card: '#FFFFFF',
  primaryText: '#1E293B',
  secondaryText: '#475569',
  accentOrange: '#FF9900',
  accentBlue: '#38BDF8',
  skyDeep: '#0C4A6E',
  skyMid: '#0369A1',
  skyLight: '#7DD3FC',
  roryAmber: '#F59E0B',
  roryGold: '#FBBF24',
  border: 'rgba(148, 163, 184, 0.15)',
  glow: 'rgba(56, 189, 248, 0.12)',
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
  { label: 'Join Now', href: '/enlist' },
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
