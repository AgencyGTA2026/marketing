import { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { businessConfig } from "@/lib/data/business";
import { ThankYouConversion } from "@/components/thank-you-conversion";

export const metadata: Metadata = {
  title: "Thanks — request received | Bayline Digital",
  description: "Your project details were received. Bayline Digital will follow up shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <ThankYouConversion />
      <Nav />
      <main className="flex min-h-[70vh] items-center justify-center px-8 py-32">
        <Reveal className="mx-auto w-full max-w-[560px] border-2 border-ink bg-bg-card p-10 text-center shadow-[10px_10px_0_0_var(--color-blue)] md:p-14">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center border-2 border-ink bg-blue text-[28px] font-bold text-white">
            ✓
          </div>
          <h1 className="m-0 font-display text-[clamp(2rem,4vw,3rem)] font-black uppercase leading-none tracking-tighter text-ink">
            Your details are <span className="bg-blue px-2 text-white">in</span>
          </h1>
          <p className="mx-auto mt-4 max-w-[420px] text-[16px] leading-[1.65] text-muted">
            We received your project details. Bayline Digital will review your request and follow up
            shortly — usually within one business day.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild>
              <a href={businessConfig.calendlyUrl} target="_blank" rel="noopener noreferrer">
                Book a call now ↗
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to home</Link>
            </Button>
          </div>

          <p className="mt-8 text-[13.5px] text-muted-2">
            Prefer email?{" "}
            <a href={`mailto:${businessConfig.email}`} className="text-ink-2 underline hover:text-blue">
              {businessConfig.email}
            </a>
          </p>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
