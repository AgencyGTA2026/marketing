CREATE TYPE "public"."social_approval_state" AS ENUM('PENDING', 'APPROVED');--> statement-breakpoint
CREATE TYPE "public"."social_automation_kind" AS ENUM('ONE_TIME', 'WEEKLY');--> statement-breakpoint
CREATE TYPE "public"."social_automation_status" AS ENUM('ACTIVE', 'PAUSED', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."social_connection_status" AS ENUM('CONNECTED', 'EXPIRED', 'ERROR', 'DISCONNECTED');--> statement-breakpoint
CREATE TYPE "public"."social_destination" AS ENUM('FACEBOOK', 'INSTAGRAM');--> statement-breakpoint
CREATE TYPE "public"."social_draft_status" AS ENUM('GENERATING', 'AWAITING_APPROVAL', 'APPROVED', 'PUBLISHING', 'PUBLISHED', 'GENERATION_FAILED', 'PUBLISH_FAILED', 'MISSED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."social_publication_status" AS ENUM('PENDING', 'PUBLISHING', 'PUBLISHED', 'FAILED');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp with time zone,
	"refresh_token_expires_at" timestamp with time zone,
	"scope" text,
	"password" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_automation" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_user_id" text NOT NULL,
	"name" text NOT NULL,
	"kind" "social_automation_kind" NOT NULL,
	"status" "social_automation_status" DEFAULT 'ACTIVE' NOT NULL,
	"prompt_spec" jsonb NOT NULL,
	"destinations" "social_destination"[] NOT NULL,
	"timezone" text DEFAULT 'America/Toronto' NOT NULL,
	"start_date" text NOT NULL,
	"end_date" text,
	"weekdays" integer[],
	"publish_time" text NOT NULL,
	"one_time_at" timestamp with time zone,
	"next_occurrence_at" timestamp with time zone,
	"last_occurrence_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_draft" (
	"id" text PRIMARY KEY NOT NULL,
	"automation_id" text,
	"occurrence_key" text NOT NULL,
	"scheduled_for" timestamp with time zone NOT NULL,
	"destinations" "social_destination"[] NOT NULL,
	"status" "social_draft_status" DEFAULT 'GENERATING' NOT NULL,
	"approval" "social_approval_state" DEFAULT 'PENDING' NOT NULL,
	"approved_at" timestamp with time zone,
	"approved_by" text,
	"current_version_id" text,
	"claimed_at" timestamp with time zone,
	"failure_count" integer DEFAULT 0 NOT NULL,
	"last_error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_draft_version" (
	"id" text PRIMARY KEY NOT NULL,
	"draft_id" text NOT NULL,
	"version" integer NOT NULL,
	"brief" jsonb NOT NULL,
	"facebook_caption" text NOT NULL,
	"instagram_caption" text NOT NULL,
	"image_prompt" text NOT NULL,
	"source_image_url" text,
	"asset_url" text NOT NULL,
	"asset_pathname" text NOT NULL,
	"model" text NOT NULL,
	"prompt_version" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_oauth_state" (
	"state" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_publication_attempt" (
	"id" text PRIMARY KEY NOT NULL,
	"draft_id" text NOT NULL,
	"version_id" text NOT NULL,
	"platform" "social_destination" NOT NULL,
	"idempotency_key" text NOT NULL,
	"status" "social_publication_status" DEFAULT 'PENDING' NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"external_post_id" text,
	"permalink" text,
	"last_error" text,
	"published_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "social_connection" (
	"id" text PRIMARY KEY NOT NULL,
	"owner_user_id" text NOT NULL,
	"page_id" text NOT NULL,
	"page_name" text NOT NULL,
	"instagram_account_id" text,
	"instagram_username" text,
	"encrypted_page_token" text NOT NULL,
	"token_expires_at" timestamp with time zone,
	"status" "social_connection_status" DEFAULT 'CONNECTED' NOT NULL,
	"last_checked_at" timestamp with time zone,
	"last_error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_worker_run" (
	"id" text NOT NULL,
	"tick_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "social_worker_run_id_pk" PRIMARY KEY("id")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_automation" ADD CONSTRAINT "social_automation_owner_user_id_user_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_draft" ADD CONSTRAINT "social_draft_automation_id_social_automation_id_fk" FOREIGN KEY ("automation_id") REFERENCES "public"."social_automation"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_draft" ADD CONSTRAINT "social_draft_approved_by_user_id_fk" FOREIGN KEY ("approved_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_draft_version" ADD CONSTRAINT "social_draft_version_draft_id_social_draft_id_fk" FOREIGN KEY ("draft_id") REFERENCES "public"."social_draft"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_oauth_state" ADD CONSTRAINT "social_oauth_state_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_publication_attempt" ADD CONSTRAINT "social_publication_attempt_draft_id_social_draft_id_fk" FOREIGN KEY ("draft_id") REFERENCES "public"."social_draft"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_publication_attempt" ADD CONSTRAINT "social_publication_attempt_version_id_social_draft_version_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."social_draft_version"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "social_connection" ADD CONSTRAINT "social_connection_owner_user_id_user_id_fk" FOREIGN KEY ("owner_user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "automation_next_occurrence_idx" ON "social_automation" USING btree ("status","next_occurrence_at");--> statement-breakpoint
CREATE UNIQUE INDEX "draft_occurrence_key_idx" ON "social_draft" USING btree ("occurrence_key");--> statement-breakpoint
CREATE INDEX "draft_due_idx" ON "social_draft" USING btree ("status","scheduled_for");--> statement-breakpoint
CREATE UNIQUE INDEX "draft_version_number_idx" ON "social_draft_version" USING btree ("draft_id","version");--> statement-breakpoint
CREATE UNIQUE INDEX "publication_idempotency_idx" ON "social_publication_attempt" USING btree ("idempotency_key");--> statement-breakpoint
CREATE UNIQUE INDEX "publication_platform_version_idx" ON "social_publication_attempt" USING btree ("version_id","platform");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "social_connection_owner_idx" ON "social_connection" USING btree ("owner_user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");