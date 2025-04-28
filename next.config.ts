import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
  },
};

export default nextConfig;
