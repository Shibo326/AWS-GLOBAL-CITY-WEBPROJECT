'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconCloud, IconRocket, IconUsers } from '@tabler/icons-react';
import { staggerContainer, fadeInUp } from '@/components/animations/variants';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { BenefitCard } from '@/components/cards/BenefitCard';
import StampIn from '@/components/animations/StampIn';
import ScrollReveal from '@/components/animations/ScrollReveal';

const benefits = [
  {
    icon: IconCloud,
    title: 'Cloud Training',
    description:
      'Access to AWS resources, hands-on labs, and guided learning paths for every skill level.',
  },
  {
    icon: IconRocket,
    title: 'Real Projects',
    description:
      'Build and ship actual AI-powered cloud projects that solve real problems.',
  },
  {
    icon: IconUsers,
    title: 'Community',
    description:
      'Network with builders, attend exclusive events, and compete in national competitions.',
  },
];

/**
 * EnlistSection — Recruitment CTA section with stamp-in headline,
 * benefit cards with stagger animation, and dual-action CTA strip.
 * Styled for the ground zone (warm cream background, dark text).
 */
export default function EnlistSection() {
  return (
    <ScrollReveal>
      <section
        className="relative section-padding"
        aria-label="Enlist as a Cloud Pilot"
      >
        <div className="container-site relative flex flex-col items-center text-center">
          {/* Top label */}
          <SectionLabel
            text="RECRUITMENT HANGAR — OPEN"
            dotColor="#22c55e"
            className="mb-6"
          />

          {/* Decorative dots */}
          <div className="mb-4 flex items-center gap-3" aria-hidden="true">
            <div className="h-[2px] w-10 bg-gradient-to-r from-transparent to-[var(--border-color)]/30" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-orange)]" />
            <div className="h-[2px] w-10 bg-gradient-to-l from-transparent to-[var(--border-color)]/30" />
          </div>

          {/* Stamp-in headline — dark text with orange accent */}
          <StampIn>
            <h2
              className="text-hero uppercase tracking-hero mb-4"
              style={{
                fontFamily: 'var(--font-heading)',
                color: 'var(--primary-text)',
              }}
            >
              READY TO FLY?
            </h2>
          </StampIn>

          {/* Subheadline */}
          <motion.p
            className="text-base md:text-lg max-w-2xl mx-auto mb-12"
            style={{ color: 'var(--secondary-text)' }}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            Join the Cloud Pilots of STI Global City. No experience required —
            just the drive to build.
          </motion.p>

          {/* Benefit cards grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.title}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                index={index}
              />
            ))}
          </motion.div>

          {/* CTA strip */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/enlist">
              <Button
                variant="primary"
                size="lg"
                className="animate-glow-pulse"
              >
                Enlist as Cloud Pilot
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="ghost"
                size="lg"
              >
                Learn More About the Club
              </Button>
            </Link>
          </div>

          {/* Small text */}
          <p
            className="text-xs text-center mt-4"
            style={{ color: 'var(--secondary-text)' }}
          >
            Open to all STI Global City students. Applications reviewed within
            48 hours.
          </p>
        </div>
      </section>
    </ScrollReveal>
  );
}
