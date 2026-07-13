# Coding Agent Prompt

Use the following prompt with the coding agent that has access to the production Bayline Digital repository.

---

You are redesigning the existing Bayline Digital website in its current repository.

Read every file in this handoff package before editing production source. Treat `current-build/app/page.tsx`, `current-build/app/locations/whitby/page.tsx`, and `current-build/app/globals.css` as the approved visual reference.

Your goal is to apply this design system to the remaining production pages while preserving all working CMS, blog, analytics, form, SEO and integration behavior.

## Required outcomes

1. Port the approved homepage into the production project.
2. Build shared Header, Footer, button, heading, FAQ and inquiry-form components.
3. Redesign `/blog` as an editorial featured article plus chronological row-based list.
4. Redesign the existing blog article template without changing article URLs or CMS content.
5. Redesign `/services` using six spacious service rows.
6. Build one reusable service-detail template and preserve all existing service routes.
7. Redesign `/contact` around one complete production inquiry form and a simple “what happens next” section.
8. Convert the approved Whitby implementation into a reusable location-page component.
9. Store unique location content in typed data and preserve every current location route.
10. Connect every form placement to the existing production form handler. Show success only after confirmed delivery.
11. Preserve analytics, UTM attribution, sitemap generation, structured data, canonicals and redirects.
12. Complete every item in `docs/07-QA-CHECKLIST.md`.

## Visual constraints

- Use the approved warm off-white, ink and Bayline-blue system.
- Keep the editorial typography and generous spacing.
- Prefer full-width rows to repeated card grids.
- Do not add background grids, glass effects, gradient blobs, fake dashboards, floating badges, decorative corner brackets or invented metrics.
- Do not add stock photos of people.
- Keep copy concise and understandable to a small-business owner.
- Avoid em dashes in new marketing copy.

## Engineering constraints

- Work within the existing framework and package manager.
- Do not replace the CMS or database.
- Do not rename current public URLs unless unavoidable.
- Do not remove existing tracking or integrations without an equivalent replacement.
- Reuse production environment variables and secrets. Never place them in client code.
- Centralize company facts and navigation.
- Use typed service and location content.
- Keep page-specific metadata unique.
- Keep forms accessible and resilient to errors.

## Process

1. Audit the current routes and integrations.
2. Present a concise implementation map of existing files to new shared components.
3. Implement in the order defined in `docs/01-IMPLEMENTATION-ORDER.md`.
4. Run the existing lint, typecheck, tests and production build after each page family.
5. Visually inspect mobile and desktop layouts.
6. Report preserved routes, changed files, form-delivery verification, SEO checks and any remaining blockers.

Do not invent business claims, testimonials, project results, addresses, reviews or integrations. Clearly flag any production content or credential that is missing instead of fabricating it.

---
