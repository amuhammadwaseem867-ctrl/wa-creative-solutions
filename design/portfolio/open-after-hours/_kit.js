// "Open After Hours" — WA Creative Solution's in-house social campaign kit.
// Each post is authored at its real export size (1080×1080, 1080×1920, 1200×628) and scaled into a board.
import { BODY, FRAME } from "./_brand.js";

export const RED = "#ff202d";
export const RED_DEEP = "#c81020";
export const HANDLE = "@wacreativesstudio";

export const mark = (h, frame = RED, body = "#fff") =>
  `<svg width="${((79.67 * h) / 92).toFixed(1)}" height="${h}" viewBox="0 0 79.67 92" aria-hidden="true"><path fill="${frame}" fill-rule="evenodd" d="${FRAME}"/><path fill="${body}" d="${BODY}"/></svg>`;

const spark = (s, c = "#fff") =>
  `<svg width="${s}" height="${s}" viewBox="0 0 40 40"><path d="M20 0Q22 18 40 20Q22 22 20 40Q18 22 0 20Q18 18 20 0Z" fill="${c}"/></svg>`;

const shot = (slug, n = 0) => `/public/portfolio/live/${slug}/desktop-${n}.webp`;

export const CSS = `
.post{position:relative;overflow:hidden;font-family:Poppins,sans-serif;color:#fff;background:#000;transform-origin:0 0;-webkit-font-smoothing:antialiased}
.post *{box-sizing:border-box}
.post .ember{position:absolute;inset:-10% -20% auto;height:80%;background:radial-gradient(50% 60% at 50% 0%,rgba(255,150,90,.55),rgba(255,32,45,.28) 35%,rgba(120,10,10,.12) 60%,transparent 75%);pointer-events:none}
.post .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);background-size:120px 120px;-webkit-mask:radial-gradient(70% 60% at 50% 30%,#000,transparent);mask:radial-gradient(70% 60% at 50% 30%,#000,transparent)}
.post .lab{font:500 26px/1 Poppins;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.6)}
.post .disp{font-family:Montserrat,sans-serif;font-weight:800;text-transform:uppercase;letter-spacing:-.01em;line-height:1.02}
.post .chrome{background:linear-gradient(180deg,#fff 20%,rgba(255,255,255,.38));-webkit-background-clip:text;background-clip:text;color:transparent}
.post .foot{position:absolute;left:80px;right:80px;bottom:70px;display:flex;align-items:center;justify-content:space-between;font:500 26px/1 Poppins;color:rgba(255,255,255,.65)}
.post .foot b{display:flex;align-items:center;gap:16px;font-weight:600;color:#fff}
.post .dots{display:flex;gap:10px}.post .dots i{width:12px;height:12px;border-radius:50%;background:rgba(255,255,255,.3)}.post .dots i.on{background:#fff}
.post .frame{border:2px solid rgba(255,255,255,.16);border-radius:18px;overflow:hidden;background:#111;box-shadow:0 60px 90px -40px #000}
.post .frame .bar{height:44px;display:flex;align-items:center;gap:10px;padding:0 18px;background:#171717;border-bottom:1px solid rgba(255,255,255,.08)}
.post .frame .bar i{width:13px;height:13px;border-radius:50%;background:rgba(255,255,255,.22)}
.post .frame img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;object-position:top}
.post .corner{position:absolute;width:26px;height:26px;border-color:rgba(255,255,255,.75);border-style:solid}
`;

const corners = (inset = 60) => `
  <span class="corner" style="left:${inset}px;top:${inset}px;border-width:2px 0 0 2px"></span>
  <span class="corner" style="right:${inset}px;top:${inset}px;border-width:2px 2px 0 0"></span>
  <span class="corner" style="left:${inset}px;bottom:${inset}px;border-width:0 0 2px 2px"></span>
  <span class="corner" style="right:${inset}px;bottom:${inset}px;border-width:0 2px 2px 0"></span>`;

const foot = (right = `<span class="dots"><i class="on"></i><i></i><i></i><i></i><i></i></span>`) =>
  `<div class="foot"><b>${mark(44)} ${HANDLE}</b>${right}</div>`;

/** Scales artwork authored at base×h px so it renders `w` px wide on the board. */
export function fit(html, w, base = 1080, h = base) {
  const s = w / base;
  return `<div style="width:${w}px;height:${(h * s).toFixed(1)}px;position:relative;overflow:hidden"><div style="position:absolute;left:0;top:0;width:${base}px;height:${h}px;transform:scale(${s});transform-origin:0 0">${html}</div></div>`;
}

// ---------- Posts (1080×1080) ----------

/** Hook post: the campaign line in Roman Urdu, English underneath. */
export const hook = () => `<div class="post" style="width:1080px;height:1080px">
  <div class="ember"></div><div class="grid"></div>${corners()}
  <div style="position:absolute;left:80px;right:80px;top:100px;display:flex;justify-content:space-between" class="lab"><span>[ Open after hours ]</span><span>01 / 05</span></div>
  <div style="position:absolute;left:80px;right:80px;top:320px">
    <div class="disp" style="font-size:88px">Dukaan raat ko<br>band hoti hai.</div>
    <div class="disp" style="font-size:88px;margin-top:12px;display:flex;align-items:center;gap:24px">${spark(76)}<span style="color:${RED}">Website nahi.</span></div>
    <p style="margin:50px 0 0;font:400 38px/1.45 Poppins;color:rgba(255,255,255,.72);max-width:860px">Your shop closes at ten. A good website keeps answering questions and taking enquiries all night.</p>
  </div>${foot()}</div>`;

/** Work post: a real build of ours, in a browser frame. */
export const work = (slug, title, kind, n = 0) => `<div class="post" style="width:1080px;height:1080px">
  <div class="ember" style="opacity:.8"></div>${corners()}
  <div style="position:absolute;left:80px;right:80px;top:100px;display:flex;justify-content:space-between" class="lab"><span>[ Live build ]</span><span>Swipe →</span></div>
  <div class="frame" style="position:absolute;left:110px;right:110px;top:190px"><div class="bar"><i></i><i></i><i></i></div><img src="${shot(slug, n)}" alt=""></div>
  <div style="position:absolute;left:80px;right:80px;top:770px">
    <div class="disp" style="font-size:84px">${title}</div>
    <p style="margin:14px 0 0;font:400 32px/1.3 Poppins;color:rgba(255,255,255,.65)">${kind} · designed &amp; built by WA</p>
  </div>${foot(`<span>Link in bio</span>`)}</div>`;

/** Tip post: red, a list a shop owner recognises. */
export const tip = () => `<div class="post" style="width:1080px;height:1080px;background:${RED_DEEP}">
  <div style="position:absolute;inset:0;background:radial-gradient(70% 55% at 50% 0%,rgba(255,170,120,.45),transparent 70%)"></div>${corners()}
  <div style="position:absolute;left:80px;right:80px;top:100px;display:flex;justify-content:space-between" class="lab"><span style="color:rgba(255,255,255,.85)">[ Quick check ]</span><span style="color:rgba(255,255,255,.85)">02 / 05</span></div>
  <div class="disp" style="position:absolute;left:80px;right:80px;top:200px;font-size:70px">3 signs your<br>website is losing<br>customers</div>
  <ol style="position:absolute;left:80px;right:80px;top:480px;margin:0;padding:0;list-style:none;font:500 40px/1.3 Poppins">
    ${["It loads slower than a WhatsApp reply", "No price, no phone number, no next step", "It looks broken on a phone"]
      .map((t, i) => `<li style="display:flex;gap:34px;padding:26px 0;border-top:2px solid rgba(255,255,255,.28)"><span class="disp" style="font-size:40px;opacity:.7">0${i + 1}</span>${t}</li>`)
      .join("")}
  </ol>${foot(`<span style="color:#fff">Save this ↓</span>`).replace(mark(44), mark(44, "#fff", "#fff"))}</div>`;

/** Process post: one step of how we work. */
export const process = () => `<div class="post" style="width:1080px;height:1080px">
  <div class="ember" style="opacity:.7"></div><div class="grid"></div>${corners()}
  <div style="position:absolute;left:80px;right:80px;top:100px" class="lab">[ How we work ]</div>
  <div class="disp chrome" style="position:absolute;left:68px;top:170px;font-size:420px;line-height:1">03</div>
  <div style="position:absolute;left:80px;right:80px;top:640px">
    <div class="disp" style="font-size:88px">Design</div>
    <p style="margin:20px 0 0;font:400 34px/1.45 Poppins;color:rgba(255,255,255,.7);max-width:820px">Concepts, prototypes and a visual direction you approve, before a single line of code.</p>
  </div>
  <div style="position:absolute;left:80px;right:80px;bottom:150px;display:flex;gap:14px">${[1, 2, 3, 4, 5].map((i) => `<span style="flex:1;height:6px;background:${i <= 3 ? (i === 3 ? RED : "#fff") : "rgba(255,255,255,.2)"}"></span>`).join("")}</div>
  ${foot(`<span>Step 3 of 5</span>`)}</div>`;

/** Quote card. */
export const quote = () => `<div class="post" style="width:1080px;height:1080px;background:#0b0b0b">${corners()}
  <div style="position:absolute;left:80px;top:150px">${spark(110, RED)}</div>
  <div class="disp" style="position:absolute;left:80px;right:80px;top:330px;font-size:92px">A logo is a<br>signature.<br><span class="chrome">A brand is a<br>reputation.</span></div>
  ${foot(`<span>Brand · Web · 3D · AI</span>`)}</div>`;

/** Seasonal post: the moment every Pakistani shop plans around. */
export const eid = () => `<div class="post" style="width:1080px;height:1080px;background:#050505">
  <div style="position:absolute;inset:0;background:radial-gradient(60% 50% at 50% 38%,rgba(255,190,120,.32),rgba(255,32,45,.14) 45%,transparent 70%)"></div>${corners()}
  <svg style="position:absolute;left:390px;top:150px" width="300" height="300" viewBox="0 0 100 100"><path d="M62 8a42 42 0 1 0 30 58A34 34 0 1 1 62 8z" fill="#f3d9a6"/></svg>
  <div style="position:absolute;left:80px;right:80px;top:500px;text-align:center">
    <div class="lab" style="color:#f3d9a6">[ Eid Mubarak ]</div>
    <div class="disp" style="font-size:78px;margin-top:30px">Eid sale coming?<br>Let your website<br>open first.</div>
  </div>${foot(`<span>Eid Mubarak</span>`)}</div>`;

// ---------- Story (1080×1920) ----------

export const story = () => `<div class="post" style="width:1080px;height:1920px">
  <div class="ember" style="height:60%"></div><div class="grid"></div>
  <div style="position:absolute;left:60px;right:60px;top:60px;display:flex;gap:10px">${[1, 2, 3].map((i) => `<span style="flex:1;height:6px;border-radius:3px;background:${i === 1 ? "#fff" : "rgba(255,255,255,.3)"}"></span>`).join("")}</div>
  <div style="position:absolute;left:60px;top:110px;display:flex;align-items:center;gap:18px;font:600 32px/1 Poppins">${mark(64)} wacreativesstudio <span style="font-weight:400;color:rgba(255,255,255,.55)">2h</span></div>
  <div style="position:absolute;left:90px;right:90px;top:520px;text-align:center">
    <div class="lab">[ Quick question ]</div>
    <div class="disp" style="font-size:104px;margin-top:40px">How do new<br>customers<br>find you?</div>
  </div>
  <div style="position:absolute;left:150px;right:150px;top:1180px;background:#fff;border-radius:32px;padding:26px;display:grid;gap:18px;color:#111;font:600 40px/1 Poppins">
    ${["Google search", "Instagram", "WhatsApp forwards", "Word of mouth"].map((t) => `<div style="border:3px solid #e6e6e6;border-radius:20px;padding:30px 34px">${t}</div>`).join("")}
  </div>
  <div style="position:absolute;left:0;right:0;bottom:90px;text-align:center;font:500 30px/1 Poppins;color:rgba(255,255,255,.6)">Tap to answer</div></div>`;

// ---------- Link ad (1200×628) ----------

export const linkAd = () => `<div class="post" style="width:1200px;height:628px">
  <div class="ember" style="left:30%;right:-30%;height:120%"></div>${corners(36)}
  <div style="position:absolute;left:70px;top:90px;width:620px">
    <div class="lab" style="font-size:20px">[ Open after hours ]</div>
    <div class="disp" style="font-size:62px;margin-top:26px">A website that<br>works while<br><span style="color:${RED}">you sleep.</span></div>
    <div style="margin-top:34px;display:inline-flex;align-items:center;gap:14px;border:2px solid rgba(255,255,255,.3);padding:18px 30px;font:600 24px/1 Poppins">Start a project →</div>
  </div>
  <div class="frame" style="position:absolute;left:720px;top:120px;width:560px;transform:rotate(-3deg)"><div class="bar"><i></i><i></i><i></i></div><img src="${shot("zama-zama")}" alt=""></div>
  <div style="position:absolute;left:70px;bottom:44px;display:flex;align-items:center;gap:12px;font:600 20px/1 Poppins">${mark(30)} WA Creative Solution</div></div>`;

// ---------- Boards ----------

export const BOARD_CSS = `
*{box-sizing:border-box}
html,body{margin:0;width:1600px;height:1000px;overflow:hidden;background:#000;color:#fff;font-family:Poppins,sans-serif;-webkit-font-smoothing:antialiased}
.hdr{position:absolute;left:80px;right:80px;top:52px;display:flex;justify-content:space-between;font:500 11px/14px Poppins;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.5);z-index:5}
.bember{position:absolute;pointer-events:none;background:radial-gradient(closest-side,rgba(255,140,80,.42),rgba(255,32,45,.2) 45%,rgba(90,8,8,.08) 70%,transparent)}
.bgrid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:80px 80px}
.cap{font:500 11px/1.5 Poppins;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45)}
.disp{font-family:Montserrat,sans-serif;font-weight:800;text-transform:uppercase;line-height:1.02}
.shadow{box-shadow:0 50px 80px -30px rgba(0,0,0,.95),0 0 0 1px rgba(255,255,255,.08)}
.phone{position:absolute;border-radius:44px;background:#0c0c0c;border:1.5px solid rgba(255,255,255,.18);padding:12px;box-shadow:0 60px 90px -30px #000}
.phone .scr{border-radius:33px;overflow:hidden;position:relative;background:#000}
.phone .notch{position:absolute;left:50%;top:10px;width:30%;height:22px;margin-left:-15%;border-radius:12px;background:#000;z-index:3}
`;

export const FONTS = ["montserrat/600", "montserrat/700", "montserrat/800", "poppins/300", "poppins/400", "poppins/500", "poppins/600"]
  .map((f) => `<link rel="stylesheet" href="/fonts/${f}.css">`)
  .join("");

/** Signals the renderer once fonts and every image have decoded. */
export async function done() {
  await document.fonts.ready;
  await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
  window.__READY = true;
}
