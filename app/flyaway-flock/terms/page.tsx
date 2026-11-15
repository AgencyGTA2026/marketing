import { AppDocPage } from "@/components/app-legal";
import { FLYAWAY_FLOCK } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Flyaway Flock Terms of Use | Bayline Digital",
  description: "Terms of use for the Flyaway Flock iPhone game by Bayline Digital Inc., including in-app purchases and virtual items.",
  path: "/flyaway-flock/terms",
});

export default function FlyawayFlockTermsPage() {
  return (
    <AppDocPage app={FLYAWAY_FLOCK} eyebrow="FLYAWAY FLOCK" title="Terms of use" updated="November 15, 2026">
      <p className="app-doc-lead">These terms apply to the Flyaway Flock app for iPhone, provided by Bayline Digital Inc. (&ldquo;we&rdquo; or &ldquo;us&rdquo;). By using the app you agree to them and to Apple’s Licensed Application End User License Agreement (the &ldquo;Apple EULA&rdquo;), which also applies. If these terms conflict with the Apple EULA, these terms apply to the extent allowed.</p>

      <h2>1. Using the app</h2>
      <p>We give you a personal, non-transferable license to use the app on Apple devices you own or control, for your own entertainment. Please don’t copy, modify, reverse engineer, or resell the app, or use cheats or automation to interfere with it.</p>

      <h2>2. Coins, stars, birds, and other virtual items</h2>
      <p>Coins, stars, hints, undos, shoos, collectible birds, and other in-game items are part of the game. They have no real-world value, can’t be exchanged for money, and can’t be transferred. We may adjust prices, rewards, unlock requirements, and game balance over time. Items are stored on your device and are lost if you delete the app.</p>

      <h2>3. In-app purchases</h2>
      <p>Purchases are made through Apple and are subject to Apple’s terms. Coin packs are consumable. Remove Ads and the Starter Flock are one-time purchases; ad removal can be restored with the same Apple Account, while the coins and power-ups included in the Starter Flock are delivered once. Remove Ads stops ads between levels; optional reward videos remain available. Apple handles refunds; if Apple refunds a purchase, the related items may be removed.</p>

      <h2>4. Ads and third-party services</h2>
      <p>The app shows ads from Google AdMob and uses other third-party services described in our <a href="/flyaway-flock/privacy">privacy policy</a>. We aren’t responsible for the content of third-party ads or websites.</p>

      <h2>5. Changes and availability</h2>
      <p>We may update, change, or discontinue features, levels, daily puzzles, or the app. A daily puzzle and its rewards are available only on its date.</p>

      <h2>6. Disclaimer and liability</h2>
      <p>The app is provided &ldquo;as is.&rdquo; To the extent permitted by law, we disclaim implied warranties and aren’t liable for indirect or consequential damages, and our total liability is limited to the amount you paid for the app or in-app purchases in the 12 months before the claim. Nothing here limits rights you have under consumer protection laws that can’t be waived.</p>

      <h2>7. Governing law</h2>
      <p>These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there, unless the law of your place of residence requires otherwise.</p>

      <h2>8. Contact</h2>
      <p>Bayline Digital Inc., Toronto, Ontario, Canada · <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a></p>
    </AppDocPage>
  );
}
