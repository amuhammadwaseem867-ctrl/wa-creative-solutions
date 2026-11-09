#!/usr/bin/env node
/**
 * Motion renderer: turns an animated board into an MP4 and a poster frame.
 *
 *   node design/render-motion.cjs <path/to/board.html> <outputBaseName>
 *
 * A motion board sets `window.DURATION` (seconds) and `window.renderAt(t)`, which draws the
 * frame at time t, then sets `window.__MOTION_READY = true`. Frames are captured one by one,
 * so the video is smooth however slow the machine renders. Output goes to
 * public/portfolio/motion/<name>.mp4 and <name>.jpg (poster at `window.POSTER_AT`, default 70%).
 * Served paths match design/render.cjs (/fonts/..., /node_modules/..., repo root).
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const FONTS = path.join(__dirname, ".vendor/node_modules/@fontsource");
const [board, name] = process.argv.slice(2);
if (!board || !name) {
  console.error("usage: node design/render-motion.cjs <board.html> <name>");
  process.exit(1);
}
const FPS = 30;
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".woff": "font/woff" };

const server = http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split("?")[0]);
  const base = p.startsWith("/fonts/") ? FONTS : ROOT;
  const file = path.normalize(path.join(base, p.startsWith("/fonts/") ? p.slice(7) : p.slice(1)));
  if (!file.startsWith(base) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    return res.end();
  }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});

(async () => {
  const { chromium } = require(path.join(execSync("npm root -g").toString().trim(), "playwright"));
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const html = fs.readFileSync(path.join(ROOT, board), "utf8");
  const m = html.match(/<meta\s+name=["']board-size["']\s+content=["'](\d+)x(\d+)["']/i);
  const [w, h] = m ? [Number(m[1]), Number(m[2])] : [1280, 800];
  const browser = await chromium.launch({ args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist", "--enable-unsafe-swiftshader"] });
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  page.on("pageerror", (e) => console.log("pageerror:", e.message));
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(`http://127.0.0.1:${server.address().port}/${board}`, { waitUntil: "load" });
  await page.waitForFunction(() => window.__MOTION_READY === true, null, { timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  const { duration, posterAt } = await page.evaluate(() => ({ duration: window.DURATION, posterAt: window.POSTER_AT ?? window.DURATION * 0.7 }));
  const tmp = fs.mkdtempSync(path.join(require("os").tmpdir(), "motion-"));
  const frames = Math.round(duration * FPS);
  const t0 = Date.now();
  for (let i = 0; i < frames; i++) {
    await page.evaluate((t) => window.renderAt(t), i / FPS);
    await page.screenshot({ path: path.join(tmp, `f${String(i).padStart(5, "0")}.png`) });
  }
  await page.evaluate((t) => window.renderAt(t), posterAt);
  const out = path.join(ROOT, "public/portfolio/motion");
  fs.mkdirSync(out, { recursive: true });
  await page.screenshot({ path: path.join(out, `${name}.jpg`), type: "jpeg", quality: 86 });
  await browser.close();
  server.close();
  execSync(`ffmpeg -loglevel error -y -framerate ${FPS} -i ${tmp}/f%05d.png -c:v libx264 -pix_fmt yuv420p -crf 22 -preset slow -movflags +faststart ${path.join(out, name + ".mp4")}`);
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`✓ ${name}: ${frames} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s → public/portfolio/motion/${name}.mp4`);
})();
