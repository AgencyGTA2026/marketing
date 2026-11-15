import { AppDocPage } from "@/components/app-legal";
import { FLYAWAY_FLOCK } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Flyaway Flock Privacy Policy | Bayline Digital",
  description: "How the Flyaway Flock iPhone game handles your information: on-device progress, advertising, purchases, reminders, and your choices.",
  path: "/flyaway-flock/privacy",
});

export default function FlyawayFlockPrivacyPage() {
  return (
    <AppDocPage app={FLYAWAY_FLOCK} eyebrow="FLYAWAY FLOCK" title="Privacy policy" updated="November 15, 2026">
      <p className="app-doc-lead">This policy explains how information is handled when you use the Flyaway Flock app for iPhone (&ldquo;the app&rdquo;). The app is owned and operated by Bayline Digital Inc. (&ldquo;Bayline Digital,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;), Toronto, Ontario, Canada. Contact us at <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>.</p>

      <h2>1. Your game data stays on your device</h2>
      <p>The app saves your progress on your iPhone: levels and stars, coins, power-ups, the birds you’ve collected and chosen for your flock, daily treat and daily puzzle streaks, settings, your reminder time, the level you’re in the middle of, and records of delivered purchases. You don’t need an account, and we don’t run a server that stores your game data. Deleting the app deletes this data.</p>

      <h2>2. No gameplay analytics</h2>
      <p>The app doesn’t send gameplay statistics to us or to an analytics provider. If we add analytics in a future version, we’ll update this policy first and describe what is collected and how to turn it off.</p>

      <h2>3. Advertising</h2>
      <p>The app uses Google AdMob to show optional rewarded videos (for example, to double a reward or get extra taps) and, unless you buy Remove Ads or the Starter Flock, ads between some levels. Where required, Google’s consent message lets you make privacy choices before ads load, and you can revisit them in the app under Settings → Ad privacy choices.</p>
      <p>After your first few levels, iOS will ask whether you allow the app to track you. If you allow tracking, Google may use your device’s advertising identifier to show more relevant ads and measure them. If you don’t, ads are still shown but without that identifier. Either way, Google may process information such as IP address, approximate location, device and app information, and ad interactions for ad delivery, measurement, fraud prevention, and security. You can change tracking permission in iOS Settings → Privacy &amp; Security → Tracking. Read <a href="https://policies.google.com/privacy">Google’s Privacy Policy</a> and <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from apps that use its services</a>.</p>

      <h2>4. Purchases</h2>
      <p>Apple processes all in-app payments. We receive verified transaction details, such as product and transaction identifiers and refund status, to deliver coins, unlock Remove Ads or the Starter Flock, and restore purchases. We never receive your payment-card or bank details. See <a href="https://www.apple.com/legal/privacy/">Apple’s Privacy Policy</a>.</p>

      <h2>5. Notifications</h2>
      <p>The daily puzzle reminder is optional and off until you turn it on in Settings. It’s a local notification scheduled on your iPhone; no push server is involved. You can change notification permissions in iOS Settings.</p>

      <h2>6. Sharing results</h2>
      <p>When you tap Share after a daily puzzle, the app opens the standard iOS share sheet with a short text result. Nothing is sent unless you choose where to share it.</p>

      <h2>7. TestFlight beta testing</h2>
      <p>If you test a beta through TestFlight, Apple shares crash reports, usage information, and any feedback you choose to send, which may include screenshots and your name or email. We use it only to fix problems and improve the app. See Apple’s TestFlight privacy information.</p>

      <h2>8. Support email and this website</h2>
      <p>If you email us, we receive your email address and what you send, and use it to help you. This website is hosted on Vercel and may use Google Analytics to measure visits, which can involve your IP address, browser, and pages viewed.</p>

      <h2>9. Retention and security</h2>
      <p>Game data stays on your device until you delete the app. We keep support emails as long as needed to resolve your request. Our providers (Apple, Google, Vercel) may process information outside your country under their own retention practices. No system is perfectly secure, but we limit what we collect.</p>

      <h2>10. Your choices and rights</h2>
      <p>You can change ad privacy choices and tracking permission, and turn reminders on or off, at any time. Depending on where you live, including under Canada’s PIPEDA, the GDPR, or US state laws, you may have rights to access, correct, or delete personal information, or to withdraw consent. Email <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>. You can also contact the privacy regulator where you live.</p>

      <h2>11. Children</h2>
      <p>The app isn’t directed to children under 13, and we don’t knowingly collect personal information from them. If you believe a child has sent us personal information, contact us and we’ll delete it.</p>

      <h2>12. Changes</h2>
      <p>We’ll update this page if our practices change and revise the effective date above. Significant changes will also be noted in the app’s release notes.</p>
    </AppDocPage>
  );
}
