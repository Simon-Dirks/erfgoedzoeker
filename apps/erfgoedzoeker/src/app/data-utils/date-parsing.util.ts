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

  const year = (isNegativeYear ? -1 : 1) * Number(yearPart);
  if (!Number.isFinite(year)) {
    return undefined;
  }

  return { year, month, day };
}

/**
 * Builds a UTC `Date` for the given year/month/day, or `undefined` if the
 * year is outside the range that `Date` can handle, see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date
 */
function toUtcDate(year: number, month = 1, day = 1): Date | undefined {
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? undefined : date;
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

  const date = toUtcDate(year, month, day);
  if (!date) {
    return formatIsoYear(parsed, locale);
  }

  return new Intl.DateTimeFormat(locale, options).format(date);
}

export function formatIsoYear(parsed: ParsedIsoDate, locale: string): string {
  const date = toUtcDate(parsed.year);
  if (!date) {
    return formatYearOutsideJsDateRange(parsed.year, locale);
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    era: parsed.year <= 0 ? 'short' : undefined,
    timeZone: 'UTC',
  }).format(date);
}

function formatYearOutsideJsDateRange(year: number, locale: string): string {
  const magnitude = new Intl.NumberFormat(locale, {
    useGrouping: false,
  }).format(Math.abs(year));

  if (year > 0) return magnitude;

  const placeholder = new Date(0);
  placeholder.setUTCFullYear(-1, 0, 1);
  const parts = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    era: 'short',
    timeZone: 'UTC',
  }).formatToParts(placeholder);

  return parts
    .map((part) => (part.type === 'year' ? magnitude : part.value))
    .join('');
}
