import type { Metadata } from "next";

export const SITE_URL = (process.env.SITE_URL ?? "https://www.baylinedigital.com").replace(/\/$/, "");

export function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function buildPageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    alternates: noIndex ? undefined : { canonical },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Bayline Digital",
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
