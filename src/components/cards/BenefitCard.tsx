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
 * BenefitCard — Displays a benefit (icon + title + description) with
 * staggered entrance animation based on index. Hover lifts the card.
 */
export function BenefitCard({ icon: Icon, title, description, index }: BenefitCardProps) {
  return (
    <motion.div
      className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-accent-orange/30"
      variants={benefitCardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <Icon size={24} className="text-accent-orange mb-4" />
      <h3 className="font-display font-semibold text-lg text-primary-text mb-2">
        {title}
      </h3>
      <p className="text-sm text-secondary-text">
        {description}
      </p>
    </motion.div>
  );
}
