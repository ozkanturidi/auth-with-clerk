import { hostname } from "os";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "us-east-1.storage.xata.sh" }],
  },
};

export default nextConfig;
