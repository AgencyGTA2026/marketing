import { AppDocPage } from "@/components/app-legal";
import { TILE_AND_THRONE } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Tile & Throne Support | Bayline Digital",
  description: "Help with Tile & Throne: how to play, rivals and leagues, Game Center, purchases, restoring Remove Ads, progress, ads and privacy choices, and how to contact Bayline Digital.",
  path: "/tile-and-throne/support",
});

export default function TileAndThroneSupportPage() {
  return (
    <AppDocPage app={TILE_AND_THRONE} eyebrow="TILE & THRONE" title="Support">
      <p className="app-doc-lead">We’re happy to help. Email <a href="mailto:contact@baylinedigital.com?subject=Tile%20%26%20Throne%20support">contact@baylinedigital.com</a> with your iPhone model, iOS version, what happened, and a screenshot if you can. We usually reply within one business day.</p>

      <h2>How to play</h2>
      <p>Drag across touching tiles to spell a word of three letters or more, then lift your finger. Rare letters are worth more, and colored squares double or triple a letter or the whole word. A word through the crown tile scores double and earns a brick; the crown moves every 20 seconds. In a duel, outscore your rival in 90 seconds to win trophies. Rotate the board for free whenever it helps you see new words.</p>

      <h2>Rivals, leagues and the leaderboard</h2>
      <p>Most rivals are computer players. When you’re signed in to Game Center, the leagues and the world leaderboard also show other players, and you duel one when someone in your league wants a duel at the same moment. Paid power-ups and overtime are off in a duel against another player. A league week runs from Monday 00:00 UTC to the next Monday; the top 7 of 30 move up a league and the bottom 5 move down.</p>

      <h2>Game Center</h2>
      <p>Game Center is optional. To use it, sign in under iOS Settings → Game Center. To stop sending scores and meeting other players, sign out there; the game keeps working with computer players. The name other players see is your Game Center name, which you can change in the same place.</p>

      <h2>A purchase didn’t arrive</h2>
      <p>Coins and power-ups are added once the App Store confirms the payment. If a purchase is pending (for example, waiting for Ask to Buy approval), it’s added after approval. Reopen the app with an internet connection to finish any interrupted delivery.</p>

      <h2>Restore Remove Ads</h2>
      <p>Open the Shop or Settings and tap <strong>Restore purchases</strong>, signed in with the Apple Account that made the purchase. Restoring brings back Remove Ads. Coin packs and the Starter Pack are delivered once and aren’t restored.</p>

      <h2>Prices</h2>
      <p>The app shows prices from the App Store in your own currency. They can differ between countries because Apple sets local prices.</p>

      <h2>Refunds</h2>
      <p>Apple handles payments and refunds. Request a refund at <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.</p>

      <h2>My progress</h2>
      <p>Your progress is saved on your iPhone only. Deleting the app deletes your progress, including coins you bought, and it can’t be recovered.</p>

      <h2>Ads and tracking</h2>
      <p>Optional videos give rewards, and from your fifth duel ads may appear between some duels unless you buy Remove Ads. You can change ad privacy choices in Settings when they apply to your region, and change tracking permission in iOS Settings → Privacy &amp; Security → Tracking. See the <a href="/tile-and-throne/privacy">privacy policy</a> for details.</p>

      <h2>Sound</h2>
      <p>Turn sound effects, music and haptics on or off in the app’s Settings. The game’s music stays quiet while other audio, such as your own music or a podcast, is playing.</p>

      <h2>Contact</h2>
      <p>Bayline Digital Inc. · Toronto, Ontario, Canada · <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a> · +1 (613) 818-8550</p>
    </AppDocPage>
  );
}
