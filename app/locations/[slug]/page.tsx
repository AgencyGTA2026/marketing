import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { LOCATIONS_DATA, SERVICE_SECTIONS } from "@/lib/data/locations";
import { businessConfig } from "@/lib/data/business";
import { Nav } from "@/components/nav";
import { LandingHero } from "@/components/landing-hero";
import { WhyBayline } from "@/components/why-bayline";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { SectionHeader } from "@/components/section-header";
import { MobileStickyCTA } from "@/components/mobile-sticky-cta";
import { LocationPageView } from "@/components/location-page-view";
import { ServiceCta } from "@/components/service-cta";
import { CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const FALLBACK_SITE_URL = "https://www.baylinedigital.com";
const SITE_URL = (process.env.SITE_URL ?? FALLBACK_SITE_URL).replace(/\/$/, "");

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
  const fill = (s: string) => s.replace(/\{City\}/g, cityName);

  // Sibling cities for internal cross-linking between location pages.
  const otherCities = Object.values(LOCATIONS_DATA).filter((l) => l.citySlug !== slug);

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

  const heroEyebrow = location.isRegion
    ? `Now booking across ${cityName} · 2026`
    : `Now booking in ${cityName}, ${location.province} · 2026`;
  const heroLocalLine = location.isRegion
    ? `Now booking across ${location.neighbors}.`
    : `Now booking in ${cityName}, ${location.neighbors} & nearby.`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocationPageView city={cityName} />
      <Nav />
      <main className="pb-16 md:pb-0">
        <LandingHero
          eyebrow={heroEyebrow}
          placeName={cityName}
          localLine={heroLocalLine}
          recentActivity={location.recentActivity}
          city={cityName}
          pageType="location"
        />

        {/* City-specific trust block */}
        <section className="py-24 border-t border-line bg-bg-sunken">
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-12 px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <Reveal className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">
                Serving {cityName}, {location.province}
              </Reveal>
              <Reveal as="h2" className="m-0 text-[clamp(32px,4vw,52px)] leading-none tracking-[-0.03em] font-medium">
                Built for {cityName} businesses.
              </Reveal>
            </div>
            <div>
              <Reveal as="p" className="m-0 text-[17px] leading-[1.7] text-muted">
                {location.trustBlockCopy}
              </Reveal>
              <Reveal as="p" className="m-0 mt-5 text-[16px] leading-[1.7] text-muted">
                {location.introCopy}
              </Reveal>
              <Reveal as="p" className="m-0 mt-5 text-[15px] leading-[1.65] text-ink-2">
                {location.localAngleCopy}
              </Reveal>
            </div>
          </div>
        </section>

        {/* Service modules — each is an anchor target for a Google Ads ad group */}
        <section className="py-24 border-t border-line bg-bg">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <SectionHeader
              eyebrow="What we build"
              title={`Everything ${cityName} businesses need online.`}
              sub="Send each campaign to the section that matches the search. One clear page, six focused services."
            />

            <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
              {SERVICE_SECTIONS.map((svc) => (
                <Reveal
                  key={svc.anchorId}
                  id={svc.anchorId}
                  className="scroll-mt-28 flex flex-col rounded-[20px] border border-line bg-bg-card p-7 shadow-sm"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">{svc.eyebrow}</div>
                  <h3 className="m-0 mt-4 mb-3 text-[24px] font-medium tracking-[-0.015em] text-ink">
                    {fill(svc.headingTemplate)}
                  </h3>
                  <p className="m-0 text-[15px] leading-[1.6] text-muted">{svc.copy}</p>
                  <ul className="mt-5 list-none border-t border-line pt-4 pl-0">
                    {svc.proofPoints.map((point) => (
                      <li key={point} className="flex gap-2.5 py-1.5 text-[13.5px] leading-snug text-ink-2">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <ServiceCta service={svc.serviceName} label={svc.ctaLabel} city={cityName} />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <WhyBayline />

        {/* FAQ */}
        <section className="py-24 border-t border-line bg-bg-sunken">
          <div className="mx-auto w-full max-w-[960px] px-8">
            <Reveal className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">FAQ</Reveal>
            <Reveal as="h2" className="m-0 text-[clamp(32px,4vw,52px)] leading-none tracking-[-0.03em] font-medium">
              Common questions from {cityName} businesses.
            </Reveal>

            <div className="mt-12 divide-y divide-line rounded-[20px] border border-line bg-bg-card">
              {location.faqs.map((faq) => (
                <Reveal key={faq.question} className="p-6">
                  <h3 className="m-0 text-[18px] font-medium tracking-[-0.01em]">{faq.question}</h3>
                  <p className="m-0 mt-3 text-[14.5px] leading-[1.65] text-muted">{faq.answer}</p>
                </Reveal>
              ))}
            </div>

            {/* Internal links: services + sibling cities */}
            <Reveal className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[13.5px] text-muted">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-2">Also serving</span>
              {otherCities.map((c, i) => (
                <span key={c.citySlug}>
                  <Link href={`/locations/${c.citySlug}`} className="text-ink-2 underline hover:text-blue">
                    {c.cityName}
                  </Link>
                  {i < otherCities.length - 1 && <span className="text-muted-2"> · </span>}
                </span>
              ))}
            </Reveal>
            <Reveal className="mt-3 text-[13.5px] text-muted">
              <Link href="/services" className="text-ink-2 underline hover:text-blue">
                Explore all services
              </Link>
            </Reveal>
          </div>
        </section>

        <Contact city={cityName} pageType="location" />
      </main>
      <Footer />
      <MobileStickyCTA city={cityName} />
    </>
  );
}
