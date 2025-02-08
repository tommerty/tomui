import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    registry: ["./registry/**/*"],
  },
  /* config options here */
  output: "standalone",
};

export default nextConfig;
