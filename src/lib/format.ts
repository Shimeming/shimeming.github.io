/**
 * Parse a date string and return its ISO-8601 date portion (YYYY-MM-DD),
 * or undefined if the string is not a valid date.
 */
export function formatIsoDate(dateStr: string): string | undefined {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return undefined;
  return d.toISOString().split('T')[0];
}
