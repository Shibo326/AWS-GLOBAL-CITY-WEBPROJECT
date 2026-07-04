// =============================================================================
// AWS Cloud Club — Global City: TypeScript Interfaces
// =============================================================================

/** Mission Board event */
export interface MissionEvent {
  id: string;
  name: string;
  date: string; // ISO 8601 date
  description: string; // Max 120 chars for card display
  fullDescription?: string; // Extended description for detail view
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED';
  location?: string;
  tags?: string[];
}

/** Social media link for officer profiles */
export interface SocialLink {
  platform: 'github' | 'linkedin' | 'facebook' | 'instagram' | 'twitter';
  url: string;
}

/** Crew Roster officer */
export interface Officer {
  id: string;
  name: string;
  role: string; // e.g., "University Captain & CEO"
  office: string; // e.g., "Executive Office"
  photo: string; // Path to officer photo
  description: string; // Max 150 chars for card back
  socials: SocialLink[];
  order: number; // Display priority
}

/** Signal Board announcement */
export interface Announcement {
  id: string;
  content: string;
  date: string; // ISO 8601 date
  pinned: boolean;
  category?: 'general' | 'event' | 'recruitment' | 'achievement';
}

/** Partners Marquee partner */
export interface Partner {
  id: string;
  name: string;
  logo: string; // Path to logo image
  url?: string;
}

/** Stats Strip metric */
export interface StatMetric {
  id: string;
  label: string; // e.g., "Members", "Events Held"
  value: number; // Target number for count-up
  suffix?: string; // e.g., "+" for "120+"
}

/** Enlist form submission data */
export interface EnlistFormData {
  fullName: string; // 1-100 characters
  email: string; // Must match STI domain pattern
  yearLevel: '1st' | '2nd' | '3rd' | '4th';
  program: string; // Selected from predefined list
  submittedAt: string; // ISO 8601 timestamp
}

/** Form field validation error */
export interface FormValidationError {
  field: keyof EnlistFormData;
  message: string;
}

/** AI Wingman knowledge base entry */
export interface KnowledgeEntry {
  id: string;
  topic:
    | 'identity'
    | 'officers'
    | 'membership'
    | 'events'
    | 'departments'
    | 'buildhers'
    | 'application';
  keywords: string[]; // Trigger words for matching
  question: string; // Canonical question form
  answer: string; // Rory's response in character (aviation persona)
  followUp?: string[]; // Suggested follow-up question chips
  priority: number; // Higher = preferred when multiple matches (1-10)
}

/** AI Wingman chat message */
export interface ChatMessage {
  id: string;
  role: 'user' | 'wingman';
  content: string;
  timestamp: number;
  topic?: KnowledgeEntry['topic']; // Topic tag for visual indicator
}

/** AI Wingman query match result */
export interface MatchResult {
  matched: boolean;
  answer: string;
  followUps?: string[];
  topic?: KnowledgeEntry['topic'];
}
