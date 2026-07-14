# Bayline Digital Social Studio

Private, single-owner workspace at `/studio/social` for generating, approving, scheduling, and publishing Bayline Digital static image posts to Facebook and Instagram. It supports localhost and explicitly configured production hostnames. AutoBlogWriter is intentionally not part of this workflow.

The middleware returns `404` for every Studio page, auth route, and Studio API request made through a hostname not listed by `STUDIO_ALLOWED_HOSTS`, `BETTER_AUTH_URL`, or `SITE_URL`. Authentication remains restricted to the exact `STUDIO_OWNER_EMAIL`. Generated image assets remain public because Meta must fetch them server-to-server when publishing.

## What ships

- Better Auth single-use magic links sent through Resend. Public signup is disabled; the owner record is bootstrapped only after an exact `STUDIO_OWNER_EMAIL` match.
- Supabase Postgres / Drizzle models for auth, Meta connection state, schedules, drafts, immutable versions, OAuth state, and per-platform publication attempts.
- AES-256-GCM encryption for Page access tokens and sanitized persisted errors.
- Meta OAuth for a manageable Facebook Page and its linked Instagram professional account.
- Two-stage OpenAI generation: structured copy/brief output, then a text-free `gpt-image-2` layer.
- Deterministic Sharp composition into one immutable 1080×1350 PNG using the Bayline Digital system.
- Vercel Blob public URLs suitable for Meta's server-side image fetch.
- An authenticated local worker tick while the Studio tab is open, with Toronto-aware recurrence, row claims, bounded retries, and idempotent per-platform publication.
- Approval gates for scheduled publishing and explicit confirmations for schedule creation, approval, and publish-now.

## Environment

Copy the Social Studio section from `.env.example`. Generate secrets with:

```bash
openssl rand -base64 32 # BETTER_AUTH_SECRET
openssl rand -base64 32 # TOKEN_ENCRYPTION_KEY (must decode to exactly 32 bytes)
```

Set `BETTER_AUTH_URL=http://localhost:3000`. `RESEND_FROM_EMAIL` must use a verified Resend domain. Keep every credential server-only; no Studio credential uses a `NEXT_PUBLIC_` prefix.

## Database and local worker

Create a Supabase project, then copy two connection strings from **Connect**:

- `DATABASE_URL`: the Shared Pooler in **transaction mode** (port `6543`) for application traffic. The Postgres.js client disables prepared statements because transaction mode does not support them.
- `DIRECT_DATABASE_URL`: the direct database URL (port `5432`) for Drizzle migrations. If the machine running migrations cannot reach Supabase over IPv6, use the Shared Pooler in **session mode** instead.

Both URLs should use `sslmode=require`. This application connects only from trusted server code through Drizzle; it does not expose the Supabase Data API or service-role credentials to the browser. Supabase Auth, Storage, and Realtime are not used.

Apply the committed migrations:

```bash
npm run db:migrate
```

While the authenticated Studio is open, it runs a local worker tick on load and every 60 seconds. Closing the local app pauses recurring generation and scheduled publication; the next open processes anything still eligible. Keep the Studio running around scheduled publish times when automatic publication matters.

## Meta app setup

1. Add the local callback URL: `http://localhost:3000/api/studio/meta/callback`.
2. Configure Facebook Login for Business and request `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `instagram_basic`, and `instagram_content_publish`.
3. Ensure the Facebook Page has a linked Instagram professional account and the authorizing user has sufficient Page access.
5. Keep the app in development mode for sandbox verification, then complete Meta App Review before connecting production assets.

The implementation targets Graph API `v24.0` by default. Change `META_GRAPH_VERSION` only after validating the affected endpoints and permissions.

## Publishing guarantees

- Creating either schedule type immediately generates its first draft, even when its publish date is more than three days away. Later weekly occurrences generate automatically three calendar days before publishing.
- Only the topic and timing are required. When audience, key message, CTA, or schedule name are omitted, the server applies fixed Bayline autopilot defaults. Recurring generations receive recent headlines as avoidance context to keep each occurrence distinct.
- Draft generation persists its current stage and percentage (`writing`, `image`, `compositing`, and `uploading`). The Studio refreshes those values while a job runs. Cancelling is cooperative between stages; cancelled and other unpublished drafts can then be permanently deleted.
- Generation validates both OpenAI and Blob credentials before calling either model. Local operation requires `BLOB_READ_WRITE_TOKEN`.
- A draft without `APPROVED` state is changed to `MISSED` when due, is never published, and emails the owner.
- Editing or regenerating creates a new version and resets approval.
- Deleting a schedule removes its unpublished drafts and prevents future occurrences. Published or
  partially published records remain in the immutable history ledger.
- Ready-for-approval drafts appear in the Studio queue, but the current implementation does not send
  an email when generation finishes. Email notifications are reserved for exhausted generation or
  publication failures and for posts skipped because approval was missing at publish time.
- Facebook and Instagram each have a unique `(version, platform)` publication record. A successful platform is skipped on retry even when the other platform failed.
- Assets are immutable and versioned. Published Blob assets must remain public. A future cleanup job may delete unpublished abandoned source/final assets older than 30 days; it must exclude any version referenced by a successful publication.
- Worker errors and Meta errors are sanitized before persistence; token query values and bearer credentials are redacted.

## Verification completed locally

```bash
npm test
npm run typecheck
npm run lint
npm run build
```

The automated suite covers Toronto winter/summer conversion, the spring-forward gap, weekly recurrence/end dates, a calendar-day generation window across DST, one-time generation-window behavior, missed approval disposition, AES-GCM nonce/round-trip behavior, error redaction, deterministic rendering, 4:5 dimensions, and Bayline blue placement.

## Required local acceptance pass

This pass requires real external accounts and cannot be completed with repository-only credentials:

1. Configure the local app with Supabase, a public Vercel Blob store token, Resend, and Meta test app credentials. Apply `npm run db:migrate` using `DIRECT_DATABASE_URL` first.
2. Sign in as the allowlisted owner; confirm a second use of the same magic link fails.
3. Connect a Meta test Page and linked test Instagram professional account; verify the displayed Page and username.
4. Create one one-time and one weekly schedule using only topic and timing. Confirm both first drafts generate immediately, including a publish date more than three days away.
5. Edit copy and headline; verify a new asset/version is created and approval resets. Regenerate copy/artwork and confirm earlier versions remain addressable.
6. Approve and publish-now to both test destinations. Confirm the image is 4:5 and captions differ by platform.
7. Force an Instagram failure after Facebook succeeds, retry, and verify Facebook is not duplicated.
8. Leave a due draft unapproved; verify it becomes `MISSED`, neither platform receives a post, and the owner receives email.
9. Expire/revoke a test token and verify connection health/error treatment. Pause/resume an automation and reschedule a draft.
10. Confirm the Studio works on localhost and configured production hosts, while `/studio/social`, `/api/studio/*`, and `/api/auth/*` return `404` on an unlisted preview hostname. Repeat the primary paths at desktop and 375px mobile widths.

Do not connect the production Page until this acceptance pass is complete.
