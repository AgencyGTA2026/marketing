import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { LOCATIONS_DATA, SERVICE_SECTIONS } from "@/lib/data/locations";
import { businessConfig } from "@/lib/data/business";
import { LocationPage } from "@/components/location-page";

type Props = { params: Promise<{ slug: string }> };
const SITE_URL = (process.env.SITE_URL ?? "https://www.baylinedigital.com").replace(/\/$/, "");
export function generateStaticParams() { return Object.keys(LOCATIONS_DATA).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const location = LOCATIONS_DATA[slug]; if (!location) return { title: "Local Web Design | Bayline Digital" }; const canonical = `${SITE_URL}/locations/${slug}`; return { title: location.metaTitle, description: location.metaDescription, alternates: { canonical }, openGraph: { title: location.metaTitle, description: location.metaDescription, url: canonical, type: "website" } }; }
export default async function LocationRoute({ params }: Props) { const { slug } = await params; const location = LOCATIONS_DATA[slug]; if (!location) notFound(); const jsonLd = { "@context": "https://schema.org", "@graph": [{ "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL }, { "@type": "ListItem", position: 2, name: `${location.cityName} Web Design and Automation`, item: `${SITE_URL}/locations/${slug}` }] }, { "@type": "Service", name: `Web Design, SEO and Automation in ${location.cityName}`, provider: { "@type": "Organization", name: businessConfig.name, url: SITE_URL }, areaServed: { "@type": location.isRegion ? "AdministrativeArea" : "City", name: location.cityName }, serviceType: SERVICE_SECTIONS.map((item) => item.serviceName) }, { "@type": "FAQPage", mainEntity: location.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }] }; return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><LocationPage location={location} /></>; }
