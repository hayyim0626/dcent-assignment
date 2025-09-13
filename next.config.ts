import type { NextConfig } from "next";
import nextI18NextConfig from "./next-i18next.config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  i18n: nextI18NextConfig.i18n,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "/KyungeunKim/iotrust-frontend-homework/**"
      }
    ],
    formats: ["image/webp", "image/avif"]
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_BUILD_ENV: process.env.NEXT_PUBLIC_BUILD_ENV
  }
};

export default nextConfig;
