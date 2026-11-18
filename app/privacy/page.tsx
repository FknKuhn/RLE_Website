import { Metadata } from "next";
import NextLink from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How RLE Enterprises handles information collected through this website.",
};

const linkClass = "text-danger font-semibold underline underline-offset-2";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-6 leading-relaxed">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <p className="text-sm text-foreground/80">Effective date: November 17, 2026</p>

      <p>
        R.L.E. Enterprises Inc. (&ldquo;RLE,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;)
        respects your privacy. This policy explains what information this website
        collects, how we use it, and the choices you have.
      </p>

      <h2 className="text-2xl font-semibold">Information we collect</h2>
      <p>
        <strong>Information you give us.</strong> When you use our{" "}
        <NextLink className={linkClass} href="/contact">contact form</NextLink>, we
        collect your name, email address, phone number (optional), subject and
        message. This information is sent to us by email so we can respond to you.
        We also send a copy to the email address you provide as confirmation. We do
        not store form submissions in a database on this website.
      </p>
      <p>
        <strong>Information collected automatically.</strong> We do not use
        analytics, advertising or tracking cookies. Like most websites, the servers
        that host this site and deliver our images may automatically record basic
        technical information such as your IP address, browser type and the pages
        requested, for security and to keep the site running.
      </p>
      <p>
        <strong>Information stored on your device.</strong> If you switch between
        light and dark mode, your choice is saved in your browser&apos;s local
        storage so the site remembers it. It is never sent to us and you can clear
        it at any time through your browser settings.
      </p>

      <h2 className="text-2xl font-semibold">How we use your information</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>To respond to your questions and requests for quotes or services</li>
        <li>To communicate with you about work you have asked us to do</li>
        <li>To keep this website secure and working properly</li>
      </ul>
      <p>
        We do not sell, rent or trade your personal information, and we do not use
        it for marketing lists.
      </p>

      <h2 className="text-2xl font-semibold">Service providers</h2>
      <p>
        We use a small number of trusted companies to operate this website. They
        handle information only to provide their service to us:
      </p>
      <ul className="list-disc ml-6 space-y-2">
        <li><strong>Google (Gmail)</strong> delivers contact form emails.</li>
        <li><strong>Cloudinary</strong> stores and delivers the photos in our gallery.</li>
        <li>Our <strong>website hosting provider</strong> runs the servers this site is served from.</li>
      </ul>
      <p>
        We may also disclose information if required by law, or to protect the
        rights, property or safety of RLE, our customers or others.
      </p>

      <h2 className="text-2xl font-semibold">Third-party websites</h2>
      <p>
        Our site links to outside services, including our employment application
        (hosted by JotForm) and our social media pages (Facebook, Instagram, TikTok
        and LinkedIn). Information you submit on those sites is governed by their
        own privacy policies, not this one.
      </p>

      <h2 className="text-2xl font-semibold">How long we keep information</h2>
      <p>
        Contact form messages are kept in our business email only as long as
        needed to respond to you and for normal business records, and are then
        deleted.
      </p>

      <h2 className="text-2xl font-semibold">How we protect information</h2>
      <p>
        This website is served over an encrypted (HTTPS) connection, and access to
        our business email is limited to authorized staff. No method of
        transmission over the internet is completely secure, but we take
        reasonable steps to protect your information.
      </p>

      <h2 className="text-2xl font-semibold">Your choices and rights</h2>
      <p>
        You can ask us to tell you what personal information we have about you, to
        correct it, or to delete it. Contact us using the details below and we will
        respond within a reasonable time. Depending on where you live, you may have
        additional rights under your state&apos;s privacy laws.
      </p>
      <p>
        <strong>Do Not Track:</strong> because we do not track visitors across
        websites, we do not respond differently to browser Do Not Track signals.
      </p>

      <h2 className="text-2xl font-semibold">Children&apos;s privacy</h2>
      <p>
        This website is intended for business customers and adults. We do not
        knowingly collect personal information from children under 13. If you
        believe a child has sent us information, please contact us and we will
        delete it.
      </p>

      <h2 className="text-2xl font-semibold">Changes to this policy</h2>
      <p>
        We may update this policy from time to time. When we do, we will change the
        effective date at the top of this page.
      </p>

      <h2 className="text-2xl font-semibold">Contact us</h2>
      <address className="not-italic">
        R.L.E. Enterprises Inc.
        <br />
        P.O. Box #249, Moscow, PA 18444
        <br />
        Phone:{" "}
        <a className={linkClass} href="tel:+15708424051">(570) 842-4051</a>
        <br />
        Or use our <NextLink className={linkClass} href="/contact">contact form</NextLink>.
      </address>
    </div>
  );
}
