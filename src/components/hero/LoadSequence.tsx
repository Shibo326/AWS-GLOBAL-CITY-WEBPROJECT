'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLoad } from '@/contexts/LoadContext';

interface LoadSequenceProps {
  onComplete: () => void;
}

const SESSION_KEY = 'awscc-loaded';

/**
 * Full-screen cinematic boot-up overlay that plays once per session.
 * Uses a GSAP timeline (~2.8s) to reveal branding elements sequentially
 * in a cockpit-HUD style boot sequence, then fades out.
 */
export default function LoadSequence({ onComplete }: LoadSequenceProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);
  const lineBotRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  const { setLoadComplete } = useLoad();

  // Store latest callbacks in refs to avoid stale closures
  const onCompleteRef = useRef(onComplete);
  const setLoadCompleteRef = useRef(setLoadComplete);
  onCompleteRef.current = onComplete;
  setLoadCompleteRef.current = setLoadComplete;

  useEffect(() => {
    // Prevent double-firing
    if (completedRef.current) return;

    function finish() {
      if (completedRef.current) return;
      completedRef.current = true;

      if (typeof window !== 'undefined') {
        sessionStorage.setItem(SESSION_KEY, '1');
      }
      document.body.style.overflow = '';
      setLoadCompleteRef.current(true);
      onCompleteRef.current();

      // Fade out overlay
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = 'none';
            }
          },
        });
      }
    }

    // Skip if already loaded this session
    if (typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY)) {
      if (overlayRef.current) {
        overlayRef.current.style.display = 'none';
      }
      completedRef.current = true;
      document.body.style.overflow = '';
      setLoadCompleteRef.current(true);
      onCompleteRef.current();
      return;
    }

    // Lock scrolling during sequence
    document.body.style.overflow = 'hidden';

    // Set initial states
    gsap.set(logoRef.current, { opacity: 0, scale: 0.92 });
    gsap.set(lineTopRef.current, { scaleX: 0 });
    gsap.set(lineBotRef.current, { scaleX: 0 });
    gsap.set(subtitleRef.current, { opacity: 0, y: 12 });
    gsap.set(mascotRef.current, { opacity: 0, y: 16 });
    gsap.set(statusRef.current, { opacity: 0 });

    // Build the timeline
    const tl = gsap.timeline();

    // 0ms: Logo fades in with scale
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(1.4)',
    }, 0);

    // 500ms: Lines expand outward from center
    tl.to(lineTopRef.current, {
      scaleX: 1,
      duration: 0.5,
      ease: 'power3.out',
    }, 0.5);
    tl.to(lineBotRef.current, {
      scaleX: 1,
      duration: 0.5,
      ease: 'power3.out',
    }, 0.55);

    // 900ms: Subtitle slides up
    tl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
    }, 0.9);

    // 1400ms: Mascot image fades in
    tl.to(mascotRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
    }, 1.4);

    // 2000ms: Status text appears
    tl.to(statusRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: 'none',
    }, 2.0);

    // 2500ms: Call finish after a beat
    tl.call(finish, [], 2.5);

    // Failsafe: if GSAP somehow doesn't fire, force completion after 4s
    const failsafe = setTimeout(() => {
      finish();
    }, 4000);

    return () => {
      tl.kill();
      clearTimeout(failsafe);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
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
          ref={lineTopRef}
          className="w-32 md:w-48 h-[1px] mb-6 origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(77,163,255,0.5), transparent)' }}
        />

        {/* Logo mark */}
        <div ref={logoRef} className="flex flex-col items-center">
          <span className="font-heading text-5xl md:text-7xl tracking-hero text-primary-text select-none leading-none">
            AWSCC
          </span>
          <span className="mt-1 font-mono text-[10px] md:text-xs tracking-[0.3em] text-secondary-text/70 uppercase">
            STI Global City Chapter
          </span>
        </div>

        {/* Bottom decorative line */}
        <div
          ref={lineBotRef}
          className="w-24 md:w-36 h-[1px] mt-5 origin-center"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(77,163,255,0.4), transparent)' }}
        />

        {/* Subtitle */}
        <div ref={subtitleRef} className="mt-5 flex items-center gap-3">
          <div className="h-[1px] w-4 bg-accent-blue/40" />
          <span className="font-display text-sm md:text-base text-accent-blue font-medium tracking-wide">
            Cloud Pilots Academy
          </span>
          <div className="h-[1px] w-4 bg-accent-blue/40" />
        </div>

        {/* Mascot */}
        <div ref={mascotRef} className="mt-6">
          <img
            src="/images/rory-waving.png"
            alt=""
            className="w-[100px] h-[120px] md:w-[130px] md:h-[160px] object-contain drop-shadow-[0_0_20px_rgba(77,163,255,0.1)]"
            draggable={false}
          />
        </div>

        {/* Status indicator */}
        <div ref={statusRef} className="mt-5 flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[10px] md:text-xs text-secondary-text/60 tracking-widest uppercase">
            Systems Online
          </span>
        </div>
      </div>
    </div>
  );
}
