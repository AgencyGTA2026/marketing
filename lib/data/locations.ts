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

// Shared FAQ base (PRD §15) with {City} interpolated per location.
function baseFaqs(city: string): LocationFaq[] {
  return [
    {
      question: `Do you work with businesses in ${city}?`,
      answer: `Yes. Bayline Digital works with businesses in ${city} and across Ontario through a remote-friendly process.`,
    },
    {
      question: "Can you build a landing page just for my Google Ads campaign?",
      answer:
        "Yes. We can build focused landing pages for specific cities, services, or offers, with tracking wired in from day one.",
    },
    {
      question: "Can you redesign my current website instead of starting from scratch?",
      answer:
        "Yes. We can review your current site, keep what works, and rebuild the parts that need better design, speed, clarity, or tracking.",
    },
    {
      question: "Do you help with Google Ads tracking?",
      answer:
        "Yes. We can add form tracking, UTM capture, phone-click tracking, and booking-click tracking so you know exactly where leads come from.",
    },
    {
      question: "Do you offer ongoing website support?",
      answer:
        "Yes. Bayline offers hosting, maintenance, updates, and support after launch on a simple monthly plan.",
    },
  ];
}

export const LOCATIONS_DATA: Record<string, LocationData> = {
  vaughan: {
    citySlug: "vaughan",
    cityName: "Vaughan",
    province: "ON",
    metaTitle: "Web Design & Automation in Vaughan | Bayline Digital",
    metaDescription:
      "Modern websites, local SEO, landing pages, and automation systems for Vaughan businesses. Book a free website audit with Bayline Digital.",
    heroBadge: "Vaughan Local Business Growth",
    heroHeadline: "Vaughan businesses lose leads to slow, dated, untrustworthy websites",
    heroSub:
      "If your site loads slowly, looks out of date, or sends leads into an inbox nobody answers fast, people move on before they trust you.",
    introCopy:
      "Bayline Digital helps Vaughan businesses build clearer websites, stronger local landing pages, and better digital systems. Whether you need a redesign, local SEO, workflow automation, or a custom web app, the goal is the same: make your business easier to find, trust, and contact.",
    localAngleCopy:
      "We work with competitive GTA businesses, professional services, clinics, home service companies, consultants, and growing local teams.",
    trustBlockCopy:
      "For Vaughan businesses competing across the GTA, your website needs to look credible, load quickly, and make the next step obvious. Bayline helps local service companies, clinics, trades, consultants, and growing teams turn their website into a clearer sales asset.",
    faqs: baseFaqs("Vaughan"),
  },
  whitby: {
    citySlug: "whitby",
    cityName: "Whitby",
    province: "ON",
    metaTitle: "Web Design & Automation in Whitby | Bayline Digital",
    metaDescription:
      "Fast websites, campaign landing pages, local SEO, and business automation for Whitby companies. Start with a free website review.",
    heroBadge: "Whitby Local Business Growth",
    heroHeadline: "Whitby businesses lose leads to slow, dated, untrustworthy websites",
    heroSub:
      "If your site loads slowly, looks out of date, or sends leads into an inbox nobody answers fast, people move on before they trust you.",
    introCopy:
      "Bayline Digital helps Whitby businesses build clearer websites, stronger local landing pages, and better digital systems. Whether you need a redesign, local SEO, workflow automation, or a custom web app, the goal is the same: make your business easier to find, trust, and contact.",
    localAngleCopy:
      "We work with Durham Region businesses that need polished websites, faster lead response, and simple systems that do not create extra admin work.",
    trustBlockCopy:
      "Whitby businesses need digital systems that feel polished without becoming complicated. Bayline builds local landing pages, modern websites, and simple automation systems that help teams respond faster and convert more inquiries.",
    faqs: baseFaqs("Whitby"),
  },
  pickering: {
    citySlug: "pickering",
    cityName: "Pickering",
    province: "ON",
    metaTitle: "Web Design & Automation in Pickering | Bayline Digital",
    metaDescription:
      "Bayline Digital builds modern websites, local SEO pages, and workflow systems for Pickering businesses. Book a free audit.",
    heroBadge: "Pickering Local Business Growth",
    heroHeadline: "Pickering businesses lose leads to slow, dated, untrustworthy websites",
    heroSub:
      "If your site loads slowly, looks out of date, or sends leads into an inbox nobody answers fast, people move on before they trust you.",
    introCopy:
      "Bayline Digital helps Pickering businesses build clearer websites, stronger local landing pages, and better digital systems. Whether you need a redesign, local SEO, workflow automation, or a custom web app, the goal is the same: make your business easier to find, trust, and contact.",
    localAngleCopy:
      "We work with East GTA businesses that want a sharper online presence, clearer service pages, and conversion-focused landing pages.",
    trustBlockCopy:
      "Pickering businesses competing across the East GTA need a website that loads fast, reads clearly, and makes the next step obvious. Bayline helps local teams turn a sharper online presence into more qualified inquiries.",
    faqs: baseFaqs("Pickering"),
  },
  ottawa: {
    citySlug: "ottawa",
    cityName: "Ottawa",
    province: "ON",
    metaTitle: "Web Design & Automation in Ottawa | Bayline Digital",
    metaDescription:
      "Custom websites, landing pages, local SEO, and automation systems for Ottawa businesses. Plan your next digital build.",
    heroBadge: "Ottawa Local Business Growth",
    heroHeadline: "Ottawa businesses lose leads to slow, dated, untrustworthy websites",
    heroSub:
      "If your site loads slowly, looks out of date, or sends leads into an inbox nobody answers fast, people move on before they trust you.",
    introCopy:
      "Bayline Digital helps Ottawa businesses build clearer websites, stronger local landing pages, and better digital systems. Whether you need a redesign, local SEO, workflow automation, or a custom web app, the goal is the same: make your business easier to find, trust, and contact.",
    localAngleCopy:
      "We work with established businesses, service companies, consultants, and organizations that need clean digital systems and a professional web presence.",
    trustBlockCopy:
      "Ottawa businesses and organizations need a professional web presence backed by clean systems. Bayline builds modern websites, local landing pages, and automation that make established teams easier to find and quicker to respond.",
    faqs: baseFaqs("Ottawa"),
  },
  oshawa: {
    citySlug: "oshawa",
    cityName: "Oshawa",
    province: "ON",
    metaTitle: "Web Design & Automation in Oshawa | Bayline Digital",
    metaDescription:
      "Website redesigns, local SEO, custom apps, and automation systems for Oshawa businesses. Request a free review.",
    heroBadge: "Oshawa Local Business Growth",
    heroHeadline: "Oshawa businesses lose leads to slow, dated, untrustworthy websites",
    heroSub:
      "If your site loads slowly, looks out of date, or sends leads into an inbox nobody answers fast, people move on before they trust you.",
    introCopy:
      "Bayline Digital helps Oshawa businesses build clearer websites, stronger local landing pages, and better digital systems. Whether you need a redesign, local SEO, workflow automation, or a custom web app, the goal is the same: make your business easier to find, trust, and contact.",
    localAngleCopy:
      "We work with local service businesses, trades, clinics, and operational teams that need better websites and workflow tools.",
    trustBlockCopy:
      "Oshawa service businesses, trades, and operational teams need websites and workflow tools that actually make the day easier. Bayline builds practical digital systems that help teams look credible and respond faster.",
    faqs: baseFaqs("Oshawa"),
  },
  ajax: {
    citySlug: "ajax",
    cityName: "Ajax",
    province: "ON",
    metaTitle: "Web Design & Automation in Ajax | Bayline Digital",
    metaDescription:
      "Modern websites, campaign landing pages, hosting, local SEO, and automation support for Ajax businesses. Contact Bayline Digital.",
    heroBadge: "Ajax Local Business Growth",
    heroHeadline: "Ajax businesses lose leads to slow, dated, untrustworthy websites",
    heroSub:
      "If your site loads slowly, looks out of date, or sends leads into an inbox nobody answers fast, people move on before they trust you.",
    introCopy:
      "Bayline Digital helps Ajax businesses build clearer websites, stronger local landing pages, and better digital systems. Whether you need a redesign, local SEO, workflow automation, or a custom web app, the goal is the same: make your business easier to find, trust, and contact.",
    localAngleCopy:
      "We work with small businesses, contractors, clinics, and service teams that need modern web design, local SEO, and ongoing support.",
    trustBlockCopy:
      "Ajax small businesses, contractors, and service teams need a modern website and dependable support without the agency overhead. Bayline builds clean sites, local SEO, and ongoing maintenance that keep you visible and easy to contact.",
    faqs: baseFaqs("Ajax"),
  },
};
