type CopyBlock = {
  title: string;
  description: string;
};

type BuildBlock = CopyBlock & {
  bullets: string[];
};

type IntegrationBlock = {
  tool: string;
  workflow: string;
};

type FaqBlock = {
  question: string;
  answer: string;
};

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
  industryProblems: CopyBlock[];
  recommendedBuilds: BuildBlock[];
  adLandingBenefits: CopyBlock[];
  integrationExamples: IntegrationBlock[];
  faqs: FaqBlock[];
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
        description: "Website forms, missed calls, and quote requests need a clear path to the person who can respond before the prospect keeps searching.",
      },
      {
        title: "High dispatch & booking overhead",
        description: "Booking, service areas, crew availability, and follow-up should be easier for customers and less manual for the office.",
      },
      {
        title: "Poor local Google search visibility",
        description: "Ultra-fast Next.js architecture and localized schema markup help your business rank in your exact target service neighborhoods.",
      },
    ],
    industryProblems: [
      {
        title: "Visitors need to know if you serve their area",
        description: "Home service buyers search by city, neighborhood, and urgency. The page should make coverage, services, and next steps obvious immediately.",
      },
      {
        title: "Mobile visitors are often ready to call",
        description: "Most service pages should prioritize tap-friendly phone actions, quote forms, and booking paths rather than burying contact details.",
      },
      {
        title: "Reviews and follow-up drive trust",
        description: "After the first job, automated review requests and check-ins can support reputation without asking staff to remember every message.",
      },
    ],
    recommendedBuilds: [
      {
        title: "Local service website",
        description: "A fast site that explains services, locations, trust factors, and quote paths clearly.",
        bullets: ["Service-area pages", "Click-to-call sections", "Quote request forms"],
      },
      {
        title: "Booking and lead response flow",
        description: "A cleaner intake path from form submission to office notification, CRM entry, or booking link.",
        bullets: ["SMS/email lead alerts", "Jobber or Housecall Pro handoff", "Calendar-aware booking links"],
      },
      {
        title: "Local SEO foundation",
        description: "Page structure and metadata that help customers and search engines understand what you do and where you work.",
        bullets: ["Google Business Profile alignment", "Local FAQ content", "Structured service-area copy"],
      },
    ],
    adLandingBenefits: [
      {
        title: "Campaigns match specific services",
        description: "Send HVAC, plumbing, roofing, or emergency repair ads to pages written for that exact need instead of a generic homepage.",
      },
      {
        title: "Calls and forms are easier to measure",
        description: "UTM capture and conversion events help separate real lead sources from vague traffic reports.",
      },
      {
        title: "Service-area copy supports local intent",
        description: "Each page can explain the target city, common service requests, and how quickly a customer can take the next step.",
      },
    ],
    integrationExamples: [
      { tool: "Jobber", workflow: "Send quote requests into the right client or job workflow when API access allows." },
      { tool: "Housecall Pro", workflow: "Route booking context from website forms to the office workflow." },
      { tool: "Twilio", workflow: "Notify owners, dispatchers, or technicians when high-intent leads arrive." },
      { tool: "Google Business Profile", workflow: "Align service and location pages with the profile details customers see in Maps." },
    ],
    faqs: [
      {
        question: "Can you build pages for each city we serve?",
        answer: "Yes, when the pages are useful and specific. We avoid thin duplicate city pages and focus on service-area content that helps visitors decide whether to contact you.",
      },
      {
        question: "Can the website send leads to our dispatch software?",
        answer: "Often, yes. The integration path depends on the software, API access, and what information needs to move from the form into your workflow.",
      },
      {
        question: "Do we need paid ads or SEO first?",
        answer: "It depends on urgency. Ads can send traffic quickly to focused pages, while local SEO builds a stronger long-term foundation. The page structure can support both.",
      },
    ],
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
      subheadline: "Accelerate content operations with fast Next.js sites, structured publishing workflows, and automation that reduces manual production work.",
      visualType: "marketing",
    },
    painPoints: [
      {
        title: "High content writing costs",
        description: "Content operations get expensive when every outline, draft, internal link, and publish step depends on manual coordination.",
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
    industryProblems: [
      {
        title: "Client campaigns need more than one-off pages",
        description: "Agencies often need repeatable landing page systems, SEO templates, and publishing workflows that can scale without messy duplication.",
      },
      {
        title: "Content production breaks across tools",
        description: "Strategy, drafts, approvals, CMS entry, assets, and internal links often live in separate places with no reliable handoff.",
      },
      {
        title: "Reporting needs clean technical inputs",
        description: "Search and campaign reporting is easier when pages are structured consistently, events are tracked, and publishing history is clear.",
      },
    ],
    recommendedBuilds: [
      {
        title: "Programmatic landing page systems",
        description: "Reusable page templates for service, location, comparison, or campaign-specific pages.",
        bullets: ["Dynamic routes", "SEO metadata fields", "Reusable page sections"],
      },
      {
        title: "Content operations workflow",
        description: "A publishing pipeline that connects planning, drafting, review, CMS entry, and launch.",
        bullets: ["Headless CMS structure", "Approval-ready content states", "Internal linking fields"],
      },
      {
        title: "Campaign reporting foundation",
        description: "Technical setup that makes page performance and lead source data easier to interpret.",
        bullets: ["UTM capture", "Conversion events", "Clean page taxonomy"],
      },
    ],
    adLandingBenefits: [
      {
        title: "Reusable systems lower production drag",
        description: "A template system helps teams launch focused pages faster without rebuilding the layout and SEO fields every time.",
      },
      {
        title: "SEO pages stay more consistent",
        description: "Structured content fields make it easier to keep headings, metadata, FAQs, and internal links aligned across many pages.",
      },
      {
        title: "Client campaigns get clearer destinations",
        description: "Each offer or audience can receive a page that matches the ad, keyword, or sales angle more closely than a generic service page.",
      },
    ],
    integrationExamples: [
      { tool: "Payload CMS", workflow: "Manage structured pages, content blocks, metadata, and publishing states." },
      { tool: "Airtable or Google Sheets", workflow: "Use planning data as the source for page outlines or campaign page creation." },
      { tool: "GA4", workflow: "Track form submissions, CTA clicks, and campaign page events." },
      { tool: "Search Console", workflow: "Use query and indexing feedback to decide which content clusters need more depth." },
    ],
    faqs: [
      {
        question: "Can you build programmatic SEO pages without creating thin content?",
        answer: "Yes, but the content model matters. We plan reusable structure while still requiring useful copy, unique context, FAQs, and internal links for each page type.",
      },
      {
        question: "Can this support multiple clients?",
        answer: "The implementation can be designed for one brand or multiple workspaces. The right structure depends on how your agency manages clients, approvals, and publishing permissions.",
      },
      {
        question: "Do you replace our writers or SEO team?",
        answer: "No. The goal is to remove repetitive production work and give strategists, writers, and SEO leads a better publishing system.",
      },
    ],
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
    industryProblems: [
      {
        title: "Internal tools do not match the process anymore",
        description: "Growing teams often inherit spreadsheets, inbox approvals, and disconnected software that worked earlier but now slow decisions down.",
      },
      {
        title: "Permissions and accountability matter",
        description: "As more people touch customer, project, or financial data, the system needs clear roles, audit-friendly actions, and fewer informal workarounds.",
      },
      {
        title: "Leadership needs a reliable source of truth",
        description: "Dashboards only help when the underlying data model and workflows are clean enough for teams to trust the information.",
      },
    ],
    recommendedBuilds: [
      {
        title: "Operations dashboard",
        description: "A focused internal interface for the metrics, records, and tasks your team checks every day.",
        bullets: ["Role-aware views", "Searchable records", "Status and exception queues"],
      },
      {
        title: "Client or vendor portal",
        description: "A secure place for external users to submit, review, approve, or download information without email sprawl.",
        bullets: ["Authenticated access", "Document or request workflows", "Notification triggers"],
      },
      {
        title: "System integration layer",
        description: "Data sync and automation between the tools that already run the business.",
        bullets: ["CRM and accounting sync", "Webhook workflows", "Scheduled imports and exports"],
      },
    ],
    adLandingBenefits: [
      {
        title: "The page can match the operational pain",
        description: "Ads for dashboards, portals, approval workflows, or integrations should land on copy that speaks to that exact problem.",
      },
      {
        title: "Technical buyers get useful detail",
        description: "The page explains access control, data flow, integrations, and workflow design without turning into a vague agency pitch.",
      },
      {
        title: "Non-technical stakeholders see the outcome",
        description: "The same page can explain fewer handoffs, cleaner reporting, and less spreadsheet dependency in plain language.",
      },
    ],
    integrationExamples: [
      { tool: "Postgres or MySQL", workflow: "Create a structured source of truth for records currently managed in spreadsheets." },
      { tool: "Salesforce or HubSpot", workflow: "Sync customer, deal, or account context into internal tools." },
      { tool: "QuickBooks or ERP systems", workflow: "Reduce manual invoice, payment, or operational status updates where integration access exists." },
      { tool: "Google Sheets", workflow: "Use spreadsheets as an import source or lightweight admin surface during migration." },
    ],
    faqs: [
      {
        question: "Can you build an internal tool without replacing every existing system?",
        answer: "Yes. Most projects start by connecting or organizing existing systems around one high-friction workflow instead of replacing everything at once.",
      },
      {
        question: "How do you handle sensitive business data?",
        answer: "We plan authentication, roles, environment configuration, data access, and deployment practices early so security is part of the architecture, not an afterthought.",
      },
      {
        question: "What makes a custom app worth it?",
        answer: "A custom app usually makes sense when manual coordination, errors, delays, or software workarounds are costing more than a focused tool would.",
      },
    ],
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
