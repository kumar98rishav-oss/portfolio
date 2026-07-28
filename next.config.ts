import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export — the site deploys to any static host (Render, GitHub Pages, …)
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
