import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      city,
      service,
      details,
      budget,
      customDropdownAnswer,
      industrySlug,
      pageType,
      utmSource,
      utmMedium,
      utmCampaign,
      utmContent,
      utmTerm,
      gclid,
      landingPageUrl,
      referrer,
      firstVisit,
    } = body;

    // City-tagged header so each location page's leads are instantly identifiable in Slack.
    const cityTag = city ? `${city} ` : "";
    const serviceTag = service ? ` — ${service}` : "";

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!slackWebhookUrl) {
      console.warn("Slack Webhook URL is missing from environment variables.");
      console.info("[Lead]", {
        name,
        email,
        company,
        city,
        service,
        budget,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        gclid,
        landingPageUrl,
        referrer,
        firstVisit,
        pageType,
        details,
      });
      return NextResponse.json({ success: true, warning: "Lead logged to server console (Slack webhook unconfigured)." });
    }

    const attribution = [
      `*Source / Medium:* ${utmSource || "Direct"} / ${utmMedium || "—"}`,
      `*Campaign:* ${utmCampaign || "Organic"}`,
      `*Ad group / Content:* ${utmContent || "—"}`,
      `*Keyword:* ${utmTerm || "—"}`,
      `*GCLID:* ${gclid || "—"}`,
      landingPageUrl ? `*Landing page:* ${landingPageUrl}` : null,
      referrer ? `*Referrer:* ${referrer}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const slackMessage = {
      text: `🚀 New ${cityTag}Lead${serviceTag}: ${name}`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*New ${cityTag}Project Lead${serviceTag}*${company ? ` for ${company}` : ""}`,
          },
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Name:* ${name}` },
            { type: "mrkdwn", text: `*Email:* ${email}` },
            { type: "mrkdwn", text: `*City:* ${city || "—"}` },
            { type: "mrkdwn", text: `*Service:* ${service || "—"}` },
            { type: "mrkdwn", text: `*Budget:* ${budget}` },
            { type: "mrkdwn", text: `*Page type:* ${pageType || "site"}` },
            { type: "mrkdwn", text: `*Custom Q:* ${customDropdownAnswer || "N/A"}` },
            { type: "mrkdwn", text: `*Industry route:* ${industrySlug || "Default home"}` },
          ],
        },
        {
          type: "section",
          text: { type: "mrkdwn", text: `*Attribution*\n${attribution}` },
        },
        {
          type: "section",
          text: { type: "mrkdwn", text: `*Project details:*\n${details?.trim() || "_None provided_"}` },
        },
      ],
    };

    const response = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackMessage),
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Slack lead routing failed:", error);
    return NextResponse.json({ error: "Failed to route lead payload" }, { status: 500 });
  }
}
