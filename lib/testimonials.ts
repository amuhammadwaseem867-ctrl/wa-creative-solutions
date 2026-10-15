/**
 * VERIFIED client feedback only. Add an entry only with the client's written
 * permission to publish their name and words. Leave empty until then — the
 * site shows process-based trust signals instead.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  projectSlug?: string;
};

export const testimonials: Testimonial[] = [];
