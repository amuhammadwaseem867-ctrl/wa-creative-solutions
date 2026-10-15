#!/usr/bin/env node
/**
 * Portfolio board renderer.
 *
 *   node design/render.cjs <slug> [boardFilter]
 *
 * Renders every `design/portfolio/<slug>/*.html` board (files starting with "_"
 * are skipped) in filename order to `public/portfolio/concepts/<slug>/<name>.jpg`.
 * Rendering in order lets a later board use an earlier render as a texture
 * (e.g. a UI screen rendered in 02-dashboard.html shown on a 3D laptop in 06-device.html).
 *
 * Board conventions:
 *   <meta name="board-size" content="1600x1000">   (default 1600x1000)
 *   3D boards: set `window.__ASYNC = true` immediately and `window.__READY = true`
 *   once the final frame has been drawn (the shared studio lib does this via done()).
 *
 * Served paths (static server on 127.0.0.1):
 *   /node_modules/...   → repo node_modules (three.js lives here)
 *   /fonts/<family>/... → design/.vendor/node_modules/@fontsource/<family>/...
 *   everything else     → repo root (so /public/... and /design/... resolve)
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const FONTS = path.join(__dirname, ".vendor/node_modules/@fontsource");
const [slug, filter] = process.argv.slice(2);
if (!slug) {
  console.error("usage: node design/render.cjs <slug> [boardFilter]");
  process.exit(1);
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

function resolveFile(urlPath) {
  const p = decodeURIComponent(urlPath.split("?")[0]);
  const base = p.startsWith("/fonts/") ? FONTS : ROOT;
  const rel = p.startsWith("/fonts/") ? p.slice("/fonts/".length) : p.slice(1);
  const file = path.normalize(path.join(base, rel));
  if (!file.startsWith(base)) return null; // no path traversal
  return file;
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url);
  if (!file || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    return res.end("not found");
  }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  const pwRoot = execSync("npm root -g").toString().trim();
  const { chromium } = require(path.join(pwRoot, "playwright"));
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const port = server.address().port;

  const dir = path.join(__dirname, "portfolio", slug);
  const out = path.join(ROOT, "public/portfolio/concepts", slug);
  fs.mkdirSync(out, { recursive: true });
  const boards = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".html") && !f.startsWith("_"))
    .filter((f) => !filter || f.includes(filter))
    .sort();
  if (!boards.length) {
    console.error(`no boards found in ${dir}`);
    process.exit(1);
  }

  const browser = await chromium.launch({
    args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist", "--enable-unsafe-swiftshader"],
  });
  let failures = 0;
  for (const file of boards) {
    const html = fs.readFileSync(path.join(dir, file), "utf8");
    const m = html.match(/<meta\s+name=["']board-size["']\s+content=["'](\d+)x(\d+)["']/i);
    const [w, h] = m ? [Number(m[1]), Number(m[2])] : [1600, 1000];
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const problems = [];
    page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
    page.on("console", (msg) => msg.type() === "error" && problems.push(`console: ${msg.text()}`));
    page.on("requestfailed", (r) => problems.push(`requestfailed: ${r.url()}`));
    // Boards must be self-contained: block anything that isn't the local server.
    await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
    const t0 = Date.now();
    try {
      await page.goto(`http://127.0.0.1:${port}/design/portfolio/${slug}/${file}`, { waitUntil: "load", timeout: 120000 });
      await page.evaluate(() => document.fonts.ready);
      const isAsync = await page.evaluate(() => window.__ASYNC === true);
      if (isAsync) await page.waitForFunction(() => window.__READY === true, null, { timeout: 240000, polling: 250 });
      else await page.waitForTimeout(400);
      const name = file.replace(/\.html$/, ".jpg");
      await page.screenshot({ path: path.join(out, name), type: "jpeg", quality: 88 });
      console.log(`✓ ${file} → public/portfolio/concepts/${slug}/${name} (${w}x${h}, ${((Date.now() - t0) / 1000).toFixed(1)}s)`);
    } catch (e) {
      failures++;
      console.log(`✗ ${file}: ${e.message.split("\n")[0]}`);
    }
    for (const p of problems.slice(0, 8)) console.log(`   ⚠ ${p}`);
    await page.close();
  }
  await browser.close();
  server.close();
  process.exit(failures ? 1 : 0);
})();
