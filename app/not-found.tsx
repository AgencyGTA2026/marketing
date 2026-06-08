import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="relative overflow-hidden bg-bg">
        <section className="relative min-h-[calc(100vh-72px)] border-b border-line">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-px bg-line" />
            <div className="absolute left-1/2 top-0 h-full w-px bg-line/70" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0,transparent_calc(100%-1px),var(--color-line)_calc(100%-1px)),linear-gradient(180deg,transparent_0,transparent_calc(100%-1px),var(--color-line)_calc(100%-1px))] bg-[size:72px_72px] opacity-[0.28]" />
            <div className="absolute bottom-0 left-0 right-0 h-44 bg-[linear-gradient(180deg,transparent,var(--color-bg))]" />
          </div>

          <div className="relative mx-auto grid min-h-[calc(100vh-72px)] w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-8 py-20 lg:grid-cols-[0.92fr_1.08fr]">
            <div>
              <div className="mb-7 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-bg-card text-blue">
                  <SearchX size={15} />
                </span>
                Page not found
              </div>

              <h1 className="m-0 max-w-[720px] text-[clamp(48px,7vw,94px)] font-medium leading-[0.98] tracking-[-0.045em] text-ink">
                This route went <br />
                <span className="font-serif italic text-blue text-[1.04em]">off the map</span>.
              </h1>

              <p className="mt-7 max-w-[560px] text-[18px] leading-[1.65] text-muted">
                The page may have moved, been renamed, or never existed. Head back to the landing
                page and start from the main path.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/">
                    <Home size={17} />
                    Return to landing page
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    <ArrowLeft size={17} />
                    Contact Bayline
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[540px] lg:mr-0">
              <div className="relative aspect-square overflow-hidden rounded-[28px] border border-line bg-bg-card shadow-sm">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--color-bg-card),var(--color-blue-pale)_58%,var(--color-bg-sunken))]" />
                <div className="absolute inset-6 rounded-[22px] border border-line/80" />
                <div className="absolute left-8 right-8 top-8 flex items-center justify-between border-b border-line pb-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-2">
                  <span>Error code</span>
                  <span>Missing route</span>
                </div>
                <div className="absolute inset-x-8 bottom-8 grid grid-cols-4 gap-3">
                  {[0, 1, 2, 3].map((item) => (
                    <span
                      key={item}
                      className="h-2 rounded-full bg-blue/70"
                      style={{ opacity: 1 - item * 0.18 }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="font-mono text-[clamp(96px,16vw,170px)] font-semibold leading-none tracking-[-0.08em] text-ink">
                      404
                    </div>
                    <div className="absolute -right-6 -top-4 rotate-6 rounded-full border border-blue-pale bg-bg px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-blue shadow-sm">
                      reroute
                    </div>
                  </div>
                </div>
                <div className="absolute left-10 top-24 h-[38%] w-px bg-blue/45" />
                <div className="absolute bottom-20 right-10 h-px w-[42%] bg-blue/45" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
