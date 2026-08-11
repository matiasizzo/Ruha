import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Cuando lleguen las fotos: subirlas a /public/media o apuntar a un CDN aquí.
    remotePatterns: [],
  },
};

export default nextConfig;
