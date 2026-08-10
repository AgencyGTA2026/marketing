import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Bayline Digital | Websites & Custom Web Apps",
  description:
    "Bayline Digital designs conversion-focused websites and builds custom web applications, portals, dashboards, and connected workflows for growing businesses.",
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Bayline Digital | Websites & Custom Web Apps",
    description:
      "Bayline Digital designs conversion-focused websites and builds custom web applications, portals, dashboards, and connected workflows for growing businesses.",
    url: SITE_URL,
    siteName: "Bayline Digital",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Bayline Digital | Websites & Custom Web Apps",
    description:
      "Conversion-focused websites and useful custom web apps for growing businesses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${SITE_URL}/#organization`,
                name: "Bayline Digital Inc.",
                alternateName: "Bayline Digital",
                url: SITE_URL,
                logo: `${SITE_URL}/android-chrome-512x512.png`,
                email: "contact@baylinedigital.com",
                telephone: "+1-613-818-8550",
                description: "Bayline Digital designs conversion-focused websites, landing pages, custom web applications, local SEO systems, and lead automation for growing businesses in Ontario.",
                areaServed: [
                  { "@type": "AdministrativeArea", name: "Ontario" },
                  { "@type": "City", name: "Toronto" },
                ],
                knowsAbout: [
                  "Web design",
                  "Next.js development",
                  "Landing page design",
                  "Local search engine optimization",
                  "Lead automation",
                  "Custom web applications",
                ],
                contactPoint: {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  email: "contact@baylinedigital.com",
                  telephone: "+1-613-818-8550",
                  areaServed: "CA",
                  availableLanguage: "English",
                },
              },
              {
                "@type": "WebSite",
                "@id": `${SITE_URL}/#website`,
                name: "Bayline Digital",
                url: SITE_URL,
                inLanguage: "en-CA",
                publisher: { "@id": `${SITE_URL}/#organization` },
              },
            ],
          }) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
