/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import type { BlogPost } from "@autoblogwriter/sdk";
import { fetchBlogPosts } from "@autoblogwriter/sdk/next";
import { Branding } from "@autoblogwriter/sdk/react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ClosingCTA } from "@/components/editorial";

export const metadata: Metadata = { title: "Practical Website & Automation Notes | Bayline Digital", description: "Practical notes on websites, local SEO, automation, landing pages, and digital operations from Bayline Digital.", alternates: { canonical: "/blog" } };

const TOPICS = [
  { label: "All", value: "all", categories: [] },
  { label: "Web Design", value: "web-design", categories: ["Web Design", "Web Design Toronto", "Landing Pages", "Conversion Optimization"] },
  { label: "Local SEO", value: "local-seo", categories: ["Local SEO"] },
  { label: "Automation", value: "automation", categories: ["Business Automation"] },
  { label: "Lead Generation", value: "lead-generation", categories: ["Lead Generation"] },
] as const;

type Props = { searchParams: Promise<{ topic?: string; page?: string }> };

async function getAllPosts() {
  const posts: BlogPost[] = [];
  let cursor: string | undefined;
  for (let page = 0; page < 10; page += 1) {
    const result = await fetchBlogPosts({ limit: 100, cursor });
    posts.push(...result.posts);
    cursor = result.nextCursor;
    if (!cursor) return { posts, branding: result.branding };
  }
  return { posts };
}

export default async function BlogPage({ searchParams }: Props) {
  const query = await searchParams;
  const selected = TOPICS.find((topic) => topic.value === query.topic) ?? TOPICS[0];
  const currentPage = Math.max(1, Number(query.page) || 1);
  const { posts, branding } = await getAllPosts();
  const sorted = [...posts].sort((a, b) => new Date(b.publishedAt ?? b.updatedAt).getTime() - new Date(a.publishedAt ?? a.updatedAt).getTime());
  const filtered = selected.categories.length ? sorted.filter((post) => post.categories?.some((category) => (selected.categories as readonly string[]).includes(category))) : sorted;
  const featured = filtered[0];
  const pageSize = 8;
  const rows = filtered.slice(1 + (currentPage - 1) * pageSize, 1 + currentPage * pageSize);
  const totalPages = Math.max(1, Math.ceil(Math.max(0, filtered.length - 1) / pageSize));
  const requiredBranding = branding?.brandingRequired ? branding : posts.find((post) => post.branding?.brandingRequired)?.branding;

  return <><Nav /><main>
    <section className="page-hero blog-hero wrap"><p className="eyebrow">FIELD NOTES</p><h1>Practical notes on websites, automation and growth.</h1><p>Clear guidance for business owners making decisions about their website, search visibility, lead flow, and internal systems.</p></section>
    <nav className="topic-nav wrap" aria-label="Article topics">{TOPICS.map((topic) => <Link key={topic.value} href={topic.value === "all" ? "/blog" : `/blog?topic=${topic.value}`} aria-current={topic.value === selected.value ? "page" : undefined}>{topic.label}</Link>)}</nav>
    {featured ? <section className="featured-article wrap"><div>{getHeroImage(featured) ? <img src={getHeroImage(featured)} alt={featured.title} /> : <div className="article-image-placeholder">BAYLINE FIELD NOTES</div>}</div><article><BlogMeta post={featured} /><h2><Link href={`/blog/${featured.slug}`}>{featured.title}</Link></h2>{featured.excerpt && <p>{featured.excerpt}</p>}<Link className="text-link" href={`/blog/${featured.slug}`}>Read the featured article <span aria-hidden="true">↗</span></Link></article></section> : <section className="empty-state wrap"><h2>No published articles in this topic.</h2><p>Choose another topic or check back after the next article is published.</p></section>}
    {rows.length > 0 && <section className="article-list wrap"><p className="eyebrow">LATEST ARTICLES</p>{rows.map((post) => <article className="article-row" key={post.id}><BlogMeta post={post} /><div><h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>{post.excerpt && <p>{post.excerpt}</p>}</div><div><span>{post.categories?.[0] ?? "Field Notes"}</span><Link href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>↗</Link></div></article>)}{totalPages > 1 && <nav className="pagination" aria-label="Article pages">{Array.from({ length: totalPages }, (_, index) => { const page = index + 1; const href = `/blog?${new URLSearchParams({ ...(selected.value !== "all" ? { topic: selected.value } : {}), ...(page > 1 ? { page: String(page) } : {}) })}`; return <Link key={page} href={href} aria-current={page === currentPage ? "page" : undefined}>{page}</Link>; })}</nav>}</section>}
    {requiredBranding && <div className="wrap blog-branding"><Branding linkComponent={Link} /></div>}
    <ClosingCTA title="Need a second set of eyes?" copy="Share the current homepage. Bayline will identify the first useful improvement and explain why it matters." linkLabel="Request a homepage review" />
  </main><Footer /></>;
}

function BlogMeta({ post }: { post: BlogPost }) { return <div className="blog-meta"><span>{formatDate(post.publishedAt ?? post.updatedAt)}</span>{post.metadata?.readingTimeMinutes && <span>{post.metadata.readingTimeMinutes} min read</span>}</div>; }
function getHeroImage(post: BlogPost) { return post.images?.hero?.url ?? post.metadata?.heroImageUrl ?? post.metadata?.ogImageUrl; }
function formatDate(value?: string) { return value ? new Intl.DateTimeFormat("en-CA", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value)) : "Recently published"; }
