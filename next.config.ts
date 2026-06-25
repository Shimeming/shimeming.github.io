import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (user page served at domain root, no basePath).
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
