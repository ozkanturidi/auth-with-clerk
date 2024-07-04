import { createRequire } from "module";
const require = createRequire(import.meta.url);

import withBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "us-east-1.storage.xata.sh" }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withBundleAnalyzerConfig(nextConfig);
