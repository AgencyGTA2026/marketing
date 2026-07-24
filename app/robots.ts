import type { MetadataRoute } from "next";

const PRIVATE_PATHS = ["/api/", "/studio/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: "ChatGPT-User", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: "Claude-SearchBot", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: "Claude-User", allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: "https://www.baylinedigital.com/sitemap.xml",
    host: "https://www.baylinedigital.com",
  };
}
