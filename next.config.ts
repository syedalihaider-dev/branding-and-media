import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  async redirects() {
    return [
      // Short form of the interviews slug resolves to the canonical URL.
      { source: "/media-interviews-appearances", destination: "/media-interviews-and-appearances", permanent: true },
    ];
  },
};

export default nextConfig;
