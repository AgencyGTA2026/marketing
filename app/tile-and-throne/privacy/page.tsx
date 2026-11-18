import { AppDocPage } from "@/components/app-legal";
import { TILE_AND_THRONE } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Tile & Throne Privacy Policy | Bayline Digital",
  description: "How the Tile & Throne iPhone game handles your information: game progress, Game Center duels and leaderboards, advertising, purchases, and your choices.",
  path: "/tile-and-throne/privacy",
});

export default function TileAndThronePrivacyPage() {
  return (
    <AppDocPage app={TILE_AND_THRONE} eyebrow="TILE & THRONE" title="Privacy policy" updated="November 18, 2026">
      <p className="app-doc-lead">This policy explains how information is handled when you use the Tile &amp; Throne app for iPhone (&ldquo;the app&rdquo;). The app is owned and operated by Bayline Digital Inc. (&ldquo;Bayline Digital,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;), Toronto, Ontario, Canada. Contact us at <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>.</p>

      <h2>1. Your game data</h2>
      <p>The app saves your progress on your iPhone: trophies and league results, coins, bricks, banners and power-ups, your empire and raids, duel records, the Daily Board streak, settings, and records of delivered purchases. You don’t need an account with us, and we don’t run a server that stores your game data. Progress isn’t backed up by the app, so deleting the app deletes it.</p>

      <h2>2. Game Center</h2>
      <p>Most rivals in the app are computer players that run on your iPhone. If you’re signed in to Apple’s Game Center, the app also uses it in three ways:</p>
      <ul>
        <li><strong>Leaderboards.</strong> After a duel, the app sends your trophy total and your league points for the week to Game Center leaderboards. Other players of the app can see those scores with your Game Center name, in the app’s league and world tables and in Game Center itself.</li>
        <li><strong>Duels with other players.</strong> When another player in your league wants a duel at the same moment, Game Center may connect the two of you. During that duel the app sends the other player’s iPhone your league, the words you find and when you find them, through Game Center. That player sees your Game Center name.</li>
        <li><strong>Other players on your iPhone.</strong> The app keeps, on your device, the Game Center names and scores of players it has shown you, and a record of the players you’ve recently dueled so you don’t meet the same one again and again.</li>
      </ul>
      <p>Apple runs Game Center and handles your Game Center profile under its own privacy policy. We don’t receive your Apple Account, email address or contacts. To stop all of this, sign out of Game Center in iOS Settings → Game Center; the app then uses computer players only. You can also change your Game Center name and who can see your profile there.</p>

      <h2>3. Advertising</h2>
      <p>The app uses Google AdMob to show optional rewarded videos (for example, to double a duel’s coins, play overtime, or earn coins or a banner) and, from your fifth duel, ads between some duels unless you buy Remove Ads. Where required, Google’s consent message lets you make privacy choices before ads load, and you can revisit them in the app under Settings → Ad privacy choices.</p>
      <p>After your first round, iOS will ask whether you allow the app to track you. If you allow tracking, Google may use your device’s advertising identifier to show more relevant ads and measure them. If you don’t, ads are still shown but without that identifier. Either way, Google may process information such as IP address, approximate location, device and app information, and ad interactions for ad delivery, measurement, fraud prevention, and security. You can change tracking permission in iOS Settings → Privacy &amp; Security → Tracking. Read <a href="https://policies.google.com/privacy">Google’s Privacy Policy</a> and <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from apps that use its services</a>.</p>

      <h2>4. Analytics and crash reports</h2>
      <p>The app doesn’t include an analytics or crash-reporting service of our own. If you’ve chosen to share analytics with app developers in iOS Settings → Privacy &amp; Security → Analytics &amp; Improvements, Apple gives us crash reports and usage statistics that don’t identify you.</p>

      <h2>5. Purchases</h2>
      <p>Apple processes all in-app payments. We receive verified transaction details, such as product and transaction identifiers and refund status, to deliver coins and power-ups, unlock Remove Ads, and restore purchases. We never receive your payment-card or bank details. See <a href="https://www.apple.com/legal/privacy/">Apple’s Privacy Policy</a>.</p>

      <h2>6. TestFlight beta testing</h2>
      <p>If you test a beta through TestFlight, Apple shares crash reports, usage information, and any feedback you choose to send, which may include screenshots and your name or email. We use it only to fix problems and improve the app. See Apple’s TestFlight privacy information.</p>

      <h2>7. Support email and this website</h2>
      <p>If you email us, we receive your email address and what you send, and use it to help you. This website is hosted on Vercel and may use Google Analytics to measure visits, which can involve your IP address, browser, and pages viewed.</p>

      <h2>8. Retention and security</h2>
      <p>Game data stays on your device until you delete the app. Scores sent to Game Center are kept by Apple; the weekly league leaderboards start again each week. We keep support emails as long as needed to resolve your request. Our providers (Apple, Google, Vercel) may process information outside your country under their own retention practices. No system is perfectly secure, but we limit what we collect.</p>

      <h2>9. Your choices and rights</h2>
      <p>You can sign out of Game Center, and change ad privacy choices and tracking permission, at any time. Depending on where you live, including under Canada’s PIPEDA, the GDPR, or US state laws, you may have rights to access, correct, or delete personal information, or to withdraw consent. Email <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a>. You can also contact the privacy regulator where you live.</p>

      <h2>10. Children</h2>
      <p>The app isn’t directed to children under 13, and we don’t knowingly collect personal information from them. If you believe a child has sent us personal information, contact us and we’ll delete it.</p>

      <h2>11. Changes</h2>
      <p>We’ll update this page if our practices change and revise the effective date above. Significant changes will also be noted in the app’s release notes.</p>
    </AppDocPage>
  );
}
