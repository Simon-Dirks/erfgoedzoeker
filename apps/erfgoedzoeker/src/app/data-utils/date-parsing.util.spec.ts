import { describe, expect, it } from 'vitest';
import {
  formatIsoYear,
  formatParsedIsoDate,
  parseIsoDate,
} from './date-parsing.util';

describe('parseIsoDate', () => {
  it('parses a full ISO date', () => {
    expect(parseIsoDate('1950-06-15')).toEqual({
      year: 1950,
      month: 6,
      day: 15,
    });
  });

  it('parses a year-only date', () => {
    expect(parseIsoDate('1950')).toEqual({
      year: 1950,
      month: undefined,
      day: undefined,
    });
  });

  it('parses a negative (BCE) year', () => {
    expect(parseIsoDate('-0500-01-01')).toEqual({
      year: -500,
      month: 1,
      day: 1,
    });
  });

  it('returns undefined for a year shorter than 4 digits', () => {
    expect(parseIsoDate('123')).toBeUndefined();
  });

  it('returns undefined for a non-numeric year', () => {
    expect(parseIsoDate('abcd-01-01')).toBeUndefined();
  });

  it('parses a year outside the representable JS Date range', () => {
    // JS Date only supports years roughly between -271821 and 275760
    expect(parseIsoDate('9999999-01-01')).toEqual({
      year: 9999999,
      month: 1,
      day: 1,
    });
    expect(parseIsoDate('-9999999-01-01')).toEqual({
      year: -9999999,
      month: 1,
      day: 1,
    });
  });
});

describe('formatParsedIsoDate', () => {
  it('formats a full date without throwing', () => {
    expect(() =>
      formatParsedIsoDate({ year: 1950, month: 6, day: 15 }, 'nl'),
    ).not.toThrow();
  });

  it('formats a year-only date without throwing', () => {
    expect(() => formatParsedIsoDate({ year: 1950 }, 'nl')).not.toThrow();
  });

  it('formats a year outside the representable Date range', () => {
    expect(formatParsedIsoDate({ year: 300000000, month: 1 }, 'nl')).toBe(
      '300000000',
    );
    expect(formatParsedIsoDate({ year: -300000000 }, 'nl')).toBe(
      '300000000 v.Chr.',
    );
  });
});

describe('formatIsoYear', () => {
  it('formats a year without throwing', () => {
    expect(() => formatIsoYear({ year: 1950 }, 'nl')).not.toThrow();
  });

  it('formats a negative year without throwing', () => {
    expect(() => formatIsoYear({ year: -500 }, 'nl')).not.toThrow();
  });

  it('formats a positive year outside the representable Date range', () => {
    expect(formatIsoYear({ year: 300000000 }, 'nl')).toBe('300000000');
  });

  it('formats a negative year outside the representable Date range', () => {
    expect(formatIsoYear({ year: -300000000 }, 'nl')).toBe('300000000 v.Chr.');
  });

  it('formats an extreme negative year with the correct era wording in English', () => {
    expect(formatIsoYear({ year: -300000000 }, 'en')).toBe('300000000 BC');
  });
});
