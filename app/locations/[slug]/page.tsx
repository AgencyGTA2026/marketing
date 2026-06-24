import { notFound } from "next/navigation";
import { Metadata } from "next";
import type { ReactNode } from "react";
import { LOCATIONS_DATA, SERVICE_SECTIONS } from "@/lib/data/locations";
import { businessConfig } from "@/lib/data/business";
import { Hero } from "@/components/hero";
import { Contact } from "@/components/contact";
import { Logo } from "@/components/logo";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { LocationPageView } from "@/components/location-page-view";
import { CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const FALLBACK_SITE_URL = "https://www.baylinedigital.com";
const SITE_URL = (process.env.SITE_URL ?? FALLBACK_SITE_URL).replace(/\/$/, "");

const FIXED_PROBLEMS: Record<string, { title: string; copy: string }> = {
  "custom-websites": {
    title: "A website that feels generic or hard to trust",
    copy: "We look for unclear positioning, weak service pages, thin proof, and layout choices that make visitors hesitate.",
  },
  "website-redesigns": {
    title: "An outdated design that makes the business look behind",
    copy: "We flag the visual and content gaps that can make a good company feel less credible than its competitors.",
  },
  "local-seo": {
    title: "Local search pages that do not match how buyers look",
    copy: "We review whether your city, service, metadata, and page structure help local visitors quickly understand what you offer.",
  },
  "automation-systems": {
    title: "Leads that sit too long before anyone responds",
    copy: "We check whether forms, alerts, routing, and follow-up give your team enough context to answer fast.",
  },
  "custom-apps": {
    title: "Manual handoffs that slow down the next step",
    copy: "We spot the messy spreadsheets, duplicate entry, and disconnected tools that can drag a lead after they reach out.",
  },
  "hosting-support": {
    title: "Slow load times, broken details, and avoidable friction",
    copy: "We look at performance, mobile fit, technical basics, and the small trust signals that affect first impressions.",
  },
};

const WHY_BAYLINE_POINTS = [
  {
    title: "Work directly with the builder",
    copy: "No account manager relay. You talk to the person designing, coding, and fixing the site.",
  },
  {
    title: "You own 100% of the code",
    copy: "No rented website platform, no vendor lock-in, no surprise rebuild if you ever move on.",
  },
  {
    title: "Built on a fast modern stack",
    copy: "Next.js, clean code, sub-second load targets, and 95+ Lighthouse scores as the baseline.",
  },
  {
    title: "Founding-client pricing",
    copy: "We are taking on our first {City} clients, so you get senior attention and a lower launch rate. You are not client #400.",
  },
];

export function generateStaticParams() {
  return Object.keys(LOCATIONS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = LOCATIONS_DATA[slug];
  if (!location) {
    return { title: "Local Web Design | Bayline Digital" };
  }

  const canonical = `${SITE_URL}/locations/${slug}`;
  return {
    title: location.metaTitle,
    description: location.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: location.metaTitle,
      description: location.metaDescription,
      url: canonical,
      type: "website",
    },
  };
}

export default async function LocationLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const location = LOCATIONS_DATA[slug];

  if (!location) {
    notFound();
  }

  const { cityName } = location;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: `${cityName} Web Design & Automation`,
            item: `${SITE_URL}/locations/${slug}`,
          },
        ],
      },
      {
        "@type": "Service",
        name: `Web Design, SEO & Automation in ${cityName}`,
        provider: { "@type": "Organization", name: businessConfig.name, url: SITE_URL },
        areaServed: { "@type": "City", name: cityName },
        serviceType: SERVICE_SECTIONS.map((s) => s.serviceName),
      },
      {
        "@type": "FAQPage",
        mainEntity: location.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  const heroHeadline: ReactNode[] = [
    `${cityName} businesses`,
    "lose leads to slow,",
    "dated,",
    <>
      <span className="bg-blue px-3 text-white">untrustworthy</span> websites
    </>,
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocationPageView city={cityName} />
      <header className="border-b-4 border-ink bg-bg px-5 py-3 sm:px-8">
        <Logo />
      </header>
      <main>
        <Hero
          badge={location.heroBadge}
          headline={heroHeadline}
          subheadline={location.heroSub}
          ctaLabel="Get a free website review"
          secondaryAudienceLabel="No website yet? Get a free preview of what yours could look like →"
          secondaryAudienceHref="#no-website-preview"
          showSecondaryCta={false}
          showTicker={false}
          showBadge={false}
          showScrollCue={false}
          appendShippingLine={false}
        />

        {/* Honest trust block for a new studio */}
        <section className="border-t-4 border-ink py-24 bg-bg-sunken">
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-12 px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <Reveal className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">
                Why Bayline
              </Reveal>
              <Reveal as="h2" className="m-0 text-[clamp(32px,4vw,52px)] leading-none tracking-[-0.03em] font-medium">
                New studio. Senior attention.
              </Reveal>
              <Reveal as="p" className="m-0 mt-5 text-[16px] leading-[1.65] text-muted">
                We are not going to pretend we have hundreds of reviews. Bayline is built for {cityName} businesses that want a sharper website without agency layers or platform lock-in.
              </Reveal>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {WHY_BAYLINE_POINTS.map((point) => (
                <Reveal key={point.title} className="border-2 border-ink bg-bg-card p-6">
                  <h3 className="m-0 text-[20px] font-medium tracking-[-0.015em] text-ink">{point.title}</h3>
                  <p className="m-0 mt-3 text-[15px] leading-[1.6] text-muted">
                    {point.copy.replace("{City}", cityName)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Free review offer */}
        <section className="border-t-4 border-ink bg-bg py-24">
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-12 px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <Reveal className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">
                Free website review
              </Reveal>
              <Reveal as="h2" className="m-0 text-[clamp(34px,5vw,64px)] font-display font-black uppercase leading-[0.92] tracking-tighter">
                A clear look at why your site is losing trust.
              </Reveal>
              <Reveal as="p" className="m-0 mt-6 max-w-[560px] text-[17px] leading-[1.65] text-muted">
                Send your website URL and we&apos;ll record a short personalized video for your {cityName} business within 48 hours.
              </Reveal>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  label: "What you send",
                  copy: "Just your website URL. No long intake form, no deck, no calendar link.",
                },
                {
                  label: "What you get back",
                  copy: "A short personalized video showing the top 3 things costing you leads or eroding trust, plus the fixes.",
                },
                {
                  label: "Turnaround",
                  copy: "We send it within 48 hours, so you can see the biggest issues while the site is still fresh in your mind.",
                },
                {
                  label: "No sales trap",
                  copy: "No call required, no obligation. If the review is useful, you can decide what to do next.",
                },
              ].map((item) => (
                <Reveal key={item.label} className="border-2 border-ink bg-bg-card p-6">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-blue">
                    {item.label}
                  </div>
                  <p className="m-0 mt-3 text-[16px] leading-[1.6] text-ink-2">{item.copy}</p>
                </Reveal>
              ))}

              <Reveal className="mt-4">
                <a
                  href="#contact"
                  className="inline-flex border-2 border-ink bg-ink px-8 py-4 text-lg font-black uppercase tracking-tight text-bg shadow-[6px_6px_0_0_var(--color-blue)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_var(--color-blue)]"
                >
                  Get a free website review
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* No-website preview offer */}
        <section id="no-website-preview" className="scroll-mt-8 border-t-4 border-ink bg-blue py-24 text-white">
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <Reveal className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-white/75">
                No website yet?
              </Reveal>
              <Reveal as="h2" className="m-0 font-display text-[clamp(34px,5vw,68px)] font-black uppercase leading-[0.9] tracking-tighter">
                Get a free 1-page preview before you build.
              </Reveal>
              <Reveal as="p" className="m-0 mt-6 max-w-[620px] text-[17px] leading-[1.65] text-white/85">
                If your {cityName} business has no website, customers can&apos;t find you on Google, can&apos;t check if you&apos;re credible, and competitors with real sites win by default.
              </Reveal>
            </div>

            <Reveal className="border-2 border-ink bg-bg p-7 text-ink shadow-[8px_8px_0_0_var(--color-ink)]">
              <div className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-blue">
                Free preview offer
              </div>
              <h3 className="m-0 mt-4 text-[28px] font-medium tracking-[-0.02em]">
                Send your business name and what you do.
              </h3>
              <p className="m-0 mt-4 text-[16px] leading-[1.6] text-muted">
                We&apos;ll send back a free visual preview of what your first website could look like, built around your services and local customers. No call required, no obligation.
              </p>
              <a
                href="#preview-contact"
                className="mt-7 inline-flex border-2 border-ink bg-ink px-8 py-4 text-lg font-black uppercase tracking-tight text-bg shadow-[6px_6px_0_0_var(--color-blue)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_0_var(--color-blue)]"
              >
                Get a free preview
              </a>
            </Reveal>
          </div>
        </section>

        {/* Service anchors are preserved for Google Ads final URLs, but every path points to the same review CTA. */}
        <section className="border-t-4 border-ink py-24 bg-bg-sunken">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <SectionHeader
              eyebrow="What we fix"
              title="What we fix"
              sub={`The review looks at the problems that make ${cityName} visitors slow down, question the business, or leave before reaching out.`}
            />

            <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
              {SERVICE_SECTIONS.map((svc) => (
                <Reveal
                  key={svc.anchorId}
                  id={svc.anchorId}
                  className="scroll-mt-28 flex flex-col border-2 border-ink bg-bg-card p-7"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">{svc.eyebrow}</div>
                  <h3 className="m-0 mt-4 mb-3 text-[24px] font-medium tracking-[-0.015em] text-ink">
                    {FIXED_PROBLEMS[svc.anchorId]?.title ?? svc.serviceName}
                  </h3>
                  <p className="m-0 text-[15px] leading-[1.6] text-muted">
                    {FIXED_PROBLEMS[svc.anchorId]?.copy ?? svc.copy}
                  </p>
                  <ul className="mt-5 list-none border-t-2 border-ink pt-4 pl-0">
                    {svc.proofPoints.map((point) => (
                      <li key={point} className="flex gap-2.5 py-1.5 text-[13.5px] leading-snug text-ink-2">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t-4 border-ink py-24 bg-bg-sunken">
          <div className="mx-auto w-full max-w-[960px] px-8">
            <Reveal className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">FAQ</Reveal>
            <Reveal as="h2" className="m-0 text-[clamp(32px,4vw,52px)] leading-none tracking-[-0.03em] font-medium">
              Common questions from {cityName} businesses.
            </Reveal>

            <div className="mt-12 divide-y-2 divide-ink border-2 border-ink bg-bg-card">
              {location.faqs.map((faq) => (
                <Reveal key={faq.question} className="p-6">
                  <h3 className="m-0 text-[18px] font-medium tracking-[-0.01em]">{faq.question}</h3>
                  <p className="m-0 mt-3 text-[14.5px] leading-[1.65] text-muted">{faq.answer}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Contact city={cityName} pageType="location" reviewMode />
        <Contact city={cityName} pageType="location" previewMode sectionId="preview-contact" />
      </main>
    </>
  );
}
