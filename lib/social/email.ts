import "server-only";
import { Resend } from "resend";
import { formatStudioDate } from "./time";

function resendClient() {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(process.env.RESEND_API_KEY);
}

export async function notifyOwner(subject: string, message: string, scheduledFor?: Date) {
  const to = process.env.STUDIO_OWNER_EMAIL;
  if (!to) throw new Error("STUDIO_OWNER_EMAIL is not configured");
  const detail = scheduledFor ? `<p><strong>Scheduled:</strong> ${formatStudioDate(scheduledFor)}</p>` : "";
  const studioUrl = `${process.env.BETTER_AUTH_URL || process.env.SITE_URL || "http://localhost:3000"}/studio/social`;
  const result = await resendClient().emails.send({
    from: process.env.RESEND_FROM_EMAIL || "Bayline Digital Studio <studio@example.com>",
    to,
    subject,
    html: `<div style="font-family:Arial,sans-serif;color:#121820;max-width:600px;margin:auto;padding:36px"><p style="color:#2457e6;font-size:11px;letter-spacing:.14em">BAYLINE DIGITAL / SOCIAL STUDIO</p><h1 style="font-size:28px">${subject}</h1><p>${message}</p>${detail}<p><a href="${studioUrl}">Open Social Studio</a></p></div>`,
    text: `${subject}\n\n${message}${scheduledFor ? `\nScheduled: ${formatStudioDate(scheduledFor)}` : ""}\n\n${studioUrl}`,
  });
  if (result.error) throw new Error("Unable to send studio notification");
}
