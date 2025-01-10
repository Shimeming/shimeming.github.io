export const containsPrintable = (str: string) => {
  return str && /[^\s]/.test(str);
};
