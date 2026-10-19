import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/ui/LegalPage";
import { contact, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal information submitted through this website.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="15 October 2026">
      <p>
        This policy explains how {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal information when you visit this
        website or contact us. Questions can be sent to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>

      <h2>1. Information we collect</h2>
      <h3>Information you provide</h3>
      <ul>
        <li>
          <strong>Project inquiry form:</strong> name, business name, email, optional phone/WhatsApp number, service required, budget
          range, timeline, project description, reference links and any estimator summary you choose to attach.
        </li>
        <li>
          <strong>Direct communication:</strong> anything you send us by email, phone or social media.
        </li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>Standard server logs (such as IP address, browser type and request time) kept by our hosting provider for security and reliability.</li>
        <li>The site sets no tracking or advertising cookies. [Review: list any analytics tools if they are added.]</li>
      </ul>

      <h2>2. How we use information</h2>
      <ul>
        <li>To respond to your inquiry and prepare proposals or quotes.</li>
        <li>To deliver and manage projects you engage us for.</li>
        <li>To protect the website from spam and abuse (e.g. rate limiting and spam filters).</li>
        <li>To meet legal, accounting or regulatory obligations.</li>
      </ul>
      <p>We do not sell your personal information, and we do not use inquiry details for unrelated marketing without your consent.</p>

      <h2>3. Service providers</h2>
      <p>We use trusted providers to operate the site. [Review and keep this list accurate.] Currently this may include:</p>
      <ul>
        <li>GitHub Pages — hosting the website and its server logs.</li>
        <li>Netlify — running the inquiry form&apos;s submission service.</li>
        <li>Resend — delivering inquiry form submissions to our inbox.</li>
      </ul>

      <h2>4. Retention</h2>
      <p>
        We keep inquiry records only as long as needed to respond, manage a resulting project, or meet legal obligations.
        [Define a concrete retention period, e.g. 24 months after last contact.]
      </p>

      <h2>5. Your rights</h2>
      <p>
        Depending on where you live, you may have the right to access, correct, delete or restrict use of your personal information, or to
        object to processing. To make a request, email <a href={`mailto:${contact.email}`}>{contact.email}</a>. We will respond within the
        period required by applicable law.
      </p>

      <h2>6. Security</h2>
      <p>
        We use reasonable technical and organisational measures — including encrypted connections (HTTPS) and keeping API keys on the server
        only — to protect information. No method of transmission or storage is completely secure.
      </p>

      <h2>7. International transfers</h2>
      <p>Our service providers may process data in countries other than your own. [Describe safeguards relevant to your jurisdiction.]</p>

      <h2>8. Children</h2>
      <p>This website is intended for businesses and adults and is not directed at children.</p>

      <h2>9. Changes</h2>
      <p>
        We may update this policy. The &ldquo;last updated&rdquo; date above shows when it last changed. See also our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
