import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages = static export, no server — next/image harus unoptimized
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
