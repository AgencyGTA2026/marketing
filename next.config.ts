import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["@resvg/resvg-js"],
  async headers() {
    const noIndexHeaders = [
      {
        key: "X-Robots-Tag",
        value: "noindex, nofollow, nosnippet",
      },
    ];

    return [
      { source: "/site.webmanifest", headers: noIndexHeaders },
      { source: "/_next/:path*", headers: noIndexHeaders },
      { source: "/api/:path*", headers: noIndexHeaders },
      { source: "/studio/:path*", headers: noIndexHeaders },
    ];
  },
};

export default nextConfig;
