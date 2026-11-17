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
      { source: "/book-writing-and-editing", destination: "/book-writing-editing", permanent: true },
      { source: "/blog-and-article-writing", destination: "/blog-article-writing", permanent: true },
    ];
  },
};

export default nextConfig;
