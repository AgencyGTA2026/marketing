export const STUDIO_TIMEZONE = "America/Toronto";
export const GENERATION_LEAD_DAYS = 3;
export const MAX_FAILURES = 3;
export const GRAPH_VERSION = process.env.META_GRAPH_VERSION || "v24.0";
export const GRAPH_BASE_URL = `https://graph.facebook.com/${GRAPH_VERSION}`;

export const BRAND_BRIEF = `
Bayline Digital visual system. Create an editorial, confident, quiet image layer.
Use warm paper (#F4F1EA), deep ink (#121820), Bayline blue (#2457E6), square geometry,
clean negative space, documentary or abstract editorial imagery, and crisp high contrast.
Never include any text, lettering, logos, gradients, glass effects, fake software dashboards,
device mockups, invented metrics, awards, client marks, or unsupported claims. The final layout
will add typography and the Bayline logo in code. Compose for a 4:5 portrait crop with calm
space in the upper-left for an editorial headline.
`.trim();

export const AGENCY_CONTEXT = `
Bayline Digital is a small, senior web design and automation agency serving growing small and
mid-sized service businesses across Ontario, with a Toronto-area perspective. Bayline helps a
business become easier to choose, easier to contact, and easier to operate.

Core services:
- Clear, conversion-focused custom websites built with modern, maintainable technology.
- Focused landing pages for paid campaigns, local services, and lead generation.
- Local SEO foundations, content structure, analytics, and conversion tracking.
- Practical lead automation connecting forms, inboxes, CRMs, booking tools, and internal teams.
- Custom web apps, operational dashboards, portals, and systems that replace fragile spreadsheets.
- Ongoing website maintenance and considered digital improvements.

Bayline's point of view:
- A better website makes a good business easier to choose.
- Good design earns attention; clear thinking earns trust; fast follow-up wins the work.
- Most websites stop at form submission. The useful system continues through response, routing,
  follow-up, and measurement.
- Start with the actual bottleneck, not a long list of technology or an unnecessarily large scope.
- Prefer practical specificity over trends, jargon, fear, hype, or generic marketing advice.
- Bayline is a small team by design: direct access, clear scope, no sales-to-production handoff,
  and client ownership of the finished foundation.

Primary audience: owners and marketing leaders at growing Ontario service businesses. They care
about credibility, lead quality, local visibility, less manual work, faster follow-up, and knowing
what to improve first. Never invent Bayline clients, results, statistics, awards, partnerships, or
capabilities. The voice is confident, useful, concise, candid, and calm—not loud or self-important.
`.trim();

export const CONTENT_PROMPT_VERSION = "bayline-social-v3";
