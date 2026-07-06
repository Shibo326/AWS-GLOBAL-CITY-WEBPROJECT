'use client';

import { motion } from 'framer-motion';
import { officers } from '@/data/officers';
import { CrewCard } from '@/components/cards/CrewCard';
import { SectionLabel } from '@/components/ui/SectionLabel';
import ScrollReveal from '@/components/animations/ScrollReveal';
import {
  IconPlaneTilt,
  IconUsersGroup,
  IconBuildingSkyscraper,
} from '@tabler/icons-react';

/** Office-based accent color mapping for CrewCard */
const officeAccentColors: Record<string, string> = {
  'Executive Office': '#F59E0B',
  'Finance and Resource Office': '#10B981',
  'Operations and Events Office': '#6366F1',
  'Relations and Communications Office': '#EC4899',
  'Creatives and Graphics Office': '#8B5CF6',
};
const defaultAccentColor = '#38BDF8';

/** Office metadata for section storytelling */
const officeInfo: Record<string, { icon: React.ReactNode; callsign: string; description: string }> = {
  'Executive Office': {
    icon: <IconPlaneTilt size={20} className="text-amber-500" />,
    callsign: 'FLIGHT DECK',
    description: 'The command center. Setting course, calling shots, and keeping the crew airborne.',
  },
  'Finance and Resource Office': {
    icon: <IconBuildingSkyscraper size={20} className="text-emerald-500" />,
    callsign: 'FUEL STATION',
    description: 'Budget allocation, resource management, and keeping the engines running.',
  },
  'Operations and Events Office': {
    icon: <IconUsersGroup size={20} className="text-blue-500" />,
    callsign: 'MISSION CONTROL',
    description: 'Planning launches, coordinating logistics, and executing every mission flawlessly.',
  },
  'Relations and Communications Office': {
    icon: <IconUsersGroup size={20} className="text-pink-500" />,
    callsign: 'COMMS TOWER',
    description: 'Bridging connections, securing partnerships, and amplifying our signal.',
  },
  'Creatives and Graphics Office': {
    icon: <IconUsersGroup size={20} className="text-violet-500" />,
    callsign: 'DESIGN HANGAR',
    description: 'Crafting our visual identity, from PUBMATs to the brand you see right now.',
  },
};

/**
 * CrewRoster — Redesigned with storytelling structure.
 * Groups officers by office with narrative intros, aviation-themed section labels,
 * and a cinematic page hero.
 */
export function CrewRoster() {
  const sortedOfficers = [...officers].sort((a, b) => a.order - b.order);

  // Group officers by office
  const groupedByOffice = sortedOfficers.reduce<Record<string, typeof officers>>((acc, officer) => {
    if (!acc[officer.office]) acc[officer.office] = [];
    acc[officer.office].push(officer);
    return acc;
  }, {});

  // Maintain a logical ordering of offices
  const officeOrder = [
    'Executive Office',
    'Finance and Resource Office',
    'Operations and Events Office',
    'Relations and Communications Office',
    'Creatives and Graphics Office',
  ];

  const orderedOffices = officeOrder.filter((office) => groupedByOffice[office]);

  return (
    <div className="min-h-screen">
      {/* ===== PAGE HERO ===== */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        {/* Atmospheric gradient backdrop */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(56, 189, 248, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse 60% 40% at 80% 20%, rgba(255, 153, 0, 0.05) 0%, transparent 50%)
            `,
          }}
          aria-hidden="true"
        />

        <div className="container-site relative">
          <ScrollReveal>
            <SectionLabel text="CREW MANIFEST — ALL STATIONS" dotColor="#10B981" />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="mt-5 font-heading tracking-hero text-primary-text text-5xl md:text-7xl lg:text-8xl">
              CREW ROSTER
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="max-w-2xl">
            <p className="mt-4 text-secondary-text text-base md:text-lg leading-relaxed">
              Behind every successful flight is a crew that trusts the mission. These are the pilots, 
              navigators, and engineers steering AWS Cloud Club — Global City through new skies.
            </p>
          </ScrollReveal>

          {/* Stats strip */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-8 md:gap-12">
              <Stat value={sortedOfficers.length} label="Officers" />
              <Stat value={orderedOffices.length} label="Offices" />
              <Stat value="2024" label="Founded" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== OFFICE SECTIONS ===== */}
      {orderedOffices.map((office, sectionIndex) => {
        const info = officeInfo[office];
        const officeOfficers = groupedByOffice[office];
        if (!info || !officeOfficers) return null;

        return (
          <section
            key={office}
            className={`section-padding ${sectionIndex % 2 === 0 ? 'bg-zone-cloud-soft' : 'bg-zone-cloud'}`}
          >
            <div className="container-site">
              {/* Office header */}
              <ScrollReveal className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white border border-slate-100 shadow-sm">
                    {info.icon}
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-secondary-text">
                    {info.callsign}
                  </span>
                </div>

                <h2 className="font-display font-semibold text-2xl md:text-3xl text-primary-text">
                  {office.replace(' Office', '')}
                </h2>
                <p className="mt-2 text-secondary-text text-sm md:text-base max-w-lg">
                  {info.description}
                </p>
              </ScrollReveal>

              {/* Officer cards grid */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
              >
                {officeOfficers.map((officer) => (
                  <CrewCard
                    key={officer.id}
                    name={officer.name}
                    role={officer.role}
                    office={officer.office}
                    accentColor={officeAccentColors[officer.office] || defaultAccentColor}
                  />
                ))}
              </motion.div>
            </div>
          </section>
        );
      })}

      {/* ===== CLOSING CTA ===== */}
      <section className="section-padding bg-zone-warm">
        <div className="container-site text-center">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-secondary-text mb-3">
              ▸ Want to join the crew?
            </p>
            <h2 className="font-heading text-3xl md:text-4xl text-primary-text tracking-wider">
              YOUR SEAT IS WAITING
            </h2>
            <p className="mt-3 text-secondary-text max-w-md mx-auto">
              Every cloud pilot started as a passenger. Take the first step and enlist today.
            </p>
            <a href="/enlist" className="btn-primary mt-6 inline-flex">
              Enlist as Cloud Pilot
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

/** Small stat display used in the hero */
function Stat({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-heading text-2xl md:text-3xl text-primary-text tracking-wider">
        {value}
      </span>
      <span className="font-mono text-xs text-secondary-text uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
