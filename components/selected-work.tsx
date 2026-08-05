import Image from "next/image";

const PROJECTS = [
  {
    name: "Coachly",
    category: "SaaS product · Coaching software",
    description:
      "A focused coaching workspace that brings session preparation, private notes, reviewed recaps, actions, check-ins, messaging, and client progress into one place.",
    href: "https://www.coachlycrm.com/",
    image: "/projects/coachly-landing.webp",
    alt: "Coachly landing page showing its coaching workspace and session workflow",
  },
  {
    name: "Ottawa Burger Spot",
    category: "Editorial platform · Local discovery",
    description:
      "An independent Ottawa burger-review platform built around repeatable scoring, neighbourhood browsing, ranked spots, and detailed field reports.",
    href: "https://www.ottawaburgerspot.com/",
    image: "/projects/ottawa-burger-landing.webp",
    alt: "Ottawa Burger Spot landing page with its bold field-notes design and scoring method",
  },
  {
    name: "AutoBlogWriter",
    category: "SaaS product · SEO automation",
    description:
      "An automated content pipeline for React and SSR sites that creates posts, imagery, social copy, internal links, and publishing-ready SEO assets from one workflow.",
    href: "https://autoblogwriter.app/",
    image: "/projects/autoblogwriter-landing.webp",
    alt: "AutoBlogWriter landing page showing its automated SEO publishing dashboard",
  },
] as const;

export function SelectedWork() {
  return (
    <section className="selected-work" id="work" aria-labelledby="selected-work-title">
      <div className="wrap">
        <header className="selected-work-heading">
          <p className="eyebrow">SELECTED WORK</p>
          <div>
            <h2 id="selected-work-title">A few things we&apos;ve brought to life.</h2>
            <p>
              Real websites and web applications, built to make a clear idea feel useful,
              credible, and easy to act on.
            </p>
          </div>
        </header>

        <div className="project-list">
          {PROJECTS.map((project, index) => (
            <article className="project-row" key={project.name}>
              <a
                className="project-screen"
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit the live ${project.name} website`}
              >
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 980px) calc(100vw - 64px), 58vw"
                />
              </a>

              <div className="project-copy">
                <div className="project-meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{project.category}</p>
                </div>
                <h3>
                  <a href={project.href} target="_blank" rel="noopener noreferrer">
                    {project.name}
                  </a>
                </h3>
                <p>{project.description}</p>
                <a
                  className="project-live-link"
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit live site <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="project-note">
          <span>BEYOND THESE THREE</span>
          <p>
            Bayline has also built landing pages, internal tools, client portals, and custom
            workflow systems for other organizations.
          </p>
        </div>
      </div>
    </section>
  );
}
