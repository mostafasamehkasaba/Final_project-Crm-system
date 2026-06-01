import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",  // ← للـ home page
      },
    ],
  },
};

export default nextConfig;