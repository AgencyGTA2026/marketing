export interface ServiceDetailData {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    visualType: "default" | "hvac" | "marketing" | "b2b";
  };
  detailsTitle: string;
  detailsDescription: string;
  bullets: string[];
  featuredProjectSlug: "coachly-crm" | "autoblogwriter" | "permipro" | "contentsplitter";
  ctaDropdownLabel?: string;
  ctaDropdownOptions?: string[];
}

export const SERVICES_DATA: Record<string, ServiceDetailData> = {
  "custom-websites": {
    slug: "custom-websites",
    title: "Custom CMS Websites (Payload)",
    metaTitle: "Custom CMS Websites (Payload) | Bayline Digital",
    metaDescription: "Custom high-speed Next.js websites fully integrated with Payload CMS. Easy to manage, zero page builder bloat.",
    hero: {
      badge: "Services · Custom CMS",
      headline: "Fully customizable websites with Payload CMS integration.",
      subheadline: "Ditch bloated builders that break. We construct tailor-made Next.js sites backed by Payload CMS, giving non-technical teams full editing control without visual styling degradation.",
      visualType: "default",
    },
    detailsTitle: "Why Payload CMS Beats Block Builders",
    detailsDescription: "Most agencies build on visual builders that generate bloated code, slow load times, and break over time. We write clean React and Tailwind CSS markup, integrated with a headless Payload database. Your site loads instantly, is completely editable, and provides a polished interface that makes customers trust you.",
    bullets: [
      "Bespoke layouts structured for simple visual block editing",
      "Clean React + Tailwind engineering with static generation",
      "Fast page load times raising Lighthouse performance",
      "Full database content control via the custom Payload dashboard",
    ],
    featuredProjectSlug: "autoblogwriter",
    ctaDropdownLabel: "What CMS or content editing experience do you have?",
    ctaDropdownOptions: ["WordPress", "Webflow / Squarespace", "Payload / Headless CMS", "None / Developer-managed", "Other"],
  },
  "landing-pages": {
    slug: "landing-pages",
    title: "Landing Pages for Small Business",
    metaTitle: "High-Converting Landing Page Design | Bayline Digital",
    metaDescription: "Maximize campaign ad returns and drive customer calls with single-purpose landing pages optimized for fast load speeds.",
    hero: {
      badge: "Services · Lead Generation",
      headline: "High-performance landing pages built to maximize local campaign leads.",
      subheadline: "Make every local search click count. We engineer single-purpose page interfaces optimized for click-to-call conversions, keyword relevance, and campaign tracking.",
      visualType: "marketing",
    },
    detailsTitle: "Optimizing for Google Ads Quality Score",
    detailsDescription: "Google Ads pricing is determined by your landing page relevance. Our clean code structure ensures instant paint times and high semantic matches, lowering your Cost-Per-Click while establishing immediate visual trust with local customers.",
    bullets: [
      "Clear above-the-fold copywriting and visible calls to action",
      "Structured local schema relevance to match Google Ads terms",
      "Custom interactive contact forms with automated CRM routing",
      "A/B split-testing architecture to optimize lead generation",
    ],
    featuredProjectSlug: "contentsplitter",
    ctaDropdownLabel: "What is your main marketing or ad platform?",
    ctaDropdownOptions: ["Google Ads", "Meta (Facebook / Instagram)", "LinkedIn Ads", "Organic Search / SEO", "Other"],
  },
  "web-apps": {
    slug: "web-apps",
    title: "Custom Inventory & Web Apps",
    metaTitle: "Custom Inventory & Web Application Development | Bayline Digital",
    metaDescription: "We design secure operational dashboards, customer dispatch interfaces, and custom inventory databases to replace spreadsheets.",
    hero: {
      badge: "Services · Application Development",
      headline: "Custom inventory apps and dashboards tailored for your operations.",
      subheadline: "Move your logistics off spreadsheets. We build secure internal dashboards, customer portals, and real-time inventory systems connecting your team to their actual operational flow.",
      visualType: "b2b",
    },
    detailsTitle: "Architected for Security and Performance",
    detailsDescription: "We specialize in custom web application development that bridges your database systems with simple, beautiful browser tools. Safe, multi-tenant authentication is baked in from day one.",
    bullets: [
      "Secure local postgres database connections and storage",
      "Real-time tracking of dispatch status, capacity, and materials",
      "Role-based user dashboard authentication (RBAC)",
      "Offline data persistence options for field workforces",
    ],
    featuredProjectSlug: "permipro",
    ctaDropdownLabel: "What database or internal system do you need to integrate?",
    ctaDropdownOptions: ["SQL Database (Postgres/MySQL)", "Salesforce / HubSpot", "QuickBooks / Accounting", "Excel / Google Sheets", "Proprietary Legacy System"],
  },
  automation: {
    slug: "automation",
    title: "Lead & Retention Automation",
    metaTitle: "Lead Automation & Customer Retention Workflows | Bayline Digital",
    metaDescription: "Connect your CRM, email, and SMS notification tools. Automate responses so leads are answered in seconds and retention runs on autopilot.",
    hero: {
      badge: "Services · Systems Integration",
      headline: "Automate lead response times and customer retention loops.",
      subheadline: "Stop copy-pasting data across systems. We write robust automation connectors that synchronize contact forms, dispatch engines, CRM databases, and automated follow-ups.",
      visualType: "hvac",
    },
    detailsTitle: "Eliminate Operational Redundancy",
    detailsDescription: "Whether dispatching contractors via SMS or syncing incoming payments to your ledger, we construct self-healing background workers that trigger actions in real-time, eliminating human error.",
    bullets: [
      "Instant SMS lead routing and contractor schedule notification alerts",
      "Form-to-spreadsheet-to-CRM pipeline configurations",
      "Automated retention sequences requesting feedback or Google reviews",
      "Background webhook receivers with retry-capable worker queues",
    ],
    featuredProjectSlug: "contentsplitter",
    ctaDropdownLabel: "What system/process do you want to automate first?",
    ctaDropdownOptions: ["Customer Booking & CRM Scheduling", "Lead Intake & Notification Alerts", "Invoice Creation & Accounting Sync", "Content Publishing & Distribution", "Other"],
  },
  seo: {
    slug: "seo",
    title: "Automated & Local SEO",
    metaTitle: "Automated SEO & Google Business Profile Setup | Bayline Digital",
    metaDescription: "Rank higher where local customers search. Setup Google Business profiles, neighborhood schema, and high-performance programmatic directory networks.",
    hero: {
      badge: "Services · Search Authority",
      headline: "Rank high in local map packs and organic search locations.",
      subheadline: "Local search traffic is the lifeblood of small businesses. We configure Google Business profiles, inject localized schema tags, and build programmatic directories to dominate local search.",
      visualType: "marketing",
    },
    detailsTitle: "How Local Schema and Profiles Win Map Packs",
    detailsDescription: "Google ranks local businesses based on profile accuracy, page speed, and localized structured data. We ensure your website maps directly to regional neighborhoods to drive map pack authority and phone calls.",
    bullets: [
      "Google Business Profile claiming, auditing, and optimization maps",
      "Structured JSON-LD schema metadata for regional neighborhoods",
      "Programmatic page generation targeting local service cities",
      "Automated SEO audit wiring with clean semantic content",
    ],
    featuredProjectSlug: "autoblogwriter",
    ctaDropdownLabel: "What is your target location or city for local SEO?",
    ctaDropdownOptions: ["Local city/neighborhood", "Multiple regional branches", "Entire province/state", "National focus"],
  },
  maintenance: {
    slug: "maintenance",
    title: "Monthly Support & Hosting",
    metaTitle: "Managed Hosting, Maintenance & Support SLA | Bayline Digital",
    metaDescription: "Secure managed hosting with 99.99% SLA. Daily automated backups, routine patches, and direct developer support.",
    hero: {
      badge: "Services · Support Plans",
      headline: "Secure local edge-network hosting with direct developer support.",
      subheadline: "Never worry about your site going offline. We host on secure global edge networks, run daily database backups, and ensure a real human developer is on call.",
      visualType: "default",
    },
    detailsTitle: "SLA-Backed Local Management",
    detailsDescription: "Your marketing site should never go down when campaigns are running. We host on secure global edge networks with active failure alerting, and keep senior engineers available to assist you directly.",
    bullets: [
      "99.99% uptime SLA hosted on AWS / Vercel Edge networks",
      "Daily automated database backups with encryption",
      "Direct SMS/email priority support window with a real engineer",
      "Routine codebase updates and security package scanning",
    ],
    featuredProjectSlug: "permipro",
    ctaDropdownLabel: "What is your main hosting or maintenance challenge?",
    ctaDropdownOptions: ["Site goes offline during high traffic", "Outdated dependencies and security bugs", "Slow server response speeds", "No direct developer support when things break", "Other"],
  },
};
