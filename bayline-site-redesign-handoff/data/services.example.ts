export type ServicePageData = {
  slug: string;
  name: string;
  shortName: string;
  metadata: { title: string; description: string; canonical: string };
  hero: { eyebrow: string; headline: string; summary: string };
  audience: string[];
  problems: string[];
  outcomes: string[];
  deliverables: Array<{ title: string; description: string }>;
  process: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedServices: string[];
};

export const serviceSlugs = [
  "custom-websites",
  "landing-pages",
  "web-apps",
  "automation",
  "seo",
  "maintenance",
] as const;

export const customWebsites: ServicePageData = {
  slug: "custom-websites",
  name: "Custom CMS Websites",
  shortName: "Custom websites",
  metadata: {
    title: "Custom CMS Website Development | Bayline Digital",
    description: "Custom, editable websites designed for clarity, performance and long-term ownership.",
    canonical: "https://www.baylinedigital.com/services/custom-websites",
  },
  hero: {
    eyebrow: "Custom websites",
    headline: "A website your customers trust and your team can actually use.",
    summary: "Lead with the approved production service summary.",
  },
  audience: [],
  problems: [],
  outcomes: [],
  deliverables: [],
  process: [],
  faqs: [],
  relatedServices: ["seo", "automation", "maintenance"],
};
