import { AppDocPage } from "@/components/app-legal";
import { SIP_AND_SORT } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Sip & Sort Support | Bayline Digital",
  description: "Help with Sip & Sort: purchases, restoring Remove Ads, iCloud progress, leaderboards, ads and privacy choices, and how to contact Bayline Digital.",
  path: "/sip-and-sort/support",
});

export default function SipAndSortSupportPage() {
  return (
    <AppDocPage app={SIP_AND_SORT} eyebrow="SIP & SORT" title="Support">
      <p className="app-doc-lead">We’re happy to help. Email <a href="mailto:contact@baylinedigital.com?subject=Sip%20%26%20Sort%20support">contact@baylinedigital.com</a> with your iPhone model, iOS version, the level number, and a screenshot if you can. We usually reply within one business day.</p>

      <h2>A purchase didn’t arrive</h2>
      <p>Coin packs are added once the App Store confirms the payment. If a purchase is pending (for example, waiting for Ask to Buy approval), it’s added after approval. Reopen the app with an internet connection to finish any interrupted delivery.</p>

      <h2>Restore Remove Ads or the Autumn Café Bundle</h2>
      <p>Open Settings or the Shop and tap <strong>Restore purchases</strong>, signed in with the Apple Account that made the purchase. Coin packs are consumable and aren’t restored.</p>

      <h2>Refunds</h2>
      <p>Apple handles payments and refunds. Request a refund at <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.</p>

      <h2>How do I move my progress to a new iPhone?</h2>
      <p>Sign in to the new iPhone with the same Apple Account and keep iCloud on. Your progress is saved to your iCloud automatically, and it appears within about a minute of opening the game. The same applies if you delete and reinstall the app. Remove Ads and the Autumn Café Bundle come back through <strong>Restore purchases</strong>. You can check the save status in the app under Settings → iCloud save.</p>

      <h2>Where are the leaderboards?</h2>
      <p>Open Settings → <strong>Leaderboards</strong>. Leaderboards need Game Center; if you aren’t signed in, the app shows the Game Center sign-in. There are three boards: levels cleared, stars earned, and best Daily Special streak.</p>

      <h2>Ads, tracking, and play stats</h2>
      <p>Optional videos give rewards, and ads may appear between some levels unless you buy Remove Ads. You can change ad privacy choices in Settings when they apply to your region, and change tracking permission in iOS Settings → Privacy & Security → Tracking. Turn off <strong>Share anonymous play stats</strong> in the app’s Settings to stop sending gameplay statistics. See the <a href="/sip-and-sort/privacy">privacy policy</a> for details.</p>

      <h2>Reminders</h2>
      <p>Tip-jar and Daily Special reminders are optional. Change them in iOS Settings → Notifications → Sip & Sort.</p>

      <h2>Contact</h2>
      <p>Bayline Digital Inc. · Toronto, Ontario, Canada · <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a> · +1 (613) 818-8550</p>
    </AppDocPage>
  );
}
