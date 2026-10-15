# Portfolio design pipeline

Concept-project artwork for the WA Creative Solution portfolio is authored as code and rendered to
images, so every board is reproducible and editable.

```
design/
  render.cjs                 # renders boards → public/portfolio/concepts/<slug>/*.jpg
  portfolio/_lib/studio.js   # shared three.js photo studio (lights, sweep, mockups)
  portfolio/<slug>/          # one folder per project
    01-cover.html …          # boards, rendered in filename order
    project.json             # case-study copy + captions for each board
  .vendor/                   # local fonts (gitignored) — see "Setup"
```

## Setup

```bash
# fonts (once)
npm install --prefix design/.vendor @fontsource/inter @fontsource/playfair-display @fontsource/cormorant-garamond \
  @fontsource/space-grotesk @fontsource/dm-sans @fontsource/dm-serif-display @fontsource/syne @fontsource/archivo \
  @fontsource/fraunces @fontsource/manrope @fontsource/bebas-neue @fontsource/jetbrains-mono @fontsource/montserrat \
  @fontsource/poppins @fontsource/instrument-serif @fontsource/outfit @fontsource/unbounded @fontsource/italiana \
  @fontsource/marcellus @fontsource/sora
# render one project (needs Playwright + Chromium, available globally in this environment)
node design/render.cjs <slug>            # all boards
node design/render.cjs <slug> 03         # only boards whose filename contains "03"
```

## Board conventions

- **One HTML file per board**, self-contained (inline CSS/JS). Files starting with `_` are not rendered
  (use them for shared partials you copy from, or scratch work).
- **Size** via `<meta name="board-size" content="1600x1000">`. Default 1600×1000 (16:10).
  - `01-cover.html` **must be 1600×1000** — it is the project thumbnail (cards crop 16:10 from the top).
  - Gallery boards: 1600×1000 (landscape) or 1600×2000 (tall). Phone-screen sources: 390×844 or 1170×2532.
- **Body must be exactly the board size**: `html,body{margin:0;width:1600px;height:1000px;overflow:hidden}`.
- **No network.** The renderer blocks everything except the local server. Use only:
  - Fonts: `<link rel="stylesheet" href="/fonts/<family>/<weight>.css">` (e.g. `/fonts/fraunces/600.css`,
    `/fonts/inter/400-italic.css`). Available families/weights are listed below.
  - three.js: via the import map below.
  - Images: only boards you rendered earlier, e.g. `/public/portfolio/concepts/<slug>/02-dashboard.jpg`
    (boards render in filename order, so number source screens before the mockups that use them).
  - No stock photos exist offline — build visuals from typography, SVG, CSS and CGI.
- **3D boards** use the shared studio (it sets `window.__ASYNC`; call `done(studio)` after building the scene):

```html
<script type="importmap">{"imports":{"three":"/node_modules/three/build/three.module.js","three/addons/":"/node_modules/three/examples/jsm/"}}</script>
<script type="module">
  import * as THREE from "three";
  import { createStudio, roundedBox, phone, laptop, printed, loadTexture, canvasTexture, done } from "/design/portfolio/_lib/studio.js";
  const s = createStudio({ background: "#e7e2da", lighting: "soft" }); // "soft" | "dramatic" | "bright"
  s.cyclorama({ color: "#e7e2da", back: 2.5 });      // seamless studio sweep (keep `back` behind the subject)
  const screen = await loadTexture("/public/portfolio/concepts/<slug>/02-home.jpg");
  s.scene.add(laptop(screen));
  s.camera.position.set(0, 2.4, 7); s.camera.lookAt(0, 0.8, 0);
  done(s);
</script>
```

  Helpers: `createStudio`, `cyclorama`, `shadowCatcher`, `roundedBox`, `roundedRectGeometry`, `printed`
  (cards/sheets/box faces with a front texture), `phone`, `laptop`, `loadTexture`, `canvasTexture`,
  `screenMaterial`, `studioEnvironment`, `done`. Any three.js API is available (`MeshPhysicalMaterial`
  with `transmission` for glass, `LatheGeometry` for bottles, `ExtrudeGeometry` for logos, etc.).
  Rendering uses software WebGL: ≈10–60 s per 3D board is normal.

## Fonts available offline

archivo, inter, dm-sans, fraunces, montserrat, poppins (100–900 + italics) · playfair-display (400–900 + italics) ·
cormorant-garamond (300–700 + italics) · jetbrains-mono (100–800 + italics) · manrope, sora (200/100–800) ·
outfit, unbounded (100/200–900) · space-grotesk (300–700) · syne (400–800) ·
dm-serif-display, instrument-serif (400 + italic) · bebas-neue, italiana, marcellus (400)

## project.json

```json
{
  "slug": "corvane",
  "title": "Corvane",
  "discipline": "Brand Identity · Private Wealth",
  "categories": ["brand-identity", "graphic"],
  "summary": "One sentence for cards.",
  "overview": "2–3 sentences.",
  "challenge": "The brief we set ourselves (concept project).",
  "solution": "How the work answers it.",
  "services": ["Brand strategy", "Logo design"],
  "palette": ["#0f2a24", "#f1ece2", "#b08d57"],
  "boards": [{ "file": "01-cover.jpg", "caption": "Cover", "alt": "Descriptive alt text" }]
}
```

`categories` use the service ids from `lib/services.ts`: `brand-identity`, `web`, `ai`, `3d-motion`,
`marketing`, `graphic`.

## Honesty rules

These are **self-initiated concept projects for fictional brands**. Never imply a real client,
testimonial, award or commercial result. Product UIs may show plausible sample data, but no claims
like "+300% conversions" presented as achieved results.
