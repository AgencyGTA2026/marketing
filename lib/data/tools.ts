export type FreeTool = {
  number: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  outcome: string;
  category: string;
};

export const FREE_TOOLS: FreeTool[] = [
  {
    number: "01",
    slug: "automation-roi-calculator",
    title: "Automation ROI Calculator",
    shortTitle: "Automation ROI",
    description:
      "Estimate the hours and labour cost a repeated workflow consumes, then see the annual value and likely payback period of automating it.",
    outcome: "Annual savings model · Recovered hours · Payback estimate",
    category: "Operations",
  },
  {
    number: "02",
    slug: "landing-page-opportunity-calculator",
    title: "Landing Page Opportunity Calculator",
    shortTitle: "Landing Page Opportunity",
    description:
      "Model how a clearer landing page could change lead volume and pipeline value using your traffic, conversion rate, and lead economics.",
    outcome: "Additional leads · Qualified opportunities · Monthly value",
    category: "Conversion",
  },
  {
    number: "03",
    slug: "website-project-brief-builder",
    title: "Website Project Brief Builder",
    shortTitle: "Website Brief Builder",
    description:
      "Turn a few business inputs into a focused website brief with recommended pages, priorities, success measures, and a practical starting scope.",
    outcome: "Project summary · Page plan · Priorities · Success measures",
    category: "Planning",
  },
];

export function getToolHref(slug: string) {
  return `/tools/${slug}`;
}
