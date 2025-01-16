import { type IconType } from 'react-icons';

export const containsPrintable = (str: string) => {
  return str && /[^\s]/.test(str);
};

export const iconNameToFaIcon = async (iconName: string) => {
  const iconModule = await import('react-icons/fa'); // ${moduleName.toLowerCase()}
  return iconModule[iconName as keyof typeof iconModule] as IconType;
};

export function extractFirstNonEmptyLines(content: string, lineCount: number): string {
  const lines = content.split('\n');
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  const firstNonEmptyLines = nonEmptyLines.slice(0, lineCount);
  return firstNonEmptyLines.join('\n');
}
