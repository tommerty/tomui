import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    outputFileTracingIncludes: {
        registry: ["./registry/**/*"],
    },
    /* config options here */
    output: "standalone",
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
};

export default nextConfig;
