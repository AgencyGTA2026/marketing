# QA Checklist

## Build and routing

- Production build succeeds.
- Every existing route resolves or has an intentional redirect.
- Dynamic blog, service and location routes render expected data.
- No client or server console errors are introduced.

## Visual QA

Check at minimum:

- 375px mobile
- 768px tablet
- 1280px desktop
- 1440px desktop

Verify:

- No horizontal overflow
- Headings do not collide or wrap awkwardly
- Forms remain usable on mobile
- Section spacing stays consistent
- Navigation and footer remain readable
- Long article titles and city names do not break layouts

## Form QA

- Required-field validation works.
- Email and URL validation are understandable.
- Keyboard focus is visible.
- Submit button disables while sending.
- Error state preserves data.
- Success appears only after confirmed delivery.
- Bayline receives the complete submission.
- Visitor confirmation is delivered when configured.
- CRM and task automation use the correct attribution.
- Spam protection is active.
- UTM and source-page fields are captured.

## Content QA

- No placeholder businesses remain.
- No prototype success language remains.
- No unsupported metrics or claims were added.
- Contact information is consistent.
- City and nearby-area claims are accurate.
- Service deliverables match what Bayline actually offers.
- Grammar, capitalization and punctuation are consistent.

## Accessibility QA

- One clear `h1` per page.
- Heading order is logical.
- All form controls have labels.
- Images have useful alt text or empty alt when decorative.
- Navigation and accordions work with keyboard controls.
- Contrast meets WCAG AA.
- Focus is never hidden.
- Reduced-motion preference is respected.

## SEO QA

- Titles, descriptions and canonicals are unique.
- Sitemap includes intended routes.
- Structured data validates and contains only accurate facts.
- Existing blog and service URLs are preserved.
- Internal links do not return errors.
- Redirects do not chain.

## Release QA

- Analytics page views and events fire once.
- Form-success conversions are recorded once.
- Production environment variables are present.
- CMS editing still works.
- A rollback point exists before the redesign is published.
