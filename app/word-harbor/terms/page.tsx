import { AppDocPage } from "@/components/app-legal";
import { WORD_HARBOR } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Word Harbor Terms of Use | Bayline Digital",
  description: "Terms of use for the Word Harbor iPhone game by Bayline Digital Inc., including in-app purchases, the Harbor VIP subscription, and virtual items.",
  path: "/word-harbor/terms",
});

export default function WordHarborTermsPage() {
  return (
    <AppDocPage app={WORD_HARBOR} eyebrow="WORD HARBOR" title="Terms of use" updated="November 15, 2026">
      <p className="app-doc-lead">These terms apply to the Word Harbor app for iPhone, provided by Bayline Digital Inc. (&ldquo;we&rdquo; or &ldquo;us&rdquo;). By using the app you agree to them and to Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Licensed Application End User License Agreement</a> (the &ldquo;Apple EULA&rdquo;), which also applies. If these terms conflict with the Apple EULA, these terms apply to the extent allowed.</p>

      <h2>1. Using the app</h2>
      <p>We give you a personal, non-transferable license to use the app on Apple devices you own or control, for your own entertainment. Please don’t copy, modify, reverse engineer, or resell the app, or use cheats or automation to interfere with it.</p>

      <h2>2. Coins, hints, and other virtual items</h2>
      <p>Coins, hints, streak freezes, harbor pieces, postcards, and other in-game items are part of the game. They have no real-world value, can’t be exchanged for money, and can’t be transferred. We may adjust prices, rewards, and game balance over time. Items are stored on your device and in your iCloud if sync is on, and may be lost if you delete the app with iCloud off.</p>

      <h2>3. In-app purchases</h2>
      <p>Purchases are made through Apple and are subject to Apple’s terms. Coin packs, the Hint Bundle, the Treasure Chest, and the Starter Pack are consumable and delivered once; the Starter Pack can be bought only once. Remove Ads is a one-time purchase that stops ads between levels and can be restored with the same Apple Account; optional reward videos remain available. Prices are shown in the app in your local currency. Apple handles refunds; if Apple refunds a purchase, the related items may be removed.</p>

      <h2>4. Harbor VIP subscription</h2>
      <p>Harbor VIP is an auto-renewing subscription, offered weekly (US$2.99 a week) or monthly (US$7.99 a month); prices in other countries vary, and the app shows the current price in your currency before you subscribe. While it’s active you get no ads between levels, 5 free letter reveals each day you play, and double daily puzzle coins. Payment is charged to your Apple Account when you confirm the purchase. The subscription renews automatically at the same price and length unless you cancel at least 24 hours before the end of the current period; your account is charged for renewal within the 24 hours before the period ends. You can manage or cancel it in iOS Settings → [your name] → Subscriptions, or from the Harbor VIP screen in the app. Cancelling stops future renewals; benefits continue until the end of the period you’ve paid for. We may change VIP benefits or prices; Apple will tell you before a price increase applies to you.</p>

      <h2>5. Ads and third-party services</h2>
      <p>The app shows ads from Google AdMob and uses other third-party services described in our <a href="/word-harbor/privacy">privacy policy</a>. We aren’t responsible for the content of third-party ads or websites.</p>

      <h2>6. Changes and availability</h2>
      <p>We may update, change, or discontinue features, levels, daily puzzles, or the app. Past daily puzzles can be caught up for a limited time, as shown in the app’s calendar.</p>

      <h2>7. Disclaimer and liability</h2>
      <p>The app is provided &ldquo;as is.&rdquo; To the extent permitted by law, we disclaim implied warranties and aren’t liable for indirect or consequential damages, and our total liability is limited to the amount you paid for the app or in-app purchases in the 12 months before the claim. Nothing here limits rights you have under consumer protection laws that can’t be waived.</p>

      <h2>8. Governing law</h2>
      <p>These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there, unless the law of your place of residence requires otherwise.</p>

      <h2>9. Contact</h2>
      <p>Bayline Digital Inc., Toronto, Ontario, Canada · <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a></p>
    </AppDocPage>
  );
}
