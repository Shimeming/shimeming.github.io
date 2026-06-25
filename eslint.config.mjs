import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

// Note: eslint-config-next already registers eslint-plugin-import, so the
// `import/*` rules below work without separately adding the plugin.
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single', { 'avoidEscape': true }],
      '@typescript-eslint/no-unused-vars': ['warn', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
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
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
];

export default eslintConfig;
