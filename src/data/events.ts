import type { MissionEvent } from '@/types';

export const events: MissionEvent[] = [
  {
    id: 'evt-001',
    name: 'Cloud Foundations Workshop',
    date: '2025-02-15',
    description: 'Hands-on session covering AWS core services, IAM, EC2, and S3 — perfect for first-time cloud pilots.',
    fullDescription:
      'A comprehensive introductory workshop designed to give first-time cloud users real hands-on experience. Covers IAM policies, launching EC2 instances, creating S3 buckets, and basic billing dashboards. Bring your laptops and AWS Free Tier accounts.',
    status: 'COMPLETED',
    location: 'STI Academic Center, Room 401',
    tags: ['workshop', 'beginner', 'AWS'],
  },
  {
    id: 'evt-002',
    name: 'Serverless Hackathon: Build in 8 Hours',
    date: '2025-03-08',
    description: 'Teams compete to build a serverless app using Lambda, API Gateway, and DynamoDB within 8 hours.',
    fullDescription:
      'A high-energy competitive event where 4-member teams design, build, and deploy a fully serverless application. Judges evaluate on architecture, functionality, and presentation. Top 3 teams receive AWS credits and swag.',
    status: 'COMPLETED',
    location: 'STI Academic Center, Innovation Lab',
    tags: ['hackathon', 'serverless', 'team'],
  },
  {
    id: 'evt-003',
    name: 'AWS Solutions Architect Prep Night',
    date: '2025-04-12',
    description: 'Study session and mock exam for the AWS Solutions Architect Associate certification.',
    fullDescription:
      'Guided review of key SAA-C03 domains: compute, storage, networking, databases, and security. Includes a full-length timed practice exam followed by answer review. Open to all members preparing for certification.',
    status: 'COMPLETED',
    location: 'STI Academic Center, Room 302',
    tags: ['certification', 'study-group', 'SAA'],
  },
  {
    id: 'evt-004',
    name: 'AI/ML on AWS: SageMaker Deep Dive',
    date: '2025-06-21',
    description: 'Explore machine learning workflows with Amazon SageMaker — from data prep to model deployment.',
    fullDescription:
      'A technical deep-dive into the SageMaker ecosystem. Covers notebook instances, training jobs, built-in algorithms, and endpoint deployment. Participants will train and deploy a simple classification model live during the session.',
    status: 'ACTIVE',
    location: 'STI Academic Center, Room 401',
    tags: ['AI/ML', 'SageMaker', 'intermediate'],
  },
  {
    id: 'evt-005',
    name: 'Cloud Security CTF Challenge',
    date: '2025-07-19',
    description: 'Capture-the-flag competition focused on AWS security misconfigs, IAM exploits, and defense.',
    fullDescription:
      'A gamified security challenge where participants identify vulnerabilities in intentionally misconfigured AWS environments. Covers S3 bucket policies, IAM privilege escalation, security groups, and CloudTrail analysis. Solo or pairs.',
    status: 'UPCOMING',
    location: 'STI Academic Center, Innovation Lab',
    tags: ['security', 'CTF', 'competition'],
  },
  {
    id: 'evt-006',
    name: 'BuildHers+ Cloud Careers Panel',
    date: '2025-07-26',
    description: 'Panel discussion featuring women and LGBTQIA+ professionals in cloud computing careers.',
    fullDescription:
      'An inspiring panel event in collaboration with AWS User Group BuildHers+. Industry professionals share their cloud career journeys, discuss overcoming barriers in tech, and answer audience questions. Networking session follows.',
    status: 'UPCOMING',
    location: 'STI Academic Center, Auditorium',
    tags: ['BuildHers+', 'careers', 'panel'],
  },
  {
    id: 'evt-007',
    name: 'Terraform x AWS Infrastructure Lab',
    date: '2025-08-09',
    description: 'Learn infrastructure-as-code by provisioning AWS resources with Terraform in a guided lab.',
    fullDescription:
      'Participants write Terraform configurations to provision VPCs, subnets, EC2 instances, and RDS databases on AWS. Covers state management, modules, and best practices for production-grade IaC.',
    status: 'UPCOMING',
    location: 'STI Academic Center, Room 302',
    tags: ['IaC', 'Terraform', 'DevOps'],
  },
  {
    id: 'evt-008',
    name: 'AWS Community Day Philippines',
    date: '2025-09-13',
    description: 'National gathering of AWS user groups — keynotes, breakout sessions, and community networking.',
    fullDescription:
      'The annual AWS Community Day event bringing together cloud practitioners from across the Philippines. Features keynote speakers from AWS, technical breakout sessions, lightning talks, and a community networking reception. Our chapter will present a session on student-led cloud projects.',
    status: 'UPCOMING',
    location: 'BGC Arts Center, Taguig',
    tags: ['community-day', 'national', 'networking'],
  },
];
