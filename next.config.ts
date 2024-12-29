import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '', // since the repo is shimeming.github.io, I don't need a base path
  output: 'export', // enable static exports
};

export default nextConfig;
