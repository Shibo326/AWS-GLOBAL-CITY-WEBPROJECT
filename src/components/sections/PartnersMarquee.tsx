'use client';

import { partners } from '@/data/partners';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { PartnerLogo } from '@/components/cards/PartnerLogo';

/**
 * PartnersMarquee — Infinite horizontal scroll of partner logos.
 * 40s loop on desktop, 20s on mobile. Pauses on hover.
 * Logos render in grayscale, full color on hover.
 * Gradient fade overlays mask the left and right edges (ground zone).
 * Hidden entirely if fewer than 2 partners.
 *
 * NOTE: Parent page.tsx wraps this in <ZoneSection zone="ground">,
 * so fade masks match the warm cream ground zone.
 */
export default function PartnersMarquee() {
  // Hide section if fewer than 2 partners
  if (partners.length < 2) {
    return null;
  }

  // Triple array for seamless infinite loop at faster speed
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="section-padding" aria-label="Trusted partners">
      <div className="container-site">
        <SectionLabel
          text="TRUSTED PARTNERS"
          className=""
        />
      </div>

      {/* Marquee container */}
      <div className="group relative mt-8 overflow-hidden">
        {/* Left fade gradient — matches ground zone */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 md:w-24"
          style={{ background: 'linear-gradient(to right, var(--zone-ground), transparent)' }}
          aria-hidden="true"
        />

        {/* Right fade gradient — matches ground zone */}
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 md:w-24"
          style={{ background: 'linear-gradient(to left, var(--zone-ground), transparent)' }}
          aria-hidden="true"
        />

        {/* Scrolling track */}
        <div
          className="flex whitespace-nowrap gap-6 animate-marquee-mobile md:animate-marquee group-hover:[animation-play-state:paused]"
          style={{ width: 'max-content' }}
        >
          {duplicatedPartners.map((partner, index) => (
            <PartnerLogo key={`${partner.id}-${index}`} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
