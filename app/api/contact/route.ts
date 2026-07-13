import { NextResponse } from "next/server";

const ALLOWED_FIELDS = new Set([
  "name", "email", "company", "website", "city", "service", "budget", "details",
  "customDropdownAnswer", "industrySlug", "sourcePage", "utmSource", "utmMedium",
  "utmCampaign", "utmContent", "utmTerm", "gclid", "landingPageUrl", "referrer",
  "firstVisit", "websiteFax",
]);
const rateLimit = new Map<string, { count: number; reset: number }>();

function clean(value: unknown, limit = 500) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

function slack(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function isHttpUrl(value: string) {
  if (!value) return true;
  try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; }
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now();
  const current = rateLimit.get(ip);
  if (current && current.reset > now && current.count >= 5) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": String(Math.ceil((current.reset - now) / 1000)) } });
  }
  rateLimit.set(ip, current && current.reset > now ? { ...current, count: current.count + 1 } : { count: 1, reset: now + 60_000 });

  try {
    const raw: unknown = await request.json();
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    const body = raw as Record<string, unknown>;
    if (Object.keys(body).some((key) => !ALLOWED_FIELDS.has(key))) return NextResponse.json({ error: "Invalid fields" }, { status: 400 });

    const data = {
      name: clean(body.name, 120), email: clean(body.email, 180), company: clean(body.company, 180),
      website: clean(body.website, 500), city: clean(body.city, 100), service: clean(body.service, 120),
      budget: clean(body.budget, 80), details: clean(body.details, 3000),
      customDropdownAnswer: clean(body.customDropdownAnswer, 300), industrySlug: clean(body.industrySlug, 120),
      sourcePage: clean(body.sourcePage, 500), utmSource: clean(body.utmSource, 200),
      utmMedium: clean(body.utmMedium, 200), utmCampaign: clean(body.utmCampaign, 200),
      utmContent: clean(body.utmContent, 200), utmTerm: clean(body.utmTerm, 200), gclid: clean(body.gclid, 300),
      landingPageUrl: clean(body.landingPageUrl, 1000), referrer: clean(body.referrer, 1000), firstVisit: clean(body.firstVisit, 100),
      websiteFax: clean(body.websiteFax, 200),
    };

    if (data.websiteFax || !data.name || !/^\S+@\S+\.\S+$/.test(data.email) || !isHttpUrl(data.website)) {
      return NextResponse.json({ error: "Invalid inquiry" }, { status: 400 });
    }

    const webhook = process.env.SLACK_WEBHOOK_URL;
    if (!webhook) return NextResponse.json({ error: "Delivery is unavailable" }, { status: 503 });

    const line = (label: string, value: string) => `*${label}:* ${slack(value || "Not provided")}`;
    const message = {
      text: `New Bayline inquiry from ${slack(data.name)}`,
      blocks: [
        { type: "header", text: { type: "plain_text", text: "New Bayline inquiry" } },
        { type: "section", fields: [line("Name", data.name), line("Email", data.email), line("Company", data.company), line("Website", data.website), line("City", data.city), line("Service", data.service), line("Budget", data.budget), line("Source page", data.sourcePage)].map((text) => ({ type: "mrkdwn", text })) },
        { type: "section", text: { type: "mrkdwn", text: `${line("Project note", data.details)}\n${line("Custom answer", data.customDropdownAnswer)}\n${line("Industry", data.industrySlug)}` } },
        { type: "section", text: { type: "mrkdwn", text: [line("Source / medium", `${data.utmSource || "Direct"} / ${data.utmMedium || "None"}`), line("Campaign", data.utmCampaign), line("Content", data.utmContent), line("Keyword", data.utmTerm), line("GCLID", data.gclid), line("Landing page", data.landingPageUrl), line("Referrer", data.referrer), line("First visit", data.firstVisit)].join("\n") } },
      ],
    };

    const response = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(message) });
    if (!response.ok) return NextResponse.json({ error: "Delivery failed" }, { status: 502 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Inquiry delivery failed", error);
    return NextResponse.json({ error: "Delivery failed" }, { status: 500 });
  }
}
