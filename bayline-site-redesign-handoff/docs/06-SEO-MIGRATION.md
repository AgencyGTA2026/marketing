# SEO Migration

## Preserve URLs first

Keep existing public URLs whenever possible. A redesign should not require changing route paths.

Inventory and compare:

- Homepage
- Services index
- Every service detail page
- Blog index
- Every article
- Contact page
- Every location page
- Sitemap and feed URLs

If a route must change, create a permanent redirect from the exact old URL to the closest relevant new URL. Do not redirect unrelated pages to the homepage.

## Page metadata

Every public page needs:

- Unique title
- Unique meta description
- Canonical URL
- Open Graph title, description and image when available
- Appropriate robots directive

Do not use the same title pattern without checking length and search intent.

## Location pages

- Use unique local context, not only city-name replacement.
- Mention nearby areas only when Bayline genuinely serves them.
- Link each city to relevant services and nearby locations.
- Avoid multiple pages targeting the exact same city and intent.
- Do not claim an office address where Bayline does not have one.
- Use honest service-area structured data.

## Service pages

- Keep one primary intent per page.
- Link from the services index and related blog articles.
- Add relevant FAQs only when they answer real questions.
- Avoid repeating the same generic process copy on every page.

## Blog

- Preserve slugs and publication dates.
- Preserve heading structure and image alt text.
- Confirm CMS-rendered canonicals.
- Maintain article structured data where accurate.
- Keep internal links working.
- Update contextual service links only when genuinely relevant.

## Structured data

Use only accurate types and fields. Likely candidates:

- `Organization` or `ProfessionalService`
- `WebSite`
- `BreadcrumbList`
- `Article` for blog posts
- `FAQPage` only when FAQs are visible on the page and current search-engine guidance supports it

Structured data must not invent reviews, ratings, locations, prices or employees.

## Sitemap and crawling

- Ensure every intended public route appears once in the sitemap.
- Exclude drafts, previews and internal search pages.
- Keep `robots.txt` consistent with production.
- Confirm new routes return `200`, redirects return the intended status, and removed routes return an appropriate response.

## Post-launch checks

- Submit the updated sitemap in Google Search Console.
- Inspect representative service, blog and location URLs.
- Monitor indexing, crawl errors and canonical selection.
- Compare organic landing-page traffic and form conversions before and after release.
