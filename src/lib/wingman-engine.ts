import type { KnowledgeEntry, MatchResult } from '@/types';
import { knowledgeBase } from '@/data/knowledge';

// =============================================================================
// AWS Cloud Club — AI Wingman Matching Engine
// Pure, deterministic keyword-matching engine for Rory chatbot.
// Same input always produces the same output — no randomness, no side effects.
// =============================================================================

/** Minimum score required to consider a knowledge base entry a match. */
export const MATCH_THRESHOLD = 0.25;

/** Weight multiplier applied to entry priority (1-10 scale). */
export const PRIORITY_WEIGHT = 0.015;

/** Fallback response when no knowledge base entry matches the query. */
export const FALLBACK_MESSAGE =
  'I do not have intel on that one. Try asking about: how to join the club, our departments and specializations, upcoming events, or club officers. You can also check our Facebook page: https://www.facebook.com/awslcstiglobal';

/**
 * Normalize user input for matching.
 * Lowercases, removes punctuation (keeps alphanumeric and spaces), and trims.
 */
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Tokenize normalized input into meaningful words.
 * Splits by whitespace and filters out tokens shorter than 3 characters
 * (common stop words like "is", "do", "the", "a", "an").
 */
export function tokenize(input: string): string[] {
  const normalized = normalize(input);
  return normalized.split(/\s+/).filter((token) => token.length >= 3);
}

/**
 * Calculate overlap score between user tokens and entry keywords.
 * For each token, checks if any keyword contains it OR the token contains the keyword.
 * Returns matchCount / max(tokens.length, 1) as a score between 0 and 1.
 */
export function calculateOverlap(tokens: string[], keywords: string[]): number {
  if (tokens.length === 0) return 0;

  let matchCount = 0;
  for (const token of tokens) {
    const hasMatch = keywords.some(
      (keyword) => keyword.includes(token) || token.includes(keyword)
    );
    if (hasMatch) {
      matchCount++;
    }
  }

  return matchCount / Math.max(tokens.length, 1);
}

/**
 * Match a user query against the knowledge base.
 * Scores each entry using keyword overlap + priority weighting,
 * then returns the best match if it exceeds the threshold.
 *
 * This is a PURE function: same input + same knowledge base = same output, always.
 */
export function matchQuery(
  input: string,
  kb: KnowledgeEntry[]
): MatchResult {
  const tokens = tokenize(input);

  // If no meaningful tokens, return fallback immediately
  if (tokens.length === 0) {
    return {
      matched: false,
      answer: FALLBACK_MESSAGE,
    };
  }

  // Score each knowledge base entry
  const scored = kb.map((entry) => {
    const keywordScore = calculateOverlap(tokens, entry.keywords);
    const totalScore = keywordScore + entry.priority * PRIORITY_WEIGHT;
    return { entry, score: totalScore };
  });

  // Sort by score descending (stable: higher priority wins ties)
  scored.sort((a, b) => b.score - a.score);

  const best = scored[0];

  if (best && best.score >= MATCH_THRESHOLD) {
    return {
      matched: true,
      answer: best.entry.answer,
      followUps: best.entry.followUp,
      topic: best.entry.topic,
    };
  }

  return {
    matched: false,
    answer: FALLBACK_MESSAGE,
  };
}

/**
 * Convenience function for components.
 * Processes a user message against the full knowledge base and returns the match result.
 */
export function processMessage(input: string): MatchResult {
  return matchQuery(input, knowledgeBase);
}
