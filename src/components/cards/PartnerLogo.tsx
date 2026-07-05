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
      className="h-10 px-6 flex items-center rounded bg-card border border-border
        grayscale transition-all duration-300 hover:grayscale-0
        hover:border-accent-orange/30"
    >
      <span className="font-mono text-xs text-secondary-text whitespace-nowrap transition-colors duration-300 hover:text-primary-text">
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
