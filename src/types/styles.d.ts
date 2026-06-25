// Ambient declarations for side-effect style imports (e.g. `import './globals.css'`).
// TypeScript 6 errors on side-effect imports of modules without type declarations,
// and Next.js does not ship these for plain global stylesheets.
declare module '*.css';
declare module '*.scss';
