export const containsPrintable = (str: string): boolean => {
  return Boolean(str) && /\S/.test(str);
};
