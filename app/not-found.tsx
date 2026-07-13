import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
export default function NotFound() { return <><Nav /><main className="status-page wrap"><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>This page is no longer here.</h1><p>The address may be incorrect or the page may have moved.</p><div><Link className="primary-button" href="/">Return home <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/contact">Contact Bayline</Link></div></main><Footer /></>; }
