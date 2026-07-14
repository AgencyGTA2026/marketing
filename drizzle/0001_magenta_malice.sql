ALTER TABLE "social_draft" ADD COLUMN "generation_stage" text DEFAULT 'QUEUED' NOT NULL;--> statement-breakpoint
ALTER TABLE "social_draft" ADD COLUMN "generation_progress" integer DEFAULT 0 NOT NULL;