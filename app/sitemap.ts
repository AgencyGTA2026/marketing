import type { MetadataRoute } from "next";
import { generateBlogSitemap } from "@autoblogwriter/sdk/next";
import { SERVICES_DATA } from "@/lib/data/services";
import { INDUSTRIES_DATA } from "@/lib/data/industries";
import { LOCATIONS_DATA } from "@/lib/data/locations";

const FALLBACK_SITE_URL = "https://www.baylinedigital.com";

function getSiteUrl() {
  return (process.env.SITE_URL ?? FALLBACK_SITE_URL).replace(/\/$/, "");
}

export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const staticPaths = [
    "",
    "/services",
    "/industries",
    "/contact",
    ...Object.keys(SERVICES_DATA).map((slug) => `/services/${slug}`),
    ...Object.keys(INDUSTRIES_DATA).map((slug) => `/industries/${slug}`),
    ...Object.keys(LOCATIONS_DATA).map((slug) => `/locations/${slug}`),
  ];

  const staticEntries = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
  }));

  const blogEntries = await generateBlogSitemap();

  return [...staticEntries, ...blogEntries];
}
