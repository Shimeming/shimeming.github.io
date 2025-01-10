export function extractFirstNonEmptyLines(content: string, lineCount: number): string {
  const lines = content.split('\n');
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  const firstNonEmptyLines = nonEmptyLines.slice(0, lineCount);
  return firstNonEmptyLines.join('\n');
}
