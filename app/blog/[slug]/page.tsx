/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { fetchBlogPost, generatePostMetadata } from "@autoblogwriter/sdk/next";
import { Branding, Markdown } from "@autoblogwriter/sdk/react";
import type { BlogPost, RelatedPostSummary } from "@autoblogwriter/sdk";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generatePostMetadata(slug);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchBlogPost(slug);
  const heroImage = getHeroImage(post);

  return (
    <>
      <Nav />
      <main className="bg-bg">
        <article>
          <header className="border-b-4 border-ink bg-bg pt-16 pb-12">
            <div className="mx-auto w-full max-w-[1040px] px-8">
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center gap-2 text-[14px] font-medium text-ink-2 transition-colors hover:text-blue"
              >
                <ArrowLeft size={15} />
                Blog
              </Link>

              <BlogMeta post={post} />
              <h1 className="mt-6 mb-0 max-w-[940px] font-display text-[clamp(2.25rem,5vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tighter text-ink">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-7 max-w-[760px] text-[18px] leading-[1.65] text-muted">{post.excerpt}</p>
              )}
              <CategoryList categories={post.categories} />
            </div>
          </header>

          {heroImage && (
            <div className="border-b-4 border-ink bg-bg-sunken">
              <div className="mx-auto w-full max-w-[1160px] px-8 py-10">
                <img
                  src={heroImage}
                  alt=""
                  className="aspect-[16/9] w-full border border-line object-cover"
                />
              </div>
            </div>
          )}

          <section className="py-16">
            <div className="mx-auto grid w-full max-w-[1160px] grid-cols-1 gap-12 px-8 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div>
                <Markdown source={post.content} className="bayline-blog-markdown" />
                <FaqSection post={post} />
                {post.branding?.brandingRequired && (
                  <Branding
                    linkComponent={Link}
                    className="mt-12 text-[12px] text-muted"
                  />
                )}
              </div>

              <aside className="lg:pt-2">
                <div className="sticky top-24 border-2 border-ink bg-bg-card p-6">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-2">Article</div>
                  <dl className="mt-5 space-y-4">
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-2">Published</dt>
                      <dd className="m-0 mt-1 text-[14px] text-ink">{formatDate(post.publishedAt ?? post.updatedAt)}</dd>
                    </div>
                    {post.metadata?.readingTimeMinutes && (
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-2">Reading time</dt>
                        <dd className="m-0 mt-1 text-[14px] text-ink">{post.metadata.readingTimeMinutes} minutes</dd>
                      </div>
                    )}
                    {post.metadata?.wordCount && (
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-2">Length</dt>
                        <dd className="m-0 mt-1 text-[14px] text-ink">{post.metadata.wordCount.toLocaleString()} words</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </aside>
            </div>
          </section>
        </article>

        <RelatedPosts posts={post.relatedPosts} />
      </main>
      <Footer />
    </>
  );
}

function BlogMeta({ post }: { post: BlogPost }) {
  const date = formatDate(post.publishedAt ?? post.updatedAt);
  const readingTime = post.metadata?.readingTimeMinutes;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-2">
      <span>{date}</span>
      {readingTime && (
        <>
          <span aria-hidden>·</span>
          <span>{readingTime} min read</span>
        </>
      )}
    </div>
  );
}

function CategoryList({ categories }: { categories?: string[] }) {
  if (!categories?.length) return null;

  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {categories.map((category) => (
        <span
          key={category}
          className="border-2 border-ink bg-blue px-3 py-1.5 font-mono text-[10.5px] font-bold uppercase text-white"
        >
          {category}
        </span>
      ))}
    </div>
  );
}

function FaqSection({ post }: { post: BlogPost }) {
  if (!post.faq?.items.length) return null;

  return (
    <section className="mt-16 border-t-2 border-ink pt-12">
      <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-2">FAQ</div>
      <h2 className="mt-3 mb-8 text-[30px] font-medium tracking-[-0.02em] text-ink">Common questions</h2>
      <div className="space-y-4">
        {post.faq.items.map((item) => (
          <details key={item.question} className="group border-2 border-ink bg-bg-card p-5">
            <summary className="cursor-pointer list-none text-[17px] font-medium text-ink marker:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="text-blue transition-transform duration-200 group-open:rotate-45">+</span>
              </span>
            </summary>
            <Markdown source={item.answer} className="bayline-blog-markdown bayline-blog-markdown-compact mt-4" />
          </details>
        ))}
      </div>
    </section>
  );
}

function RelatedPosts({ posts }: { posts?: RelatedPostSummary[] }) {
  if (!posts?.length) return null;

  return (
    <section className="border-t-4 border-ink bg-bg-sunken py-20">
      <div className="mx-auto w-full max-w-[1160px] px-8">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-2">Continue reading</div>
            <h2 className="mt-3 mb-0 text-[32px] font-medium tracking-[-0.025em] text-ink">Related posts</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group border-2 border-ink bg-bg-card p-6 transition-all duration-300 hover:-translate-y-[2px]"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-2">
                {formatDate(post.publishedAt ?? post.updatedAt)}
              </div>
              <h3 className="mt-4 mb-3 text-[19px] font-medium leading-tight tracking-[-0.015em] text-ink">
                {post.title}
              </h3>
              {post.excerpt && <p className="m-0 text-[13.5px] leading-[1.55] text-muted">{post.excerpt}</p>}
              <span className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-blue">
                Read next
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function getHeroImage(post: BlogPost) {
  return post.images?.hero?.url ?? post.metadata?.heroImageUrl ?? post.metadata?.ogImageUrl;
}

function formatDate(value?: string | null) {
  if (!value) return "Recently published";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
