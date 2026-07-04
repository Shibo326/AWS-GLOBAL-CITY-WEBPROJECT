import type { KnowledgeEntry } from '@/types';

export const knowledgeBase: KnowledgeEntry[] = [
  // --- IDENTITY DOMAIN ---
  {
    id: 'kb-001',
    topic: 'identity',
    keywords: ['what', 'club', 'aws', 'cloud', 'who', 'about'],
    question: 'What is AWS Cloud Club - Global City?',
    answer:
      'Roger that. AWS Cloud Club - Global City is a student-led tech organization at STI College Global City, Taguig. We are a special-interest, non-profit crew affiliated with AWS User Group Philippines and AWS Academic Advocacy. Our flight plan: empower students through cloud computing education, hands-on projects, and community engagement. Founded in 2024, currently 120+ active cloud pilots strong.',
    followUp: ['What is the vision?', 'How do I join?', 'Who are the officers?'],
    priority: 10,
  },
  {
    id: 'kb-002',
    topic: 'identity',
    keywords: ['vision', 'mission', 'goal', 'purpose'],
    question: 'What is the club vision and mission?',
    answer:
      'Our heading is clear, pilot. Vision: a long-standing community of passionate learners who embrace innovation and leverage AWS to drive technological advancements. Mission: empowering students through inclusive education, interactive workshops, and networking avenues to thrive in the digital economy. We are committed to community service and developing well-rounded contributors to society.',
    followUp: ['What are the departments?', 'What events do you hold?'],
    priority: 8,
  },
  {
    id: 'kb-003',
    topic: 'identity',
    keywords: ['rory', 'mascot', 'tiger', 'wingman', 'chatbot'],
    question: 'Who is Rory?',
    answer:
      'That would be me, co-pilot. I am Rory, the official club mascot and your AI Wingman. Picture a tiger wearing aviator goggles -- the Cloud Pilot persona. I am here to guide you through club intel: membership info, officer roster, upcoming missions, departments, and the application process. Think of me as your ground control for all things AWSCC - STI Global City.',
    followUp: ['How do I join the club?', 'What events are coming up?'],
    priority: 9,
  },

  // --- OFFICERS DOMAIN ---
  {
    id: 'kb-004',
    topic: 'officers',
    keywords: ['officers', 'leaders', 'board', 'executives', 'captain', 'CEO'],
    question: 'Who are the club officers?',
    answer:
      'Here is our command structure, pilot. The current Board of Executives: Rhenmart Dela Cruz (University Captain & CEO), Ryder Vince (Co-Captain & CFO), Andrew Manuel (Chief Finance Officer), Dan Robin (Chief Operations Officer), Lhenald Gumapo (Chief Relations Officer), and George Mori Ibañez (Chief Creatives Officer). Secretary and Marketing Officer positions are currently open. Check the Crew Roster page for the full lineup.',
    followUp: ['Who is the CEO?', 'What offices exist?', 'How are officers selected?'],
    priority: 8,
  },
  {
    id: 'kb-005',
    topic: 'officers',
    keywords: ['CEO', 'captain', 'president', 'leader', 'head', 'Rhenmart'],
    question: 'Who is the University Captain / CEO?',
    answer:
      'The University Captain and CEO is Rhenmart Dela Cruz. He leads executive governance, approval processes, and represents the club in all external engagements. The position requires at least one year as a board member plus AWS Cloud Clubs application approval from Academic Advocacy.',
    followUp: ['What does the CEO do?', 'How do I become an officer?'],
    priority: 7,
  },
  {
    id: 'kb-006',
    topic: 'officers',
    keywords: ['office', 'department', 'structure', 'organization'],
    question: 'What offices and departments exist?',
    answer:
      'We run a tight formation with six offices: Executive Office (governance and admin), Finance and Resource Office (budgets and HR), Operations and Events Office (missions and logistics), Marketing and Management Office (social media and branding), Relations and Communications Office (partnerships and speakers), and Creatives and Graphics Office (visual content and PUBMATs). Each office has a Chief Officer and Vice-Chief.',
    followUp: ['What are the Skill Builder departments?', 'How do I join an office?'],
    priority: 7,
  },

  // --- MEMBERSHIP DOMAIN ---
  {
    id: 'kb-007',
    topic: 'membership',
    keywords: ['join', 'member', 'enlist', 'sign up', 'register', 'apply'],
    question: 'How do I become a member?',
    answer:
      'Ready to get your wings, pilot? Membership is open to any bona fide student at STI. Requirements: submit the membership form through our Enlist portal, provide a softcopy of your latest Registration Form from STI-Global, and attach a 2x2 photo taken within the last 6 months. No discrimination of any kind -- all are welcome in this hangar. Applications are reviewed within 48 hours.',
    followUp: ['What are the benefits?', 'Can I be removed?', 'What is revalidation?'],
    priority: 10,
  },
  {
    id: 'kb-008',
    topic: 'membership',
    keywords: ['requirement', 'eligible', 'who can join', 'qualification'],
    question: 'What are the membership requirements?',
    answer:
      'Flight clearance requirements are straightforward: you must be a currently enrolled STI student. Submit a signed membership form (electronic is fine), your latest STI-Global registration form softcopy, and a recent 2x2 photo. No academic GWA requirement for general membership. Officers and department heads have additional qualifications, but joining as a member is open to all.',
    followUp: ['How do I apply?', 'What is revalidation?'],
    priority: 7,
  },
  {
    id: 'kb-009',
    topic: 'membership',
    keywords: ['revalidation', 'renew', 'semester', 'maintain', 'active'],
    question: 'What is membership revalidation?',
    answer:
      'Every semester, active members undergo revalidation to maintain flight status. You need to show: completed certifications, badges, or projects from Skill Builder activities; community engagements with AWS User Group; and participation in at least one Cloud Club event. Fail to participate in even one event during the semester and your membership may be terminated. Keep your logbook current, pilot.',
    followUp: ['What if I miss an event?', 'How do I get a certificate?'],
    priority: 6,
  },
  {
    id: 'kb-010',
    topic: 'membership',
    keywords: ['certificate', 'proof', 'credential', 'linkedin'],
    question: 'How do I get my Certificate of Membership?',
    answer:
      'Your wings are earned after completing your first semester or upon revalidation approval. Additional requirements: create a LinkedIn account and join the AWS Cloud Clubs Philippines Regional Meetup group. The certificate can be revoked for misconduct, non-compliance, or breach of confidentiality. Keep flying straight and it stays on your record permanently.',
    followUp: ['What can get me removed?', 'What are the benefits?'],
    priority: 5,
  },

  // --- EVENTS DOMAIN ---
  {
    id: 'kb-011',
    topic: 'events',
    keywords: ['event', 'workshop', 'hackathon', 'mission', 'activity', 'upcoming'],
    question: 'What events does the club hold?',
    answer:
      'Our mission board is always active. We run workshops on AWS services, hackathons where teams build real cloud solutions, certification prep sessions for AWS exams, CTF security challenges, career panels, and community day events. Each event is managed by the Operations and Events Office. Check the Mission Board page for current flight schedules -- events are tagged as UPCOMING, ACTIVE, or COMPLETED.',
    followUp: ['Are there upcoming events?', 'How do I RSVP?', 'What is Community Day?'],
    priority: 8,
  },
  {
    id: 'kb-012',
    topic: 'events',
    keywords: ['certification', 'exam', 'AWS certified', 'cloud practitioner', 'solutions architect'],
    question: 'Does the club help with AWS certifications?',
    answer:
      'Affirmative, pilot. We run dedicated certification prep sessions -- study groups, mock exams, and guided review of exam domains. Our members have collectively earned 45+ certifications. The Skill Builder departments also track badges and completed learning paths. Whether you are aiming for Cloud Practitioner or Solutions Architect, we have flight training materials and peer support ready.',
    followUp: ['What certifications can I get?', 'When is the next prep session?'],
    priority: 7,
  },

  // --- DEPARTMENTS DOMAIN ---
  {
    id: 'kb-013',
    topic: 'departments',
    keywords: ['skill builder', 'specialization', 'track', 'training', 'learn'],
    question: 'What are the Skill Builder Departments?',
    answer:
      'Our Skill Builder program runs seven specialization tracks: Software and Web Development, Security, Cloud Computing, Machine Learning and Artificial Intelligence, Data Analytics, Advanced Network and Infrastructure, and Internet of Things Development. Each department has a qualified head (GWA 2.75+) and the entire program is overseen by a Department Chairperson appointed by the CEO.',
    followUp: ['How do I join a department?', 'Who leads the departments?'],
    priority: 8,
  },
  {
    id: 'kb-014',
    topic: 'departments',
    keywords: ['department head', 'chairperson', 'lead', 'qualify'],
    question: 'How do I become a Department Head?',
    answer:
      'To lead a Skill Builder squadron, you need: a GWA of at least 2.75, no academic probation or disciplinary charges, full-time enrollment at STI Global, and a clean organizational record. Department renewal happens 2 weeks after the last event of the current term. The Department Chairperson is appointed by CEO decision and oversees the entire Skill Builder program.',
    followUp: ['What departments exist?', 'How do I become an officer?'],
    priority: 5,
  },

  // --- BUILDHERS DOMAIN ---
  {
    id: 'kb-015',
    topic: 'buildhers',
    keywords: ['buildhers', 'women', 'LGBTQIA', 'diversity', 'inclusion', 'ally'],
    question: 'What is BuildHers+?',
    answer:
      'BuildHers+ is our student community representing women and LGBTQIA+ members in cloud computing. Led by Ambassadors affiliated with AWS User Group BuildHers+, the community runs activities focused on skill development, empowerment, and combating prejudice in tech. Membership is open to anyone who identifies as a woman, LGBTQIA+, or ally -- you just need to be an active Cloud Club member.',
    followUp: ['How do I join BuildHers+?', 'Who leads BuildHers+?'],
    priority: 8,
  },
  {
    id: 'kb-016',
    topic: 'buildhers',
    keywords: ['ambassador', 'BuildHers lead', 'community lead'],
    question: 'Who leads BuildHers+?',
    answer:
      'BuildHers+ is led by Ambassadors -- a Lead and Co-Lead who represent the women and LGBTQIA+ community within our chapter. They must be affiliated with AWS User Group BuildHers+ and are supported by Directors who collaborate on academic rights, gender expression, and inclusivity initiatives. Appointment is approved by the Board and supported by AWS User Group BuildHers+.',
    followUp: ['What events does BuildHers+ run?', 'How do I become an ambassador?'],
    priority: 6,
  },

  // --- APPLICATION DOMAIN ---
  {
    id: 'kb-017',
    topic: 'application',
    keywords: ['form', 'submit', 'application', 'enlist', 'steps', 'how to apply'],
    question: 'How do I submit my application?',
    answer:
      'Here is your pre-flight checklist, pilot. Head to the Enlist page on this site. Fill in your full name, STI student email, year level, and program. Make sure your email matches the STI domain format. Hit submit and you will receive confirmation that your application is under review. Expect a response within 48 hours. Have your Registration Form softcopy and 2x2 photo ready for the next step.',
    followUp: ['What happens after I apply?', 'What are the requirements?'],
    priority: 9,
  },
  {
    id: 'kb-018',
    topic: 'application',
    keywords: ['after apply', 'next steps', 'review', 'accepted', 'status'],
    question: 'What happens after I apply?',
    answer:
      'Once your application lands, the Finance and Resource Office processes your membership. You will need to provide your STI-Global Registration Form softcopy and 2x2 photo. After verification, you receive your membership confirmation. To get your official Certificate of Membership, complete your first semester as an active member, create a LinkedIn account, and join the AWS Cloud Clubs Philippines Regional Meetup.',
    followUp: ['What are the benefits of joining?', 'What is revalidation?'],
    priority: 7,
  },
  {
    id: 'kb-019',
    topic: 'application',
    keywords: ['benefit', 'why join', 'perks', 'advantage', 'worth'],
    question: 'What are the benefits of joining?',
    answer:
      'Cleared to brief you on the perks, pilot. Members get: access to AWS learning resources and certification prep, hands-on project experience with real cloud services, networking with industry professionals and AWS community leaders, participation in hackathons and competitions, skill development across seven specialization tracks, and a Certificate of Membership for your professional portfolio. Plus, being part of a national AWS community network.',
    followUp: ['How do I apply?', 'What events do you hold?'],
    priority: 8,
  },
  {
    id: 'kb-020',
    topic: 'application',
    keywords: ['removed', 'terminated', 'kicked', 'expelled', 'leave'],
    question: 'Can membership be terminated?',
    answer:
      'Affirmative -- there are grounds for grounding. Membership can be terminated if you: fail to participate in at least one event per semester, graduate or finish your program, behave in ways that negatively affect the organization, breach your NDA or submit dishonest credentials, or fail to complete revalidation requirements. Keep your flight record clean and stay engaged with at least one mission per semester.',
    followUp: ['What is revalidation?', 'How do I stay active?'],
    priority: 5,
  },
];
