import type { Variants, MotionProps } from 'framer-motion';

// =============================================================================
// Framer Motion Variant Library
// AWS Cloud Club — Global City
// =============================================================================

/** Scroll reveal: fade in + slide up from 40px */
export const scrollRevealVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/** Card reveal: fade in + slide up + rotateX correction */
export const cardRevealVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: 4 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/** Stagger container: staggers children by 80ms */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/** Spring entry: slide in from right with spring physics */
export const springEntry: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

/** Fade in up: subtle 24px rise with custom ease */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Scale in: grow from 0.9 with spring */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

/** Slide from left: 40px offset with easeOut */
export const slideFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/** Slide from right: 40px offset with spring */
export const slideFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

/** Page transition variants: blur + translateY for route changes */
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: 'blur(2px)',
    transition: { duration: 0.25, ease: 'easeIn' },
  },
};

/** Stamp effect: scale overshoot + slight rotation */
export const stampVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.08,
    rotate: -1,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      scale: { type: 'spring', stiffness: 300, damping: 15 },
    },
  },
};

/** Benefit card variants: staggered by custom index */
export const benefitCardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  }),
};

/** Chat bubble: spring entrance from below */
export const chatBubbleVariants: Variants = {
  initial: { opacity: 0, y: 12, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 25 },
  },
};

/** Typing indicator: bouncing dots */
export const typingIndicatorVariants: Variants = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatDelay: 0.1,
    },
  },
};

/** Wingman panel: clip-path circle expansion from bottom-right */
export const panelVariants: Variants = {
  closed: {
    clipPath: 'circle(0% at calc(100% - 32px) calc(100% - 32px))',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
  open: {
    clipPath: 'circle(150% at calc(100% - 32px) calc(100% - 32px))',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

/** Mobile menu: slide from right with spring */
export const mobileMenuVariants: Variants = {
  closed: {
    x: '100%',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  open: {
    x: '0%',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

/** Mobile menu backdrop: fade in/out */
export const menuBackdropVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.3 } },
};

/** Mobile menu items: staggered slide from right */
export const menuItemVariants: Variants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, type: 'spring', stiffness: 300 },
  }),
};

// =============================================================================
// Motion Presets (non-variant props for whileHover, whileTap, etc.)
// =============================================================================

/** Button hover/tap feedback */
export const buttonMotion = {
  whileHover: { scale: 1.02, transition: { type: 'spring', stiffness: 400 } },
  whileTap: { scale: 0.97 },
} satisfies MotionProps;

/** Card hover lift with glow shadow */
export const cardMotion = {
  whileHover: {
    y: -8,
    boxShadow: '0 20px 60px rgba(56, 189, 248, 0.12)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
} satisfies MotionProps;

/** Icon hover rotate + scale */
export const iconMotion = {
  whileHover: { rotate: 12, scale: 1.1 },
  whileTap: { scale: 0.9 },
  transition: { type: 'spring', stiffness: 400, damping: 10 },
} satisfies MotionProps;

/** List item layout animation with enter/exit */
export const listItemMotion = {
  layout: true,
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
} satisfies MotionProps;

/** FAB expand: scale from circle to rounded rectangle */
export const fabExpandMotion = {
  initial: { scale: 0, borderRadius: '50%' },
  animate: {
    scale: 1,
    borderRadius: '16px',
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
  exit: {
    scale: 0,
    borderRadius: '50%',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
} satisfies MotionProps;
