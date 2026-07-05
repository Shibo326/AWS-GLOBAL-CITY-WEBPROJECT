import { describe, it, expect } from 'vitest';
import {
  matchQuery,
  normalize,
  tokenize,
  calculateOverlap,
  MATCH_THRESHOLD,
  FALLBACK_MESSAGE,
} from '@/lib/wingman-engine';
import { knowledgeBase } from '@/data/knowledge';
import { events } from '@/data/events';
import { officers } from '@/data/officers';
import { announcements } from '@/data/announcements';
import { partners } from '@/data/partners';
import { stats } from '@/data/stats';
import { navLinks, programs } from '@/lib/constants';

describe('Navigation data', () => {
  it('renders all 7 navigation links', () => {
    expect(navLinks).toHaveLength(7);
    const labels = navLinks.map((l) => l.label);
    expect(labels).toContain('Home');
    expect(labels).toContain('About');
    expect(labels).toContain('Missions');
    expect(labels).toContain('Crew');
    expect(labels).toContain('Announcements');
    expect(labels).toContain('Wingman');
    expect(labels).toContain('Join Now');
  });
});

describe('MissionCard data', () => {
  it('all events have required fields', () => {
    events.forEach((event) => {
      expect(event.id).toBeTruthy();
      expect(event.name).toBeTruthy();
      expect(event.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(event.description.length).toBeLessThanOrEqual(200);
      expect(['UPCOMING', 'ACTIVE', 'COMPLETED']).toContain(event.status);
    });
  });

  it('has correct status badge mapping for each status', () => {
    const statuses = new Set(events.map((e) => e.status));
    expect(
      statuses.has('UPCOMING') || statuses.has('ACTIVE') || statuses.has('COMPLETED')
    ).toBe(true);
  });
});

describe('Officers data', () => {
  it('all officers have required fields', () => {
    officers.forEach((officer) => {
      expect(officer.id).toBeTruthy();
      expect(officer.name).toBeTruthy();
      expect(officer.role).toBeTruthy();
      expect(officer.office).toBeTruthy();
      expect(officer.description.length).toBeLessThanOrEqual(200);
      expect(officer.socials.length).toBeLessThanOrEqual(4);
      expect(officer.order).toBeGreaterThan(0);
    });
  });

  it('officers are unique by id', () => {
    const ids = officers.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('Announcements data', () => {
  it('all announcements have required fields', () => {
    announcements.forEach((ann) => {
      expect(ann.id).toBeTruthy();
      expect(ann.content).toBeTruthy();
      expect(ann.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(typeof ann.pinned).toBe('boolean');
    });
  });

  it('has at least one pinned announcement', () => {
    const pinned = announcements.filter((a) => a.pinned);
    expect(pinned.length).toBeGreaterThan(0);
  });
});

describe('Partners data', () => {
  it('has at least 2 partners (marquee minimum)', () => {
    expect(partners.length).toBeGreaterThanOrEqual(2);
  });
});

describe('Stats data', () => {
  it('has exactly 4 metrics', () => {
    expect(stats).toHaveLength(4);
  });

  it('all stats have positive target values', () => {
    stats.forEach((stat) => {
      expect(stat.value).toBeGreaterThan(0);
    });
  });
});

describe('Programs constant', () => {
  it('has at least 5 program options', () => {
    expect(programs.length).toBeGreaterThanOrEqual(5);
  });
});

describe('Wingman engine integration', () => {
  it('can find answers for all 7 knowledge domains', () => {
    const testQueries: Record<string, string> = {
      identity: 'what is aws cloud club',
      officers: 'officers board executives captain',
      membership: 'how to join member enlist',
      events: 'upcoming events workshop hackathon',
      departments: 'skill builder specialization track',
      buildhers: 'buildhers women lgbtqia diversity',
      application: 'how to apply submit form application',
    };

    for (const [domain, query] of Object.entries(testQueries)) {
      const result = matchQuery(query, knowledgeBase);
      expect(result.matched).toBe(true);
      expect(result.topic).toBe(domain);
    }
  });

  it('returns fallback for unmatched queries', () => {
    const result = matchQuery('xyzzy quantum flux', knowledgeBase);
    expect(result.matched).toBe(false);
    expect(result.answer).toBe(FALLBACK_MESSAGE);
  });

  it('normalize strips punctuation and lowercases', () => {
    expect(normalize('Hello, World!')).toBe('hello world');
    expect(normalize('  AWS   Cloud  ')).toBe('aws cloud');
    expect(normalize('What?!@#$%')).toBe('what');
  });

  it('tokenize filters short words', () => {
    const tokens = tokenize('How do I join the club?');
    expect(tokens).not.toContain('do');
    expect(tokens).toContain('how');
    expect(tokens).toContain('join');
    expect(tokens).toContain('the');
    expect(tokens).toContain('club');
  });

  it('calculateOverlap returns 0 for empty tokens', () => {
    expect(calculateOverlap([], ['aws', 'cloud'])).toBe(0);
  });

  it('calculateOverlap returns correct ratio', () => {
    const score = calculateOverlap(['aws', 'club'], ['aws', 'cloud', 'club']);
    expect(score).toBe(1); // both tokens match
  });

  it('MATCH_THRESHOLD is 0.25', () => {
    expect(MATCH_THRESHOLD).toBe(0.25);
  });
});
