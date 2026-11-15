import { AppDocPage } from "@/components/app-legal";
import { FLYAWAY_FLOCK } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Flyaway Flock Support | Bayline Digital",
  description: "Help with Flyaway Flock: how to play, purchases, restoring Remove Ads, progress, ads and privacy choices, and how to contact Bayline Digital.",
  path: "/flyaway-flock/support",
});

export default function FlyawayFlockSupportPage() {
  return (
    <AppDocPage app={FLYAWAY_FLOCK} eyebrow="FLYAWAY FLOCK" title="Support">
      <p className="app-doc-lead">We’re happy to help. Email <a href="mailto:contact@baylinedigital.com?subject=Flyaway%20Flock%20support">contact@baylinedigital.com</a> with your iPhone model, iOS version, the level number, and a screenshot if you can. We usually reply within one business day.</p>

      <h2>How to play</h2>
      <p>Tap a bird to fly it off the board in the direction it faces. It can only leave if no other bird is in that line, so free the front birds first. Hold a bird to see its path. Sleepy birds need one tap to wake up. Tapping a blocked bird uses a tap, and running out of taps ends the level; you can retry for free or get five more taps.</p>

      <h2>A purchase didn’t arrive</h2>
      <p>Coin packs are added once the App Store confirms the payment. If a purchase is pending (for example, waiting for Ask to Buy approval), it’s added after approval. Reopen the app with an internet connection to finish any interrupted delivery.</p>

      <h2>Restore Remove Ads or the Starter Flock</h2>
      <p>Open Settings or the Shop and tap <strong>Restore purchases</strong>, signed in with the Apple Account that made the purchase. Restoring brings back ad removal. Coin packs, and the coins and power-ups in the Starter Flock, are delivered once and aren’t restored.</p>

      <h2>Refunds</h2>
      <p>Apple handles payments and refunds. Request a refund at <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.</p>

      <h2>My progress</h2>
      <p>Your progress is saved on your iPhone. Deleting the app deletes local progress, and there’s no account or cloud backup, so it can’t be recovered after the app is removed.</p>

      <h2>Ads and tracking</h2>
      <p>Optional videos give rewards, and ads may appear between some levels unless you buy Remove Ads or the Starter Flock. You can change ad privacy choices in Settings when they apply to your region, and change tracking permission in iOS Settings → Privacy &amp; Security → Tracking. See the <a href="/flyaway-flock/privacy">privacy policy</a> for details.</p>

      <h2>Daily puzzle reminder</h2>
      <p>Turn the reminder on or off and pick its time in the app’s Settings. You can also manage it in iOS Settings → Notifications → Flyaway Flock.</p>

      <h2>Contact</h2>
      <p>Bayline Digital Inc. · Toronto, Ontario, Canada · <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a> · +1 (613) 818-8550</p>
    </AppDocPage>
  );
}
