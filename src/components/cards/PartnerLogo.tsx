'use client';

import type { Partner } from '@/types';

interface PartnerLogoProps {
  partner: Partner;
}

/**
 * PartnerLogo — Renders a partner name in a styled box.
 * Grayscale by default, full color on hover with 300ms transition.
 * If the partner has a url, wraps in an anchor tag.
 */
export function PartnerLogo({ partner }: PartnerLogoProps) {
  const content = (
    <div
      className="h-11 px-6 flex items-center rounded-xl bg-card border-2 border-[#2D2D44] shadow-[2px_2px_0px_#2D2D44]
        grayscale transition-all duration-300 hover:grayscale-0
        hover:border-accent-orange hover:shadow-[3px_3px_0px_#C56200] hover:-translate-y-0.5"
    >
      <span className="font-mono text-xs font-bold text-secondary-text whitespace-nowrap transition-colors duration-300 hover:text-primary-text">
        {partner.name}
      </span>
    </div>
  );

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={partner.name}
        className="flex-shrink-0"
      >
        {content}
      </a>
    );
  }

  return <div className="flex-shrink-0">{content}</div>;
}
