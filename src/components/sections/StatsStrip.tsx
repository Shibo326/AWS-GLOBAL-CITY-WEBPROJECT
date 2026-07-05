'use client';

import CountUp from '@/components/animations/CountUp';
import { stats } from '@/data/stats';

/**
 * StatsStrip — Full-width dark band displaying 4 animated metrics.
 * Numbers count up from 0 when the section is 50% in viewport.
 * Responsive: 1 col mobile, 2 col tablet, 4 col desktop.
 */
export default function StatsStrip() {
  return (
    <section
      className="relative bg-zone-cloud border-b border-border section-padding"
      aria-label="Club statistics"
    >
      {/* Colorful top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(90deg, var(--accent-pink), var(--accent-orange), var(--accent-warm-light), var(--accent-green), var(--accent-blue))',
          opacity: 0.6,
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center text-center ${
                index < stats.length - 1
                  ? 'lg:border-r lg:border-border/20'
                  : ''
              }`}
            >
              <CountUp
                target={stat.value}
                suffix={stat.suffix ?? ''}
                className="text-4xl md:text-5xl font-heading text-accent-orange tracking-hero"
              />
              <span className="mt-3 font-mono text-xs uppercase tracking-label text-secondary-text inline-flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-warm-light opacity-70" aria-hidden="true" />
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
