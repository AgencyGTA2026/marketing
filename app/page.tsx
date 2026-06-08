import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Philosophy } from "@/components/philosophy";
import { Services } from "@/components/services";
import { WhyUs } from "@/components/why-us";
import { Process } from "@/components/process";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <WhyUs />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
