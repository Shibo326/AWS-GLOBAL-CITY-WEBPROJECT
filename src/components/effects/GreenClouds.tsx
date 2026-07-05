'use client';

import { motion } from 'framer-motion';

interface GreenCloudsProps {
  /** Position variant for different section placements */
  variant?: 'top' | 'middle' | 'bottom';
  /** Additional classes */
  className?: string;
}

/**
 * GreenClouds — Decorative floating green cloud shapes for the missions page.
 * Gives a "descending through green altitude" feel as you scroll through missions.
 * Uses subtle greens that complement the sky palette — like flying over lush terrain.
 */
export function GreenClouds({ variant = 'middle', className = '' }: GreenCloudsProps) {
  const positions = {
    top: { top: '2%', left: '-5%', right: '80%' },
    middle: { top: '40%', left: '75%', right: '-5%' },
    bottom: { top: '75%', left: '-8%', right: '70%' },
  };

  const pos = positions[variant];

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {/* Primary green cloud blob */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-[0.12]"
        style={{
          top: pos.top,
          left: variant === 'middle' ? pos.left : pos.left,
          width: 'clamp(200px, 30vw, 400px)',
          height: 'clamp(100px, 15vw, 200px)',
          background: 'linear-gradient(135deg, #86EFAC 0%, #4ADE80 50%, #22C55E 100%)',
        }}
        animate={{
          x: [0, 15, 0, -10, 0],
          y: [0, -8, 0, 5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary smaller cloud */}
      <motion.div
        className="absolute rounded-full blur-2xl opacity-[0.08]"
        style={{
          top: variant === 'top' ? '15%' : variant === 'bottom' ? '60%' : '25%',
          right: variant === 'middle' ? '10%' : undefined,
          left: variant === 'middle' ? undefined : '60%',
          width: 'clamp(150px, 20vw, 280px)',
          height: 'clamp(80px, 10vw, 140px)',
          background: 'linear-gradient(135deg, #BBF7D0 0%, #86EFAC 100%)',
        }}
        animate={{
          x: [0, -12, 0, 8, 0],
          y: [0, 6, 0, -4, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 3,
        }}
      />

      {/* Tertiary wisp */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-[0.06]"
        style={{
          top: variant === 'top' ? '8%' : variant === 'bottom' ? '80%' : '55%',
          left: variant === 'top' ? '40%' : variant === 'bottom' ? '25%' : '5%',
          width: 'clamp(120px, 18vw, 240px)',
          height: 'clamp(60px, 8vw, 120px)',
          background: 'linear-gradient(180deg, #D1FAE5 0%, #6EE7B7 100%)',
        }}
        animate={{
          x: [0, 8, 0, -6, 0],
          y: [0, -5, 0, 3, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 6,
        }}
      />
    </div>
  );
}

export default GreenClouds;
