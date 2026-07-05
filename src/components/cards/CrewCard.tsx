'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconChevronRight,
} from '@tabler/icons-react';
import type { Officer, SocialLink } from '@/types';

interface CrewCardProps {
  officer: Officer;
  /** Optional index for staggered entrance delay */
  index?: number;
}

/** Maps platform names to their Tabler icon components */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const platformIcons: Record<string, React.ComponentType<any>> = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
  facebook: IconBrandFacebook,
  instagram: IconBrandInstagram,
};

/** Office-based accent color mapping */
const officeAccents: Record<string, { gradient: string; badge: string; glow: string }> = {
  'Executive Office': {
    gradient: 'from-amber-400 via-orange-500 to-red-500',
    badge: 'bg-gradient-to-r from-amber-500 to-orange-600',
    glow: 'rgba(255, 153, 0, 0.2)',
  },
  'Finance and Resource Office': {
    gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
    badge: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    glow: 'rgba(16, 185, 129, 0.2)',
  },
  'Operations and Events Office': {
    gradient: 'from-blue-400 via-indigo-500 to-purple-500',
    badge: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    glow: 'rgba(99, 102, 241, 0.2)',
  },
  'Relations and Communications Office': {
    gradient: 'from-pink-400 via-rose-500 to-red-500',
    badge: 'bg-gradient-to-r from-pink-500 to-rose-600',
    glow: 'rgba(236, 72, 153, 0.2)',
  },
  'Creatives and Graphics Office': {
    gradient: 'from-violet-400 via-purple-500 to-fuchsia-500',
    badge: 'bg-gradient-to-r from-violet-500 to-purple-600',
    glow: 'rgba(168, 85, 247, 0.2)',
  },
};

const defaultAccent = {
  gradient: 'from-sky-400 via-blue-500 to-indigo-500',
  badge: 'bg-gradient-to-r from-sky-500 to-blue-600',
  glow: 'rgba(56, 189, 248, 0.2)',
};

/**
 * CrewCard — Aviation-style officer badge card with 3D flip.
 * Front: Rank stripe, avatar placeholder with office color, name, role callsign.
 * Back: Officer description, social links, office badge.
 */
export function CrewCard({ officer, index = 0 }: CrewCardProps) {
  const [flipped, setFlipped] = useState(false);
  const accent = officeAccents[officer.office] || defaultAccent;

  const visibleSocials = officer.socials.filter(
    (s) => s.url && platformIcons[s.platform]
  );

  return (
    <motion.div
      className="group cursor-pointer"
      style={{ perspective: '1200px' }}
      initial={{ opacity: 0, y: 50, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={() => setFlipped((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((prev) => !prev);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`${officer.name} - ${officer.role}. Click to ${flipped ? 'see front' : 'see details'}`}
    >
      <div
        className="relative w-full transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          height: '340px',
        }}
      >
        {/* ===== FRONT FACE ===== */}
        <div
          className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden border border-white/60 bg-white/80 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Top rank stripe */}
          <div className={`h-1.5 w-full bg-gradient-to-r ${accent.gradient}`} />

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-5 py-6 gap-4">
            {/* Avatar circle with gradient ring */}
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-full bg-gradient-to-br ${accent.gradient} opacity-20 blur-lg scale-125`}
                aria-hidden="true"
              />
              <div
                className={`relative h-24 w-24 rounded-full bg-gradient-to-br ${accent.gradient} p-[3px]`}
              >
                <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                  <span className="text-2xl font-heading tracking-wider text-slate-600">
                    {officer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              {/* Order/rank badge */}
              <div
                className={`absolute -bottom-1 -right-1 h-7 w-7 rounded-full ${accent.badge} flex items-center justify-center text-white text-xs font-bold shadow-lg`}
              >
                {officer.order}
              </div>
            </div>

            {/* Name */}
            <h3 className="font-display font-semibold text-lg text-primary-text text-center leading-tight">
              {officer.name}
            </h3>

            {/* Role callsign */}
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
              <span className="font-mono text-xs text-secondary-text uppercase tracking-widest">
                {officer.role}
              </span>
            </div>

            {/* Flip hint */}
            <div className="flex items-center gap-1 text-xs text-slate-400 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-mono">Details</span>
              <IconChevronRight size={12} />
            </div>
          </div>
        </div>

        {/* ===== BACK FACE ===== */}
        <div
          className="absolute inset-0 flex flex-col rounded-2xl overflow-hidden border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)`,
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Top stripe */}
          <div className={`h-1.5 w-full bg-gradient-to-r ${accent.gradient}`} />

          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 gap-4">
            {/* Office badge */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white text-[10px] font-mono uppercase tracking-wider ${accent.badge} shadow-sm`}
            >
              {officer.office.replace(' Office', '')}
            </span>

            {/* Description */}
            <p className="text-sm text-secondary-text text-center leading-relaxed max-w-[240px]">
              {officer.description}
            </p>

            {/* Social links */}
            {visibleSocials.length > 0 && (
              <div className="flex items-center gap-3 mt-2">
                {visibleSocials.map((social) => (
                  <SocialIconLink key={social.platform} social={social} glow={accent.glow} />
                ))}
              </div>
            )}

            {/* Flip back hint */}
            <div className="flex items-center gap-1 text-xs text-slate-400 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <IconChevronRight size={12} className="rotate-180" />
              <span className="font-mono">Back</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/** Individual social icon button */
function SocialIconLink({ social, glow }: { social: SocialLink; glow: string }) {
  const Icon = platformIcons[social.platform];
  if (!Icon) return null;

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${social.platform} profile`}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-slate-200 bg-white text-secondary-text transition-all duration-300 hover:text-white hover:scale-110"
      style={{ '--hover-glow': glow } as React.CSSProperties}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 16px ${glow}`;
        (e.currentTarget as HTMLElement).style.background = `linear-gradient(135deg, var(--accent-orange), var(--accent-warm))`;
        (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '';
        (e.currentTarget as HTMLElement).style.background = '';
        (e.currentTarget as HTMLElement).style.borderColor = '';
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Icon size={16} stroke={1.5} />
    </a>
  );
}
