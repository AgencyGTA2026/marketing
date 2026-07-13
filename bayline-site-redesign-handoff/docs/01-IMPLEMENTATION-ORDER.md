# Implementation Order

Use this order to reduce migration risk and avoid duplicating page-specific code.

## 1. Audit the production repository

Before replacing UI, record:

- Every public route and its canonical URL
- Blog and CMS data sources
- Existing inquiry API endpoint and email/CRM integrations
- Analytics, conversion events and UTM handling
- Sitemap and robots generation
- Structured-data helpers
- Shared header, footer and navigation components
- Environment variables used by forms, CMS, email and analytics

Do not remove working integrations while moving the design.

## 2. Establish shared foundations

Port the visual tokens from `current-build/app/globals.css`, then extract reusable components:

- `Header`
- `Footer`
- `PrimaryButton`
- `TextLink`
- `SectionHeading`
- `InquiryForm`
- `FAQList`
- `ClosingCTA`

Keep one source for navigation links, contact information and company details.

## 3. Port the homepage

Use `current-build/app/page.tsx` as the visual reference. Replace its duplicated header and footer with the shared production components. Preserve the production homepage metadata, analytics and existing destination URLs where they are still correct.

## 4. Build the production inquiry form and Contact page

Do this early because the same form will be reused on location and service pages. Complete validation, submission, spam protection, attribution and error handling before duplicating form placements.

## 5. Build Services

Create the services index first, then a reusable service-detail template. Migrate the existing routes without renaming them:

```text
/services/custom-websites
/services/landing-pages
/services/web-apps
/services/automation
/services/seo
/services/maintenance
```

## 6. Build Blog

Keep the current CMS and article URLs. Replace only the index and article presentation. Verify authoring, image rendering, metadata, rich text, related links and sitemap behavior.

## 7. Convert location pages to a reusable template

Use the Whitby page as the reference. Extract a reusable `LocationPage` component and populate it from typed city data. Do not generate every city until the unique-content fields are complete.

## 8. Validate SEO and integrations

Run the checklist in `06-SEO-MIGRATION.md` before deployment. Compare old and new route inventories and create redirects only where a URL truly changed.

## 9. Release in controlled batches

Recommended sequence:

1. Shared shell and homepage
2. Contact and production form
3. Services index and service pages
4. Blog index and article template
5. Whitby, then the remaining locations

Verify analytics and form delivery after every batch.
