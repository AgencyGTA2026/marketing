import { AppDocPage } from "@/components/app-legal";
import { TILE_AND_THRONE } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Tile & Throne Terms of Use | Bayline Digital",
  description: "Terms of use for the Tile & Throne iPhone game by Bayline Digital Inc., including in-app purchases, virtual items, leagues and fair play.",
  path: "/tile-and-throne/terms",
});

export default function TileAndThroneTermsPage() {
  return (
    <AppDocPage app={TILE_AND_THRONE} eyebrow="TILE & THRONE" title="Terms of use" updated="November 18, 2026">
      <p className="app-doc-lead">These terms apply to the Tile &amp; Throne app for iPhone, provided by Bayline Digital Inc. (&ldquo;we&rdquo; or &ldquo;us&rdquo;). By using the app you agree to them and to Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Licensed Application End User License Agreement</a> (the &ldquo;Apple EULA&rdquo;), which also applies. If these terms conflict with the Apple EULA, these terms apply to the extent allowed.</p>

      <h2>1. Using the app</h2>
      <p>We give you a personal, non-transferable license to use the app on Apple devices you own or control, for your own entertainment. Please don’t copy, modify, reverse engineer, or resell the app, or use cheats or automation to interfere with it.</p>

      <h2>2. Coins, trophies, and other virtual items</h2>
      <p>Coins, bricks, banners, power-ups, trophies, league places, and your empire are part of the game. They have no real-world value, can’t be exchanged for money, and can’t be transferred. We may adjust prices, rewards, and game balance over time. Items are stored on your device and are lost if you delete the app.</p>

      <h2>3. In-app purchases</h2>
      <p>Purchases are made through Apple and are subject to Apple’s terms. Coin packs and the Starter Pack are consumable and delivered once; the Starter Pack can be bought only once. Remove Ads is a one-time purchase that stops ads between duels and can be restored with the same Apple Account; optional reward videos remain available. Prices are shown in the app in your local currency. Apple handles refunds; if Apple refunds a purchase, the related items may be removed.</p>

      <h2>4. Rivals, leagues, and leaderboards</h2>
      <p>Most rivals in duels, leagues, and the world leaderboard are computer players. With Game Center signed in, other players also appear, and some duels are against another player. Rankings are for entertainment and carry no prize. We may leave out or remove scores that could not have been earned by normal play.</p>

      <h2>5. Fair play</h2>
      <p>In a duel against another player, play the game as provided. Don’t use a modified app, a word solver, or any other tool to gain an advantage, and don’t use an offensive Game Center name. Use of Game Center is also subject to Apple’s terms.</p>

      <h2>6. Ads and third-party services</h2>
      <p>The app shows ads from Google AdMob and uses other third-party services described in our <a href="/tile-and-throne/privacy">privacy policy</a>. We aren’t responsible for the content of third-party ads or websites.</p>

      <h2>7. Changes and availability</h2>
      <p>We may update, change, or discontinue features, leagues, leaderboards, the Daily Board, or the app.</p>

      <h2>8. Disclaimer and liability</h2>
      <p>The app is provided &ldquo;as is.&rdquo; To the extent permitted by law, we disclaim implied warranties and aren’t liable for indirect or consequential damages, and our total liability is limited to the amount you paid for the app or in-app purchases in the 12 months before the claim. Nothing here limits rights you have under consumer protection laws that can’t be waived.</p>

      <h2>9. Governing law</h2>
      <p>These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there, unless the law of your place of residence requires otherwise.</p>

      <h2>10. Contact</h2>
      <p>Bayline Digital Inc., Toronto, Ontario, Canada · <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a></p>
    </AppDocPage>
  );
}
