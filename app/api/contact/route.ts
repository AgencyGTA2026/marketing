import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, details, budget, customDropdownAnswer, industrySlug, utmSource, utmCampaign } = body;

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
    if (!slackWebhookUrl) {
      console.warn("Slack Webhook URL is missing from environment variables.");
      return NextResponse.json({ success: true, warning: "Lead logged to server console (Slack webhook unconfigured)." });
    }

    const slackMessage = {
      text: `🚀 *New Lead Inbound: ${name}*`,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*New Inbound Project Lead for ${company || "Private Entity"}*`,
          },
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Name:* ${name}` },
            { type: "mrkdwn", text: `*Email:* ${email}` },
            { type: "mrkdwn", text: `*Budget:* ${budget}` },
            { type: "mrkdwn", text: `*Custom Q:* ${customDropdownAnswer || "N/A"}` },
            { type: "mrkdwn", text: `*Industry Route:* ${industrySlug || "Default Home"}` },
            { type: "mrkdwn", text: `*Campaign:* ${utmCampaign || "Organic"} (${utmSource || "Direct"})` },
          ],
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Project Details:*\n${details}`,
          },
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
