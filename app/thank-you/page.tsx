import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ThankYouConversion } from "@/components/thank-you-conversion";
import { businessConfig } from "@/lib/data/business";

export const metadata: Metadata = { title: "Request Received | Bayline Digital", description: "Your inquiry was delivered to Bayline Digital.", robots: { index: false, follow: false } };
export default function ThankYouPage() { return <><ThankYouConversion /><Nav /><main className="status-page wrap"><p className="eyebrow">DELIVERY CONFIRMED</p><h1>Thanks. Your details are in.</h1><p>Bayline will review the context and follow up shortly, usually within one business day.</p><div><a className="primary-button" href={businessConfig.calendlyUrl}>Book a call now <span aria-hidden="true">↗</span></a><Link className="text-link" href="/">Back to home</Link></div></main><Footer /></>; }
