// Local landing page content model for the Google Ads city campaign.
// One entry per target city. Each city page renders all six service
// sections (shared SERVICE_SECTIONS) as anchor targets so a single page
// can serve every ad group. See seo.md for the source PRD.

export type LocationFaq = {
  question: string;
  answer: string;
};

export type LocationData = {
  citySlug: string;
  cityName: string;
  province: string;
  metaTitle: string;
  metaDescription: string;
  heroBadge: string;
  heroHeadline: string;
  heroSub: string;
  introCopy: string;
  localAngleCopy: string;
  trustBlockCopy: string;
  faqs: LocationFaq[];
  /** Nearby towns/neighbourhoods woven into the hero "now booking" pill. */
  neighbors: string;
  /** True for region-level pages (e.g. Durham Region) that span multiple cities. */
  isRegion?: boolean;
};

// The six ad groups. anchorId values are referenced directly from Google Ads
// final URLs (e.g. /locations/vaughan#custom-websites) and must not change.
export type ServiceSection = {
  anchorId: string;
  serviceName: string; // used in form select + tracking
  eyebrow: string;
  headingTemplate: string; // {City} interpolated at render
  copy: string;
  ctaLabel: string;
  proofPoints: string[];
};

export const SERVICE_SECTIONS: ServiceSection[] = [
  {
    anchorId: "custom-websites",
    serviceName: "Custom Websites",
    eyebrow: "01 — Custom websites",
    headingTemplate: "Custom Website Design in {City}",
    copy: "Modern, fast, mobile-first websites built around your services, audience, and conversion path.",
    ctaLabel: "Plan My Website",
    proofPoints: [
      "Built on Next.js for speed and SEO",
      "Editable CMS so your team stays in control",
      "Designed around a clear conversion path",
    ],
  },
  {
    anchorId: "website-redesigns",
    serviceName: "Website Redesign",
    eyebrow: "02 — Website redesigns",
    headingTemplate: "Website Redesign Services in {City}",
    copy: "Turn an outdated website into a sharper, faster, more trustworthy experience that makes your business easier to choose.",
    ctaLabel: "Get a Free Website Review",
    proofPoints: [
      "Keep what works, rebuild what doesn't",
      "Faster load times and cleaner structure",
      "Better tracking and clearer calls to action",
    ],
  },
  {
    anchorId: "local-seo",
    serviceName: "Local SEO",
    eyebrow: "03 — Local SEO",
    headingTemplate: "Local SEO for {City} Businesses",
    copy: "Improve your visibility with localized pages, structured data, Google Business Profile support, and cleaner search foundations.",
    ctaLabel: "Boost Local Visibility",
    proofPoints: [
      "Google Business Profile setup and support",
      "Localized pages and structured schema",
      "Cleaner technical SEO foundations",
    ],
  },
  {
    anchorId: "automation-systems",
    serviceName: "Automation Systems",
    eyebrow: "04 — Automation systems",
    headingTemplate: "Business Automation Systems for {City} Teams",
    copy: "Connect forms, CRM tools, email/SMS alerts, spreadsheets, and internal workflows so leads and tasks move faster.",
    ctaLabel: "Automate My Workflow",
    proofPoints: [
      "Connect your website to your CRM",
      "Automated email and SMS follow-up",
      "Fewer manual handoffs for your team",
    ],
  },
  {
    anchorId: "custom-apps",
    serviceName: "Custom Apps",
    eyebrow: "05 — Custom apps",
    headingTemplate: "Custom Web Apps for {City} Operations",
    copy: "Replace messy spreadsheets with secure dashboards, portals, inventory systems, and internal tools designed around your process.",
    ctaLabel: "Explore Custom Tools",
    proofPoints: [
      "Dashboards, portals, and inventory systems",
      "Role-aware screens and secure data layers",
      "Built around how your team actually works",
    ],
  },
  {
    anchorId: "hosting-support",
    serviceName: "Hosting & Support",
    eyebrow: "06 — Hosting & support",
    headingTemplate: "Website Hosting and Support for {City} Businesses",
    copy: "Keep your website secure, fast, backed up, updated, and easy to manage after launch.",
    ctaLabel: "Get Ongoing Support",
    proofPoints: [
      "Edge-network hosting and daily backups",
      "Updates, monitoring, and support windows",
      "One predictable monthly plan",
    ],
  },
];

// Service names for the contact form select. Kept in sync with SERVICE_SECTIONS.
export const SERVICE_OPTIONS = SERVICE_SECTIONS.map((s) => s.serviceName);

// Builds a genuinely city-specific FAQ set (weaving in each location's
// neighbours, province, and region/city context) so every location page has
// unique visible FAQ copy AND a unique FAQPage JSON-LD block — avoiding the
// thin/duplicate-content problem of a single shared template.
function cityFaqs(loc: Pick<LocationData, "cityName" | "neighbors" | "province" | "isRegion">): LocationFaq[] {
  const { cityName: name, neighbors, province, isRegion } = loc;
  const provinceName = province === "ON" ? "Ontario" : province;

  return [
    {
      question: isRegion
        ? `Do you build websites for businesses across ${name}?`
        : `Do you build websites for businesses in ${name}?`,
      answer: isRegion
        ? `Yes. Bayline Digital builds websites for businesses across ${name} — including ${neighbors} — and throughout ${provinceName} through a remote-friendly process.`
        : `Yes. Bayline Digital works with ${name} businesses and nearby communities like ${neighbors}, plus the wider ${provinceName} area, through a remote-friendly process.`,
    },
    {
      question: `Can you help my ${name} business rank on Google and Google Maps?`,
      answer: `Yes. We set up your Google Business Profile, add local schema, and build location-focused pages so customers ${
        isRegion ? `across ${name}` : `in ${name}`
      } can find you in local search and Google Maps results.`,
    },
    {
      question: `Can you build a landing page for my ${name} Google Ads campaign?`,
      answer: `Yes. We build focused ${name} landing pages for specific services, neighbourhoods, or offers, with conversion tracking wired in from day one so you can see which ${name} searches turn into calls.`,
    },
    {
      question: `Can you redesign my current ${name} website instead of starting over?`,
      answer: `Yes. We review your existing site, keep what already works, and rebuild the parts that need better design, speed, clarity, or tracking — without losing the search visibility your ${name} business has already earned.`,
    },
    {
      question: `How long does a new ${name} website take, and do I own it?`,
      answer: `Most builds ship in about four to six weeks. You own the website outright — the custom code, content, and hosting setup are all yours, with no templates and no vendor lock-in.`,
    },
    {
      question: `Do you offer ongoing website support after launch?`,
      answer: `Yes. Bayline offers hosting, maintenance, updates, and support for ${name} businesses after launch on a simple monthly plan, so your site stays fast, secure, and current.`,
    },
  ];
}

const LOCATIONS_BASE: Record<string, Omit<LocationData, "faqs">> = {
  "durham-region": {
    citySlug: "durham-region",
    cityName: "Durham Region",
    province: "ON",
    isRegion: true,
    neighbors: "Whitby, Oshawa, Ajax, Pickering & Clarington",
    metaTitle: "Web Design & Automation in Durham Region | Bayline Digital",
    metaDescription:
      "Lead-ready websites, local SEO, landing pages, and automation for businesses across Durham Region — Whitby, Oshawa, Ajax, Pickering & Clarington. Book a free intro call.",
    heroBadge: "Durham Region Local Business Growth",
    heroHeadline: "Web Design, SEO, and Automation for Durham Region Businesses",
    heroSub:
      "Bayline Digital builds custom, lead-ready websites, campaign-ready landing pages, local SEO systems, and workflow automations for service businesses across Durham Region.",
    introCopy:
      "Bayline Digital helps Durham Region businesses build clearer websites, stronger local landing pages, and better digital systems. Whether you need a redesign, local SEO, workflow automation, or a custom web app, the goal is the same: make your business easier to find, trust, and contact across Whitby, Oshawa, Ajax, Pickering, and Clarington.",
    localAngleCopy:
      "We work with home-service companies, trades, clinics, and local teams across Durham Region that need polished websites, faster lead response, and simple systems that do not create extra admin work.",
    trustBlockCopy:
      "Durham Region businesses compete across a wide area — from Pickering to Clarington — so your website needs to look credible, load fast, and make the next step obvious in every town you serve. Bayline builds local landing pages, modern websites, and simple automation that help teams respond faster and convert more inquiries.",
  },
  vaughan: {
    citySlug: "vaughan",
    cityName: "Vaughan",
    province: "ON",
    metaTitle: "Web Design & Automation in Vaughan | Bayline Digital",
    metaDescription:
      "Modern websites, local SEO, landing pages, and automation systems for Vaughan businesses. Book a free website audit with Bayline Digital.",
    heroBadge: "Vaughan Local Business Growth",
    heroHeadline: "Web Design, SEO, and Automation for Vaughan Businesses",
    heroSub:
      "Bayline Digital builds fast websites, campaign-ready landing pages, local SEO systems, and workflow automations for growing businesses in Vaughan.",
    introCopy:
      "Bayline Digital helps Vaughan businesses build clearer websites, stronger local landing pages, and better digital systems. Whether you need a redesign, local SEO, workflow automation, or a custom web app, the goal is the same: make your business easier to find, trust, and contact.",
    localAngleCopy:
      "We work with competitive GTA businesses, professional services, clinics, home service companies, consultants, and growing local teams.",
    trustBlockCopy:
      "For Vaughan businesses competing across the GTA, your website needs to look credible, load quickly, and make the next step obvious. Bayline helps local service companies, clinics, trades, consultants, and growing teams turn their website into a clearer sales asset.",
    neighbors: "Woodbridge, Maple & Concord",
  },
  whitby: {
    citySlug: "whitby",
    cityName: "Whitby",
    province: "ON",
    metaTitle: "Web Design & Automation in Whitby | Bayline Digital",
    metaDescription:
      "Fast websites, campaign landing pages, local SEO, and business automation for Whitby companies. Start with a free website review.",
    heroBadge: "Whitby Local Business Growth",
    heroHeadline: "Web Design, SEO, and Automation for Whitby Businesses",
    heroSub:
      "Bayline Digital builds polished websites, campaign-ready landing pages, local SEO systems, and simple automations for growing businesses in Whitby.",
    introCopy:
      "Bayline Digital helps Whitby businesses build clearer websites, stronger local landing pages, and better digital systems. Whether you need a redesign, local SEO, workflow automation, or a custom web app, the goal is the same: make your business easier to find, trust, and contact.",
    localAngleCopy:
      "We work with Durham Region businesses that need polished websites, faster lead response, and simple systems that do not create extra admin work.",
    trustBlockCopy:
      "Whitby businesses need digital systems that feel polished without becoming complicated. Bayline builds local landing pages, modern websites, and simple automation systems that help teams respond faster and convert more inquiries.",
    neighbors: "Brooklin & Ashburn",
  },
  pickering: {
    citySlug: "pickering",
    cityName: "Pickering",
    province: "ON",
    metaTitle: "Web Design & Automation in Pickering | Bayline Digital",
    metaDescription:
      "Bayline Digital builds modern websites, local SEO pages, and workflow systems for Pickering businesses. Book a free audit.",
    heroBadge: "Pickering Local Business Growth",
    heroHeadline: "Web Design, SEO, and Automation for Pickering Businesses",
    heroSub:
      "Bayline Digital builds fast websites, conversion-focused landing pages, local SEO systems, and workflow automations for growing businesses in Pickering.",
    introCopy:
      "Bayline Digital helps Pickering businesses build clearer websites, stronger local landing pages, and better digital systems. Whether you need a redesign, local SEO, workflow automation, or a custom web app, the goal is the same: make your business easier to find, trust, and contact.",
    localAngleCopy:
      "We work with East GTA businesses that want a sharper online presence, clearer service pages, and conversion-focused landing pages.",
    trustBlockCopy:
      "Pickering businesses competing across the East GTA need a website that loads fast, reads clearly, and makes the next step obvious. Bayline helps local teams turn a sharper online presence into more qualified inquiries.",
    neighbors: "Ajax & Bay Ridges",
  },
  ottawa: {
    citySlug: "ottawa",
    cityName: "Ottawa",
    province: "ON",
    metaTitle: "Web Design & Automation in Ottawa | Bayline Digital",
    metaDescription:
      "Custom websites, landing pages, local SEO, and automation systems for Ottawa businesses. Plan your next digital build.",
    heroBadge: "Ottawa Local Business Growth",
    heroHeadline: "Web Design, SEO, and Automation for Ottawa Businesses",
    heroSub:
      "Bayline Digital builds custom websites, campaign-ready landing pages, local SEO systems, and clean automation workflows for Ottawa businesses.",
    introCopy:
      "Bayline Digital helps Ottawa businesses build clearer websites, stronger local landing pages, and better digital systems. Whether you need a redesign, local SEO, workflow automation, or a custom web app, the goal is the same: make your business easier to find, trust, and contact.",
    localAngleCopy:
      "We work with established businesses, service companies, consultants, and organizations that need clean digital systems and a professional web presence.",
    trustBlockCopy:
      "Ottawa businesses and organizations need a professional web presence backed by clean systems. Bayline builds modern websites, local landing pages, and automation that make established teams easier to find and quicker to respond.",
    neighbors: "Kanata, Nepean & Orléans",
  },
  oshawa: {
    citySlug: "oshawa",
    cityName: "Oshawa",
    province: "ON",
    metaTitle: "Web Design & Automation in Oshawa | Bayline Digital",
    metaDescription:
      "Website redesigns, local SEO, custom apps, and automation systems for Oshawa businesses. Request a free review.",
    heroBadge: "Oshawa Local Business Growth",
    heroHeadline: "Web Design, SEO, and Automation for Oshawa Businesses",
    heroSub:
      "Bayline Digital builds fast websites, website redesigns, local SEO systems, custom apps, and workflow automations for Oshawa businesses.",
    introCopy:
      "Bayline Digital helps Oshawa businesses build clearer websites, stronger local landing pages, and better digital systems. Whether you need a redesign, local SEO, workflow automation, or a custom web app, the goal is the same: make your business easier to find, trust, and contact.",
    localAngleCopy:
      "We work with local service businesses, trades, clinics, and operational teams that need better websites and workflow tools.",
    trustBlockCopy:
      "Oshawa service businesses, trades, and operational teams need websites and workflow tools that actually make the day easier. Bayline builds practical digital systems that help teams look credible and respond faster.",
    neighbors: "Courtice & Taunton",
  },
  ajax: {
    citySlug: "ajax",
    cityName: "Ajax",
    province: "ON",
    metaTitle: "Web Design & Automation in Ajax | Bayline Digital",
    metaDescription:
      "Modern websites, campaign landing pages, hosting, local SEO, and automation support for Ajax businesses. Contact Bayline Digital.",
    heroBadge: "Ajax Local Business Growth",
    heroHeadline: "Web Design, SEO, and Automation for Ajax Businesses",
    heroSub:
      "Bayline Digital builds modern websites, campaign landing pages, local SEO systems, hosting, and ongoing support for Ajax businesses.",
    introCopy:
      "Bayline Digital helps Ajax businesses build clearer websites, stronger local landing pages, and better digital systems. Whether you need a redesign, local SEO, workflow automation, or a custom web app, the goal is the same: make your business easier to find, trust, and contact.",
    localAngleCopy:
      "We work with small businesses, contractors, clinics, and service teams that need modern web design, local SEO, and ongoing support.",
    trustBlockCopy:
      "Ajax small businesses, contractors, and service teams need a modern website and dependable support without the agency overhead. Bayline builds clean sites, local SEO, and ongoing maintenance that keep you visible and easy to contact.",
    neighbors: "Pickering & Audley",
  },
};

// Attach a unique, city-specific FAQ set to every location from its own fields.
export const LOCATIONS_DATA: Record<string, LocationData> = Object.fromEntries(
  Object.entries(LOCATIONS_BASE).map(([slug, loc]) => [slug, { ...loc, faqs: cityFaqs(loc) }]),
);
