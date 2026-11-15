import { AppDocPage } from "@/components/app-legal";
import { SIP_AND_SORT } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Sip & Sort Privacy Policy | Bayline Digital",
  description: "How the Sip & Sort iPhone game handles your information: on-device progress, advertising, anonymous play statistics, purchases, and your choices.",
  path: "/sip-and-sort/privacy",
});

export default function SipAndSortPrivacyPage() {
  return (
    <AppDocPage app={SIP_AND_SORT} eyebrow="SIP & SORT" title="Privacy policy" updated="November 15, 2026">
      <p className="app-doc-lead">This policy explains how information is handled when you use the Sip &amp; Sort app for iPhone (&ldquo;the app&rdquo;). The app is owned and operated by Bayline Digital Inc. (&ldquo;Bayline Digital,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;), Toronto, Ontario, Canada. Contact us at <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>.</p>

      <h2>1. Your game data stays on your device</h2>
      <p>The app saves your progress on your iPhone: levels and stars, coins, café decorations and upgrades, friendships with regulars, Daily Special streaks, event progress, tip-jar timing, tutorial progress, settings, and records of delivered purchases. You don’t need an account, and we don’t run a server that stores your game saves. Deleting the app deletes this data.</p>

      <h2>2. Anonymous play statistics</h2>
      <p>To understand which levels are too hard and how features are used, the app can send gameplay events to our analytics provider, PostHog. Events include things like starting or finishing a level, stars and pours, power-ups used, tutorial steps, café purchases, rewarded videos watched, purchase outcomes, the app version, and how many days since install. Each install is identified only by a random ID created by the app. We don’t send your name, email, contacts, precise location, or advertising identifier, and we don’t use these statistics for advertising. You can turn this off at any time in the app under Settings → <strong>Share anonymous play stats</strong>. See <a href="https://posthog.com/privacy">PostHog’s privacy policy</a>.</p>

      <h2>3. Advertising</h2>
      <p>The app uses Google AdMob to show optional rewarded videos and, unless you buy Remove Ads, ads between some levels. Where required, Google’s consent message lets you make privacy choices before ads load, and you can revisit them in Settings → Ad privacy choices.</p>
      <p>iOS will ask whether you allow the app to track you. If you allow tracking, Google may use your device’s advertising identifier to show more relevant ads and measure them. If you don’t, ads are still shown but without that identifier. Either way, Google may process information such as IP address, approximate location, device and app information, and ad interactions for ad delivery, measurement, fraud prevention, and security. You can change tracking permission in iOS Settings → Privacy &amp; Security → Tracking. Read <a href="https://policies.google.com/privacy">Google’s Privacy Policy</a> and <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from apps that use its services</a>.</p>

      <h2>4. Purchases</h2>
      <p>Apple processes all in-app payments. We receive verified transaction details, such as product and transaction identifiers and refund status, to deliver coins, unlock Remove Ads or the Autumn Café Bundle, and restore purchases. We never receive your payment-card or bank details. See <a href="https://www.apple.com/legal/privacy/">Apple’s Privacy Policy</a>.</p>

      <h2>5. Notifications</h2>
      <p>Reminders for a full tip jar or a new Daily Special are optional local notifications scheduled on your iPhone. No push server is involved. You can change notification permissions in iOS Settings.</p>

      <h2>6. TestFlight beta testing</h2>
      <p>If you test a beta through TestFlight, Apple shares crash reports, usage information, and any feedback you choose to send, which may include screenshots and your name or email. We use it only to fix problems and improve the app. See Apple’s TestFlight privacy information.</p>

      <h2>7. Support email and this website</h2>
      <p>If you email us, we receive your email address and what you send, and use it to help you. This website is hosted on Vercel and may use Google Analytics to measure visits, which can involve your IP address, browser, and pages viewed.</p>

      <h2>8. Retention and security</h2>
      <p>Game data stays on your device until you delete the app. Analytics events are kept for as long as they’re useful for improving the app, generally no more than two years. We keep support emails as long as needed to resolve your request. Our providers (Apple, Google, PostHog, Vercel) may process information outside your country under their own retention practices. No system is perfectly secure, but we limit what we collect.</p>

      <h2>9. Your choices and rights</h2>
      <p>You can turn off play statistics, change ad privacy choices and tracking permission, and manage notifications at any time. Depending on where you live, including under Canada’s PIPEDA, the GDPR, or US state laws, you may have rights to access, correct, or delete personal information, or to withdraw consent. Because analytics use a random ID rather than your identity, include that you play Sip &amp; Sort in your request so we can help. Email <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>. You can also contact the privacy regulator where you live.</p>

      <h2>10. Children</h2>
      <p>The app isn’t directed to children under 13, and we don’t knowingly collect personal information from them. If you believe a child has sent us personal information, contact us and we’ll delete it.</p>

      <h2>11. Changes</h2>
      <p>We’ll update this page if our practices change and revise the effective date above. Significant changes will also be noted in the app’s release notes.</p>
    </AppDocPage>
  );
}
