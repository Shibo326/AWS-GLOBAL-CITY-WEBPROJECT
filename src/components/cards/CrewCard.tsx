'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
} from '@tabler/icons-react';
import { cardRevealVariants } from '@/components/animations/variants';
import type { Officer, SocialLink } from '@/types';

interface CrewCardProps {
  officer: Officer;
}

/** Maps platform names to their Tabler icon components */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const platformIcons: Record<string, React.ComponentType<any>> = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
  facebook: IconBrandFacebook,
  instagram: IconBrandInstagram,
};

/**
 * CrewCard — 3D flip card for officer display.
 * Front: grayscale placeholder, name, role tag.
 * Back: colored placeholder, description, social links.
 * Flips on click/tap with 500ms rotateY transition.
 */
export function CrewCard({ officer }: CrewCardProps) {
  const [flipped, setFlipped] = useState(false);

  // Filter to only platforms we have icons for and that have URLs
  const visibleSocials = officer.socials.filter(
    (s) => s.url && platformIcons[s.platform]
  );

  return (
    <motion.div
      className="crew-card-perspective cursor-pointer"
      style={{ perspective: '1000px' }}
      variants={cardRevealVariants}
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
        className="relative w-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          height: '280px',
        }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-card border border-border bg-card p-5 glow-border"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Grayscale circular placeholder */}
          <div
            className="h-20 w-20 rounded-full"
            style={{
              background:
                'radial-gradient(circle, #3a3f4a 0%, #1e222a 60%, #111318 100%)',
            }}
            aria-hidden="true"
          />

          {/* Name */}
          <h3 className="font-display font-semibold text-base text-primary-text text-center leading-tight">
            {officer.name}
          </h3>

          {/* Role tag */}
          <span className="font-mono text-xs text-accent-blue text-center">
            {officer.role}
          </span>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-card border border-border bg-card p-5 glow-border"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Colored circular placeholder */}
          <div
            className="h-16 w-16 rounded-full"
            style={{
              background:
                'radial-gradient(circle, #4DA3FF 0%, #2a5a8a 50%, #161B24 100%)',
            }}
            aria-hidden="true"
          />

          {/* Role description */}
          <p className="text-sm text-secondary-text text-center line-clamp-4 max-w-[220px]">
            {officer.description.slice(0, 150)}
          </p>

          {/* Social links */}
          {visibleSocials.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              {visibleSocials.map((social) => (
                <SocialIconLink key={social.platform} social={social} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/** Individual social icon button */
function SocialIconLink({ social }: { social: SocialLink }) {
  const Icon = platformIcons[social.platform];
  if (!Icon) return null;

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${social.platform} profile`}
      className="flex items-center justify-center rounded-full border border-border bg-surface text-secondary-text transition-colors duration-300 hover:text-accent-blue hover:border-accent-blue"
      style={{ width: '36px', height: '36px' }}
      onClick={(e) => e.stopPropagation()}
    >
      <Icon size={18} stroke={1.5} />
    </a>
  );
}
