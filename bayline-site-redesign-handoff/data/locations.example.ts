export type LocationPageData = {
  slug: string;
  city: string;
  province: string;
  region: string;
  nearbyAreas: string[];
  metadata: { title: string; description: string; canonical: string };
  hero: { eyebrow: string; headline: string; summary: string };
  serviceEmphasis: string[];
  localContext: { heading: string; paragraphs: string[] };
  principles: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const whitby: LocationPageData = {
  slug: "whitby",
  city: "Whitby",
  province: "Ontario",
  region: "Durham Region",
  nearbyAreas: ["Brooklin", "Ajax", "Oshawa", "Pickering"],
  metadata: {
    title: "Web Design Whitby | Websites, Local SEO & Automation | Bayline Digital",
    description: "Bayline Digital builds modern websites, local landing pages, and lead automation for Whitby and Durham Region businesses.",
    canonical: "https://www.baylinedigital.com/locations/whitby",
  },
  hero: {
    eyebrow: "Web design in Whitby, Ontario",
    headline: "Look established. Get contacted. Follow up faster.",
    summary: "Bayline builds modern websites and practical automation for Whitby businesses that want more than a nicer-looking homepage.",
  },
  serviceEmphasis: ["custom-websites", "website-redesign", "local-seo", "automation"],
  localContext: {
    heading: "Local traffic is valuable only when the page feels credible.",
    paragraphs: [
      "Explain how customers in this city compare and contact providers.",
      "Replace this example with researched, genuinely useful city-specific context.",
    ],
  },
  principles: [
    { title: "Specific", description: "Use useful city context instead of duplicated city-name replacement." },
    { title: "Easy to scan", description: "Break search-friendly content into short sections for real visitors." },
    { title: "Ready to convert", description: "Keep the form close to the promise and easy to use on mobile." },
  ],
  faqs: [
    { question: "How much does a website cost in Whitby?", answer: "Provide the approved production answer here." },
    { question: "Can you improve an existing website?", answer: "Provide the approved production answer here." },
  ],
};
