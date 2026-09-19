import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Skip all image optimization — images are large SVGs served from /public.
    // next/image with unoptimized still reads file metadata synchronously which
    // blocks Turbopack compilation when images are multi-MB.
    unoptimized: true,
    // Silence the "hostname not configured" warnings for any external images
    remotePatterns: [],
  },
  // Prevent webpack/turbopack from trying to parse binary-encoded SVG assets
  // by treating them as static files rather than modules.
  turbopack: {
    rules: {
      // Large SVGs in public are referenced by path string, not imported —
      // no rule needed, this block is here for future asset module config.
    },
  },
  // Reduce logging noise in development
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
