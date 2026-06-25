import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { LandingHero } from "@/components/landing-hero";
import { WhatsIncluded } from "@/components/whats-included";
import { WhyBayline } from "@/components/why-bayline";
import { CtaBand } from "@/components/cta-band";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Bayline Digital — Lead-ready websites for local service businesses",
  description:
    "Bayline Digital builds custom, lead-ready websites for local service businesses — engineered to rank, load fast, and turn visitors into booked jobs. You own the code top to bottom.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <LandingHero
          eyebrow="Now booking · Local service businesses · 2026"
          placeName="local"
          recentActivity="A home-services business in Durham Region booked a call last week"
        />
        <WhatsIncluded />
        <WhyBayline />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
