import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["@resvg/resvg-js"],
  async headers() {
    const assetNoIndexHeaders = [
      {
        key: "X-Robots-Tag",
        value: "noindex",
      },
    ];
    const privateNoIndexHeaders = [
      {
        key: "X-Robots-Tag",
        value: "noindex, nofollow",
      },
    ];

    return [
      { source: "/site.webmanifest", headers: assetNoIndexHeaders },
      { source: "/_next/:path*", headers: assetNoIndexHeaders },
      { source: "/api/:path*", headers: privateNoIndexHeaders },
      { source: "/studio/:path*", headers: privateNoIndexHeaders },
    ];
  },
};

export default nextConfig;
