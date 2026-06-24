import type { Metadata } from "next";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { fetchBlogPosts } from "@autoblogwriter/sdk/next";
import { Branding } from "@autoblogwriter/sdk/react";
import type { BlogPost } from "@autoblogwriter/sdk";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "Blog | Bayline Digital",
  description:
    "Practical notes from Bayline Digital on modern websites, automation, SEO systems, and custom digital operations.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const { posts, branding } = await fetchBlogPosts({ limit: 12 });
  const requiredBranding = getRequiredBranding(branding, posts);

  return (
    <>
      <Nav />
      <main className="bg-bg">
        <section className="relative border-b-4 border-ink bg-bg pt-20 pb-16">
          <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">
            <div className="max-w-[860px]">
              <div className="mb-6 inline-flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-blue">
                <span className="inline-block h-1.5 w-1.5 bg-blue" />
                Field Notes
              </div>
              <h1 className="m-0 font-display text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter text-ink">
                Web systems <span className="bg-blue px-2 text-white">& growth</span>
              </h1>
              <p className="mt-8 max-w-[680px] font-mono text-[15px] leading-relaxed text-muted">
                Notes on better websites, cleaner content operations, automation, and the engineering
                choices that help small teams move faster.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 border-2 border-ink md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="border-2 border-ink bg-bg-card p-10 text-center">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center border-2 border-ink text-blue">
                  <BookOpen size={20} />
                </div>
                <h2 className="m-0 text-[24px] font-medium tracking-tight text-ink">No posts published yet</h2>
                <p className="mx-auto mt-3 max-w-[520px] text-[15px] leading-[1.6] text-muted">
                  Published AutoBlogWriter posts will appear here after the workspace credentials are
                  configured and content is live.
                </p>
              </div>
            )}

            {requiredBranding && (
              <Branding
                linkComponent={Link}
                className="mt-10 text-center text-[12px] text-muted"
              />
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  const heroImage = getHeroImage(post);

  return (
    <article className="group relative -mt-px -ml-px flex min-h-[430px] flex-col overflow-hidden border-2 border-ink bg-bg-card transition-colors duration-200 hover:bg-bg-sunken">
      <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" aria-label={`Read ${post.title}`} />
      {heroImage ? (
        <div className="aspect-[16/9] overflow-hidden border-b-2 border-ink bg-bg-sunken">
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-end border-b-2 border-ink bg-blue p-6">
          <span className="font-display text-[48px] font-black uppercase leading-none tracking-tighter text-white/40">Journal</span>
        </div>
      )}

      <div className="flex grow flex-col p-7">
        <BlogMeta post={post} />
        <h2 className="mt-5 mb-3 font-display text-[22px] font-black uppercase leading-tight tracking-tight text-ink">
          {post.title}
        </h2>
        {post.excerpt && <p className="m-0 text-[14.5px] leading-[1.65] text-muted">{post.excerpt}</p>}

        <div className="mt-auto flex items-center justify-between gap-4 pt-8">
          <CategoryList categories={post.categories} />
          <span className="inline-flex items-center gap-1.5 text-[13px] font-black uppercase tracking-tight text-blue">
            Read
            <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
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
  if (!categories?.length) return <span />;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.slice(0, 2).map((category) => (
        <span
          key={category}
          className="border-2 border-ink bg-blue px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-white"
        >
          {category}
        </span>
      ))}
    </div>
  );
}

function getHeroImage(post: BlogPost) {
  return post.images?.hero?.url ?? post.metadata?.heroImageUrl ?? post.metadata?.ogImageUrl;
}

function getRequiredBranding(branding: BlogPost["branding"], posts: BlogPost[]) {
  if (branding?.brandingRequired) return branding;
  return posts.find((post) => post.branding?.brandingRequired)?.branding;
}

function formatDate(value?: string) {
  if (!value) return "Recently published";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
