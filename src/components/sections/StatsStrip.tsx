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
      className="relative bg-[#FFFDE7] border-y-[3px] border-[#2D2D44] section-padding"
      aria-label="Club statistics"
    >
      {/* Colorful cartoon dashed top border */}
      <div
        className="absolute top-2 left-[5%] right-[5%] h-[3px]"
        aria-hidden="true"
        style={{
          background: 'repeating-linear-gradient(90deg, var(--accent-pink) 0px, var(--accent-pink) 15px, transparent 15px, transparent 25px, var(--accent-orange) 25px, var(--accent-orange) 40px, transparent 40px, transparent 50px)',
          opacity: 0.5,
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`flex flex-col items-center text-center ${
                index < stats.length - 1
                  ? 'lg:border-r-[2px] lg:border-dashed lg:border-[#2D2D44]/20'
                  : ''
              }`}
            >
              <CountUp
                target={stat.value}
                suffix={stat.suffix ?? ''}
                className="text-4xl md:text-5xl font-heading text-accent-orange tracking-hero drop-shadow-[2px_2px_0px_rgba(0,0,0,0.1)]"
              />
              <span className="mt-3 font-mono text-xs font-bold uppercase tracking-label text-[#2D2D44] inline-flex items-center gap-1.5 bg-[#FFF3E0] px-2 py-0.5 rounded-full border border-[#2D2D44]/20">
                <span className="inline-block w-2 h-2 rounded-full bg-accent-warm-light border border-[#2D2D44]/30" aria-hidden="true" />
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
