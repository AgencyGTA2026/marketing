/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import type { BlogPost, RelatedPostSummary } from "@autoblogwriter/sdk";
import { fetchBlogPost } from "@autoblogwriter/sdk/next";
import { Branding, Markdown } from "@autoblogwriter/sdk/react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClosingCTA } from "@/components/editorial";

type Props = { params: Promise<{ slug: string }> };
type ExtendedMetadata = NonNullable<BlogPost["metadata"]> & { ogTitle?: string; ogDescription?: string; twitterTitle?: string; twitterDescription?: string; authorName?: string };
const SITE_URL = "https://www.baylinedigital.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  const details = post.metadata as ExtendedMetadata | undefined;
  const title = post.seo?.title ?? details?.ogTitle ?? post.title;
  const description = post.seo?.description ?? details?.ogDescription ?? post.excerpt;
  const canonical = `${SITE_URL}/blog/${slug}`;
  const image = post.images?.hero?.url ?? details?.ogImageUrl ?? details?.heroImageUrl;
  return { title, description, alternates: { canonical }, openGraph: { title, description, url: canonical, type: "article", images: image ? [{ url: image, alt: post.title }] : undefined, publishedTime: post.publishedAt, modifiedTime: post.updatedAt }, twitter: { card: "summary_large_image", title, description, images: image ? [image] : undefined } };
}

export default async function BlogArticle({ params }: Props) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  const image = post.images?.hero?.url ?? post.metadata?.heroImageUrl ?? post.metadata?.ogImageUrl;
  const jsonLd = post.metadata?.jsonLd ? JSON.stringify(post.metadata.jsonLd).replaceAll("https://baylinedigital.com", SITE_URL) : null;
  return <><Nav /><main>{jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}
    <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title, href: `/blog/${slug}` }]} />
    <article><header className="article-header wrap"><div className="blog-meta"><span>{formatDate(post.publishedAt ?? post.updatedAt)}</span>{post.metadata?.readingTimeMinutes && <span>{post.metadata.readingTimeMinutes} min read</span>}{post.categories?.[0] && <span>{post.categories[0]}</span>}</div><h1>{post.title}</h1>{post.excerpt && <p>{post.excerpt}</p>}</header>
    {image && <div className="article-hero-image wrap"><img src={image} alt={post.title} /></div>}
    <section className="article-body wrap"><div><Markdown source={post.content} className="bayline-blog-markdown" /><ArticleFaq post={post} />{post.branding?.brandingRequired && <Branding linkComponent={Link} className="article-branding" />}</div><aside><div><span>Published</span><p>{formatDate(post.publishedAt ?? post.updatedAt)}</p></div>{post.metadata?.readingTimeMinutes && <div><span>Reading time</span><p>{post.metadata.readingTimeMinutes} minutes</p></div>}<div><span>Published by</span><p>Bayline Digital</p></div></aside></section></article>
    <RelatedPosts posts={post.relatedPosts} />
    <ClosingCTA title="Put the idea to work." copy="If this article surfaced a problem in the current site or workflow, share the context. Bayline will help identify the next useful step." />
  </main><Footer /></>;
}

function ArticleFaq({ post }: { post: BlogPost }) { if (!post.faq?.items.length) return null; return <section className="article-faq"><p className="eyebrow">COMMON QUESTIONS</p><h2>Questions from this article.</h2><div className="faq-list">{post.faq.items.map((item) => <details key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><Markdown source={item.answer} className="bayline-blog-markdown" /></details>)}</div></section>; }
function RelatedPosts({ posts }: { posts?: RelatedPostSummary[] }) { if (!posts?.length) return null; return <section className="related-posts"><div className="wrap"><p className="eyebrow">CONTINUE READING</p>{posts.slice(0,3).map((post) => <Link key={post.id} href={`/blog/${post.slug}`}><span>{formatDate(post.publishedAt ?? post.updatedAt)}</span><h2>{post.title}</h2><span aria-hidden="true">↗</span></Link>)}</div></section>; }
function formatDate(value?: string | null) { return value ? new Intl.DateTimeFormat("en-CA", { month: "long", day: "numeric", year: "numeric" }).format(new Date(value)) : "Recently published"; }
