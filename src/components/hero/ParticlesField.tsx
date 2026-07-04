'use client';

import { useEffect, useState } from 'react';
import Particles from '@tsparticles/react';
import { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import type { ISourceOptions } from '@tsparticles/engine';

const particlesOptions: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 60,
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
      },
    },
    color: {
      value: '#ffffff',
    },
    opacity: {
      value: { min: 0.1, max: 0.4 },
      animation: {
        enable: true,
        speed: 0.3,
        sync: false,
      },
    },
    size: {
      value: { min: 0.5, max: 1.5 },
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: 'none',
      random: true,
      straight: false,
      outModes: {
        default: 'out',
      },
    },
  },
  detectRetina: true,
};

/**
 * ParticlesField — GPU-accelerated tsParticles star field.
 * Renders 70 small white dots with slow random movement and low opacity.
 * Uses @tsparticles/slim engine for minimal bundle size.
 */
export default function ParticlesField() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setReady(true);
    });
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="hero-particles"
      className="w-full h-full"
      options={particlesOptions}
    />
  );
}
