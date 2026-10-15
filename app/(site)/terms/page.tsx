import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/ui/LegalPage";
import { contact, site } from "@/lib/site";
import { pricingPolicies } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms covering project scope, payment, revisions, intellectual property and responsibilities when working with ${site.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="15 October 2026">
      <p>
        These terms apply to projects undertaken by {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) for a client (&ldquo;you&rdquo;). A
        signed proposal or quote for a specific project forms part of the agreement and takes precedence where it differs from these terms.
      </p>

      <h2>1. Quotes and estimates</h2>
      <p>
        Prices on this website are illustrative starting prices. Results from the online estimator are preliminary and are not a binding
        quotation. A project is only confirmed by a written quote or proposal accepted by both parties.
      </p>

      <h2>2. Scope of services</h2>
      <p>
        Each project&apos;s deliverables, milestones, number of revision rounds and exclusions are defined in the written scope. Work not
        listed in the scope is not included. We do not provide unlimited work.
      </p>

      <h2>3. Revisions and change requests</h2>
      <p>{pricingPolicies.revisions}</p>
      <p>{pricingPolicies.changeRequests}</p>

      <h2>4. Payment</h2>
      <ul>
        <li>Projects typically require a deposit before work begins, with the balance due at agreed milestones or before final handover. [Set your standard split, e.g. 50/50.]</li>
        <li>Invoices are payable within [X] days of issue. [Define late-payment terms.]</li>
        <li>
          Third-party costs — including {pricingPolicies.excluded.slice(0, 4).join(", ").toLowerCase()} — are your responsibility unless
          explicitly included in the quote.
        </li>
        <li>Recurring services such as maintenance are billed separately and only if you opt in.</li>
      </ul>

      <h2>5. Client responsibilities</h2>
      <ul>
        <li>Provide content, brand assets, access credentials and feedback within agreed timeframes.</li>
        <li>Confirm you have the rights to any material you supply (text, images, logos, data).</li>
        <li>Review deliverables at each checkpoint; approval of a stage allows the next stage to begin.</li>
      </ul>
      <p>Delays in feedback or materials may move the timeline. Projects paused for more than [X] days may be rescheduled.</p>

      <h2>6. Intellectual property</h2>
      <ul>
        <li>On receipt of full payment, ownership of the final approved deliverables transfers to you.</li>
        <li>
          Third-party assets (fonts, stock media, plugins, libraries, 3D assets) remain subject to their own licences, which may require you to
          hold your own licence.
        </li>
        <li>Unused concepts, drafts and our pre-existing tools, code libraries and know-how remain our property.</li>
        <li>Unless agreed otherwise in writing, we may show completed work in our portfolio after launch. [Confirm or remove.]</li>
      </ul>

      <h2>7. AI-assisted work</h2>
      <p>
        Where AI tools are used in a project, we review outputs for quality and suitability. We will tell you when AI-generated assets form
        part of a deliverable. [Adapt to your actual practice.]
      </p>

      <h2>8. Launch and support</h2>
      <p>
        We support the launch process described in the scope. Hosting, domains and third-party platforms are operated by their providers, and
        we are not responsible for their outages or changes. Post-launch support is limited to what is included in the quote or a separate
        maintenance plan.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the extent permitted by law, our total liability for any project is limited to the fees paid for that project. We are not liable
        for indirect or consequential losses. [Have this clause reviewed for your jurisdiction.]
      </p>

      <h2>10. Cancellation</h2>
      <p>Either party may end a project with written notice. Work completed up to that point is payable. [Define deposit refund rules.]</p>

      <h2>11. Governing law</h2>
      <p>These terms are governed by the laws of [jurisdiction]. [Confirm with legal counsel.]</p>

      <h2>12. Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${contact.email}`}>{contact.email}</a>. See also our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
