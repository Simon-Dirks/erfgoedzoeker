export interface ParsedIsoDate {
  year: number;
  month?: number;
  day?: number;
}

/**
 * Parses an ISO8601 date string (see https://docs.nde.nl/schema-profile/#CreativeWork-dateCreated)
 */
export function parseIsoDate(value: string): ParsedIsoDate | undefined {
  const datePart = value.split('T')[0];
  const isNegativeYear = datePart.startsWith('-');
  const [yearPart, monthPart, dayPart] = (
    isNegativeYear ? datePart.slice(1) : datePart
  ).split('-');

  // Year must be at least 4 digits (zero-padded, ISO8601)
  if (!yearPart || yearPart.length < 4 || Number.isNaN(Number(yearPart))) {
    return undefined;
  }

  const month = monthPart !== undefined ? Number(monthPart) : undefined;
  const day = dayPart !== undefined ? Number(dayPart) : undefined;
  if (
    (month !== undefined && Number.isNaN(month)) ||
    (day !== undefined && Number.isNaN(day))
  ) {
    return undefined;
  }

  return { year: (isNegativeYear ? -1 : 1) * Number(yearPart), month, day };
}

export function formatParsedIsoDate(
  parsed: ParsedIsoDate,
  locale: string,
): string {
  const { year, month, day } = parsed;
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    timeZone: 'UTC',
  };
  if (month) options.month = 'long';
  if (day) options.day = 'numeric';
  if (year <= 0) options.era = 'short';

  const date = new Date(0);
  date.setUTCFullYear(year, (month ?? 1) - 1, day ?? 1);

  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatIsoYear(parsed: ParsedIsoDate, locale: string): string {
  const date = new Date(0);
  date.setUTCFullYear(parsed.year, 0, 1);

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    era: parsed.year <= 0 ? 'short' : undefined,
    timeZone: 'UTC',
  }).format(date);
}
