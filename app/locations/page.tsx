import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ClosingCTA } from "@/components/editorial";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { LOCATIONS_DATA } from "@/lib/data/locations";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Ontario Web Design & Automation Locations | Bayline Digital",
  description:
    "Explore Bayline Digital web design, local SEO, landing page, and automation services across Toronto, Ottawa, Durham Region, and nearby Ontario communities.",
  path: "/locations",
});

export default function LocationsPage() {
  return (
    <>
      <Nav />
      <main>
        <Breadcrumbs items={[{ label: "Locations", href: "/locations" }]} />
        <section className="page-hero wrap">
          <p className="eyebrow">AREAS WE SERVE</p>
          <h1>Ontario businesses, supported from Toronto.</h1>
          <p>
            Bayline works remotely with growing teams across Ontario, with focused pages for
            the communities where local search and service-area context matter most.
          </p>
        </section>
        <section className="industry-index wrap">
          {Object.values(LOCATIONS_DATA).map((location, index) => (
            <article key={location.citySlug}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <p className="eyebrow">{location.province} · WEB DESIGN &amp; AUTOMATION</p>
                <h2>{location.cityName}</h2>
              </div>
              <div>
                <p>{location.localAngleCopy}</p>
                <Link className="text-link" href={`/locations/${location.citySlug}`}>
                  Explore services in {location.cityName} <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </section>
        <ClosingCTA
          title="Start with the current website."
          copy="Share your location, services, and the page that needs attention. Bayline will reply with a practical first step."
        />
      </main>
      <Footer />
    </>
  );
}
