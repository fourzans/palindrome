import { describe, it, expect } from 'vitest';
import { isPalindrome } from '../utils/palindrome';

describe('isPalindrome', () => {
  it('detects valid palindrome', () => {
    expect(isPalindrome('Racecar')).toBe(true);
    expect(isPalindrome('Never odd or even')).toBe(true);
  });

  it('detects non-palindromes', () => {
    expect(isPalindrome('hello')).toBe(false);
  });

  it('respects strict mode', () => {
    expect(isPalindrome('a,b,a', true)).toBe(false);
    expect(isPalindrome('aba', true)).toBe(true);
  });
});
