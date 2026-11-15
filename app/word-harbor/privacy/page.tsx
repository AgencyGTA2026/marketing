import { AppDocPage } from "@/components/app-legal";
import { WORD_HARBOR } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Word Harbor Privacy Policy | Bayline Digital",
  description: "How the Word Harbor iPhone game handles your information: progress and iCloud sync, analytics and crash reports, advertising, purchases, Game Center, reminders, and your choices.",
  path: "/word-harbor/privacy",
});

export default function WordHarborPrivacyPage() {
  return (
    <AppDocPage app={WORD_HARBOR} eyebrow="WORD HARBOR" title="Privacy policy" updated="November 15, 2026">
      <p className="app-doc-lead">This policy explains how information is handled when you use the Word Harbor app for iPhone (&ldquo;the app&rdquo;). The app is owned and operated by Bayline Digital Inc. (&ldquo;Bayline Digital,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;), Toronto, Ontario, Canada. Contact us at <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>.</p>

      <h2>1. Your game data</h2>
      <p>The app saves your progress on your iPhone: levels and stages, coins and hints, bonus words, daily puzzle streaks and streak freezes, harbor pieces and postcards, the treasure chest, settings, your reminder time, the puzzle you’re in the middle of, and records of delivered purchases. You don’t need an account, and we don’t run a server that stores your game data.</p>
      <p>If you’re signed in to iCloud, the app also keeps a copy of this progress in your own iCloud storage (iCloud key-value storage), so it can follow you to your other devices and return if you reinstall. That copy is stored by Apple in your iCloud account; we can’t access it. You can turn off iCloud for Word Harbor in iOS Settings → [your name] → iCloud.</p>

      <h2>2. Analytics and crash reports</h2>
      <p>To understand how the game is played and to fix problems, the app uses Google Analytics for Firebase and Firebase Crashlytics, provided by Google. They receive gameplay events (for example, a level started or completed, a hint or bonus word used, a daily puzzle finished, an ad shown, or a purchase made, with details such as the level number), along with an app-instance identifier, device model, iOS version, app version, language, approximate country derived from your IP address, and session information. If the app crashes, Crashlytics receives a crash report with the technical state of the app and device. This information is not linked to your name or email, and we don’t sell it.</p>
      <p>You can turn this off at any time in the app under Settings → <strong>Share usage &amp; crash data</strong>. If you allow tracking (see below), Google Analytics may also use your device’s advertising identifier, for example to measure ads.</p>

      <h2>3. Advertising</h2>
      <p>The app uses Google AdMob to show optional rewarded videos (for example, to earn coins, get a free reveal, or double a level’s coins) and, from level 5, ads between some levels, unless you buy Remove Ads or are a Harbor VIP member. Where required, Google’s consent message lets you make privacy choices before ads load, and you can revisit them in the app under Settings → Ad privacy choices.</p>
      <p>After your first level, iOS will ask whether you allow the app to track you. If you allow tracking, Google may use your device’s advertising identifier to show more relevant ads and measure them. If you don’t, ads are still shown but without that identifier. Either way, Google may process information such as IP address, approximate location, device and app information, and ad interactions for ad delivery, measurement, fraud prevention, and security. You can change tracking permission in iOS Settings → Privacy &amp; Security → Tracking. Read <a href="https://policies.google.com/privacy">Google’s Privacy Policy</a> and <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from apps that use its services</a>.</p>

      <h2>4. Purchases and Harbor VIP</h2>
      <p>Apple processes all in-app payments, including the Harbor VIP subscription. We receive verified transaction details, such as product and transaction identifiers, subscription status and renewal date, and refund status, to deliver coins and hints, unlock Remove Ads, provide VIP benefits, and restore purchases. We never receive your payment-card or bank details. See <a href="https://www.apple.com/legal/privacy/">Apple’s Privacy Policy</a>.</p>

      <h2>5. Game Center</h2>
      <p>If you’re signed in to Game Center, the app reports the achievements you earn to Apple’s Game Center. Apple handles your Game Center profile under its own privacy policy; we don’t receive your Game Center contact details.</p>

      <h2>6. Notifications</h2>
      <p>The daily puzzle reminder is optional and off until you turn it on. It’s a local notification scheduled on your iPhone; no push server is involved. You can change it in the app’s Settings or in iOS Settings → Notifications.</p>

      <h2>7. TestFlight beta testing</h2>
      <p>If you test a beta through TestFlight, Apple shares crash reports, usage information, and any feedback you choose to send, which may include screenshots and your name or email. We use it only to fix problems and improve the app. See Apple’s TestFlight privacy information.</p>

      <h2>8. Support email and this website</h2>
      <p>If you email us, we receive your email address and what you send, and use it to help you. This website is hosted on Vercel and may use Google Analytics to measure visits, which can involve your IP address, browser, and pages viewed.</p>

      <h2>9. Retention and security</h2>
      <p>Game data stays on your device, and in your iCloud if sync is on, until you delete it. Google keeps Firebase analytics data for a limited period (at most 14 months) and crash reports for 90 days. We keep support emails as long as needed to resolve your request. Our providers (Apple, Google, Vercel) may process information outside your country under their own retention practices. No system is perfectly secure, but we limit what we collect.</p>

      <h2>10. Your choices and rights</h2>
      <p>You can turn analytics and crash reports off, change ad privacy choices and tracking permission, and turn reminders on or off, at any time. Depending on where you live, including under Canada’s PIPEDA, the GDPR, or US state laws, you may have rights to access, correct, or delete personal information, or to withdraw consent. Email <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>. You can also contact the privacy regulator where you live.</p>

      <h2>11. Children</h2>
      <p>The app isn’t directed to children under 13, and we don’t knowingly collect personal information from them. If you believe a child has sent us personal information, contact us and we’ll delete it.</p>

      <h2>12. Changes</h2>
      <p>We’ll update this page if our practices change and revise the effective date above. Significant changes will also be noted in the app’s release notes.</p>
    </AppDocPage>
  );
}
