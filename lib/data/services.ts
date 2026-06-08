type CopyBlock = {
  title: string;
  description: string;
};

type DeliverableBlock = CopyBlock & {
  bullets: string[];
};

type BestFitBlock = CopyBlock & {
  bullets: string[];
};

type FaqBlock = {
  question: string;
  answer: string;
};

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
  problems: CopyBlock[];
  deliverables: DeliverableBlock[];
  howItWorks: CopyBlock[];
  bestFit: BestFitBlock;
  faqs: FaqBlock[];
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
    problems: [
      {
        title: "Your team cannot safely edit the site",
        description: "A developer should not be required for every headline, service change, or landing page update. The CMS should protect the design while still giving your team control.",
      },
      {
        title: "Page builders keep slowing things down",
        description: "Visual builders can be useful early on, but they often create bloated markup, fragile layouts, and unclear ownership when the site becomes important to sales.",
      },
      {
        title: "The website no longer matches the business",
        description: "As services, locations, offers, and proof evolve, the site needs a clean content model that can grow without turning every page into a one-off rebuild.",
      },
    ],
    deliverables: [
      {
        title: "A custom Next.js front end",
        description: "Designed around your actual services, audience, and conversion paths instead of a generic theme.",
        bullets: ["Responsive page templates", "Reusable content sections", "Fast static rendering where appropriate"],
      },
      {
        title: "Payload CMS editing",
        description: "A structured admin experience for pages, posts, services, media, and calls to action.",
        bullets: ["Role-aware content editing", "Reusable blocks", "Media and SEO fields"],
      },
      {
        title: "Launch-ready technical setup",
        description: "The site is prepared for measurement, search visibility, and future development.",
        bullets: ["Analytics wiring", "Metadata and sitemap foundations", "Clean handoff documentation"],
      },
    ],
    howItWorks: [
      {
        title: "Map the content model",
        description: "We identify which pages and sections your team needs to edit, then define the CMS structure before building visuals.",
      },
      {
        title: "Design and build the front end",
        description: "We create polished, responsive templates and connect them to Payload so content edits stay consistent.",
      },
      {
        title: "Train, launch, and support",
        description: "Your team gets a walkthrough of the admin workflow, launch support, and a clear path for future additions.",
      },
    ],
    bestFit: {
      title: "Best for teams that need a serious website they can still control",
      description: "This is the right fit when your site is becoming a sales asset, not just an online brochure.",
      bullets: ["You need frequent content updates without design drift", "You want stronger SEO foundations than a page builder provides", "You expect the site to grow into landing pages, resources, or gated content"],
    },
    faqs: [
      {
        question: "Is Payload CMS easier than WordPress?",
        answer: "It is different. Payload is better when you want a custom editing experience tied to a fast Next.js site. WordPress can be simpler for basic blogs, but it often becomes harder to control on custom marketing sites.",
      },
      {
        question: "Can you migrate content from our current website?",
        answer: "Yes. We can move core pages, service copy, images, metadata, and blog posts into a cleaner content structure during the rebuild.",
      },
      {
        question: "Will we own the code and CMS setup?",
        answer: "Yes. The project is built as custom source code with a clear handoff. You are not locked into a proprietary website rental platform.",
      },
    ],
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
    problems: [
      {
        title: "Ad clicks are landing on generic pages",
        description: "A homepage rarely matches the exact promise, location, and next step from a focused ad campaign.",
      },
      {
        title: "Calls to action are buried",
        description: "Visitors should immediately know what you offer, why it matters, and how to call, book, or request a quote.",
      },
      {
        title: "Tracking is too vague to improve",
        description: "Without clean conversion events and campaign context, it is hard to tell which ads and pages are actually creating leads.",
      },
    ],
    deliverables: [
      {
        title: "Campaign-matched landing page copy",
        description: "A clear offer, audience-specific headline, objection handling, and calls to action aligned to the campaign.",
        bullets: ["Ad-to-page message match", "Service or location-specific sections", "Conversion-focused CTA placement"],
      },
      {
        title: "Fast responsive page build",
        description: "A lean page that loads quickly, reads well on mobile, and keeps the next action visible.",
        bullets: ["Mobile-first layout", "Click-to-call or booking paths", "Accessible forms"],
      },
      {
        title: "Measurement foundation",
        description: "Basic event tracking and form context so the campaign can be evaluated after launch.",
        bullets: ["UTM capture", "Form submission tracking", "Calendly or phone-click event tracking"],
      },
    ],
    howItWorks: [
      {
        title: "Clarify the offer",
        description: "We define the audience, service, promise, traffic source, and primary conversion before writing the page.",
      },
      {
        title: "Build the page around the next action",
        description: "Every section supports one goal: making it easier for qualified visitors to call, book, or inquire.",
      },
      {
        title: "Launch with tracking",
        description: "The page ships with analytics hooks so future campaign decisions are based on actual behavior.",
      },
    ],
    bestFit: {
      title: "Best for paid campaigns, launches, and local service offers",
      description: "Use this when you need one focused page for one audience, not a broad site section trying to do everything.",
      bullets: ["You are running Google, Meta, or LinkedIn ads", "You need a service-area or offer-specific page", "You want a faster page than a CMS builder can provide"],
    },
    faqs: [
      {
        question: "Can a landing page work without a full website redesign?",
        answer: "Yes. A focused landing page can sit alongside your existing site and give campaigns a cleaner destination while a larger redesign waits.",
      },
      {
        question: "Do you write the landing page copy?",
        answer: "Yes. We write the structure and copy around the offer, audience, and conversion goal, then refine it with your input.",
      },
      {
        question: "Can the page connect to our CRM or booking tool?",
        answer: "Yes. Forms can send lead context to common CRMs, spreadsheets, email notifications, booking tools, or custom endpoints.",
      },
    ],
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
    problems: [
      {
        title: "Important work lives in spreadsheets",
        description: "Spreadsheets are flexible, but they become risky when multiple people need permissions, history, automation, and accurate status.",
      },
      {
        title: "Teams are re-entering the same data",
        description: "When inventory, customers, schedules, and accounting live in separate tools, staff waste time moving information by hand.",
      },
      {
        title: "Off-the-shelf software does not fit the workflow",
        description: "Generic platforms often force your process to change around the tool instead of supporting how the business actually runs.",
      },
    ],
    deliverables: [
      {
        title: "Custom dashboard or portal",
        description: "A browser-based interface for the specific workflow you need to manage.",
        bullets: ["Role-aware screens", "Status and activity views", "Search and filtering"],
      },
      {
        title: "Database and integration layer",
        description: "A structured backend that connects the app to the right data sources and external systems.",
        bullets: ["Postgres data models", "API integrations", "Import or sync paths"],
      },
      {
        title: "Operational safeguards",
        description: "The app is designed for real use, with permissions, validation, and clear failure states.",
        bullets: ["Authentication", "Audit-friendly records", "Error handling"],
      },
    ],
    howItWorks: [
      {
        title: "Audit the workflow",
        description: "We map the current spreadsheets, handoffs, roles, and systems so the first version solves a specific operational problem.",
      },
      {
        title: "Build a focused first version",
        description: "We prioritize the screens and data flows that remove the most manual work without overbuilding the product.",
      },
      {
        title: "Iterate with real users",
        description: "After launch, feedback from the team using the tool guides refinements, permissions, and additional integrations.",
      },
    ],
    bestFit: {
      title: "Best for operations that have outgrown spreadsheets",
      description: "This is a fit when the cost of manual coordination is higher than the cost of building a focused internal tool.",
      bullets: ["You need permissions or approval flows", "You manage inventory, dispatch, projects, or customer records", "Your team repeats the same data entry every week"],
    },
    faqs: [
      {
        question: "Do we need a complete software product from day one?",
        answer: "No. The first version should be narrow: one workflow, one source of truth, and the screens needed to use it reliably.",
      },
      {
        question: "Can you connect to our existing tools?",
        answer: "Usually, yes. We can integrate with CRMs, accounting tools, spreadsheets, SQL databases, and APIs when those systems provide access.",
      },
      {
        question: "How do you handle user permissions?",
        answer: "Permissions are planned early. We define roles, access boundaries, and sensitive actions before the app is built.",
      },
    ],
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
    problems: [
      {
        title: "Leads wait while the team is busy",
        description: "When form submissions sit in an inbox, prospects keep searching. Fast routing gives the team a better chance to respond while intent is high.",
      },
      {
        title: "Data is copied between tools by hand",
        description: "Manual transfer between forms, spreadsheets, CRMs, calendars, and accounting tools creates delays and mistakes.",
      },
      {
        title: "Follow-up depends on memory",
        description: "Review requests, booking reminders, and reactivation messages should not rely on someone remembering to send them.",
      },
    ],
    deliverables: [
      {
        title: "Lead intake routing",
        description: "Connect website forms to the people and systems that need the lead context immediately.",
        bullets: ["Email and SMS alerts", "CRM or spreadsheet records", "Source and campaign context"],
      },
      {
        title: "Workflow automation",
        description: "Move repetitive operational steps into reliable background flows.",
        bullets: ["Webhook receivers", "Retry-aware jobs", "Calendar or booking triggers"],
      },
      {
        title: "Retention and review flows",
        description: "Automated follow-up that supports customer communication after the first inquiry.",
        bullets: ["Review request sequences", "Reminder messages", "Win-back or check-in flows"],
      },
    ],
    howItWorks: [
      {
        title: "Pick the highest-friction workflow",
        description: "We start with the repeated process that costs the most time or loses the most opportunities.",
      },
      {
        title: "Connect the source and destination",
        description: "Forms, CRMs, calendars, SMS tools, and spreadsheets are wired together with clear failure handling.",
      },
      {
        title: "Test real scenarios",
        description: "We test successful submissions, missing fields, duplicate entries, and downstream failures before launch.",
      },
    ],
    bestFit: {
      title: "Best for teams losing time to repetitive follow-up",
      description: "Automation is most useful when the same task happens often, follows clear rules, and affects revenue or customer experience.",
      bullets: ["You need faster lead response", "You want fewer manual updates across systems", "You already use tools that should be talking to each other"],
    },
    faqs: [
      {
        question: "Can automation work with our current CRM?",
        answer: "Often, yes. The best path depends on whether your CRM has an API, webhooks, Zapier support, or export/import options.",
      },
      {
        question: "Will automations replace our team communication?",
        answer: "No. Good automation removes repetitive handoffs and makes important updates easier to see. It should support the team, not hide the process.",
      },
      {
        question: "What happens if an automation fails?",
        answer: "Critical workflows should include error handling, retries where appropriate, and a visible fallback such as an email alert or logged failure.",
      },
    ],
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
    problems: [
      {
        title: "Your service area is not clear to search engines",
        description: "If your pages do not clearly map services to locations, Google and visitors both have less context for local intent.",
      },
      {
        title: "Your Google Business Profile is underused",
        description: "Incorrect categories, weak service descriptions, missing links, or inconsistent business details can hold back local visibility.",
      },
      {
        title: "Location pages are thin or duplicated",
        description: "Programmatic local pages only help when they provide useful, specific content instead of repeating the same paragraph across cities.",
      },
    ],
    deliverables: [
      {
        title: "Local SEO foundation",
        description: "A cleaner setup for how the site describes services, locations, and business details.",
        bullets: ["Google Business Profile review", "Service and location metadata", "Internal linking recommendations"],
      },
      {
        title: "Structured service-area content",
        description: "Pages and sections that explain where you work and what each audience can request.",
        bullets: ["Service-area page templates", "Location-aware copy blocks", "FAQ content for local intent"],
      },
      {
        title: "Technical SEO cleanup",
        description: "Core improvements that help search engines crawl, understand, and display the site accurately.",
        bullets: ["Metadata cleanup", "Schema recommendations", "Sitemap and indexing checks"],
      },
    ],
    howItWorks: [
      {
        title: "Audit local search foundations",
        description: "We review your current site, service pages, Google Business Profile, and target locations.",
      },
      {
        title: "Build the page and content structure",
        description: "We create the service, location, and FAQ structure needed to support local search intent.",
      },
      {
        title: "Measure and refine",
        description: "After launch, rankings and lead quality can guide which locations or services deserve deeper pages next.",
      },
    ],
    bestFit: {
      title: "Best for local businesses that depend on search demand",
      description: "This is useful when people already search for your service by city, neighborhood, or near-me intent.",
      bullets: ["You serve multiple cities or neighborhoods", "You rely on Google Search or Maps for leads", "Your current pages do not explain service areas clearly"],
    },
    faqs: [
      {
        question: "Do you guarantee rankings?",
        answer: "No. Rankings depend on competition, proximity, reviews, authority, and search behavior. We focus on the site and profile foundations that make local visibility more likely.",
      },
      {
        question: "Are programmatic location pages safe for SEO?",
        answer: "They can be when each page is useful, specific, and connected to real services. Thin duplicate pages are the risk to avoid.",
      },
      {
        question: "Can you help with Google Business Profile setup?",
        answer: "Yes. We can review categories, services, descriptions, website links, and consistency with the website content.",
      },
    ],
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
    problems: [
      {
        title: "Nobody owns the technical upkeep",
        description: "A site can launch cleanly and still become risky if dependencies, forms, domains, and backups are ignored.",
      },
      {
        title: "Support is routed through too many layers",
        description: "When something breaks, you need a technical person who understands the codebase, not a vague support queue.",
      },
      {
        title: "Hosting decisions are unclear",
        description: "Fast, stable hosting should include deployment, SSL, monitoring, backups, and a plan for changes after launch.",
      },
    ],
    deliverables: [
      {
        title: "Managed hosting setup",
        description: "Deployment and hosting configuration for a fast, secure production website.",
        bullets: ["Vercel or cloud deployment", "SSL and domain configuration", "Environment variable management"],
      },
      {
        title: "Maintenance workflow",
        description: "A predictable system for updates, fixes, and small improvements after launch.",
        bullets: ["Dependency review", "Form and integration checks", "Content or UI support"],
      },
      {
        title: "Backup and recovery basics",
        description: "Practical safeguards for the codebase, CMS, database, and launch configuration.",
        bullets: ["Repository access", "CMS/database backup plan", "Rollback-aware deployments"],
      },
    ],
    howItWorks: [
      {
        title: "Stabilize the environment",
        description: "We review hosting, domains, analytics, forms, CMS access, and deployment settings.",
      },
      {
        title: "Set a support rhythm",
        description: "We define what is monitored, how support requests are handled, and what belongs in monthly maintenance.",
      },
      {
        title: "Keep the site current",
        description: "Updates, fixes, and improvements are handled with the context of how the site was built.",
      },
    ],
    bestFit: {
      title: "Best for teams that want a technical owner after launch",
      description: "This is a fit when the site matters enough that downtime, broken forms, or stale dependencies are not acceptable.",
      bullets: ["You do not have an internal web developer", "Your campaigns depend on reliable landing pages", "You want small improvements handled without a new project every time"],
    },
    faqs: [
      {
        question: "Do you only support sites you built?",
        answer: "We prefer supporting sites we built, but we can review existing Next.js or modern React sites to see whether maintenance is practical.",
      },
      {
        question: "What counts as maintenance versus a new project?",
        answer: "Small updates, fixes, dependency care, and minor content changes fit maintenance. New page templates, major integrations, or redesign work are scoped separately.",
      },
      {
        question: "Can you host the CMS and database too?",
        answer: "Yes, when the project uses a stack we support. Hosting details depend on the CMS, database, traffic needs, and backup requirements.",
      },
    ],
    ctaDropdownLabel: "What is your main hosting or maintenance challenge?",
    ctaDropdownOptions: ["Site goes offline during high traffic", "Outdated dependencies and security bugs", "Slow server response speeds", "No direct developer support when things break", "Other"],
  },
};
