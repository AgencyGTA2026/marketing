import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const globalForDb = globalThis as unknown as {
  socialPostgres?: ReturnType<typeof postgres>;
};

// Supabase's transaction-mode pooler is the runtime connection. It does not
// support prepared statements, so `prepare` must remain disabled.
const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:5432/postgres";

export const client = globalForDb.socialPostgres ?? postgres(connectionString, {
  prepare: false,
  max: 5,
  idle_timeout: 20,
  connect_timeout: 10,
});

if (process.env.NODE_ENV !== "production") globalForDb.socialPostgres = client;

export const db = drizzle(client, { schema });
