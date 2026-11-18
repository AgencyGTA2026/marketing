import { AppDocPage } from "@/components/app-legal";
import { ECHO } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Echo Privacy Policy | Bayline Digital",
  description: "How the Echo iPhone game handles your information: game progress, anonymous statistics, advertising, purchases, and your choices.",
  path: "/echo/privacy",
});

export default function EchoPrivacyPage() {
  return (
    <AppDocPage app={ECHO} eyebrow="ECHO" title="Privacy policy" updated="November 18, 2026">
      <p className="app-doc-lead">This policy explains how information is handled when you use the Echo app for iPhone (&ldquo;the app&rdquo;). The app is owned and operated by Bayline Digital Inc. (&ldquo;Bayline Digital,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;), Toronto, Ontario, Canada. Contact us at <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>.</p>

      <h2>1. Your game data</h2>
      <p>The app saves your progress on your iPhone: the levels you’ve solved and their stars, daily puzzle results and your streak, the styles you’ve chosen, and your settings. You don’t need an account, and we don’t run a server that stores your game data. Progress isn’t backed up by the app, so deleting the app deletes it.</p>

      <h2>2. Anonymous statistics</h2>
      <p>To tune level difficulty and fix problems, the app can send anonymous gameplay events to PostHog, our analytics provider. Examples are a level started, solved or left, an undo, hint or skip, a daily puzzle finished, an ad shown, or a purchase started, with details such as the level number, the number of moves, and the app version. Events carry a random ID created for this copy of the app. They aren’t linked to your name, email address, Apple Account or advertising identifier, and we don’t sell them. Like any internet service, PostHog receives your IP address when events arrive.</p>
      <p>You can turn this off at any time in the app under Settings → <strong>Share anonymous stats</strong>. The app doesn’t include a separate crash-reporting service. If you’ve chosen to share analytics with app developers in iOS Settings → Privacy &amp; Security → Analytics &amp; Improvements, Apple gives us crash reports and usage statistics that don’t identify you.</p>

      <h2>3. Advertising</h2>
      <p>The first seven levels have no ads. After that, the app uses Google AdMob to show optional rewarded videos (to get a hint, skip a level, or repair a daily streak) and ads between some levels, unless you buy Remove Ads. Where required, Google’s consent message lets you make privacy choices before ads load, and you can revisit them in the app under Settings → Ad privacy options.</p>
      <p>The first time you reach level 8, iOS will ask whether you allow the app to track you. If you allow tracking, Google may use your device’s advertising identifier to show more relevant ads and measure them. If you don’t, ads are still shown but without that identifier. Either way, Google may process information such as IP address, approximate location, device and app information, and ad interactions for ad delivery, measurement, fraud prevention, and security. You can change tracking permission in iOS Settings → Privacy &amp; Security → Tracking. Read <a href="https://policies.google.com/privacy">Google’s Privacy Policy</a> and <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from apps that use its services</a>.</p>

      <h2>4. Purchases</h2>
      <p>Apple processes all in-app payments. We receive verified transaction details, such as product and transaction identifiers and refund status, to unlock Remove Ads and restore it. We never receive your payment-card or bank details. See <a href="https://www.apple.com/legal/privacy/">Apple’s Privacy Policy</a>.</p>

      <h2>5. Notifications</h2>
      <p>The daily puzzle reminder is optional and off until you turn it on. It’s a local notification scheduled on your iPhone; no push server is involved. You can change it in the app’s Settings or in iOS Settings → Notifications.</p>

      <h2>6. Sharing a result</h2>
      <p>After a daily puzzle you can share a result card. The app makes the image on your iPhone and hands it to the iOS share sheet. It goes only where you choose to send it.</p>

      <h2>7. TestFlight beta testing</h2>
      <p>If you test a beta through TestFlight, Apple shares crash reports, usage information, and any feedback you choose to send, which may include screenshots and your name or email. We use it only to fix problems and improve the app. See Apple’s TestFlight privacy information.</p>

      <h2>8. Support email and this website</h2>
      <p>If you email us, we receive your email address and what you send, and use it to help you. This website is hosted on Vercel and may use Google Analytics to measure visits, which can involve your IP address, browser, and pages viewed.</p>

      <h2>9. Retention and security</h2>
      <p>Game data stays on your device until you delete the app. Anonymous statistics are kept only as long as they’re useful for improving the game. We keep support emails as long as needed to resolve your request. Our providers (Apple, Google, PostHog, Vercel) may process information outside your country under their own retention practices. No system is perfectly secure, but we limit what we collect.</p>

      <h2>10. Your choices and rights</h2>
      <p>You can turn off anonymous statistics, and change ad privacy choices and tracking permission, at any time. Depending on where you live, including under Canada’s PIPEDA, the GDPR, or US state laws, you may have rights to access, correct, or delete personal information, or to withdraw consent. Email <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>. You can also contact the privacy regulator where you live.</p>

      <h2>11. Children</h2>
      <p>The app isn’t directed to children under 13, and we don’t knowingly collect personal information from them. If you believe a child has sent us personal information, contact us and we’ll delete it.</p>

      <h2>12. Changes</h2>
      <p>We’ll update this page if our practices change and revise the effective date above. Significant changes will also be noted in the app’s release notes.</p>
    </AppDocPage>
  );
}
