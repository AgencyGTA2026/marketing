import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LOCATIONS_DATA, SERVICE_SECTIONS } from "@/lib/data/locations";
import { businessConfig } from "@/lib/data/business";
import { LocationPage } from "@/components/location-page";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return Object.keys(LOCATIONS_DATA).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const location = LOCATIONS_DATA[slug]; if (!location) return { title: "Local Web Design | Bayline Digital" }; return buildPageMetadata({ title: location.metaTitle, description: location.metaDescription, path: `/locations/${slug}` }); }
export default async function LocationRoute({ params }: Props) { const { slug } = await params; const location = LOCATIONS_DATA[slug]; if (!location) notFound(); const jsonLd = { "@context": "https://schema.org", "@graph": [{ "@type": "Service", name: `Web Design, SEO and Automation in ${location.cityName}`, provider: { "@type": "Organization", name: businessConfig.name, url: SITE_URL }, areaServed: { "@type": location.isRegion ? "AdministrativeArea" : "City", name: location.cityName }, serviceType: SERVICE_SECTIONS.map((item) => item.serviceName) }, { "@type": "FAQPage", mainEntity: location.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }] }; return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><LocationPage location={location} /></>; }
