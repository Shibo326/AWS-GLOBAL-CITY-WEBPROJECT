'use client';

import { partners } from '@/data/partners';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { PartnerLogo } from '@/components/cards/PartnerLogo';

/**
 * PartnersMarquee — Infinite horizontal scroll of partner logos.
 * 40s loop on desktop, 20s on mobile. Pauses on hover.
 * Logos render in grayscale, full color on hover.
 * Gradient fade overlays mask the left and right edges.
 * Hidden entirely if fewer than 2 partners.
 */
export default function PartnersMarquee() {
  // Hide section if fewer than 2 partners
  if (partners.length < 2) {
    return null;
  }

  // Triple array for seamless infinite loop at faster speed
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="section-padding bg-zone-ground" aria-label="Trusted partners">
      <div className="container-site">
        <SectionLabel text="TRUSTED PARTNERS" showCursor={false} />
      </div>

      {/* Marquee container */}
      <div className="group relative mt-8 overflow-hidden">
        {/* Left fade gradient — matches ground zone */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24"
          style={{ background: 'linear-gradient(to right, #A5D6A7, transparent)' }}
          aria-hidden="true"
        />

        {/* Right fade gradient — matches ground zone */}
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24"
          style={{ background: 'linear-gradient(to left, #A5D6A7, transparent)' }}
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
