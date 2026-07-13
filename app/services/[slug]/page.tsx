import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES_DATA } from "@/lib/data/services";
import { ServicePage } from "@/components/service-page";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return Object.keys(SERVICES_DATA).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const service = SERVICES_DATA[slug]; if (!service) return { title: "Service Not Found | Bayline Digital" }; return { title: service.metaTitle, description: service.metaDescription, alternates: { canonical: `/services/${slug}` }, openGraph: { title: service.metaTitle, description: service.metaDescription, url: `/services/${slug}`, type: "website" } }; }
export default async function ServiceDetail({ params }: Props) { const { slug } = await params; const service = SERVICES_DATA[slug]; if (!service) notFound(); return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://www.baylinedigital.com" }, { "@type": "ListItem", position: 2, name: "Services", item: "https://www.baylinedigital.com/services" }, { "@type": "ListItem", position: 3, name: service.title, item: `https://www.baylinedigital.com/services/${slug}` }] }) }} /><ServicePage service={service} /></>; }
