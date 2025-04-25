import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost'],
  },

  serverExternalPackages: ['sharp', 'detect-libc'],
};

export default nextConfig;
