import type { NextConfig } from "next";
import createMDX from "@next/mdx";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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
const withMDX = createMDX({
    // Add markdown plugins here, as desired
});
export default withMDX(nextConfig);
