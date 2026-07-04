import { describe, it, expect } from 'vitest';
import {
  normalize,
  tokenize,
  calculateOverlap,
  matchQuery,
  FALLBACK_MESSAGE,
} from '@/lib/wingman-engine';
import { knowledgeBase } from '@/data/knowledge';
import type { KnowledgeEntry } from '@/types';

// =============================================================================
// normalize()
// =============================================================================

describe('normalize', () => {
  it('lowercases input', () => {
    expect(normalize('HELLO WORLD')).toBe('hello world');
  });

  it('strips punctuation', () => {
    expect(normalize('Hello, World! How?')).toBe('hello world how');
  });

  it('trims whitespace', () => {
    expect(normalize('  spaced out  ')).toBe('spaced out');
  });

  it('collapses multiple spaces into one', () => {
    expect(normalize('too   many    spaces')).toBe('too many spaces');
  });

  it('removes special characters but keeps alphanumeric', () => {
    expect(normalize('test@#$%123')).toBe('test123');
  });
});

// =============================================================================
// tokenize()
// =============================================================================

describe('tokenize', () => {
  it('filters tokens shorter than 3 characters', () => {
    const result = tokenize('I am a big cloud fan');
    expect(result).not.toContain('i');
    expect(result).not.toContain('am');
    expect(result).not.toContain('a');
    expect(result).toContain('big');
    expect(result).toContain('cloud');
    expect(result).toContain('fan');
  });

  it('returns empty array for input with only short words', () => {
    expect(tokenize('I am a')).toEqual([]);
  });

  it('normalizes before tokenizing', () => {
    const result = tokenize('BIG CLOUD!');
    expect(result).toEqual(['big', 'cloud']);
  });
});

// =============================================================================
// calculateOverlap()
// =============================================================================

describe('calculateOverlap', () => {
  it('returns 0 for empty tokens array', () => {
    expect(calculateOverlap([], ['keyword'])).toBe(0);
  });

  it('returns 1.0 when all tokens match keywords', () => {
    const score = calculateOverlap(['join', 'club'], ['join', 'club', 'member']);
    expect(score).toBe(1.0);
  });

  it('returns partial score when some tokens match', () => {
    const score = calculateOverlap(['join', 'random'], ['join', 'club']);
    expect(score).toBe(0.5);
  });

  it('returns 0 when no tokens match', () => {
    const score = calculateOverlap(['xyz', 'abc'], ['join', 'club']);
    expect(score).toBe(0);
  });

  it('matches when token contains keyword or keyword contains token', () => {
    // token "membership" contains keyword "member"
    const score = calculateOverlap(['membership'], ['member']);
    expect(score).toBe(1.0);
  });
});

// =============================================================================
// matchQuery() — known keywords
// =============================================================================

describe('matchQuery - known keywords', () => {
  it('returns a match for "join" and "member" related query', () => {
    const result = matchQuery('join member enlist sign up register', knowledgeBase);
    expect(result.matched).toBe(true);
    expect(result.topic).toBe('membership');
  });

  it('returns a match for "officers" and "executives" related query', () => {
    const result = matchQuery('officers leaders board executives captain', knowledgeBase);
    expect(result.matched).toBe(true);
    expect(result.topic).toBe('officers');
  });

  it('returns a match for "departments" and "skill builder" query', () => {
    const result = matchQuery('skill builder specialization track training', knowledgeBase);
    expect(result.matched).toBe(true);
    expect(result.topic).toBe('departments');
  });

  it('returns a match for "events" related query', () => {
    const result = matchQuery('event workshop hackathon mission upcoming', knowledgeBase);
    expect(result.matched).toBe(true);
    expect(result.topic).toBe('events');
  });

  it('returns a match for "buildhers" related query', () => {
    const result = matchQuery('buildhers women LGBTQIA diversity inclusion', knowledgeBase);
    expect(result.matched).toBe(true);
    expect(result.topic).toBe('buildhers');
  });
});

// =============================================================================
// matchQuery() — fallback behavior
// =============================================================================

describe('matchQuery - fallback', () => {
  it('returns fallback for gibberish input', () => {
    const result = matchQuery('xyzabc12345 qwerty asdf', knowledgeBase);
    expect(result.matched).toBe(false);
    expect(result.answer).toBe(FALLBACK_MESSAGE);
  });

  it('returns fallback for empty input', () => {
    const result = matchQuery('', knowledgeBase);
    expect(result.matched).toBe(false);
    expect(result.answer).toBe(FALLBACK_MESSAGE);
  });

  it('returns fallback for whitespace-only input', () => {
    const result = matchQuery('   ', knowledgeBase);
    expect(result.matched).toBe(false);
    expect(result.answer).toBe(FALLBACK_MESSAGE);
  });
});

// =============================================================================
// matchQuery() — determinism
// =============================================================================

describe('matchQuery - determinism', () => {
  it('returns identical results for the same input called twice', () => {
    const input = 'How do I join the cloud club?';
    const result1 = matchQuery(input, knowledgeBase);
    const result2 = matchQuery(input, knowledgeBase);
    expect(result1).toEqual(result2);
  });

  it('returns identical results for another repeated query', () => {
    const input = 'What are the departments and specializations?';
    const result1 = matchQuery(input, knowledgeBase);
    const result2 = matchQuery(input, knowledgeBase);
    expect(result1).toEqual(result2);
  });
});

// =============================================================================
// All 7 topic domains are reachable
// =============================================================================

describe('matchQuery - all 7 topic domains are reachable', () => {
  const topicQueries: [KnowledgeEntry['topic'], string][] = [
    ['identity', 'What is this cloud club about?'],
    ['officers', 'Who are the officers and leaders?'],
    ['membership', 'How do I join and become a member?'],
    ['events', 'What events and workshops are upcoming?'],
    ['departments', 'What skill builder departments exist?'],
    ['buildhers', 'Tell me about BuildHers and women in tech'],
    ['application', 'How do I submit my application form?'],
  ];

  for (const [expectedTopic, query] of topicQueries) {
    it(`can reach the "${expectedTopic}" domain`, () => {
      const result = matchQuery(query, knowledgeBase);
      expect(result.matched).toBe(true);
      expect(result.topic).toBe(expectedTopic);
    });
  }
});
