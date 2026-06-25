import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const src = fileURLToPath(new URL('./src/', import.meta.url));
const pub = fileURLToPath(new URL('./public/', import.meta.url));

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@public\//, replacement: pub },
      { find: /^@\//, replacement: src },
    ],
  },
  test: { environment: 'node', include: ['src/**/*.test.ts'], exclude: ['node_modules', '.next', 'out'] },
});
