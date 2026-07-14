import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const automationKind = pgEnum("social_automation_kind", ["ONE_TIME", "WEEKLY"]);
export const automationStatus = pgEnum("social_automation_status", ["ACTIVE", "PAUSED", "COMPLETED"]);
export const destination = pgEnum("social_destination", ["FACEBOOK", "INSTAGRAM"]);
export const connectionStatus = pgEnum("social_connection_status", ["CONNECTED", "EXPIRED", "ERROR", "DISCONNECTED"]);
export const draftStatus = pgEnum("social_draft_status", [
  "GENERATING",
  "AWAITING_APPROVAL",
  "APPROVED",
  "PUBLISHING",
  "PUBLISHED",
  "GENERATION_FAILED",
  "PUBLISH_FAILED",
  "MISSED",
  "CANCELLED",
]);
export const approvalState = pgEnum("social_approval_state", ["PENDING", "APPROVED"]);
export const publicationStatus = pgEnum("social_publication_status", ["PENDING", "PUBLISHING", "PUBLISHED", "FAILED"]);

// Better Auth models. Keep property names aligned with Better Auth's adapter contract.
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
}, (table) => [index("session_user_id_idx").on(table.userId)]);

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at", { withTimezone: true }),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { withTimezone: true }),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("account_user_id_idx").on(table.userId)]);

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("verification_identifier_idx").on(table.identifier)]);

export const socialConnection = pgTable("social_connection", {
  id: text("id").primaryKey(),
  ownerUserId: text("owner_user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  pageId: text("page_id").notNull(),
  pageName: text("page_name").notNull(),
  instagramAccountId: text("instagram_account_id"),
  instagramUsername: text("instagram_username"),
  encryptedPageToken: text("encrypted_page_token").notNull(),
  tokenExpiresAt: timestamp("token_expires_at", { withTimezone: true }),
  status: connectionStatus("status").default("CONNECTED").notNull(),
  lastCheckedAt: timestamp("last_checked_at", { withTimezone: true }),
  lastError: text("last_error"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("social_connection_owner_idx").on(table.ownerUserId)]);

export type PromptSpec = {
  topic: string;
  audience: string;
  keyMessage: string;
  cta: string;
  url?: string;
  notes?: string;
};

export type GenerationStage = "QUEUED" | "WRITING" | "GENERATING_IMAGE" | "COMPOSITING" | "UPLOADING" | "READY";

export const automation = pgTable("social_automation", {
  id: text("id").primaryKey(),
  ownerUserId: text("owner_user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  kind: automationKind("kind").notNull(),
  status: automationStatus("status").default("ACTIVE").notNull(),
  promptSpec: jsonb("prompt_spec").$type<PromptSpec>().notNull(),
  destinations: destination("destinations").array().notNull(),
  timezone: text("timezone").default("America/Toronto").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  weekdays: integer("weekdays").array(),
  publishTime: text("publish_time").notNull(),
  oneTimeAt: timestamp("one_time_at", { withTimezone: true }),
  nextOccurrenceAt: timestamp("next_occurrence_at", { withTimezone: true }),
  lastOccurrenceAt: timestamp("last_occurrence_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [index("automation_next_occurrence_idx").on(table.status, table.nextOccurrenceAt)]);

export const draft = pgTable("social_draft", {
  id: text("id").primaryKey(),
  automationId: text("automation_id").references(() => automation.id, { onDelete: "set null" }),
  occurrenceKey: text("occurrence_key").notNull(),
  scheduledFor: timestamp("scheduled_for", { withTimezone: true }).notNull(),
  destinations: destination("destinations").array().notNull(),
  status: draftStatus("status").default("GENERATING").notNull(),
  generationStage: text("generation_stage").$type<GenerationStage>().default("QUEUED").notNull(),
  generationProgress: integer("generation_progress").default(0).notNull(),
  approval: approvalState("approval").default("PENDING").notNull(),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
  approvedBy: text("approved_by").references(() => user.id, { onDelete: "set null" }),
  currentVersionId: text("current_version_id"),
  claimedAt: timestamp("claimed_at", { withTimezone: true }),
  failureCount: integer("failure_count").default(0).notNull(),
  lastError: text("last_error"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex("draft_occurrence_key_idx").on(table.occurrenceKey),
  index("draft_due_idx").on(table.status, table.scheduledFor),
]);

export type CreativeBrief = {
  headline: string;
  onImageKicker?: string;
  onImageSupport?: string;
  visualBrief: string;
  facebookCaption: string;
  instagramCaption: string;
  cta: string;
  hashtags: string[];
};

export const draftVersion = pgTable("social_draft_version", {
  id: text("id").primaryKey(),
  draftId: text("draft_id").notNull().references(() => draft.id, { onDelete: "cascade" }),
  version: integer("version").notNull(),
  brief: jsonb("brief").$type<CreativeBrief>().notNull(),
  facebookCaption: text("facebook_caption").notNull(),
  instagramCaption: text("instagram_caption").notNull(),
  imagePrompt: text("image_prompt").notNull(),
  sourceImageUrl: text("source_image_url"),
  assetUrl: text("asset_url").notNull(),
  assetPathname: text("asset_pathname").notNull(),
  model: text("model").notNull(),
  promptVersion: text("prompt_version").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [uniqueIndex("draft_version_number_idx").on(table.draftId, table.version)]);

export const publicationAttempt = pgTable("social_publication_attempt", {
  id: text("id").primaryKey(),
  draftId: text("draft_id").notNull().references(() => draft.id, { onDelete: "cascade" }),
  versionId: text("version_id").notNull().references(() => draftVersion.id, { onDelete: "restrict" }),
  platform: destination("platform").notNull(),
  idempotencyKey: text("idempotency_key").notNull(),
  status: publicationStatus("status").default("PENDING").notNull(),
  attempts: integer("attempts").default(0).notNull(),
  externalPostId: text("external_post_id"),
  permalink: text("permalink"),
  lastError: text("last_error"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [
  uniqueIndex("publication_idempotency_idx").on(table.idempotencyKey),
  uniqueIndex("publication_platform_version_idx").on(table.versionId, table.platform),
]);

export const oauthState = pgTable("social_oauth_state", {
  state: text("state").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const workerRun = pgTable("social_worker_run", {
  id: text("id").notNull(),
  tickAt: timestamp("tick_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [primaryKey({ columns: [table.id] })]);

export const schema = {
  user,
  session,
  account,
  verification,
  socialConnection,
  automation,
  draft,
  draftVersion,
  publicationAttempt,
  oauthState,
  workerRun,
};
