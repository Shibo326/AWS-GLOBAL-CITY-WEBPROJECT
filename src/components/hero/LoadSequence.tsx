'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useLoad } from '@/contexts/LoadContext';

interface LoadSequenceProps {
  onComplete: () => void;
}

const SESSION_KEY = 'awscc-loaded';

/**
 * LoadSequence — Sky-themed splash screen. Rory is preparing for takeoff.
 * Shows a sky blue gradient with clouds, club branding, and Rory mascot.
 * Plays once per session, 2.3s total then fades out.
 */
export default function LoadSequence({ onComplete }: LoadSequenceProps) {
  const { setLoadComplete } = useLoad();
  // Always initialize true — matches server render, prevents hydration mismatch
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const failsafeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasCompleted = useRef(false);

  const finish = useCallback(() => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;
    setVisible(false);
    setFading(false);
    document.body.style.overflow = '';
    sessionStorage.setItem(SESSION_KEY, '1');
    setLoadComplete(true);
    onComplete();
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    if (doneTimerRef.current) clearTimeout(doneTimerRef.current);
    if (failsafeTimerRef.current) clearTimeout(failsafeTimerRef.current);
  }, [setLoadComplete, onComplete]);

  useEffect(() => {
    // After hydration: if already loaded this session, skip splash immediately
    if (sessionStorage.getItem(SESSION_KEY)) {
      hasCompleted.current = true;
      setVisible(false);
      document.body.style.overflow = '';
      setLoadComplete(true);
      onComplete();
      return;
    }

    // First visit this session — show splash, lock scroll, run timers
    document.body.style.overflow = 'hidden';
    fadeTimerRef.current = setTimeout(() => setFading(true), 1800);
    doneTimerRef.current = setTimeout(() => finish(), 2300);
    failsafeTimerRef.current = setTimeout(() => finish(), 5000);
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
      if (doneTimerRef.current) clearTimeout(doneTimerRef.current);
      if (failsafeTimerRef.current) clearTimeout(failsafeTimerRef.current);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-500 ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{
        background: 'linear-gradient(180deg, #7DD3FC 0%, #BAE6FD 30%, #E0F2FE 60%, #FFFFFF 100%)',
      }}
      aria-hidden="true"
    >
      {/* Decorative clouds — bottom of the loading screen */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 200" fill="none" className="w-full h-[120px] md:h-[160px]" preserveAspectRatio="none">
          {/* Back cloud layer */}
          <path
            d="M0,200 L0,120 C180,100 300,80 480,85 C660,90 720,110 900,115 C1080,120 1200,95 1440,100 L1440,200 Z"
            fill="#FFFFFF"
            opacity="0.5"
          />
          {/* Front cloud layer */}
          <path
            d="M0,200 L0,140 C120,130 260,115 420,118 C580,121 680,140 840,142 C1000,144 1100,125 1260,122 C1380,120 1420,132 1440,136 L1440,200 Z"
            fill="#FFFFFF"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Center content */}
      <div className="relative flex flex-col items-center animate-load-logo">
        {/* Rory mascot — Cloud Pilot preparing for takeoff */}
        <img
          src="/images/rory-waving.png"
          alt=""
          className="w-[100px] h-[120px] md:w-[140px] md:h-[170px] object-contain mb-5"
          style={{ filter: 'drop-shadow(0 4px 20px rgba(30, 144, 212, 0.2))' }}
          draggable={false}
        />

        {/* Club name */}
        <span
          className="font-heading text-4xl md:text-6xl tracking-hero select-none leading-none"
          style={{
            background: 'linear-gradient(135deg, #FF9900 0%, #F59E0B 50%, #0C4A6E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          AWSCC
        </span>

        {/* Subtitle */}
        <span className="mt-2 font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase" style={{ color: '#0C4A6E' }}>
          STI Global City • Cloud Pilots
        </span>

        {/* Status bar */}
        <div className="mt-6 flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: '#475569' }}>
            Preparing for Takeoff
          </span>
        </div>
      </div>
    </div>
  );
}
