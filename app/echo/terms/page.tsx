import { AppDocPage } from "@/components/app-legal";
import { ECHO } from "@/lib/data/apps";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Echo Terms of Use | Bayline Digital",
  description: "Terms of use for the Echo iPhone game by Bayline Digital Inc., including the Remove Ads purchase, stars and styles, and the daily puzzle.",
  path: "/echo/terms",
});

export default function EchoTermsPage() {
  return (
    <AppDocPage app={ECHO} eyebrow="ECHO" title="Terms of use" updated="November 18, 2026">
      <p className="app-doc-lead">These terms apply to the Echo app for iPhone, provided by Bayline Digital Inc. (&ldquo;we&rdquo; or &ldquo;us&rdquo;). By using the app you agree to them and to Apple’s <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/">Licensed Application End User License Agreement</a> (the &ldquo;Apple EULA&rdquo;), which also applies. If these terms conflict with the Apple EULA, these terms apply to the extent allowed.</p>

      <h2>1. Using the app</h2>
      <p>We give you a personal, non-transferable license to use the app on Apple devices you own or control, for your own entertainment. Please don’t copy, modify, reverse engineer, or resell the app, or use cheats or automation to interfere with it.</p>

      <h2>2. Stars, styles, and streaks</h2>
      <p>Stars, styles, streaks, and daily puzzle results are part of the game. They have no real-world value, can’t be exchanged for money, and can’t be transferred. We may adjust levels, star requirements, and rewards over time. They are stored on your device and are lost if you delete the app.</p>

      <h2>3. In-app purchase</h2>
      <p>Purchases are made through Apple and are subject to Apple’s terms. Remove Ads is a one-time purchase that stops ads between levels and can be restored with the same Apple Account; optional reward videos remain available. The price is shown in the app in your local currency. Apple handles refunds; if Apple refunds the purchase, Remove Ads is turned off.</p>

      <h2>4. Ads and third-party services</h2>
      <p>The app shows ads from Google AdMob and uses other third-party services described in our <a href="/echo/privacy">privacy policy</a>. A reward video gives its reward only when the video has been watched to the point the ad provider counts it. We aren’t responsible for the content of third-party ads or websites.</p>

      <h2>5. Changes and availability</h2>
      <p>We may update, change, or discontinue features, levels, the daily puzzle, or the app.</p>

      <h2>6. Disclaimer and liability</h2>
      <p>The app is provided &ldquo;as is.&rdquo; To the extent permitted by law, we disclaim implied warranties and aren’t liable for indirect or consequential damages, and our total liability is limited to the amount you paid for the app or in-app purchases in the 12 months before the claim. Nothing here limits rights you have under consumer protection laws that can’t be waived.</p>

      <h2>7. Governing law</h2>
      <p>These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there, unless the law of your place of residence requires otherwise.</p>

      <h2>8. Contact</h2>
      <p>Bayline Digital Inc., Toronto, Ontario, Canada · <a href="mailto:contact@baylinedigital.com">contact@baylinedigital.com</a></p>
    </AppDocPage>
  );
}
