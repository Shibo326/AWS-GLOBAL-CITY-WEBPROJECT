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
 * BenefitCard — Cartoon comic-panel card with thick border and offset shadow.
 * Bouncy hover lift with cartoon physics.
 */
export function BenefitCard({ icon: Icon, title, description, index }: BenefitCardProps) {
  return (
    <motion.div
      className="bg-card border-[3px] border-[#2D2D44] rounded-[24px] p-6 shadow-[4px_4px_0px_#2D2D44] transition-all duration-300 hover:-translate-y-3 hover:-translate-x-1 hover:shadow-[6px_8px_0px_#2D2D44] hover:rotate-[-0.5deg]"
      variants={benefitCardVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="w-12 h-12 rounded-2xl bg-[#FFF3E0] border-2 border-[#2D2D44] shadow-[2px_2px_0px_#2D2D44] flex items-center justify-center mb-4">
        <Icon size={24} className="text-accent-orange" />
      </div>
      <h3 className="font-display font-bold text-lg text-primary-text mb-2">
        {title}
      </h3>
      <p className="text-sm text-secondary-text font-medium">
        {description}
      </p>
    </motion.div>
  );
}
