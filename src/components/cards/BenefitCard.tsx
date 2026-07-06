'use client';

import { motion } from 'framer-motion';
import { benefitCardVariants } from '@/components/animations/variants';

interface BenefitCardProps {
  icon: React.ComponentType<{ size?: string | number; className?: string }>;
  title: string;
  description: string;
  index: number;
}

/**
 * BenefitCard — Cartoon card for enlistment benefits.
 * Uses .card-cartoon class for consistent 2px border, 16px radius, white bg, 3px shadow, hover effects.
 */
export function BenefitCard({ icon: Icon, title, description, index }: BenefitCardProps) {
  return (
    <motion.div
      className="card-cartoon p-6"
      variants={benefitCardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="mb-3">
        <Icon size={32} className="text-[var(--accent-orange)]" />
      </div>
      <h3 className="font-[family-name:var(--font-body)] font-bold text-lg text-[var(--primary-text)] mb-2">
        {title}
      </h3>
      <p className="font-[family-name:var(--font-body)] text-sm text-[var(--secondary-text)]">
        {description}
      </p>
    </motion.div>
  );
}
