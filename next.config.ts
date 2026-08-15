import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [process.env.DEV_IP ?? '']
};

export default nextConfig;
