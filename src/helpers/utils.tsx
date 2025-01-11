import { type IconType } from 'react-icons';

export const containsPrintable = (str: string) => {
  return str && /[^\s]/.test(str);
};

export const iconNameToFaIcon = async (iconName: string) => {
  const iconModule = await import('react-icons/fa'); // ${moduleName.toLowerCase()}
  return iconModule[iconName as keyof typeof iconModule] as IconType;
};
