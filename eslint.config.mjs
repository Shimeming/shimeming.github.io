import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      'indent': ['error', 2],
      'comma-dangle': ['warn', 'always-multiline'],
    },
  },
];

export default eslintConfig;
