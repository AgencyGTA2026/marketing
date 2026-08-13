import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IdeaPreview } from "@/components/idea-preview";
import { getProspectIdea, PROSPECT_IDEAS } from "@/lib/data/ideas";

type IdeaPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return PROSPECT_IDEAS.map((idea) => ({ slug: idea.slug }));
}

export async function generateMetadata({ params }: IdeaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const idea = getProspectIdea(slug);

  if (!idea) return {};

  const title = `A website concept for ${idea.company} | Bayline Digital`;
  const description = `A private, unofficial website concept prepared for ${idea.company} by Bayline Digital.`;

  return {
    title,
    description,
    robots: { index: false, follow: false, nocache: true },
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary", title, description },
  };
}

export default async function IdeaPage({ params }: IdeaPageProps) {
  const { slug } = await params;
  const idea = getProspectIdea(slug);

  if (!idea) notFound();

  return <IdeaPreview idea={idea} />;
}
