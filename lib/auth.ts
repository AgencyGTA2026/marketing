import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { magicLink } from "better-auth/plugins/magic-link";
import { Resend } from "resend";
import { db } from "@/lib/db";
import { schema } from "@/lib/db/schema";

function resendClient() {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");
  return new Resend(process.env.RESEND_API_KEY);
}

const authBaseURL = process.env.BETTER_AUTH_URL
  || process.env.SITE_URL
  || (process.env.NEXT_PHASE === "phase-production-build" ? "http://localhost:3000" : undefined);

export const auth = betterAuth({
  appName: "Bayline Digital Social Studio",
  baseURL: authBaseURL,
  secret: process.env.BETTER_AUTH_SECRET || (process.env.NEXT_PHASE === "phase-production-build" ? "bayline-build-only-secret-not-used-runtime" : undefined),
  database: drizzleAdapter(db, { provider: "pg", schema }),
  trustedOrigins: [authBaseURL || "http://localhost:3000"],
  emailAndPassword: { enabled: false },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: { enabled: true, maxAge: 60 * 5 },
  },
  rateLimit: { enabled: true, window: 60, max: 10, storage: "memory" },
  advanced: {
    useSecureCookies: authBaseURL?.startsWith("https://") ?? false,
    // The PostgreSQL adapter delegates the string "uuid" strategy to the
    // database. Our Better Auth IDs are text columns, so generate UUID strings
    // explicitly instead of requiring database-side UUID defaults.
    database: { generateId: () => crypto.randomUUID() },
  },
  plugins: [
    magicLink({
      disableSignUp: true,
      expiresIn: 600,
      storeToken: "hashed",
      async sendMagicLink({ email, url }) {
        if (email.toLowerCase() !== process.env.STUDIO_OWNER_EMAIL?.toLowerCase()) return;
        const result = await resendClient().emails.send({
          from: process.env.RESEND_FROM_EMAIL || "Bayline Digital Studio <studio@example.com>",
          to: email,
          subject: "Your Bayline Digital Studio sign-in link",
          html: `<div style="font-family:Arial,sans-serif;color:#121820;max-width:560px;margin:auto;padding:40px"><p style="font-size:12px;letter-spacing:.14em;color:#2457e6">BAYLINE DIGITAL / SOCIAL STUDIO</p><h1 style="font-size:32px;font-weight:600">Sign in to the studio</h1><p>This one-time link expires in 10 minutes.</p><p style="margin:32px 0"><a href="${url}" style="background:#2457e6;color:white;text-decoration:none;padding:14px 20px">Open Social Studio</a></p><p style="color:#5c626a;font-size:12px">If you did not request this, you can ignore this email.</p></div>`,
          text: `Sign in to Bayline Digital Social Studio: ${url}\n\nThis one-time link expires in 10 minutes.`,
        });
        if (result.error) throw new Error("Unable to send the sign-in email");
      },
    }),
  ],
});

export type StudioSession = typeof auth.$Infer.Session;
