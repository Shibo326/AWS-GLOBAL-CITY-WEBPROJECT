'use client';

import CountUp from '@/components/animations/CountUp';
import { stats } from '@/data/stats';

/**
 * StatsStrip — Displays 4 animated metrics in the cloud zone.
 * Numbers count up from 0 when 50% in viewport (easeOutExpo, 1800ms).
 * Responsive: 2x2 grid on mobile, 4 columns on desktop.
 * The parent page.tsx wraps this in ZoneSection zone="cloud", so no
 * background class is applied directly here.
 */
export default function StatsStrip() {
  return (
    <section
      className="section-padding"
      aria-label="Club statistics"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="card-cartoon flex flex-col items-center text-center p-6"
            >
              <CountUp
                target={stat.value}
                duration={1800}
                suffix={stat.suffix ?? ''}
                className="text-4xl md:text-5xl font-heading text-[var(--accent-orange)] tracking-wide"
              />
              <span className="mt-3 font-mono text-xs font-bold uppercase tracking-widest text-[var(--secondary-text)]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
