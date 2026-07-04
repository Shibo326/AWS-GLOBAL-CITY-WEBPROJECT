import { describe, it, expect } from 'vitest';
import { matchQuery, normalize } from '@/lib/wingman-engine';
import { knowledgeBase } from '@/data/knowledge';

/**
 * Property 5: Wingman Determinism
 * Given the same normalized input, matchQuery always returns the same result.
 * 
 * **Validates: Requirements 9.1, 9.6**
 */
describe('Property 5: Wingman Determinism', () => {
  const testInputs = [
    'how do i join the club',
    'who are the officers',
    'what departments exist',
    'tell me about buildhers',
    'what events are upcoming',
    'random gibberish xyzabc',
    'what is aws cloud club',
    '',
    'membership requirements',
    'how to apply',
  ];

  it('returns identical results for the same input across multiple calls', () => {
    for (const input of testInputs) {
      const result1 = matchQuery(input, knowledgeBase);
      const result2 = matchQuery(input, knowledgeBase);
      const result3 = matchQuery(input, knowledgeBase);

      expect(result1).toEqual(result2);
      expect(result2).toEqual(result3);
    }
  });

  it('normalized form of the same input produces same output', () => {
    const variations = [
      'How Do I JOIN?!',
      'how do i join',
      '  HOW DO I JOIN  ',
    ];

    const normalizedResults = variations.map(v => matchQuery(normalize(v), knowledgeBase));
    
    // All normalized variations should produce the same answer
    for (let i = 1; i < normalizedResults.length; i++) {
      expect(normalizedResults[i].answer).toEqual(normalizedResults[0].answer);
    }
  });

  it('is a pure function with no side effects', () => {
    // Running matchQuery should not change the knowledge base
    const kbBefore = JSON.stringify(knowledgeBase);
    matchQuery('test input', knowledgeBase);
    matchQuery('another test', knowledgeBase);
    const kbAfter = JSON.stringify(knowledgeBase);
    
    expect(kbAfter).toEqual(kbBefore);
  });
});
