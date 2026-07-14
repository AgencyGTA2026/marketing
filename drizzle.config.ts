import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const migrationUrl = process.env.DIRECT_DATABASE_URL || process.env.DATABASE_URL;

if (!migrationUrl) {
  throw new Error("Set DIRECT_DATABASE_URL or DATABASE_URL in .env.local before running Drizzle commands.");
}

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // Prefer Supabase's direct/session URL for migrations; application traffic
  // uses the transaction-pooler DATABASE_URL.
  dbCredentials: { url: migrationUrl },
});
