import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES_DATA } from "@/lib/data/services";
import { ServicePage } from "@/components/service-page";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return Object.keys(SERVICES_DATA).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const { slug } = await params; const service = SERVICES_DATA[slug]; if (!service) return { title: "Service Not Found | Bayline Digital" }; return buildPageMetadata({ title: service.metaTitle, description: service.metaDescription, path: `/services/${slug}` }); }
export default async function ServiceDetail({ params }: Props) { const { slug } = await params; const service = SERVICES_DATA[slug]; if (!service) notFound(); return <ServicePage service={service} />; }
