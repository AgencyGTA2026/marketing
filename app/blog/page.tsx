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
        <section className="relative border-b border-line bg-bg pt-24 pb-16">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            <div className="max-w-[780px]">
              <div className="mb-6 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue" />
                Field Notes
              </div>
              <h1 className="m-0 text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-[-0.03em] font-medium text-ink">
                Practical writing on <br />
                <span className="font-serif italic text-blue text-[1.02em]">web systems and growth</span>.
              </h1>
              <p className="mt-8 max-w-[680px] text-[18px] leading-[1.6] text-muted">
                Notes on better websites, cleaner content operations, automation, and the engineering
                choices that help small teams move faster.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto w-full max-w-[1280px] px-8">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="rounded-[22px] border border-line bg-bg-card p-10 text-center shadow-sm">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-pale text-blue">
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
    <article className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-[22px] border border-line bg-bg-card shadow-sm transition-all duration-300 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-[3px] hover:shadow-md">
      <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-10" aria-label={`Read ${post.title}`} />
      {heroImage ? (
        <div className="aspect-[16/9] overflow-hidden border-b border-line bg-bg-sunken">
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/9] items-end border-b border-line bg-[linear-gradient(135deg,var(--color-bg-sunken),var(--color-blue-pale))] p-6">
          <span className="font-serif text-[48px] italic leading-none text-blue/35">Journal</span>
        </div>
      )}

      <div className="flex grow flex-col p-7">
        <BlogMeta post={post} />
        <h2 className="mt-5 mb-3 text-[24px] font-medium leading-[1.12] tracking-[-0.02em] text-ink">
          {post.title}
        </h2>
        {post.excerpt && <p className="m-0 text-[14.5px] leading-[1.65] text-muted">{post.excerpt}</p>}

        <div className="mt-auto flex items-center justify-between gap-4 pt-8">
          <CategoryList categories={post.categories} />
          <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-blue">
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
          className="rounded-full border border-blue-pale bg-blue-pale/45 px-2.5 py-1 font-mono text-[10px] font-medium text-blue"
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
