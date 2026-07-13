import Link from "next/link";
import type { LocationData } from "@/lib/data/locations";
import { LOCATIONS_DATA, SERVICE_SECTIONS } from "@/lib/data/locations";
import { Nav } from "./nav";
import { Footer } from "./footer";
import { InquiryForm } from "./contact";
import { FAQList, SectionHeading } from "./editorial";
import { LocationPageView } from "./location-page-view";
import { ServiceCta } from "./service-cta";

export function LocationPage({ location }: { location: LocationData }) {
  const fill = (value: string) => value.replace(/\{City\}/g, location.cityName);
  const nearby = location.neighbors.split(/, | & /).filter(Boolean);
  const others = Object.values(LOCATIONS_DATA).filter((item) => item.citySlug !== location.citySlug);
  return <><LocationPageView city={location.cityName} /><Nav /><main className="location-page">
    <section className="location-hero wrap" id="contact"><div><p className="location-kicker"><span /> WEB DESIGN IN {location.cityName.toUpperCase()}, {location.province}</p><h1>Look established.<br />Get contacted.<br /><em>Follow up faster.</em></h1><p className="location-summary">{location.heroSub}</p><div className="location-trust"><span>Direct access to the people building the work</span><span>Clear ownership at project handoff</span><span>A remote-friendly process across Ontario</span></div></div><InquiryForm variant="compact" sourcePage={`/locations/${location.citySlug}`} city={location.cityName} /></section>
    <section className="local-proof"><div className="wrap"><span>{location.isRegion ? "SERVING THE REGION" : "SERVING THE LOCAL AREA"}</span><div><p>{location.cityName}</p>{nearby.map((area) => <p key={area}>{area}</p>)}</div></div></section>
    <section className="location-services wrap"><SectionHeading eyebrow="WHAT WE BUILD" title={`One clear system for getting found, trusted, and contacted in ${location.cityName}.`} /><div className="location-offers">{SERVICE_SECTIONS.map((offer, index) => <article id={offer.anchorId} key={offer.anchorId}><div className="offer-meta"><span>{String(index + 1).padStart(2, "0")}</span><p>{offer.eyebrow.replace(/^\d+ — /, "")}</p></div><div><h3>{fill(offer.headingTemplate)}</h3><p>{offer.copy}</p><ServiceCta service={offer.serviceName} label={offer.ctaLabel} city={location.cityName} /></div><ul>{offer.proofPoints.map((point) => <li key={point}>{point}</li>)}</ul></article>)}</div></section>
    <section className="local-context"><div className="wrap local-context-layout"><div><p className="eyebrow">BUILT FOR THE WAY LOCAL CUSTOMERS CHOOSE</p><h2>Built for {location.cityName} businesses.</h2></div><div><p>{location.trustBlockCopy}</p><p>{location.introCopy}</p><p>{location.localAngleCopy}</p></div></div><div className="wrap local-principles">{[["01","Specific","Useful city context replaces copied city-name text."],["02","Easy to scan","Services and next steps stay clear on phones and larger screens."],["03","Ready to act","The inquiry form stays close to the main promise and captures the local context."]].map(([n,t,c]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div></section>
    <section className="location-faq wrap"><div><p className="eyebrow">COMMON QUESTIONS</p><h2>Before we get started.</h2><div className="nearby-links"><span>Also serving</span>{others.map((item) => <Link key={item.citySlug} href={`/locations/${item.citySlug}`}>{item.cityName}</Link>)}</div></div><FAQList items={location.faqs} /></section>
    <section className="location-closing wrap"><p className="eyebrow">YOUR CURRENT HOMEPAGE IS ENOUGH TO START</p><h2>We will show you the first thing worth fixing.</h2><a className="text-link" href="#inquiry">Request a free homepage review <span aria-hidden="true">↗</span></a></section>
  </main><Footer /></>;
}
