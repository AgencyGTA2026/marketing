import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Philosophy } from "@/components/philosophy";
import { WhyUs } from "@/components/why-us";
import { StatBand } from "@/components/stat-band";
import { Process } from "@/components/process";
import { About } from "@/components/about";
import { ClosingCta } from "@/components/closing-cta";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Philosophy />
        <WhyUs />
        <StatBand />
        <Process />
        <About />
        <ClosingCta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
