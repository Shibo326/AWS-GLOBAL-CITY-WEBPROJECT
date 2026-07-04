import type { Officer } from '@/types';

export const officers: Officer[] = [
  {
    id: 'officer-001',
    name: 'Rhenmart Dela Cruz',
    role: 'University Captain & CEO',
    office: 'Executive Office',
    photo: '/images/officers/rhenmart-dela-cruz.webp',
    description: 'Leading the club as University Captain. Driving our cloud mission forward and steering the crew toward new horizons.',
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/' },
      { platform: 'facebook', url: 'https://facebook.com/' },
    ],
    order: 1,
  },
  {
    id: 'officer-002',
    name: 'Ryder Vince',
    role: 'Co-Captain & CFO',
    office: 'Finance and Resource Office',
    photo: '/images/officers/ryder-vince.webp',
    description: 'Managing budgets and human resources as Vice-Captain. Keeps the flight operations funded and the crew database running smoothly.',
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/' },
      { platform: 'facebook', url: 'https://facebook.com/' },
    ],
    order: 2,
  },
  {
    id: 'officer-003',
    name: 'Andrew Manuel',
    role: 'Chief Finance Officer',
    office: 'Finance and Resource Office',
    photo: '/images/officers/andrew-manuel.webp',
    description: 'Overseeing financial controls, liquidation, and audit processes. Ensuring every resource is accounted for.',
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/' },
      { platform: 'facebook', url: 'https://facebook.com/' },
    ],
    order: 3,
  },
  {
    id: 'officer-004',
    name: 'Dan Robin',
    role: 'Chief Operations Officer',
    office: 'Operations and Events Office',
    photo: '/images/officers/dan-robin.webp',
    description: 'Orchestrating event logistics and strategic planning. Every mission launch goes through Operations first.',
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/' },
      { platform: 'facebook', url: 'https://facebook.com/' },
    ],
    order: 4,
  },
  {
    id: 'officer-005',
    name: 'Lhenald Gumapo',
    role: 'Chief Relations Officer',
    office: 'Relations and Communications Office',
    photo: '/images/officers/lhenald-gumapo.webp',
    description: 'Securing partnerships and resource speakers. The bridge between our crew and the broader AWS community.',
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/' },
      { platform: 'facebook', url: 'https://facebook.com/' },
    ],
    order: 5,
  },
  {
    id: 'officer-006',
    name: 'George Mori Ibañez',
    role: 'Chief Creatives Officer',
    office: 'Creatives and Graphics Office',
    photo: '/images/officers/george-mori-ibanez.webp',
    description: 'Designing PUBMATs and visual content. Gives our brand its cinematic, aviation-coded visual identity.',
    socials: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/' },
      { platform: 'facebook', url: 'https://facebook.com/' },
    ],
    order: 6,
  },
];
