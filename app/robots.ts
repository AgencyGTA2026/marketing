import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const PRIVATE_PATHS = ["/api/", "/studio/", "/ideas/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
