# Deploying and sharing prospect ideas

The idea-preview system is part of the main Bayline Digital Next.js site. Each prospect gets an unlisted route such as:

```text
https://www.baylinedigital.com/ideas/harbour-home-services
```

The pages are excluded from the sitemap and send `noindex`, `nofollow`, and `noarchive` directives. This prevents normal search discovery; it is not authentication. Never place private customer information, credentials, or confidential business data in a concept page.

## First deployment on Vercel

1. Push the repository to GitHub.
2. In Vercel, select **Add New → Project** and import the GitHub repository.
3. Keep the detected framework as **Next.js** and the root directory as the repository root.
4. Use `pnpm install` as the install command and `pnpm build` as the build command.
5. Add these minimum production environment variables:

   ```text
   SITE_URL=https://www.baylinedigital.com
   NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/bayline-digital/intro
   ```

   Keep the other variables from `.env.example` if the existing contact form, blog, analytics, or Social Studio features are enabled in that deployment.

6. Deploy the project.
7. In **Project Settings → Domains**, connect `www.baylinedigital.com` if the domain is not already attached.
8. Open the sample route and confirm the concept renders.

After Git integration is connected, each pull request receives a preview deployment and merging to the production branch triggers the production deployment.

## Add a concept for a new lead

1. Open `lib/data/ideas.ts`.
2. Duplicate the existing object in `PROSPECT_IDEAS`.
3. Change `slug` to a unique lowercase, hyphenated value. For a less guessable unlisted URL, add a short random suffix such as `company-name-k7m4`.
4. Replace every company-specific observation, benefit, headline, proof point, service, and colour.
5. Set `walkthroughUrl` to the prospect's Loom link. Leave it out when no recording is ready; the walkthrough button will not render.
6. Keep all claims clearly framed as concept copy. Use public information or fictional placeholders until the prospect verifies a claim.
7. Run:

   ```bash
   pnpm test -- test/ideas.test.ts
   pnpm typecheck
   pnpm build
   ```

8. Commit and push the change. Review the Vercel preview URL before merging it to production.

## Pre-send checklist

- Confirm the prospect name and date.
- Check the page on a phone and a desktop.
- Test the walkthrough and booking links.
- Remove any unverified performance claims or customer data.
- Confirm that the page source contains a `noindex` robots tag.
- Confirm the response header:

  ```bash
  curl -I https://www.baylinedigital.com/ideas/your-slug
  ```

  The response should include `X-Robots-Tag: noindex, nofollow, noarchive`.

## Optional access protection

An unlisted URL is appropriate only for non-sensitive speculative concepts. If the page contains anything confidential, enable Vercel Deployment Protection for the deployment or add application authentication before sharing it.
