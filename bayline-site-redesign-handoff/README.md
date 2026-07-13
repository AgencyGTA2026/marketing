# Bayline Digital Site Redesign Handoff

This package contains the working homepage and Whitby location-page implementation, plus the specifications required to redesign the remaining Bayline Digital pages without changing the established visual direction.

## What is already built

The `current-build` folder contains tested Next.js App Router source for:

- `/` — redesigned homepage
- `/locations/whitby` — redesigned location page
- Whitby hero inquiry form and prototype success state
- Shared global styles and responsive rules
- Page metadata

The current form intentionally does not transmit customer data. Connect it to the production inquiry endpoint before launch.

## What the package specifies

- Shared design system and reusable components
- Blog index and article templates
- Services index and individual service templates
- Contact page and production inquiry form
- Dynamic location-page architecture
- Content schemas for services and locations
- Form routing, attribution and automation requirements
- SEO migration and URL-preservation requirements
- Accessibility, responsive and release QA
- A ready-to-use coding-agent implementation prompt

## Recommended reading order

1. `docs/01-IMPLEMENTATION-ORDER.md`
2. `docs/02-DESIGN-SYSTEM.md`
3. `docs/03-PAGE-BLUEPRINTS.md`
4. `docs/04-CONTENT-MODELS.md`
5. `docs/05-FORMS-AND-AUTOMATION.md`
6. `docs/06-SEO-MIGRATION.md`
7. `docs/07-QA-CHECKLIST.md`
8. `CODING-AGENT-PROMPT.md`

## Important integration rule

Do not replace the production project with `current-build`. Copy the visual implementation into the existing repository while preserving its CMS, blog content, analytics, form handler, integrations, environment variables and current URLs.

The source assumes Next.js App Router. If the production project uses `src/app`, move the route files under `src/app`.

## Intended final structure

```text
app/
├── page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── contact/page.tsx
├── services/
│   ├── page.tsx
│   └── [slug]/page.tsx
└── locations/
    └── [city]/page.tsx

components/
├── site/Header.tsx
├── site/Footer.tsx
├── forms/InquiryForm.tsx
├── services/ServicePage.tsx
├── locations/LocationPage.tsx
└── blog/ArticleList.tsx

data/
├── services.ts
└── locations.ts
```

## Definition of complete

The redesign is complete only when all existing public routes still work, forms send successfully, metadata and structured data are correct, the CMS remains editable, analytics are recording, and mobile layouts have been manually checked.
