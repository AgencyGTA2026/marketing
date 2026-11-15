import { AppDocPage } from "@/components/app-legal";
import { WORD_HARBOR } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Word Harbor Support | Bayline Digital",
  description: "Help with Word Harbor: how to play, hints, purchases, Harbor VIP, restoring purchases, progress and iCloud, ads and privacy choices, and how to contact Bayline Digital.",
  path: "/word-harbor/support",
});

export default function WordHarborSupportPage() {
  return (
    <AppDocPage app={WORD_HARBOR} eyebrow="WORD HARBOR" title="Support">
      <p className="app-doc-lead">We’re happy to help. Email <a href="mailto:contact@baylinedigital.com?subject=Word%20Harbor%20support">contact@baylinedigital.com</a> with your iPhone model, iOS version, the level number, and a screenshot if you can. We usually reply within one business day.</p>

      <h2>How to play</h2>
      <p>Swipe across the letters on the wheel to spell a word, then lift your finger. Words that fit the crossword fill in; other real words count as bonus words, and every 10 fill the jar for a free letter reveal. Shuffle the wheel for free whenever it helps you see new words. Stuck? Reveal a letter, use the lighthouse to reveal any square you tap, or reveal a whole word. Hints you own are used before coins.</p>

      <h2>A purchase didn’t arrive</h2>
      <p>Coins and hints are added once the App Store confirms the payment. If a purchase is pending (for example, waiting for Ask to Buy approval), it’s added after approval. Reopen the app with an internet connection to finish any interrupted delivery.</p>

      <h2>Restore Remove Ads or Harbor VIP</h2>
      <p>Open the Shop, Settings, or the Harbor VIP screen and tap <strong>Restore</strong>, signed in with the Apple Account that made the purchase. Restoring brings back Remove Ads and an active VIP membership. Coin packs, the Hint Bundle, the Starter Pack and the Treasure Chest are delivered once and aren’t restored.</p>

      <h2>Manage or cancel Harbor VIP</h2>
      <p>Harbor VIP is a weekly or monthly subscription that renews automatically until you cancel. To cancel or change plans, open the Harbor VIP screen in the app and tap <strong>Manage subscription</strong>, or go to iOS Settings → [your name] → Subscriptions. Cancel at least 24 hours before the current period ends to avoid the next renewal; your benefits last until the end of the period you’ve paid for.</p>

      <h2>Prices</h2>
      <p>The app shows prices from the App Store in your own currency. They can differ between countries because Apple sets local prices.</p>

      <h2>Refunds</h2>
      <p>Apple handles payments and refunds. Request a refund at <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.</p>

      <h2>My progress</h2>
      <p>Your progress is saved on your iPhone and, if you’re signed in to iCloud, synced through your iCloud account so it follows you to your other devices and comes back if you reinstall. If iCloud is off, deleting the app deletes your progress and it can’t be recovered.</p>

      <h2>Ads and tracking</h2>
      <p>Optional videos give rewards, and from level 5 ads may appear between some levels unless you buy Remove Ads or are a Harbor VIP member. You can change ad privacy choices in Settings when they apply to your region, and change tracking permission in iOS Settings → Privacy &amp; Security → Tracking. To stop sharing usage and crash data, turn off <strong>Share usage &amp; crash data</strong> in the app’s Settings. See the <a href="/word-harbor/privacy">privacy policy</a> for details.</p>

      <h2>Daily puzzle and reminders</h2>
      <p>A new daily puzzle arrives every day. Missed one? Open the daily calendar to catch up on earlier days this month; catching up earns coins but doesn’t change your streak. Turn the daily reminder on or off and pick its time in the app’s Settings, or manage it in iOS Settings → Notifications → Word Harbor.</p>

      <h2>Contact</h2>
      <p>Bayline Digital Inc. · Toronto, Ontario, Canada · <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a> · +1 (613) 818-8550</p>
    </AppDocPage>
  );
}
