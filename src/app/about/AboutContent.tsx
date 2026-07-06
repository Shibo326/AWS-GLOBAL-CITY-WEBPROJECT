'use client';

import { motion } from 'framer-motion';
import {
  IconCode,
  IconShield,
  IconCloud,
  IconBrain,
  IconChartBar,
  IconNetwork,
  IconDevices,
} from '@tabler/icons-react';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { staggerContainer, fadeInUp } from '@/components/animations/variants';

// ---------- Data ----------

const milestones = [
  {
    date: '2024 Q1',
    title: 'Club Founding',
    description:
      'AWS Cloud Club officially established at STI Academic Center, Global City.',
  },
  {
    date: '2024 Q2',
    title: 'First Workshop: Cloud Foundations',
    description:
      'Inaugural hands-on workshop covering core AWS services and cloud architecture basics.',
  },
  {
    date: '2024 Q3',
    title: 'First Hackathon: Serverless Build Day',
    description:
      'Members shipped production-ready serverless apps in a single-day build sprint.',
  },
  {
    date: '2024 Q4',
    title: '50 Members Milestone',
    description:
      'Community grew to 50 active cloud pilots across all Skill Builder departments.',
  },
  {
    date: '2025 Q1',
    title: 'AWS Community Day Presentation',
    description:
      'Club members selected to present at the national AWS Community Day event.',
  },
];

const departments = [
  {
    icon: IconCode,
    name: 'Software & Web Development',
    description:
      'Build modern web apps and APIs with cloud-native patterns and frameworks.',
  },
  {
    icon: IconShield,
    name: 'Security',
    description:
      'Learn cloud security fundamentals, IAM, and threat detection on AWS.',
  },
  {
    icon: IconCloud,
    name: 'Cloud Computing',
    description:
      'Master AWS infrastructure, serverless architecture, and scalable deployments.',
  },
  {
    icon: IconBrain,
    name: 'Machine Learning & AI',
    description:
      'Explore ML pipelines, SageMaker, and applied AI solutions on the cloud.',
  },
  {
    icon: IconChartBar,
    name: 'Data Analytics',
    description:
      'Harness data with analytics tools, visualization, and data lake architecture.',
  },
  {
    icon: IconNetwork,
    name: 'Advanced Network & Infrastructure',
    description:
      'Deep-dive into VPCs, hybrid networking, and enterprise-grade infrastructure.',
  },
  {
    icon: IconDevices,
    name: 'Internet of Things',
    description:
      'Connect devices to the cloud with AWS IoT Core and edge computing.',
  },
];

const offices = [
  {
    name: 'Executive Office',
    description:
      'Governance, approvals, and strategic oversight of all club operations.',
  },
  {
    name: 'Finance & Resource Office',
    description:
      'Budget management, audits, human resources, and membership processing.',
  },
  {
    name: 'Operations & Events Office',
    description:
      'Strategic event planning, logistics, venue coordination, and quality assurance.',
  },
  {
    name: 'Marketing & Management Office',
    description:
      'Social media, publications, branding, and marketing strategy.',
  },
  {
    name: 'Relations & Communications Office',
    description:
      'Partnerships, sponsorships, speaker outreach, and professional correspondence.',
  },
  {
    name: 'Creatives & Graphics Office',
    description:
      'Visual content, video editing, presentations, and documentation design.',
  },
];

// ---------- Timeline stagger variant ----------

const timelineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const timelineItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ---------- Props ----------

interface AboutContentProps {
  section: 'origin' | 'timeline-departments';
}

// ---------- Component ----------

export default function AboutContent({ section }: AboutContentProps) {
  if (section === 'origin') {
    return <OriginStory />;
  }

  return <TimelineDepartments />;
}

// ---------- Origin Story Section ----------

function OriginStory() {
  return (
    <div className="section-padding">
      <div className="container-site max-w-3xl">
        <ScrollReveal>
          <h2 className="font-heading tracking-hero text-4xl md:text-5xl lg:text-6xl mb-8">
            OUR STORY
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-primary-text leading-body mb-6">
            AWS Cloud Club — STI Global City started in early 2024 at the STI
            Academic Center in Bonifacio Global City, Taguig. A group of
            students who were already tinkering with cloud services decided the
            campus needed a space where builders could learn together, ship
            projects, and connect with the broader AWS ecosystem in the
            Philippines.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-primary-text leading-body mb-6">
            From day one the club carved out an AI-focused niche that no other
            chapter had explored. Affiliated with AWS User Group Philippines
            and AWS Academic Advocacy, the organization blends hands-on
            workshops, hackathons, and mentorship into a program designed for
            students at every skill level. Whether you have never touched a
            terminal or you are already shipping production workloads, there is
            a flight path for you.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-primary-text leading-body mb-10">
            The club is non-profit, non-political, and non-sectarian — open to
            every bona fide STI student regardless of background. What unites
            us is curiosity and the drive to build.
          </p>
        </ScrollReveal>

        {/* Vision & Mission */}
        <ScrollReveal delay={0.25}>
          <div className="space-y-6 border-l-2 border-accent-orange/30 pl-6">
            <div>
              <h3 className="font-display font-semibold text-lg text-accent-orange mb-2">
                Vision
              </h3>
              <p className="text-secondary-text text-sm leading-relaxed">
                A long-standing community of passionate learners from various
                universities across the country who embrace innovation and
                leverage the power of Amazon Web Services to drive
                technological advancements.
              </p>
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg text-accent-orange mb-2">
                Mission
              </h3>
              <p className="text-secondary-text text-sm leading-relaxed">
                Committed to community service initiatives and developing
                well-rounded perspectives on contributing to society.
                Empowering students to specialize in their desired field
                through inclusive educational initiatives, interactive
                workshops, and networking avenues. Equipping students with the
                tools to thrive in the digital economy and contribute to the
                transformation of industries through AWS.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

// ---------- Timeline & Departments Section ----------

function TimelineDepartments() {
  return (
    <div className="section-padding">
      <div className="container-site max-w-3xl">
        {/* Flight Log / Timeline */}
        <ScrollReveal>
          <h2 className="font-heading tracking-hero text-4xl md:text-5xl mb-12">
            FLIGHT LOG
          </h2>
        </ScrollReveal>

        <motion.div
          className="relative pl-8 mb-16"
          variants={timelineContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Vertical line */}
          <div
            className="absolute left-3 top-0 bottom-0 w-px"
            style={{ backgroundColor: 'rgba(255, 153, 0, 0.3)' }}
            aria-hidden="true"
          />

          {milestones.map((milestone) => (
            <motion.div
              key={milestone.date}
              className="relative mb-10 last:mb-0"
              variants={timelineItem}
            >
              {/* Dot on the line */}
              <div
                className="absolute -left-5 top-1 h-2.5 w-2.5 rounded-full bg-accent-orange"
                aria-hidden="true"
              />
              <span className="font-mono text-xs text-accent-orange tracking-label uppercase">
                {milestone.date}
              </span>
              <h3 className="font-display font-semibold text-base text-primary-text mt-1">
                {milestone.title}
              </h3>
              <p className="text-sm text-secondary-text mt-1">
                {milestone.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Departments */}
        <ScrollReveal>
          <h2 className="font-heading tracking-hero text-4xl md:text-5xl mb-4">
            DEPARTMENTS
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="mb-10">
            <SectionLabel text="SKILL BUILDER PROGRAM" />
          </div>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <motion.div
                key={dept.name}
                className="card-cartoon p-5"
                variants={fadeInUp}
              >
                <Icon
                  size={24}
                  className="text-accent-orange mb-3"
                  stroke={1.5}
                />
                <h3 className="font-display font-semibold text-base text-primary-text mb-2">
                  {dept.name}
                </h3>
                <p className="text-sm text-secondary-text">
                  {dept.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Six Offices */}
        <ScrollReveal>
          <h2 className="font-heading tracking-hero text-4xl md:text-5xl mb-4">
            SIX OFFICES
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <p className="text-secondary-text text-sm mb-8">
            The organizational backbone that keeps the club running — each
            office handles a distinct domain of operations.
          </p>
        </ScrollReveal>

        <motion.ul
          className="space-y-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {offices.map((office) => (
            <motion.li
              key={office.name}
              className="border-l-2 border-border pl-5 hover:border-accent-orange transition-colors duration-300"
              variants={fadeInUp}
            >
              <h3 className="font-display font-semibold text-base text-primary-text">
                {office.name}
              </h3>
              <p className="text-sm text-secondary-text mt-1">
                {office.description}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}
