import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:import/recommended',
  ),
  {
    rules: {
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single', { 'avoidEscape': true }],
      '@typescript-eslint/no-unused-vars': ['warn'],
      'indent': ['warn', 2],
      'comma-dangle': ['warn', 'always-multiline'],
      'import/order': [
        'warn', {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // External modules from node_modules
            'internal', // Internal modules
            ['parent', 'sibling', 'index'], // Parent, sibling, and index modules
            'object', // Object imports
            'type', // Type imports
          ],
          pathGroups: [
            { pattern: '@/**', group: 'internal' },
          ],
          // pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc', // Sort in ascending order
            orderImportKind: 'asc',
            caseInsensitive: true, // Ignore case when sorting
          },
        },
      ],
    },
  },
];

export default eslintConfig;
