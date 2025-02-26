import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    outputFileTracingIncludes: {
        registry: ["./registry/**/*"],
    },
    images: {
        domains: ["cdn.doras.to"],
    },
    output: "standalone",
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
};

export default nextConfig;
