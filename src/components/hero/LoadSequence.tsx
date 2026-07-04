'use client';

import { useEffect, useState } from 'react';
import { useLoad } from '@/contexts/LoadContext';

interface LoadSequenceProps {
  onComplete: () => void;
}

const SESSION_KEY = 'awscc-loaded';

/**
 * Full-screen cinematic boot-up overlay that plays once per session.
 * Uses a simple state machine with setTimeout for guaranteed dismissal.
 * Handles React Strict Mode double-mount correctly.
 */
export default function LoadSequence({ onComplete }: LoadSequenceProps) {
  const { setLoadComplete } = useLoad();
  const [visible, setVisible] = useState(() => {
    // Check sessionStorage synchronously during init
    if (typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY)) {
      return false;
    }
    return true;
  });
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // If already skipped, signal completion immediately
    if (!visible) {
      setLoadComplete(true);
      onComplete();
      return;
    }

    // Lock scroll while playing
    document.body.style.overflow = 'hidden';

    // Start fade-out after 2.8s
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2800);

    // Complete after fade (3.3s total)
    const doneTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
      sessionStorage.setItem(SESSION_KEY, '1');
      setLoadComplete(true);
      onComplete();
    }, 3300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = '';
    };
  }, [visible, setLoadComplete, onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}
      aria-hidden="true"
    >
      {/* Subtle grid behind */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(77,163,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(77,163,255,0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Center content */}
      <div className="relative flex flex-col items-center">
        {/* Top decorative line */}
        <div
          className="w-32 md:w-48 h-[1px] mb-6 animate-load-line-expand"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(77,163,255,0.5), transparent)' }}
        />

        {/* Logo mark */}
        <div className="flex flex-col items-center animate-load-logo">
          <span className="font-heading text-5xl md:text-7xl tracking-hero text-primary-text select-none leading-none">
            AWSCC
          </span>
          <span className="mt-1 font-mono text-[10px] md:text-xs tracking-[0.3em] text-secondary-text/70 uppercase">
            STI Global City Chapter
          </span>
        </div>

        {/* Bottom decorative line */}
        <div
          className="w-24 md:w-36 h-[1px] mt-5 animate-load-line-expand"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(77,163,255,0.4), transparent)',
            animationDelay: '0.1s',
          }}
        />

        {/* Subtitle */}
        <div className="mt-5 flex items-center gap-3 animate-load-slide-up" style={{ animationDelay: '0.9s' }}>
          <div className="h-[1px] w-4 bg-accent-blue/40" />
          <span className="font-display text-sm md:text-base text-accent-blue font-medium tracking-wide">
            Cloud Pilots Academy
          </span>
          <div className="h-[1px] w-4 bg-accent-blue/40" />
        </div>

        {/* Mascot */}
        <div className="mt-6 animate-load-slide-up" style={{ animationDelay: '1.4s' }}>
          <img
            src="/images/rory-waving.png"
            alt=""
            className="w-[100px] h-[120px] md:w-[130px] md:h-[160px] object-contain drop-shadow-[0_0_20px_rgba(77,163,255,0.1)]"
            draggable={false}
          />
        </div>

        {/* Status indicator */}
        <div className="mt-5 flex items-center gap-2 animate-load-slide-up" style={{ animationDelay: '2.0s' }}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[10px] md:text-xs text-secondary-text/60 tracking-widest uppercase">
            Systems Online
          </span>
        </div>
      </div>
    </div>
  );
}
