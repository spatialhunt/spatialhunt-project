import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All images are served from /public as plain SVGs — no optimization needed.
    unoptimized: true,
  },

  // Reduce console noise from fetch logging
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
};

export default nextConfig;
