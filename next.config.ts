import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignores the strict image tag rules
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignores any hidden type errors
    ignoreBuildErrors: true,
  }
};

export default nextConfig;