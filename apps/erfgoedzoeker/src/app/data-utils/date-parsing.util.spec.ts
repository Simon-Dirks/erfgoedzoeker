import { describe, expect, it } from 'vitest';
import {
  formatIsoYear,
  formatIsoYearOrRange,
  formatParsedIsoDate,
  formatParsedIsoDateOrRange,
  parseIsoDate,
  parseIsoDateOrRange,
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

describe('parseIsoDateOrRange', () => {
  it('parses a single date without end', () => {
    expect(parseIsoDateOrRange('1950-06-15')).toEqual({
      start: { year: 1950, month: 6, day: 15 },
    });
  });

  it('parses a year range', () => {
    expect(parseIsoDateOrRange('1870/1895')).toEqual({
      start: { year: 1870, month: undefined, day: undefined },
      end: { year: 1895, month: undefined, day: undefined },
    });
  });

  it('parses a range with negative years', () => {
    expect(parseIsoDateOrRange('-0500/-0400')?.end?.year).toBe(-400);
  });

  it('returns undefined if either side is invalid', () => {
    expect(parseIsoDateOrRange('1870/abc')).toBeUndefined();
    expect(parseIsoDateOrRange('abc/1895')).toBeUndefined();
    expect(parseIsoDateOrRange('1870/')).toBeUndefined();
  });

  it('returns undefined for more than two parts', () => {
    expect(parseIsoDateOrRange('1870/1880/1890')).toBeUndefined();
  });
});

describe('formatIsoYearOrRange', () => {
  it('formats a range as start – end', () => {
    expect(formatIsoYearOrRange(parseIsoDateOrRange('1870/1895')!, 'nl')).toBe(
      '1870 – 1895',
    );
  });

  it('formats only years even if the dates are more specific', () => {
    expect(
      formatIsoYearOrRange(parseIsoDateOrRange('1870-03-01/1895-12-31')!, 'nl'),
    ).toBe('1870 – 1895');
  });

  it('collapses a range with identical start and end', () => {
    expect(formatIsoYearOrRange(parseIsoDateOrRange('1870/1870')!, 'nl')).toBe(
      '1870',
    );
  });

  it('formats a single date as a year', () => {
    expect(formatIsoYearOrRange(parseIsoDateOrRange('1870-05-01')!, 'nl')).toBe(
      '1870',
    );
  });
});

describe('formatParsedIsoDateOrRange', () => {
  it('formats a full date range', () => {
    expect(
      formatParsedIsoDateOrRange(parseIsoDateOrRange('1870/1895')!, 'nl'),
    ).toBe('1870 – 1895');
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
