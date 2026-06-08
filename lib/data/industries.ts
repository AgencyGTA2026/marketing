export interface IndustryData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  adGroupKeywords: string[];
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    visualType: "hvac" | "marketing" | "b2b";
  };
  painPoints: {
    title: string;
    description: string;
  }[];
  featuredProjectSlug: "coachly-crm" | "autoblogwriter" | "permipro" | "contentsplitter";
  ctaDropdownLabel: string;
  ctaDropdownOptions: string[];
  servicesOrder: string[];
  servicesCustomizations: Record<
    string,
    {
      title?: string;
      blurb?: string;
      bullets?: string[];
    }
  >;
}

export const INDUSTRIES_DATA: Record<string, IndustryData> = {
  "home-services": {
    slug: "home-services",
    metaTitle: "Web Design & Lead Automation for Trades & Contractors | Bayline Digital",
    metaDescription: "Get high-converting local service websites with SMS follow-ups. Specialized in local SEO and automated lead scheduling for contractors and home service businesses.",
    adGroupKeywords: ["web design for local trades", "contractor websites", "home services booking automation", "hvac web designer"],
    hero: {
      badge: "Ontario Local Business Growth",
      headline: "High-converting localized websites that automate your lead capture.",
      subheadline: "Stop losing bookings. Custom web design & SMS automated follow-ups built for home services and trades.",
      visualType: "hvac",
    },
    painPoints: [
      {
        title: "Leads slipping through the cracks",
        description: "Automated SMS alerts trigger within 2 minutes of form submission, ensuring you contact prospects before they look elsewhere.",
      },
      {
        title: "High dispatch & booking overhead",
        description: "Self-serve booking integrations hook directly into your calendar, reducing phone tag and administrative time by 40%.",
      },
      {
        title: "Poor local Google search visibility",
        description: "Ultra-fast Next.js architecture and localized schema markup help your business rank in your exact target service neighborhoods.",
      },
    ],
    featuredProjectSlug: "coachly-crm",
    ctaDropdownLabel: "What dispatch or CRM software do you currently use?",
    ctaDropdownOptions: ["Jobber", "Housecall Pro", "ServiceTitan", "None / Spreadsheet", "Other"],
    servicesOrder: ["05", "06", "01", "02", "03", "04"],
    servicesCustomizations: {
      "05": {
        title: "Automated Lead Dispatch",
        blurb: "We connect your forms to Twilio, Slack, and your booking tools to alert your team via text message instantly.",
        bullets: ["Instant SMS text alerts", "Jobber or Housecall Pro sync", "Auto-responder templates"],
      },
      "06": {
        title: "Managed Local Hosting",
        blurb: "Fast, secure server setup with active monitoring so your site never goes offline when your ad campaigns are running.",
        bullets: ["99.99% uptime guarantee", "SSL & security updates", "Phone & text priority support"],
      },
    },
  },
  "marketing-firms": {
    slug: "marketing-firms",
    metaTitle: "Automated SEO Pipelines & Programmatic Content | Bayline Digital",
    metaDescription: "Scale your organic traffic with automated SEO pipelines and programmatic site architectures. Custom Next.js tools designed for agencies and marketing teams.",
    adGroupKeywords: ["automated blog creation", "seo agency ontario", "programmatic seo", "marketing workflow automation"],
    hero: {
      badge: "SEO Automation & Scaled Content",
      headline: "Automated SEO pipelines that turn workflows into search visibility.",
      subheadline: "Accelerate your content production. High-performance Next.js systems integrated with ContentSplitter & AutoBlogWriter.",
      visualType: "marketing",
    },
    painPoints: [
      {
        title: "High content writing costs",
        description: "Harness automated, high-quality, fact-checked drafting pipelines that output structural article templates in seconds.",
      },
      {
        title: "Manual internal linking gridlock",
        description: "Automate SEO internal linking across hundreds of articles based on dynamic topical clusters, passing authority correctly.",
      },
      {
        title: "Slow publishing and editing times",
        description: "Direct headless CMS pipelines push content instantly to your site, removing manual copy-paste bottlenecks.",
      },
    ],
    featuredProjectSlug: "autoblogwriter",
    ctaDropdownLabel: "What is your main CMS or blogging platform?",
    ctaDropdownOptions: ["WordPress", "Webflow", "Shopify", "Custom / Next.js", "Other"],
    servicesOrder: ["01", "05", "03", "04", "02", "06"],
    servicesCustomizations: {
      "01": {
        title: "Programmatic Landing Pages",
        blurb: "Dynamic templates optimized for Quality Score and page speed to maximize your organic search and ad campaign returns.",
        bullets: ["Programmatic routing ready", "Structured schema markup", "Sub-1s page load times"],
      },
      "05": {
        title: "Automated SEO Pipelines",
        blurb: "Connect your content planning tools directly to AI generation scripts, asset optimization, and CMS publishing endpoints.",
        bullets: ["Topic cluster autogen", "Multi-platform content splits", "Automatic sitemap pings"],
      },
    },
  },
  "b2b-enterprises": {
    slug: "b2b-enterprises",
    metaTitle: "Custom B2B Software & Workflow Automation Development | Bayline Digital",
    metaDescription: "We build secure web applications, multi-tenant B2B portals, and automated business integrations. Practical systems built for growing enterprise teams.",
    adGroupKeywords: ["custom software developer for small business", "b2b web app builder", "workflow integrations", "internal tooling developer"],
    hero: {
      badge: "Custom App Development",
      headline: "Custom applications and internal tooling built for scaling teams.",
      subheadline: "Ditch the spreadsheets. We build secure, multi-tenant digital portals and automated API integrations that streamline operations.",
      visualType: "b2b",
    },
    painPoints: [
      {
        title: "Data silos and double entry",
        description: "We build custom APIs and bi-directional sync tools to keep your database, CRM, and accounting systems aligned.",
      },
      {
        title: "Clunky manual approval flows",
        description: "Move multi-party reviews and document approvals online with rigid role-based security permissions.",
      },
      {
        title: "Spreadsheet & email chaos",
        description: "Consolidate fragmented data sources into a fast, beautiful custom dashboard tailored to your actual workflow.",
      },
    ],
    featuredProjectSlug: "permipro",
    ctaDropdownLabel: "What database or internal system do you need to connect?",
    ctaDropdownOptions: ["SQL Database (Postgres/MySQL)", "Salesforce / HubSpot", "QuickBooks / ERP", "Excel / Google Sheets", "Proprietary Legacy System"],
    servicesOrder: ["03", "05", "01", "02", "04", "06"],
    servicesCustomizations: {
      "03": {
        title: "Enterprise Web Apps",
        blurb: "Custom portals, dashboards, and internal business tools designed for high security and performance.",
        bullets: ["Multi-tenant RBAC core", "Offline-first capability", "Modern React & Next.js"],
      },
      "05": {
        title: "Systems Integration",
        blurb: "Connect legacy databases, custom tools, and external services through robust, self-healing queues.",
        bullets: ["Bi-directional data sync", "BullMQ background workers", "Error-handling alerting"],
      },
    },
  },
};
