# Content Models

Keep content separate from layout so service and location pages can share templates without becoming duplicates.

## Location model

```ts
export type LocationPageData = {
  slug: string;
  city: string;
  province: string;
  region: string;
  nearbyAreas: string[];
  metadata: {
    title: string;
    description: string;
    canonical: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    summary: string;
  };
  serviceEmphasis: string[];
  localContext: {
    heading: string;
    paragraphs: string[];
  };
  principles: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};
```

Required uniqueness per city:

- Metadata
- Hero summary
- Nearby areas
- Local context
- At least two FAQ answers
- Service emphasis where the local market differs
- Internal links to nearby locations

## Service model

```ts
export type ServicePageData = {
  slug: string;
  name: string;
  shortName: string;
  metadata: {
    title: string;
    description: string;
    canonical: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    summary: string;
  };
  audience: string[];
  problems: string[];
  outcomes: string[];
  deliverables: Array<{
    title: string;
    description: string;
  }>;
  process: Array<{
    title: string;
    description: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  relatedServices: string[];
};
```

## Article summary model

Use the current CMS as the source of truth. The UI should be able to consume:

```ts
export type ArticleSummary = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime?: string;
  image?: {
    src: string;
    alt: string;
  };
};
```

## Company settings

Store shared facts once:

```ts
export const company = {
  name: "Bayline Digital Inc.",
  email: "contact@baylinedigital.com",
  phone: "+1 (613) 818-8550",
  city: "Toronto",
  province: "Ontario",
  hours: "Mon–Fri · 9am–5pm EST",
  bookingUrl: "https://calendly.com/contact-baylinedigital/30min",
};
```

Verify these values against production before publishing.
