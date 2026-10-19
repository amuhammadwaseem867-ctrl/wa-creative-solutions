import { NextResponse, type NextRequest } from "next/server";

/**
 * CORS for the contact API: the website is served from GitHub Pages while this route runs on
 * Netlify (where the Resend key lives). Only the contact endpoint is opened, and only to the
 * site's own origins.
 */
const allowedOrigins = new Set([
  "https://wacreativesolution.com",
  "https://www.wacreativesolution.com",
  "https://amuhammadwaseem867-ctrl.github.io",
]);

const corsHeaders = {
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
  Vary: "Origin",
};

export function proxy(request: NextRequest) {
  const origin = request.headers.get("origin") ?? "";
  const allowed = allowedOrigins.has(origin);

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: allowed ? 204 : 403,
      headers: allowed ? { ...corsHeaders, "Access-Control-Allow-Origin": origin } : corsHeaders,
    });
  }

  const response = NextResponse.next();
  if (allowed) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    for (const [k, v] of Object.entries(corsHeaders)) response.headers.set(k, v);
  }
  return response;
}

export const config = {
  matcher: ["/api/contact"],
};
