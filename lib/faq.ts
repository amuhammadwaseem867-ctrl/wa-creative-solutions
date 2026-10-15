import { pricingPolicies } from "./pricing";

export const pricingFaq = [
  {
    q: "Are these final prices?",
    a: "No. They're illustrative starting prices. After a short discovery conversation we send a written quote based on your exact scope, complexity and deliverables.",
  },
  {
    q: "What counts as a revision round?",
    a: pricingPolicies.revisions,
  },
  {
    q: "What happens if I need something outside the scope?",
    a: pricingPolicies.changeRequests,
  },
  {
    q: "What isn't included in the price?",
    a: `Unless explicitly included in your quote: ${pricingPolicies.excluded.join("; ").toLowerCase()}.`,
  },
  {
    q: "How do payments work?",
    a: "Payment terms are set out in your written quote — typically a deposit to book the project and the balance at agreed milestones or before final handover. We never take payment through the estimator.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Optional care plans are available and are always billed separately from the project fee. Nothing recurring is added unless you choose it.",
  },
  {
    q: "Who owns the work?",
    a: "On full payment, ownership of the final approved deliverables transfers to you, excluding third-party assets (fonts, stock, plugins) that remain under their own licences. See our terms for details.",
  },
];
