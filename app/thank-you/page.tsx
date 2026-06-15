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
        <Reveal className="mx-auto w-full max-w-[560px] rounded-[24px] border border-line bg-bg-card p-10 text-center shadow-sm md:p-14">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-pale text-[28px] font-semibold text-blue">
            ✓
          </div>
          <h1 className="m-0 text-[clamp(28px,4vw,40px)] font-medium leading-tight tracking-[-0.02em] text-ink">
            Thanks — your details are <span className="font-serif italic text-blue">in</span>.
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
